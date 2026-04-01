<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\AdmissionResource;
use App\Models\Admission;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class AdmissionController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Admission::query()->with(['faculty', 'department', 'academicYear']);

        if ($request->filled('status')) {
            $query->where('status', $request->query('status'));
        }

        if ($request->filled('faculty_id')) {
            $query->where('faculty_id', $request->query('faculty_id'));
        }

        if ($request->filled('academic_year_id')) {
            $query->where('academic_year_id', $request->query('academic_year_id'));
        }

        if ($request->filled('q')) {
            $search = $request->query('q');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('application_number', 'LIKE', "%{$search}%")
                    ->orWhere('email', 'LIKE', "%{$search}%");
            });
        }

        $admissions = $query->orderBy('created_at', 'desc')->paginate(20);

        return AdmissionResource::collection($admissions);
    }

    public function show(int $id): AdmissionResource
    {
        $admission = Admission::with(['faculty', 'department', 'academicProgram', 'academicYear', 'documents'])
            ->findOrFail($id);

        return new AdmissionResource($admission);
    }

    public function store(Request $request): AdmissionResource
    {
        $validated = $request->validate([
            'academic_year_id' => 'required|exists:academic_years,id',
            'name' => 'required|array',
            'name.ar' => 'required|string',
            'name.en' => 'nullable|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'national_id' => 'nullable|string',
            'date_of_birth' => 'nullable|date',
            'gender' => 'required|string|in:male,female',
            'nationality' => 'nullable|string',
            'address' => 'nullable|string',
            'faculty_id' => 'required|exists:faculties,id',
            'department_id' => 'nullable|exists:departments,id',
            'academic_program_id' => 'nullable|exists:academic_programs,id',
            'degree_level' => 'required|string|in:bachelor,master,phd,diploma',
            'high_school_score' => 'nullable|numeric|min:0|max:100',
            'previous_degree' => 'nullable|string',
            'previous_university' => 'nullable|string',
            'previous_gpa' => 'nullable|numeric|min:0|max:4',
        ]);

        $validated['user_id'] = $request->user()?->id;
        $validated['submitted_at'] = now();

        $admission = Admission::create($validated);

        return new AdmissionResource($admission->load(['faculty', 'department', 'academicYear']));
    }

    public function update(Request $request, int $id): AdmissionResource
    {
        $admission = Admission::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|string|in:pending,under_review,accepted,rejected,waitlisted',
            'rejection_reason' => 'nullable|required_if:status,rejected|string',
            'notes' => 'nullable|string',
        ]);

        $validated['reviewed_by'] = $request->user()->id;
        $validated['reviewed_at'] = now();

        $admission->update($validated);

        return new AdmissionResource($admission->load(['faculty', 'department', 'academicYear']));
    }
}
