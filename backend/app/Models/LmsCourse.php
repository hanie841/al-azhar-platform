<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\Translatable\HasTranslations;

class LmsCourse extends Model
{
    use HasFactory, HasSlug, HasTranslations, SoftDeletes;

    protected $fillable = [
        'course_section_id',
        'title',
        'slug',
        'description',
        'cover_image',
        'is_published',
        'published_at',
        'created_by',
    ];

    public array $translatable = [
        'title',
        'description',
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

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function modules()
    {
        return $this->hasMany(LmsModule::class)->orderBy('order');
    }

    public function assignments()
    {
        return $this->hasMany(LmsAssignment::class);
    }

    public function announcements()
    {
        return $this->hasMany(LmsAnnouncement::class);
    }

    public function forums()
    {
        return $this->hasMany(DiscussionForum::class)->orderBy('order');
    }

    public function certificates()
    {
        return $this->hasMany(DigitalCertificate::class);
    }
}
