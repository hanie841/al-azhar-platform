<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Scout\Searchable;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\Translatable\HasTranslations;

class Person extends Model
{
    use HasFactory, HasSlug, HasTranslations, Searchable, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'title',
        'bio',
        'photo',
        'era',
        'is_historical',
        'is_current_leadership',
        'order',
    ];

    public array $translatable = [
        'name',
        'title',
        'bio',
    ];

    protected function casts(): array
    {
        return [
            'is_historical' => 'boolean',
            'is_current_leadership' => 'boolean',
        ];
    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom(function ($model) {
                return $model->getTranslation('name', 'ar', false)
                    ?? $model->getTranslation('name', 'en', false)
                    ?? '';
            })
            ->saveSlugsTo('slug');
    }

    public function toSearchableArray(): array
    {
        $array = [];

        foreach (['ar', 'en'] as $locale) {
            $array["name_{$locale}"] = $this->getTranslation('name', $locale, false);
            $array["title_{$locale}"] = $this->getTranslation('title', $locale, false);
            $array["bio_{$locale}"] = $this->getTranslation('bio', $locale, false);
        }

        return $array;
    }

    public function scopeHistorical(Builder $query): Builder
    {
        return $query->where('is_historical', true);
    }

    public function scopeCurrentLeadership(Builder $query): Builder
    {
        return $query->where('is_current_leadership', true);
    }

    public function scopeByEra(Builder $query, string $era): Builder
    {
        return $query->where('era', $era);
    }
}
