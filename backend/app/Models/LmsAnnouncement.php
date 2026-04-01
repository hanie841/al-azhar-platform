<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class LmsAnnouncement extends Model
{
    use HasFactory, HasTranslations;

    protected $fillable = [
        'lms_course_id',
        'title',
        'content',
        'is_pinned',
        'published_by',
        'published_at',
    ];

    public array $translatable = [
        'title',
        'content',
    ];

    protected function casts(): array
    {
        return [
            'is_pinned' => 'boolean',
            'published_at' => 'datetime',
        ];
    }

    public function course()
    {
        return $this->belongsTo(LmsCourse::class, 'lms_course_id');
    }

    public function publisher()
    {
        return $this->belongsTo(User::class, 'published_by');
    }
}
