<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AcademicProgramResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => $this->getTranslation('name', $locale, false),
            'description' => $this->getTranslation('description', $locale, false),
            'degree_level' => $this->degree_level,
            'duration' => $this->duration,
            'credit_hours' => $this->credit_hours,
            'requirements' => $this->getTranslation('requirements', $locale, false),
            'career_prospects' => $this->getTranslation('career_prospects', $locale, false),
            'faculty' => new FacultyResource($this->whenLoaded('faculty')),
            'department' => new DepartmentResource($this->whenLoaded('department')),
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
