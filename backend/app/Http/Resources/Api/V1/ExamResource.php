<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExamResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->getTranslation('title', $locale, false),
            'description' => $this->getTranslation('description', $locale, false),
            'course_section_id' => $this->course_section_id,
            'lms_course_id' => $this->lms_course_id,
            'exam_type' => $this->exam_type,
            'creation_method' => $this->creation_method,
            'total_marks' => (float) $this->total_marks,
            'pass_marks' => $this->pass_marks ? (float) $this->pass_marks : null,
            'duration_minutes' => $this->duration_minutes,
            'max_attempts' => $this->max_attempts,
            'shuffle_questions' => $this->shuffle_questions,
            'shuffle_options' => $this->shuffle_options,
            'show_results' => $this->show_results,
            'results_available_at' => $this->results_available_at?->toISOString(),
            'starts_at' => $this->starts_at?->toISOString(),
            'ends_at' => $this->ends_at?->toISOString(),
            'instructions' => $this->getTranslation('instructions', $locale, false),
            'is_proctored' => $this->is_proctored,
            'allow_backtrack' => $this->allow_backtrack,
            'is_published' => $this->is_published,
            'is_active' => $this->isActive(),
            'total_questions' => $this->whenCounted('examQuestions', $this->totalQuestions()),
            'created_by' => $this->created_by,
            'exam_questions' => ExamQuestionResource::collection($this->whenLoaded('examQuestions')),
            'randomization_rules' => $this->whenLoaded('randomizationRules'),
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }
}
