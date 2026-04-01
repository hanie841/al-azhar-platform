<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LmsLessonResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();

        return [
            'id' => $this->id,
            'lms_module_id' => $this->lms_module_id,
            'title' => $this->getTranslation('title', $locale, false),
            'content_type' => $this->content_type,
            'content' => $this->getTranslation('content', $locale, false),
            'file_path' => $this->file_path,
            'video_url' => $this->video_url,
            'external_url' => $this->external_url,
            'duration_minutes' => $this->duration_minutes,
            'order' => $this->order,
            'is_published' => $this->is_published,
            'is_downloadable' => $this->is_downloadable,
            'progress' => $this->whenLoaded('progresses', fn () => $this->progresses->first()),
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
