<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LmsCourseResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();

        return [
            'id' => $this->id,
            'course_section_id' => $this->course_section_id,
            'slug' => $this->slug,
            'title' => $this->getTranslation('title', $locale, false),
            'description' => $this->getTranslation('description', $locale, false),
            'cover_image' => $this->cover_image,
            'is_published' => $this->is_published,
            'published_at' => $this->published_at?->toISOString(),
            'created_by' => $this->created_by,
            'creator' => $this->whenLoaded('creator', fn () => [
                'id' => $this->creator->id,
                'name' => $this->creator->name,
            ]),
            'modules_count' => $this->whenCounted('modules'),
            'assignments_count' => $this->whenCounted('assignments'),
            'modules' => LmsModuleResource::collection($this->whenLoaded('modules')),
            'assignments' => LmsAssignmentResource::collection($this->whenLoaded('assignments')),
            'announcements' => $this->whenLoaded('announcements'),
            'forums' => $this->whenLoaded('forums'),
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
