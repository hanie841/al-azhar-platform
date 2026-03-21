<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\Translatable\HasTranslations;

class Faculty extends Model
{
    use HasFactory, HasSlug, HasTranslations, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'dean_message',
        'featured_image',
        'is_active',
    ];

    public array $translatable = [
        'name',
        'description',
        'dean_message',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
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

    public function departments()
    {
        return $this->hasMany(Department::class);
    }

    public function libraryItems()
    {
        return $this->hasMany(LibraryItem::class);
    }
}
