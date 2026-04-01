<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\StudentResource;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class StudentController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Student::query()->with(['faculty', 'department', 'academicProgram']);

        if ($request->filled('faculty_id')) {
            $query->where('faculty_id', $request->query('faculty_id'));
        }

        if ($request->filled('status')) {
            $query->where('academic_status', $request->query('status'));
        }

        if ($request->filled('level')) {
            $query->where('academic_level', $request->query('level'));
        }

        if ($request->filled('q')) {
            $search = $request->query('q');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('student_id_number', 'LIKE', "%{$search}%");
            });
        }

        $students = $query->orderBy('created_at', 'desc')->paginate(20);

        return StudentResource::collection($students);
    }

    public function show(int $id): StudentResource
    {
        $student = Student::with(['faculty', 'department', 'academicProgram', 'user'])
            ->findOrFail($id);

        return new StudentResource($student);
    }

    public function store(Request $request): StudentResource
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id|unique:students,user_id',
            'name' => 'required|array',
            'name.ar' => 'required|string',
            'name.en' => 'nullable|string',
            'national_id' => 'nullable|string',
            'date_of_birth' => 'nullable|date',
            'gender' => 'nullable|string|in:male,female',
            'nationality' => 'nullable|string',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
            'faculty_id' => 'nullable|exists:faculties,id',
            'department_id' => 'nullable|exists:departments,id',
            'academic_program_id' => 'nullable|exists:academic_programs,id',
            'academic_level' => 'nullable|string',
            'enrollment_date' => 'nullable|date',
            'expected_graduation' => 'nullable|date',
        ]);

        $student = Student::create($validated);

        return new StudentResource($student->load(['faculty', 'department', 'academicProgram']));
    }

    public function update(Request $request, int $id): StudentResource
    {
        $student = Student::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|array',
            'name.ar' => 'sometimes|string',
            'name.en' => 'nullable|string',
            'national_id' => 'nullable|string',
            'date_of_birth' => 'nullable|date',
            'gender' => 'nullable|string|in:male,female',
            'nationality' => 'nullable|string',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
            'faculty_id' => 'nullable|exists:faculties,id',
            'department_id' => 'nullable|exists:departments,id',
            'academic_program_id' => 'nullable|exists:academic_programs,id',
            'academic_level' => 'nullable|string',
            'academic_status' => 'nullable|string|in:active,suspended,graduated,withdrawn,dismissed',
            'enrollment_date' => 'nullable|date',
            'expected_graduation' => 'nullable|date',
        ]);

        $student->update($validated);

        return new StudentResource($student->load(['faculty', 'department', 'academicProgram']));
    }

    public function destroy(int $id)
    {
        $student = Student::findOrFail($id);
        $student->delete();

        return response()->json(['message' => 'Student deleted successfully.']);
    }
}
