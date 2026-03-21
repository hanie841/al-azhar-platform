<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PersonResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $locale = $request->query('lang', $request->header('Accept-Language', 'ar'));

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => $this->getTranslation('name', $locale, false),
            'title' => $this->getTranslation('title', $locale, false),
            'bio' => $this->getTranslation('bio', $locale, false),
            'photo' => $this->photo,
            'era' => $this->era,
            'is_historical' => $this->is_historical,
            'is_current_leadership' => $this->is_current_leadership,
            'order' => $this->order,
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
