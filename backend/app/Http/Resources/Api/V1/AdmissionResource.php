<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdmissionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();

        return [
            'id' => $this->id,
            'application_number' => $this->application_number,
            'name' => $this->getTranslation('name', $locale, false),
            'email' => $this->email,
            'phone' => $this->phone,
            'national_id' => $this->national_id,
            'date_of_birth' => $this->date_of_birth?->toDateString(),
            'gender' => $this->gender,
            'nationality' => $this->nationality,
            'address' => $this->address,
            'faculty' => new FacultyResource($this->whenLoaded('faculty')),
            'department' => new DepartmentResource($this->whenLoaded('department')),
            'academic_program' => new AcademicProgramResource($this->whenLoaded('academicProgram')),
            'academic_year' => new AcademicYearResource($this->whenLoaded('academicYear')),
            'degree_level' => $this->degree_level,
            'high_school_score' => $this->high_school_score,
            'previous_degree' => $this->previous_degree,
            'previous_university' => $this->previous_university,
            'previous_gpa' => $this->previous_gpa,
            'status' => $this->status,
            'rejection_reason' => $this->rejection_reason,
            'notes' => $this->notes,
            'submitted_at' => $this->submitted_at?->toISOString(),
            'reviewed_at' => $this->reviewed_at?->toISOString(),
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
