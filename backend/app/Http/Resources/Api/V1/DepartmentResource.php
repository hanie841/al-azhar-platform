<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DepartmentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $locale = $request->query('lang', $request->header('Accept-Language', 'ar'));

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => $this->getTranslation('name', $locale, false),
            'description' => $this->getTranslation('description', $locale, false),
            'faculty' => new FacultyResource($this->whenLoaded('faculty')),
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
