<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrganizationalUnitResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'type' => $this->type,
            'name' => $this->getTranslation('name', $locale, false),
            'description' => $this->getTranslation('description', $locale, false),
            'order' => $this->order,
            'head' => new PersonResource($this->whenLoaded('head')),
            'children' => OrganizationalUnitResource::collection($this->whenLoaded('children')),
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
