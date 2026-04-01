<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class LmsModule extends Model
{
    use HasFactory, HasTranslations;

    protected $fillable = [
        'lms_course_id',
        'title',
        'description',
        'order',
        'is_published',
        'unlock_at',
    ];

    public array $translatable = [
        'title',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
            'unlock_at' => 'datetime',
        ];
    }

    public function course()
    {
        return $this->belongsTo(LmsCourse::class, 'lms_course_id');
    }

    public function lessons()
    {
        return $this->hasMany(LmsLesson::class)->orderBy('order');
    }
}
