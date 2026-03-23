<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\Translatable\HasTranslations;

class ResearchPublication extends Model
{
    use HasFactory, HasSlug, HasTranslations, SoftDeletes;

    protected $fillable = [
        'slug',
        'title',
        'abstract',
        'authors',
        'journal_name',
        'publication_date',
        'doi',
        'citation_count',
        'research_area',
        'publication_type',
        'pdf_url',
        'external_url',
        'faculty_id',
        'is_featured',
        'is_published',
    ];

    public array $translatable = [
        'title',
        'abstract',
        'journal_name',
    ];

    protected function casts(): array
    {
        return [
            'authors' => 'array',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
            'publication_date' => 'date',
            'citation_count' => 'integer',
        ];
    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom(function ($model) {
                return $model->getTranslation('title', 'ar', false)
                    ?? $model->getTranslation('title', 'en', false)
                    ?? '';
            })
            ->saveSlugsTo('slug');
    }

    public function faculty()
    {
        return $this->belongsTo(Faculty::class);
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }

    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('is_featured', true);
    }

    public function scopeByArea(Builder $query, string $area): Builder
    {
        return $query->where('research_area', $area);
    }

    public function scopeByType(Builder $query, string $type): Builder
    {
        return $query->where('publication_type', $type);
    }
}
