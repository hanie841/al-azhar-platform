<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\Translatable\HasTranslations;

class LibraryItem extends Model
{
    use HasFactory, HasSlug, HasTranslations, SoftDeletes;

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
}
