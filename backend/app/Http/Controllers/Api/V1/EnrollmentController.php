<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\EnrollmentResource;
use App\Models\CourseSection;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class EnrollmentController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Enrollment::query()->with(['student', 'courseSection.course', 'semester']);

        if ($request->filled('student_id')) {
            $query->where('student_id', $request->query('student_id'));
        }

        if ($request->filled('semester_id')) {
            $query->where('semester_id', $request->query('semester_id'));
        }

        if ($request->filled('status')) {
            $query->where('status', $request->query('status'));
        }

        $enrollments = $query->orderBy('enrolled_at', 'desc')->paginate(20);

        return EnrollmentResource::collection($enrollments);
    }

    public function store(Request $request): EnrollmentResource
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'course_section_id' => 'required|exists:course_sections,id',
            'semester_id' => 'required|exists:semesters,id',
        ]);

        $section = CourseSection::findOrFail($validated['course_section_id']);

        if ($section->enrolled_count >= $section->capacity) {
            abort(422, 'This section is full.');
        }

        $exists = Enrollment::where('student_id', $validated['student_id'])
            ->where('course_section_id', $validated['course_section_id'])
            ->exists();

        if ($exists) {
            abort(422, 'Student is already enrolled in this section.');
        }

        $validated['enrolled_at'] = now();
        $validated['status'] = 'enrolled';

        $enrollment = Enrollment::create($validated);

        $section->increment('enrolled_count');

        return new EnrollmentResource($enrollment->load(['student', 'courseSection.course', 'semester']));
    }

    public function destroy(Request $request, int $id)
    {
        $enrollment = Enrollment::findOrFail($id);

        if ($enrollment->status === 'dropped') {
            abort(422, 'Enrollment is already dropped.');
        }

        $enrollment->update([
            'status' => 'dropped',
            'dropped_at' => now(),
            'drop_reason' => $request->input('drop_reason'),
        ]);

        $enrollment->courseSection->decrement('enrolled_count');

        return response()->json(['message' => 'Enrollment dropped successfully.']);
    }
}
