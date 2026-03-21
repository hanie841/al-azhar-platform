<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LibraryItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $locale = $request->query('lang', $request->header('Accept-Language', 'ar'));

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->getTranslation('title', $locale, false),
            'subtitle' => $this->getTranslation('subtitle', $locale, false),
            'description' => $this->getTranslation('description', $locale, false),
            'abstract' => $this->getTranslation('abstract', $locale, false),
            'type' => $this->type,
            'authors' => $this->authors,
            'publisher' => $this->publisher,
            'publication_year' => $this->publication_year,
            'edition' => $this->edition,
            'isbn' => $this->isbn,
            'issn' => $this->issn,
            'doi' => $this->doi,
            'language' => $this->language,
            'subjects' => $this->subjects,
            'faculty' => new FacultyResource($this->whenLoaded('faculty')),
            'department' => new DepartmentResource($this->whenLoaded('department')),
            'era' => $this->era,
            'page_count' => $this->page_count,
            'access_level' => $this->access_level,
            'file_path' => $this->when(
                $this->access_level === 'free' || ($request->user() && $this->access_level === 'registered'),
                $this->file_path
            ),
            'cover_image' => $this->cover_image,
            'manuscript_images' => $this->manuscript_images,
            'views_count' => $this->views_count ?? 0,
            'downloads_count' => $this->downloads_count ?? 0,
            'published_at' => $this->published_at?->toISOString(),
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
