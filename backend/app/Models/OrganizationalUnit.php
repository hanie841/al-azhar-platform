<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\Translatable\HasTranslations;

class OrganizationalUnit extends Model
{
    use HasFactory, HasSlug, HasTranslations, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'parent_id',
        'head_id',
        'order',
        'type',
        'is_published',
    ];

    public array $translatable = [
        'name',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
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

    public function parent()
    {
        return $this->belongsTo(OrganizationalUnit::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(OrganizationalUnit::class, 'parent_id');
    }

    public function head()
    {
        return $this->belongsTo(Person::class, 'head_id');
    }
}
