<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class DiscussionForum extends Model
{
    use HasFactory, HasTranslations;

    protected $fillable = [
        'lms_course_id',
        'title',
        'description',
        'is_locked',
        'order',
    ];

    public array $translatable = [
        'title',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'is_locked' => 'boolean',
        ];
    }

    public function course()
    {
        return $this->belongsTo(LmsCourse::class, 'lms_course_id');
    }

    public function threads()
    {
        return $this->hasMany(DiscussionThread::class);
    }
}
