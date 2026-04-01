<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseSectionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'section_number' => $this->section_number,
            'course' => new CourseResource($this->whenLoaded('course')),
            'semester' => new SemesterResource($this->whenLoaded('semester')),
            'instructor_id' => $this->instructor_id,
            'room' => $this->room,
            'building' => $this->building,
            'capacity' => $this->capacity,
            'enrolled_count' => $this->enrolled_count,
            'schedule' => $this->schedule,
            'is_active' => $this->is_active,
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
