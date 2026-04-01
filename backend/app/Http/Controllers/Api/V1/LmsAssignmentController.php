<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\AssignmentSubmissionResource;
use App\Http\Resources\Api\V1\LmsAssignmentResource;
use App\Models\AssignmentSubmission;
use App\Models\LmsAssignment;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class LmsAssignmentController extends Controller
{
    public function index(Request $request, int $courseId): AnonymousResourceCollection
    {
        $query = LmsAssignment::where('lms_course_id', $courseId)
            ->withCount('submissions');

        if ($request->filled('type')) {
            $query->where('assignment_type', $request->query('type'));
        }

        $assignments = $query->latest()->get();

        return LmsAssignmentResource::collection($assignments);
    }

    public function show(int $id): LmsAssignmentResource
    {
        $assignment = LmsAssignment::with('submissions')
            ->withCount('submissions')
            ->findOrFail($id);

        return new LmsAssignmentResource($assignment);
    }

    public function store(Request $request): LmsAssignmentResource
    {
        $validated = $request->validate([
            'lms_course_id' => ['required', 'exists:lms_courses,id'],
            'title' => ['required', 'array'],
            'title.ar' => ['required', 'string', 'max:255'],
            'title.en' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'array'],
            'description.ar' => ['nullable', 'string'],
            'description.en' => ['nullable', 'string'],
            'assignment_type' => ['required', 'string', 'in:essay,file_upload,quiz,project,presentation,code'],
            'max_score' => ['numeric', 'min:0', 'max:999.99'],
            'weight_percentage' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'due_date' => ['nullable', 'date'],
            'allow_late' => ['boolean'],
            'late_penalty_percent' => ['numeric', 'min:0', 'max:100'],
            'max_attempts' => ['integer', 'min:1'],
            'is_published' => ['boolean'],
        ]);

        $assignment = LmsAssignment::create($validated);

        return new LmsAssignmentResource($assignment);
    }

    public function update(Request $request, int $id): LmsAssignmentResource
    {
        $assignment = LmsAssignment::findOrFail($id);

        $validated = $request->validate([
            'title' => ['sometimes', 'array'],
            'title.ar' => ['sometimes', 'string', 'max:255'],
            'title.en' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'array'],
            'description.ar' => ['nullable', 'string'],
            'description.en' => ['nullable', 'string'],
            'assignment_type' => ['sometimes', 'string', 'in:essay,file_upload,quiz,project,presentation,code'],
            'max_score' => ['numeric', 'min:0', 'max:999.99'],
            'weight_percentage' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'due_date' => ['nullable', 'date'],
            'allow_late' => ['boolean'],
            'late_penalty_percent' => ['numeric', 'min:0', 'max:100'],
            'max_attempts' => ['integer', 'min:1'],
            'is_published' => ['boolean'],
        ]);

        $assignment->update($validated);

        return new LmsAssignmentResource($assignment->fresh());
    }

    public function submit(Request $request, int $id): AssignmentSubmissionResource
    {
        $assignment = LmsAssignment::findOrFail($id);

        $validated = $request->validate([
            'student_id' => ['required', 'integer'],
            'content' => ['nullable', 'string'],
            'file_path' => ['nullable', 'string', 'max:500'],
            'link_url' => ['nullable', 'url', 'max:500'],
        ]);

        $existingCount = AssignmentSubmission::where('lms_assignment_id', $assignment->id)
            ->where('student_id', $validated['student_id'])
            ->count();

        if ($existingCount >= $assignment->max_attempts) {
            abort(422, 'Maximum number of attempts reached.');
        }

        $isLate = $assignment->due_date && now()->isAfter($assignment->due_date);

        if ($isLate && ! $assignment->allow_late) {
            abort(422, 'This assignment no longer accepts submissions.');
        }

        $submission = AssignmentSubmission::create([
            'lms_assignment_id' => $assignment->id,
            'student_id' => $validated['student_id'],
            'content' => $validated['content'] ?? null,
            'file_path' => $validated['file_path'] ?? null,
            'link_url' => $validated['link_url'] ?? null,
            'attempt_number' => $existingCount + 1,
            'status' => 'submitted',
            'submitted_at' => now(),
            'is_late' => $isLate,
        ]);

        return new AssignmentSubmissionResource($submission);
    }

    public function grade(Request $request, int $id, int $submissionId): AssignmentSubmissionResource
    {
        $assignment = LmsAssignment::findOrFail($id);
        $submission = AssignmentSubmission::where('lms_assignment_id', $assignment->id)
            ->findOrFail($submissionId);

        $validated = $request->validate([
            'score' => ['required', 'numeric', 'min:0', 'max:' . $assignment->max_score],
            'feedback' => ['nullable', 'string'],
        ]);

        $finalScore = $validated['score'];

        if ($submission->is_late && $assignment->late_penalty_percent > 0) {
            $penalty = $finalScore * ($assignment->late_penalty_percent / 100);
            $finalScore = max(0, $finalScore - $penalty);
        }

        $submission->update([
            'score' => $finalScore,
            'feedback' => $validated['feedback'] ?? null,
            'status' => 'graded',
            'graded_by' => $request->user()->id,
            'graded_at' => now(),
        ]);

        return new AssignmentSubmissionResource($submission->fresh());
    }
}
