<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Scout\Searchable;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\Translatable\HasTranslations;

class NewsArticle extends Model
{
    use HasFactory, HasSlug, HasTranslations, Searchable, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'featured_image',
        'category_id',
        'author_id',
        'is_published',
        'published_at',
    ];

    public array $translatable = [
        'title',
        'excerpt',
        'content',
    ];

    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
            'published_at' => 'datetime',
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

    public function toSearchableArray(): array
    {
        $array = [];

        foreach (['ar', 'en'] as $locale) {
            $array["title_{$locale}"] = $this->getTranslation('title', $locale, false);
            $array["excerpt_{$locale}"] = $this->getTranslation('excerpt', $locale, false);
            $array["content_{$locale}"] = $this->getTranslation('content', $locale, false);
        }

        return $array;
    }

    public function category()
    {
        return $this->belongsTo(NewsCategory::class, 'category_id');
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}
