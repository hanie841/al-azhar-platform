<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamAnswer extends Model
{
    use HasFactory;

    protected $fillable = [
        'exam_attempt_id',
        'exam_question_id',
        'question_id',
        'answer_content',
        'is_correct',
        'auto_score',
        'manual_score',
        'final_score',
        'feedback',
        'answered_at',
    ];

    protected function casts(): array
    {
        return [
            'answer_content' => 'array',
            'is_correct' => 'boolean',
            'auto_score' => 'decimal:2',
            'manual_score' => 'decimal:2',
            'final_score' => 'decimal:2',
            'answered_at' => 'datetime',
        ];
    }

    public function examAttempt()
    {
        return $this->belongsTo(ExamAttempt::class);
    }

    public function examQuestion()
    {
        return $this->belongsTo(ExamQuestion::class);
    }

    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}
