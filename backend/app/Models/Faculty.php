<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Scout\Searchable;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\Translatable\HasTranslations;

class Faculty extends Model
{
    use HasFactory, HasSlug, HasTranslations, Searchable, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'type',
        'category',
        'description',
        'dean_message',
        'featured_image',
        'is_active',
        'is_published',
        'established_year',
        'order',
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

    public function toSearchableArray(): array
    {
        $array = [];

        foreach (['ar', 'en'] as $locale) {
            $array["name_{$locale}"] = $this->getTranslation('name', $locale, false);
            $array["description_{$locale}"] = $this->getTranslation('description', $locale, false);
        }

        return $array;
    }

    public function departments()
    {
        return $this->hasMany(Department::class);
    }

    public function academicPrograms()
    {
        return $this->hasMany(AcademicProgram::class);
    }

    public function libraryItems()
    {
        return $this->hasMany(LibraryItem::class);
    }
}
