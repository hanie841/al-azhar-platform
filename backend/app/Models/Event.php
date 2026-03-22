<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Scout\Searchable;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\Translatable\HasTranslations;

class Event extends Model
{
    use HasFactory, HasSlug, HasTranslations, Searchable, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'location',
        'featured_image',
        'starts_at',
        'ends_at',
        'is_published',
    ];

    public array $translatable = [
        'title',
        'description',
        'location',
    ];

    protected function casts(): array
    {
        return [
            'starts_at' => 'datetime',
            'ends_at' => 'datetime',
            'is_published' => 'boolean',
        ];
    }

    public function toSearchableArray(): array
    {
        $array = [];

        foreach (['ar', 'en'] as $locale) {
            $array["title_{$locale}"] = $this->getTranslation('title', $locale, false);
            $array["description_{$locale}"] = $this->getTranslation('description', $locale, false);
            $array["location_{$locale}"] = $this->getTranslation('location', $locale, false);
        }

        return $array;
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
}
