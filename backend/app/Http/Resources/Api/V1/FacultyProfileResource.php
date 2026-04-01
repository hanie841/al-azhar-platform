<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FacultyProfileResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();

        return [
            'id' => $this->id,
            'employee_id' => $this->employee_id,
            'academic_rank' => $this->academic_rank,
            'title' => $this->getTranslation('title', $locale, false),
            'specialization' => $this->getTranslation('specialization', $locale, false),
            'bio' => $this->getTranslation('bio', $locale, false),
            'phone' => $this->phone,
            'office_location' => $this->office_location,
            'office_hours' => $this->office_hours,
            'research_interests' => $this->research_interests,
            'qualifications' => $this->qualifications,
            'publications_count' => $this->publications_count,
            'cv_file_path' => $this->cv_file_path,
            'website_url' => $this->website_url,
            'google_scholar_url' => $this->google_scholar_url,
            'orcid' => $this->orcid,
            'scopus_id' => $this->scopus_id,
            'photo' => $this->photo,
            'is_active' => $this->is_active,
            'is_public' => $this->is_public,
            'joined_at' => $this->joined_at?->toDateString(),
            'user' => $this->when($this->relationLoaded('user'), function () use ($locale) {
                return [
                    'id' => $this->user->id,
                    'name' => $this->user->name,
                    'email' => $this->user->email,
                ];
            }),
            'faculty' => $this->when($this->relationLoaded('faculty'), function () use ($locale) {
                return $this->faculty ? [
                    'id' => $this->faculty->id,
                    'name' => $this->faculty->getTranslation('name', $locale, false),
                    'slug' => $this->faculty->slug,
                ] : null;
            }),
            'department' => $this->when($this->relationLoaded('department'), function () use ($locale) {
                return $this->department ? [
                    'id' => $this->department->id,
                    'name' => $this->department->getTranslation('name', $locale, false),
                    'slug' => $this->department->slug,
                ] : null;
            }),
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
