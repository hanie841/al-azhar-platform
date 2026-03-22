<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'template' => $this->template,
            'title' => $this->getTranslation('title', $locale, false),
            'content' => $this->getTranslation('content', $locale, false),
            'meta_title' => $this->getTranslation('meta_title', $locale, false),
            'meta_description' => $this->getTranslation('meta_description', $locale, false),
            'featured_image' => $this->featured_image,
            'order' => $this->order,
            'parent' => new PageResource($this->whenLoaded('parent')),
            'children' => PageResource::collection($this->whenLoaded('children')),
            'published_at' => $this->published_at?->toISOString(),
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
