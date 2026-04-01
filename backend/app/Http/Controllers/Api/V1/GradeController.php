<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\GradeResource;
use App\Models\Grade;
use App\Models\GpaSemesterRecord;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class GradeController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Grade::query()->with(['student', 'courseSection.course', 'semester']);

        if ($request->filled('student_id')) {
            $query->where('student_id', $request->query('student_id'));
        }

        if ($request->filled('semester_id')) {
            $query->where('semester_id', $request->query('semester_id'));
        }

        if ($request->boolean('published_only')) {
            $query->where('is_published', true);
        }

        $grades = $query->orderBy('created_at', 'desc')->paginate(20);

        return GradeResource::collection($grades);
    }

    public function store(Request $request): GradeResource
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'course_section_id' => 'required|exists:course_sections,id',
            'semester_id' => 'required|exists:semesters,id',
            'midterm_score' => 'nullable|numeric|min:0|max:100',
            'final_score' => 'nullable|numeric|min:0|max:100',
            'coursework_score' => 'nullable|numeric|min:0|max:100',
            'practical_score' => 'nullable|numeric|min:0|max:100',
            'total_score' => 'nullable|numeric|min:0|max:100',
            'letter_grade' => 'nullable|string',
            'grade_points' => 'nullable|numeric|min:0|max:4',
            'credit_hours' => 'required|integer|min:1',
            'is_pass' => 'nullable|boolean',
        ]);

        $validated['graded_by'] = $request->user()->id;
        $validated['graded_at'] = now();

        $grade = Grade::create($validated);

        return new GradeResource($grade->load(['student', 'courseSection.course', 'semester']));
    }

    public function update(Request $request, int $id): GradeResource
    {
        $grade = Grade::findOrFail($id);

        $validated = $request->validate([
            'midterm_score' => 'nullable|numeric|min:0|max:100',
            'final_score' => 'nullable|numeric|min:0|max:100',
            'coursework_score' => 'nullable|numeric|min:0|max:100',
            'practical_score' => 'nullable|numeric|min:0|max:100',
            'total_score' => 'nullable|numeric|min:0|max:100',
            'letter_grade' => 'nullable|string',
            'grade_points' => 'nullable|numeric|min:0|max:4',
            'is_pass' => 'nullable|boolean',
            'is_published' => 'nullable|boolean',
            'notes' => 'nullable|string',
        ]);

        $validated['graded_by'] = $request->user()->id;
        $validated['graded_at'] = now();

        $grade->update($validated);

        return new GradeResource($grade->load(['student', 'courseSection.course', 'semester']));
    }

    public function transcript(int $studentId)
    {
        $student = Student::with(['faculty', 'department', 'academicProgram'])->findOrFail($studentId);

        $grades = Grade::where('student_id', $studentId)
            ->where('is_published', true)
            ->with(['courseSection.course', 'semester.academicYear'])
            ->orderBy('semester_id')
            ->get();

        $semesterRecords = GpaSemesterRecord::where('student_id', $studentId)
            ->with('semester')
            ->orderBy('semester_id')
            ->get();

        $locale = app()->getLocale();

        return response()->json([
            'student' => [
                'id' => $student->id,
                'student_id_number' => $student->student_id_number,
                'name' => $student->getTranslation('name', $locale, false),
                'faculty' => $student->faculty?->getTranslation('name', $locale, false),
                'department' => $student->department?->getTranslation('name', $locale, false),
                'program' => $student->academicProgram?->getTranslation('name', $locale, false),
                'academic_status' => $student->academic_status,
                'cgpa' => $student->cgpa,
                'total_credit_hours' => $student->total_credit_hours,
                'total_earned_hours' => $student->total_earned_hours,
            ],
            'grades' => GradeResource::collection($grades),
            'semester_records' => $semesterRecords->map(fn ($r) => [
                'semester' => $r->semester?->getTranslation('name', $locale, false),
                'attempted_hours' => $r->attempted_hours,
                'earned_hours' => $r->earned_hours,
                'gpa' => $r->gpa,
                'cgpa' => $r->cgpa,
                'academic_standing' => $r->academic_standing,
            ]),
        ]);
    }
}
