<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\Translatable\HasTranslations;

class TimelineEvent extends Model
{
    use HasFactory, HasSlug, HasTranslations;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'era_id',
        'year',
        'image',
        'order',
    ];

    public array $translatable = [
        'title',
        'description',
    ];

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

    public function era()
    {
        return $this->belongsTo(TimelineEra::class, 'era_id');
    }
}
