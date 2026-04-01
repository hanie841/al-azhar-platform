<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LessonProgress extends Model
{
    use HasFactory;

    protected $fillable = [
        'lms_lesson_id',
        'student_id',
        'status',
        'progress_percentage',
        'last_position',
        'completed_at',
    ];

    public array $translatable = [];

    protected function casts(): array
    {
        return [
            'completed_at' => 'datetime',
        ];
    }

    public function lesson()
    {
        return $this->belongsTo(LmsLesson::class, 'lms_lesson_id');
    }
}
