<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\LeaveRequestResource;
use App\Models\FacultyProfile;
use App\Models\LeaveRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class LeaveRequestController extends Controller
{
    /**
     * List authenticated user's leave requests with optional filters.
     */
    public function index(Request $request): JsonResponse
    {
        $profile = FacultyProfile::where('user_id', $request->user()->id)->first();

        if (! $profile) {
            return response()->json(['message' => 'Faculty profile not found.'], 404);
        }

        $query = LeaveRequest::where('faculty_profile_id', $profile->id)
            ->with(['approver']);

        if ($request->filled('status')) {
            $query->where('status', $request->query('status'));
        }

        if ($request->filled('leave_type')) {
            $query->where('leave_type', $request->query('leave_type'));
        }

        $leaves = $query->orderBy('created_at', 'desc')
            ->paginate($request->integer('per_page', 15));

        return response()->json([
            'data' => LeaveRequestResource::collection($leaves),
            'meta' => [
                'current_page' => $leaves->currentPage(),
                'last_page' => $leaves->lastPage(),
                'per_page' => $leaves->perPage(),
                'total' => $leaves->total(),
            ],
        ]);
    }

    /**
     * Submit a new leave request.
     */
    public function store(Request $request): JsonResponse
    {
        $profile = FacultyProfile::where('user_id', $request->user()->id)->first();

        if (! $profile) {
            return response()->json(['message' => 'Faculty profile not found.'], 404);
        }

        $validated = $request->validate([
            'leave_type' => ['required', 'string', 'in:annual,sick,emergency,maternity,study,unpaid,other'],
            'start_date' => ['required', 'date', 'after_or_equal:today'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'reason' => ['required', 'string', 'max:2000'],
            'attachment' => ['nullable', 'file', 'mimes:pdf,jpg,jpeg,png,doc,docx', 'max:5120'],
            'notes' => ['nullable', 'string', 'max:1000'],
        ]);

        // Check for overlapping approved leaves
        $overlapping = LeaveRequest::where('faculty_profile_id', $profile->id)
            ->where('status', 'approved')
            ->where(function ($q) use ($validated) {
                $q->whereBetween('start_date', [$validated['start_date'], $validated['end_date']])
                    ->orWhereBetween('end_date', [$validated['start_date'], $validated['end_date']])
                    ->orWhere(function ($q2) use ($validated) {
                        $q2->where('start_date', '<=', $validated['start_date'])
                            ->where('end_date', '>=', $validated['end_date']);
                    });
            })
            ->exists();

        if ($overlapping) {
            return response()->json([
                'message' => 'You already have an approved leave that overlaps with these dates.',
            ], 422);
        }

        $attachmentPath = null;
        if ($request->hasFile('attachment')) {
            $attachmentPath = $request->file('attachment')->store('leave-attachments', 'public');
        }

        $leave = LeaveRequest::create([
            'faculty_profile_id' => $profile->id,
            'leave_type' => $validated['leave_type'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'reason' => $validated['reason'],
            'attachment_path' => $attachmentPath,
            'notes' => $validated['notes'] ?? null,
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Leave request submitted successfully.',
            'data' => new LeaveRequestResource($leave),
        ], 201);
    }

    /**
     * Show a single leave request.
     */
    public function show(Request $request, int $id): JsonResponse
    {
        $profile = FacultyProfile::where('user_id', $request->user()->id)->first();

        if (! $profile) {
            return response()->json(['message' => 'Faculty profile not found.'], 404);
        }

        $leave = LeaveRequest::where('faculty_profile_id', $profile->id)
            ->with(['approver'])
            ->findOrFail($id);

        return response()->json([
            'data' => new LeaveRequestResource($leave),
        ]);
    }

    /**
     * Cancel a pending leave request.
     */
    public function cancel(Request $request, int $id): JsonResponse
    {
        $profile = FacultyProfile::where('user_id', $request->user()->id)->first();

        if (! $profile) {
            return response()->json(['message' => 'Faculty profile not found.'], 404);
        }

        $leave = LeaveRequest::where('faculty_profile_id', $profile->id)
            ->findOrFail($id);

        if (! $leave->isPending()) {
            return response()->json([
                'message' => 'Only pending leave requests can be cancelled.',
            ], 422);
        }

        $leave->update(['status' => 'cancelled']);

        return response()->json([
            'message' => 'Leave request cancelled successfully.',
            'data' => new LeaveRequestResource($leave->fresh()),
        ]);
    }

    /**
     * Approve a leave request (admin only).
     */
    public function approve(Request $request, int $id): JsonResponse
    {
        $user = $request->user();

        // Check admin role
        if (! in_array($user->role, ['admin', 'super_admin', 'dean', 'department_head'])) {
            return response()->json(['message' => 'Unauthorized. Admin role required.'], 403);
        }

        $leave = LeaveRequest::findOrFail($id);

        if (! $leave->isPending()) {
            return response()->json([
                'message' => 'Only pending leave requests can be approved.',
            ], 422);
        }

        $leave->update([
            'status' => 'approved',
            'approved_by' => $user->id,
            'approved_at' => now(),
        ]);

        return response()->json([
            'message' => 'Leave request approved successfully.',
            'data' => new LeaveRequestResource($leave->fresh(['approver'])),
        ]);
    }

    /**
     * Reject a leave request (admin only).
     */
    public function reject(Request $request, int $id): JsonResponse
    {
        $user = $request->user();

        // Check admin role
        if (! in_array($user->role, ['admin', 'super_admin', 'dean', 'department_head'])) {
            return response()->json(['message' => 'Unauthorized. Admin role required.'], 403);
        }

        $validated = $request->validate([
            'rejection_reason' => ['required', 'string', 'max:2000'],
        ]);

        $leave = LeaveRequest::findOrFail($id);

        if (! $leave->isPending()) {
            return response()->json([
                'message' => 'Only pending leave requests can be rejected.',
            ], 422);
        }

        $leave->update([
            'status' => 'rejected',
            'approved_by' => $user->id,
            'approved_at' => now(),
            'rejection_reason' => $validated['rejection_reason'],
        ]);

        return response()->json([
            'message' => 'Leave request rejected.',
            'data' => new LeaveRequestResource($leave->fresh(['approver'])),
        ]);
    }
}
