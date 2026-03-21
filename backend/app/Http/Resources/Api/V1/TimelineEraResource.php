<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TimelineEraResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $locale = $request->query('lang', $request->header('Accept-Language', 'ar'));

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => $this->getTranslation('name', $locale, false),
            'description' => $this->getTranslation('description', $locale, false),
            'start_year' => $this->start_year,
            'end_year' => $this->end_year,
            'order' => $this->order,
            'events' => TimelineEventResource::collection($this->whenLoaded('events')),
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
