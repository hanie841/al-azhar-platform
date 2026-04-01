<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\Translatable\HasTranslations;

class StudyPlan extends Model
{
    use HasFactory, HasSlug, HasTranslations, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'academic_program_id',
        'total_credit_hours',
        'total_semesters',
        'is_active',
        'approved_at',
    ];

    public array $translatable = [
        'name',
    ];

    protected function casts(): array
    {
        return [
            'total_credit_hours' => 'integer',
            'total_semesters' => 'integer',
            'is_active' => 'boolean',
            'approved_at' => 'date',
        ];
    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom(function ($model) {
                return $model->getTranslation('name', 'ar', false)
                    ?? $model->getTranslation('name', 'en', false)
                    ?? '';
            })
            ->saveSlugsTo('slug');
    }

    public function academicProgram()
    {
        return $this->belongsTo(AcademicProgram::class);
    }

    public function studyPlanCourses()
    {
        return $this->hasMany(StudyPlanCourse::class);
    }

    public function courses()
    {
        return $this->belongsToMany(Course::class, 'study_plan_courses')
            ->withPivot('semester_number', 'is_elective')
            ->withTimestamps();
    }
}
