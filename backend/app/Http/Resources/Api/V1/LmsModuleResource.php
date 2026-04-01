<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LmsModuleResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();

        return [
            'id' => $this->id,
            'lms_course_id' => $this->lms_course_id,
            'title' => $this->getTranslation('title', $locale, false),
            'description' => $this->getTranslation('description', $locale, false),
            'order' => $this->order,
            'is_published' => $this->is_published,
            'unlock_at' => $this->unlock_at?->toISOString(),
            'lessons_count' => $this->whenCounted('lessons'),
            'lessons' => LmsLessonResource::collection($this->whenLoaded('lessons')),
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
