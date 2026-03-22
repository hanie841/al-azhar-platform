<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\Translatable\HasTranslations;

class AcademicProgram extends Model
{
    use HasFactory, HasSlug, HasTranslations, SoftDeletes;

    protected $fillable = [
        'slug',
        'name',
        'description',
        'degree_level',
        'duration',
        'credit_hours',
        'requirements',
        'career_prospects',
        'faculty_id',
        'department_id',
        'order',
        'is_published',
    ];

    public array $translatable = [
        'name',
        'description',
        'requirements',
        'career_prospects',
    ];

    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
            'credit_hours' => 'integer',
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

    public function faculty()
    {
        return $this->belongsTo(Faculty::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}
