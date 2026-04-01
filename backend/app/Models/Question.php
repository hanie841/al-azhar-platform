<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Translatable\HasTranslations;

class Question extends Model
{
    use HasFactory, HasTranslations, SoftDeletes;

    protected $fillable = [
        'question_bank_id',
        'question_category_id',
        'question_type',
        'difficulty',
        'content',
        'options',
        'correct_answer',
        'explanation',
        'points',
        'time_limit_seconds',
        'tags',
        'learning_outcome',
        'created_by',
        'is_active',
    ];

    public array $translatable = [
        'content',
        'explanation',
    ];

    protected function casts(): array
    {
        return [
            'options' => 'array',
            'correct_answer' => 'array',
            'tags' => 'array',
            'points' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }

    public function questionBank()
    {
        return $this->belongsTo(QuestionBank::class);
    }

    public function category()
    {
        return $this->belongsTo(QuestionCategory::class, 'question_category_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function examQuestions()
    {
        return $this->hasMany(ExamQuestion::class);
    }

    public function isObjective(): bool
    {
        return in_array($this->question_type, ['mcq', 'true_false', 'fill_blank', 'matching']);
    }

    public function isSubjective(): bool
    {
        return in_array($this->question_type, ['essay', 'short_answer']);
    }
}
