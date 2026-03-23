<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ResearchPublicationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->getTranslation('title', $locale, false),
            'abstract' => $this->getTranslation('abstract', $locale, false),
            'authors' => $this->authors,
            'journal_name' => $this->getTranslation('journal_name', $locale, false),
            'publication_date' => $this->publication_date?->toDateString(),
            'doi' => $this->doi,
            'citation_count' => $this->citation_count,
            'research_area' => $this->research_area,
            'publication_type' => $this->publication_type,
            'pdf_url' => $this->pdf_url,
            'external_url' => $this->external_url,
            'is_featured' => $this->is_featured,
            'faculty' => new FacultyResource($this->whenLoaded('faculty')),
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
