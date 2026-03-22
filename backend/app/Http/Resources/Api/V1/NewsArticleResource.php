<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NewsArticleResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->getTranslation('title', $locale, false),
            'excerpt' => $this->getTranslation('excerpt', $locale, false),
            'content' => $this->getTranslation('content', $locale, false),
            'featured_image' => $this->featured_image,
            'category' => new NewsCategoryResource($this->whenLoaded('category')),
            'views_count' => $this->views_count ?? 0,
            'published_at' => $this->published_at?->toISOString(),
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
