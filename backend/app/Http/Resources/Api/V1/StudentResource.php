<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();

        return [
            'id' => $this->id,
            'student_id_number' => $this->student_id_number,
            'name' => $this->getTranslation('name', $locale, false),
            'email' => $this->whenLoaded('user', fn () => $this->user->email),
            'date_of_birth' => $this->date_of_birth?->toDateString(),
            'gender' => $this->gender,
            'nationality' => $this->nationality,
            'phone' => $this->phone,
            'photo' => $this->photo,
            'faculty' => new FacultyResource($this->whenLoaded('faculty')),
            'department' => new DepartmentResource($this->whenLoaded('department')),
            'academic_program' => new AcademicProgramResource($this->whenLoaded('academicProgram')),
            'academic_level' => $this->academic_level,
            'enrollment_date' => $this->enrollment_date?->toDateString(),
            'expected_graduation' => $this->expected_graduation?->toDateString(),
            'academic_status' => $this->academic_status,
            'cgpa' => $this->cgpa,
            'total_credit_hours' => $this->total_credit_hours,
            'total_earned_hours' => $this->total_earned_hours,
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
