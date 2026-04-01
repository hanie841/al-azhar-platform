<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EnrollmentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'student' => new StudentResource($this->whenLoaded('student')),
            'course_section' => new CourseSectionResource($this->whenLoaded('courseSection')),
            'semester' => new SemesterResource($this->whenLoaded('semester')),
            'status' => $this->status,
            'enrolled_at' => $this->enrolled_at?->toISOString(),
            'dropped_at' => $this->dropped_at?->toISOString(),
            'drop_reason' => $this->drop_reason,
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
