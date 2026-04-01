<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommitteeMembershipResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();

        return [
            'id' => $this->id,
            'faculty_profile_id' => $this->faculty_profile_id,
            'committee_name' => $this->getTranslation('committee_name', $locale, false),
            'role' => $this->role,
            'description' => $this->getTranslation('description', $locale, false),
            'start_date' => $this->start_date?->toDateString(),
            'end_date' => $this->end_date?->toDateString(),
            'is_active' => $this->is_active,
            'faculty_profile' => new FacultyProfileResource($this->whenLoaded('facultyProfile')),
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
