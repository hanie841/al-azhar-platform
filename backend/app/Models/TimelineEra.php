<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\Translatable\HasTranslations;

class TimelineEra extends Model
{
    use HasFactory, HasSlug, HasTranslations;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'start_year',
        'end_year',
        'order',
    ];

    public array $translatable = [
        'name',
        'description',
    ];

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

    public function events()
    {
        return $this->hasMany(TimelineEvent::class, 'era_id');
    }
}
