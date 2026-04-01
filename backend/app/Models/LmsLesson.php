<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class LmsLesson extends Model
{
    use HasFactory, HasTranslations;

    protected $fillable = [
        'lms_module_id',
        'title',
        'content_type',
        'content',
        'file_path',
        'video_url',
        'external_url',
        'duration_minutes',
        'order',
        'is_published',
        'is_downloadable',
    ];

    public array $translatable = [
        'title',
        'content',
    ];

    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
            'is_downloadable' => 'boolean',
        ];
    }

    public function module()
    {
        return $this->belongsTo(LmsModule::class, 'lms_module_id');
    }

    public function progresses()
    {
        return $this->hasMany(LessonProgress::class);
    }
}
