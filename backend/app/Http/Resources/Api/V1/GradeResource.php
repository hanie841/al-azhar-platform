<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GradeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'student' => new StudentResource($this->whenLoaded('student')),
            'course_section' => new CourseSectionResource($this->whenLoaded('courseSection')),
            'semester' => new SemesterResource($this->whenLoaded('semester')),
            'midterm_score' => $this->midterm_score,
            'final_score' => $this->final_score,
            'coursework_score' => $this->coursework_score,
            'practical_score' => $this->practical_score,
            'total_score' => $this->total_score,
            'letter_grade' => $this->letter_grade,
            'grade_points' => $this->grade_points,
            'credit_hours' => $this->credit_hours,
            'is_pass' => $this->is_pass,
            'is_published' => $this->is_published,
            'graded_at' => $this->graded_at?->toISOString(),
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
