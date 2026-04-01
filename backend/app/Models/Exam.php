<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\Translatable\HasTranslations;

class Exam extends Model
{
    use HasFactory, HasSlug, HasTranslations, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'course_section_id',
        'lms_course_id',
        'exam_type',
        'creation_method',
        'total_marks',
        'pass_marks',
        'duration_minutes',
        'max_attempts',
        'shuffle_questions',
        'shuffle_options',
        'show_results',
        'results_available_at',
        'starts_at',
        'ends_at',
        'instructions',
        'is_proctored',
        'allow_backtrack',
        'is_published',
        'created_by',
    ];

    public array $translatable = [
        'title',
        'description',
        'instructions',
    ];

    protected function casts(): array
    {
        return [
            'total_marks' => 'decimal:2',
            'pass_marks' => 'decimal:2',
            'shuffle_questions' => 'boolean',
            'shuffle_options' => 'boolean',
            'is_proctored' => 'boolean',
            'allow_backtrack' => 'boolean',
            'is_published' => 'boolean',
            'results_available_at' => 'datetime',
            'starts_at' => 'datetime',
            'ends_at' => 'datetime',
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

    public function courseSection()
    {
        return $this->belongsTo(CourseSection::class);
    }

    public function lmsCourse()
    {
        return $this->belongsTo(LmsCourse::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function examQuestions()
    {
        return $this->hasMany(ExamQuestion::class)->orderBy('order');
    }

    public function questions()
    {
        return $this->belongsToMany(Question::class, 'exam_questions')
            ->withPivot(['order', 'points_override', 'is_required'])
            ->withTimestamps()
            ->orderByPivot('order');
    }

    public function attempts()
    {
        return $this->hasMany(ExamAttempt::class);
    }

    public function randomizationRules()
    {
        return $this->hasMany(ExamRandomizationRule::class);
    }

    public function isActive(): bool
    {
        if (! $this->is_published) {
            return false;
        }

        $now = now();

        if ($this->starts_at && $now->lt($this->starts_at)) {
            return false;
        }

        if ($this->ends_at && $now->gt($this->ends_at)) {
            return false;
        }

        return true;
    }

    public function totalQuestions(): int
    {
        return $this->examQuestions()->count();
    }
}
