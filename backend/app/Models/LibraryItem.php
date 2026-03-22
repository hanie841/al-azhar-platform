<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Scout\Searchable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\Translatable\HasTranslations;

class LibraryItem extends Model implements HasMedia
{
    use HasFactory, HasSlug, HasTranslations, InteractsWithMedia, Searchable, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'subtitle',
        'description',
        'abstract',
        'type',
        'authors',
        'subjects',
        'publisher',
        'publication_year',
        'isbn',
        'language',
        'cover_image',
        'file_path',
        'manuscript_images',
        'faculty_id',
        'department_id',
        'is_published',
    ];

    public array $translatable = [
        'title',
        'subtitle',
        'description',
        'abstract',
    ];

    protected function casts(): array
    {
        return [
            'authors' => 'array',
            'subjects' => 'array',
            'manuscript_images' => 'array',
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
            $array["description_{$locale}"] = $this->getTranslation('description', $locale, false);
            $array["abstract_{$locale}"] = $this->getTranslation('abstract', $locale, false);
        }

        $array['authors'] = is_array($this->authors) ? implode(' ', $this->authors) : $this->authors;
        $array['isbn'] = $this->isbn ?? '';

        return $array;
    }

    public function faculty()
    {
        return $this->belongsTo(Faculty::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function collections()
    {
        return $this->belongsToMany(LibraryCollection::class, 'library_collection_items', 'library_item_id', 'collection_id')
            ->withPivot('order')
            ->withTimestamps();
    }

    public function bookmarks()
    {
        return $this->hasMany(LibraryBookmark::class);
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('pdf')
            ->singleFile()
            ->acceptsMimeTypes(['application/pdf']);

        $this->addMediaCollection('cover_image')
            ->singleFile()
            ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/webp']);
    }
}
