<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Translatable\HasTranslations;

class LmsAssignment extends Model
{
    use HasFactory, HasTranslations, SoftDeletes;

    protected $fillable = [
        'lms_course_id',
        'title',
        'description',
        'assignment_type',
        'max_score',
        'weight_percentage',
        'due_date',
        'allow_late',
        'late_penalty_percent',
        'max_attempts',
        'is_published',
    ];

    public array $translatable = [
        'title',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'max_score' => 'decimal:2',
            'weight_percentage' => 'decimal:2',
            'late_penalty_percent' => 'decimal:2',
            'due_date' => 'datetime',
            'allow_late' => 'boolean',
            'is_published' => 'boolean',
        ];
    }

    public function course()
    {
        return $this->belongsTo(LmsCourse::class, 'lms_course_id');
    }

    public function submissions()
    {
        return $this->hasMany(AssignmentSubmission::class);
    }
}
