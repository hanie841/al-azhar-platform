<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\FacultyProfileResource;
use App\Models\FacultyProfile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Storage;

class FacultyProfileController extends Controller
{
    /**
     * List public faculty profiles with optional filters.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = FacultyProfile::where('is_active', true)
            ->where('is_public', true)
            ->with(['user', 'faculty', 'department']);

        if ($request->filled('faculty_id')) {
            $query->where('faculty_id', $request->query('faculty_id'));
        }

        if ($request->filled('department_id')) {
            $query->where('department_id', $request->query('department_id'));
        }

        if ($request->filled('academic_rank')) {
            $query->where('academic_rank', $request->query('academic_rank'));
        }

        if ($request->filled('q')) {
            $search = $request->query('q');
            $query->where(function ($q) use ($search) {
                $q->whereHas('user', function ($uq) use ($search) {
                    $uq->where('name', 'LIKE', "%{$search}%");
                })
                ->orWhere('title', 'LIKE', "%{$search}%")
                ->orWhere('specialization', 'LIKE', "%{$search}%");
            });
        }

        $profiles = $query->orderBy('created_at', 'desc')
            ->paginate($request->integer('per_page', 15));

        return FacultyProfileResource::collection($profiles);
    }

    /**
     * Show a single faculty profile.
     */
    public function show(int $id): FacultyProfileResource
    {
        $profile = FacultyProfile::where('is_active', true)
            ->where('is_public', true)
            ->with(['user', 'faculty', 'department'])
            ->findOrFail($id);

        return new FacultyProfileResource($profile);
    }

    /**
     * Get authenticated user's own faculty profile.
     */
    public function me(Request $request): JsonResponse
    {
        $profile = FacultyProfile::where('user_id', $request->user()->id)
            ->with(['user', 'faculty', 'department'])
            ->first();

        if (! $profile) {
            return response()->json([
                'message' => 'Faculty profile not found for this user.',
            ], 404);
        }

        $currentSections = $profile->currentSections();
        $sectionsData = $currentSections->map(function ($section) {
            return [
                'id' => $section->id,
                'section_number' => $section->section_number,
                'course' => [
                    'id' => $section->course->id,
                    'name' => $section->course->getTranslation('name', app()->getLocale(), false),
                    'code' => $section->course->code ?? null,
                ],
                'semester' => [
                    'id' => $section->semester->id,
                    'name' => $section->semester->getTranslation('name', app()->getLocale(), false),
                ],
                'room' => $section->room,
                'building' => $section->building,
                'schedule' => $section->schedule,
                'enrolled_count' => $section->enrolled_count,
                'capacity' => $section->capacity,
            ];
        });

        $activeLeaves = $profile->activeLeaves();
        $activeCommittees = $profile->committeeMemberships()
            ->where('is_active', true)
            ->get();

        $locale = app()->getLocale();

        return response()->json([
            'data' => [
                'profile' => new FacultyProfileResource($profile),
                'current_sections' => $sectionsData,
                'active_leaves' => $activeLeaves->map(function ($leave) {
                    return [
                        'id' => $leave->id,
                        'leave_type' => $leave->leave_type,
                        'start_date' => $leave->start_date->toDateString(),
                        'end_date' => $leave->end_date->toDateString(),
                        'status' => $leave->status,
                        'duration_days' => $leave->durationDays(),
                    ];
                }),
                'active_committees' => $activeCommittees->map(function ($cm) use ($locale) {
                    return [
                        'id' => $cm->id,
                        'committee_name' => $cm->getTranslation('committee_name', $locale, false),
                        'role' => $cm->role,
                        'start_date' => $cm->start_date->toDateString(),
                    ];
                }),
            ],
        ]);
    }

    /**
     * Update authenticated user's own faculty profile.
     */
    public function update(Request $request): JsonResponse
    {
        $profile = FacultyProfile::where('user_id', $request->user()->id)->first();

        if (! $profile) {
            return response()->json([
                'message' => 'Faculty profile not found for this user.',
            ], 404);
        }

        $validated = $request->validate([
            'title' => ['nullable', 'array'],
            'title.ar' => ['nullable', 'string', 'max:255'],
            'title.en' => ['nullable', 'string', 'max:255'],
            'bio' => ['nullable', 'array'],
            'bio.ar' => ['nullable', 'string'],
            'bio.en' => ['nullable', 'string'],
            'specialization' => ['nullable', 'array'],
            'specialization.ar' => ['nullable', 'string', 'max:500'],
            'specialization.en' => ['nullable', 'string', 'max:500'],
            'phone' => ['nullable', 'string', 'max:50'],
            'office_location' => ['nullable', 'string', 'max:255'],
            'office_hours' => ['nullable', 'array'],
            'office_hours.*.day' => ['required_with:office_hours', 'string'],
            'office_hours.*.start' => ['required_with:office_hours', 'string'],
            'office_hours.*.end' => ['required_with:office_hours', 'string'],
            'research_interests' => ['nullable', 'array'],
            'research_interests.*' => ['string', 'max:255'],
            'qualifications' => ['nullable', 'array'],
            'qualifications.*.degree' => ['required_with:qualifications', 'string'],
            'qualifications.*.institution' => ['required_with:qualifications', 'string'],
            'qualifications.*.year' => ['nullable', 'string'],
            'website_url' => ['nullable', 'url', 'max:500'],
            'google_scholar_url' => ['nullable', 'url', 'max:500'],
            'orcid' => ['nullable', 'string', 'max:50'],
            'scopus_id' => ['nullable', 'string', 'max:50'],
        ]);

        // Handle translatable fields
        foreach (['title', 'bio', 'specialization'] as $field) {
            if (isset($validated[$field]) && is_array($validated[$field])) {
                foreach ($validated[$field] as $locale => $value) {
                    $profile->setTranslation($field, $locale, $value);
                }
                unset($validated[$field]);
            }
        }

        $profile->fill($validated);
        $profile->save();

        $profile->load(['user', 'faculty', 'department']);

        return response()->json([
            'message' => 'Profile updated successfully.',
            'data' => new FacultyProfileResource($profile),
        ]);
    }

    /**
     * Upload CV file for authenticated user's profile.
     */
    public function uploadCv(Request $request): JsonResponse
    {
        $profile = FacultyProfile::where('user_id', $request->user()->id)->first();

        if (! $profile) {
            return response()->json([
                'message' => 'Faculty profile not found for this user.',
            ], 404);
        }

        $request->validate([
            'cv' => ['required', 'file', 'mimes:pdf,doc,docx', 'max:10240'],
        ]);

        // Delete old CV if exists
        if ($profile->cv_file_path && Storage::disk('public')->exists($profile->cv_file_path)) {
            Storage::disk('public')->delete($profile->cv_file_path);
        }

        $path = $request->file('cv')->store('cvs', 'public');

        $profile->update(['cv_file_path' => $path]);

        return response()->json([
            'message' => 'CV uploaded successfully.',
            'data' => [
                'cv_file_path' => $path,
            ],
        ]);
    }
}
