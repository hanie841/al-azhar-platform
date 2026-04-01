<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamRandomizationRule extends Model
{
    use HasFactory;

    protected $fillable = [
        'exam_id',
        'question_bank_id',
        'question_category_id',
        'question_type',
        'difficulty',
        'count',
        'points_per_question',
    ];

    protected function casts(): array
    {
        return [
            'points_per_question' => 'decimal:2',
        ];
    }

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }

    public function questionBank()
    {
        return $this->belongsTo(QuestionBank::class);
    }

    public function questionCategory()
    {
        return $this->belongsTo(QuestionCategory::class);
    }
}
