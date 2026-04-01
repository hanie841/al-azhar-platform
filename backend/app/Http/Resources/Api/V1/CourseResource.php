<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();

        return [
            'id' => $this->id,
            'code' => $this->code,
            'slug' => $this->slug,
            'name' => $this->getTranslation('name', $locale, false),
            'description' => $this->getTranslation('description', $locale, false),
            'faculty' => new FacultyResource($this->whenLoaded('faculty')),
            'department' => new DepartmentResource($this->whenLoaded('department')),
            'credit_hours' => $this->credit_hours,
            'lecture_hours' => $this->lecture_hours,
            'lab_hours' => $this->lab_hours,
            'course_type' => $this->course_type,
            'academic_level' => $this->academic_level,
            'is_active' => $this->is_active,
            'prerequisites' => CourseResource::collection($this->whenLoaded('prerequisites')),
            'sections' => CourseSectionResource::collection($this->whenLoaded('sections')),
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
