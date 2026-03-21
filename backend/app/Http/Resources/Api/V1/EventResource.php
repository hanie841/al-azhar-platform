<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $locale = $request->query('lang', $request->header('Accept-Language', 'ar'));

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->getTranslation('title', $locale, false),
            'description' => $this->getTranslation('description', $locale, false),
            'location' => $this->getTranslation('location', $locale, false),
            'featured_image' => $this->featured_image,
            'starts_at' => $this->starts_at?->toISOString(),
            'ends_at' => $this->ends_at?->toISOString(),
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
