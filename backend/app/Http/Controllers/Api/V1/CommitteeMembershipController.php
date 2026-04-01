<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\CommitteeMembershipResource;
use App\Models\CommitteeMembership;
use App\Models\FacultyProfile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CommitteeMembershipController extends Controller
{
    /**
     * List authenticated user's committee memberships.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $profile = $this->getProfile($request);

        if (! $profile) {
            abort(404, 'Faculty profile not found.');
        }

        $query = CommitteeMembership::where('faculty_profile_id', $profile->id);

        if ($request->filled('is_active')) {
            $query->where('is_active', filter_var($request->query('is_active'), FILTER_VALIDATE_BOOLEAN));
        }

        $memberships = $query->orderBy('start_date', 'desc')->get();

        return CommitteeMembershipResource::collection($memberships);
    }

    /**
     * Create a new committee membership.
     */
    public function store(Request $request): JsonResponse
    {
        $profile = $this->getProfile($request);

        if (! $profile) {
            return response()->json(['message' => 'Faculty profile not found.'], 404);
        }

        $validated = $request->validate([
            'committee_name' => ['required', 'array'],
            'committee_name.ar' => ['required', 'string', 'max:255'],
            'committee_name.en' => ['nullable', 'string', 'max:255'],
            'role' => ['nullable', 'string', 'in:member,chair,secretary,coordinator'],
            'description' => ['nullable', 'array'],
            'description.ar' => ['nullable', 'string'],
            'description.en' => ['nullable', 'string'],
            'start_date' => ['required', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $membership = new CommitteeMembership();
        $membership->faculty_profile_id = $profile->id;

        // Set translatable fields
        if (isset($validated['committee_name'])) {
            foreach ($validated['committee_name'] as $locale => $value) {
                $membership->setTranslation('committee_name', $locale, $value);
            }
        }
        if (isset($validated['description'])) {
            foreach ($validated['description'] as $locale => $value) {
                $membership->setTranslation('description', $locale, $value);
            }
        }

        $membership->role = $validated['role'] ?? 'member';
        $membership->start_date = $validated['start_date'];
        $membership->end_date = $validated['end_date'] ?? null;
        $membership->is_active = $validated['is_active'] ?? true;
        $membership->save();

        return response()->json([
            'message' => 'Committee membership created successfully.',
            'data' => new CommitteeMembershipResource($membership),
        ], 201);
    }

    /**
     * Show a single committee membership.
     */
    public function show(Request $request, int $id): JsonResponse
    {
        $profile = $this->getProfile($request);

        if (! $profile) {
            return response()->json(['message' => 'Faculty profile not found.'], 404);
        }

        $membership = CommitteeMembership::where('faculty_profile_id', $profile->id)
            ->findOrFail($id);

        return response()->json([
            'data' => new CommitteeMembershipResource($membership),
        ]);
    }

    /**
     * Update a committee membership.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $profile = $this->getProfile($request);

        if (! $profile) {
            return response()->json(['message' => 'Faculty profile not found.'], 404);
        }

        $membership = CommitteeMembership::where('faculty_profile_id', $profile->id)
            ->findOrFail($id);

        $validated = $request->validate([
            'committee_name' => ['nullable', 'array'],
            'committee_name.ar' => ['nullable', 'string', 'max:255'],
            'committee_name.en' => ['nullable', 'string', 'max:255'],
            'role' => ['nullable', 'string', 'in:member,chair,secretary,coordinator'],
            'description' => ['nullable', 'array'],
            'description.ar' => ['nullable', 'string'],
            'description.en' => ['nullable', 'string'],
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        // Set translatable fields
        if (isset($validated['committee_name'])) {
            foreach ($validated['committee_name'] as $locale => $value) {
                $membership->setTranslation('committee_name', $locale, $value);
            }
            unset($validated['committee_name']);
        }
        if (isset($validated['description'])) {
            foreach ($validated['description'] as $locale => $value) {
                $membership->setTranslation('description', $locale, $value);
            }
            unset($validated['description']);
        }

        $membership->fill(array_filter($validated, fn ($v) => $v !== null));
        $membership->save();

        return response()->json([
            'message' => 'Committee membership updated successfully.',
            'data' => new CommitteeMembershipResource($membership),
        ]);
    }

    /**
     * Delete a committee membership.
     */
    public function destroy(Request $request, int $id): JsonResponse
    {
        $profile = $this->getProfile($request);

        if (! $profile) {
            return response()->json(['message' => 'Faculty profile not found.'], 404);
        }

        $membership = CommitteeMembership::where('faculty_profile_id', $profile->id)
            ->findOrFail($id);

        $membership->delete();

        return response()->json([
            'message' => 'Committee membership deleted successfully.',
        ]);
    }

    private function getProfile(Request $request): ?FacultyProfile
    {
        return FacultyProfile::where('user_id', $request->user()->id)->first();
    }
}
