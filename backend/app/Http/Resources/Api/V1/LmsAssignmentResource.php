<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LmsAssignmentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();

        return [
            'id' => $this->id,
            'lms_course_id' => $this->lms_course_id,
            'title' => $this->getTranslation('title', $locale, false),
            'description' => $this->getTranslation('description', $locale, false),
            'assignment_type' => $this->assignment_type,
            'max_score' => $this->max_score,
            'weight_percentage' => $this->weight_percentage,
            'due_date' => $this->due_date?->toISOString(),
            'allow_late' => $this->allow_late,
            'late_penalty_percent' => $this->late_penalty_percent,
            'max_attempts' => $this->max_attempts,
            'is_published' => $this->is_published,
            'submissions_count' => $this->whenCounted('submissions'),
            'submissions' => AssignmentSubmissionResource::collection($this->whenLoaded('submissions')),
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
