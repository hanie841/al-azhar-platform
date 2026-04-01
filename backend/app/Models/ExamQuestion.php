<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamQuestion extends Model
{
    use HasFactory;

    protected $fillable = [
        'exam_id',
        'question_id',
        'order',
        'points_override',
        'is_required',
    ];

    protected function casts(): array
    {
        return [
            'points_override' => 'decimal:2',
            'is_required' => 'boolean',
        ];
    }

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function answers()
    {
        return $this->hasMany(ExamAnswer::class);
    }

    public function getEffectivePoints(): float
    {
        return $this->points_override ?? $this->question->points;
    }
}
