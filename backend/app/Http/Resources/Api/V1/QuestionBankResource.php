<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class QuestionBankResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => $this->getTranslation('name', $locale, false),
            'description' => $this->getTranslation('description', $locale, false),
            'course_id' => $this->course_id,
            'faculty_id' => $this->faculty_id,
            'department_id' => $this->department_id,
            'is_shared' => $this->is_shared,
            'created_by' => $this->created_by,
            'questions_count' => $this->whenCounted('questions'),
            'categories' => QuestionCategoryResource::collection($this->whenLoaded('categories')),
            'questions' => QuestionResource::collection($this->whenLoaded('questions')),
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }
}
