<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'course_section_id',
        'semester_id',
        'midterm_score',
        'final_score',
        'coursework_score',
        'practical_score',
        'total_score',
        'letter_grade',
        'grade_points',
        'credit_hours',
        'is_pass',
        'notes',
        'graded_by',
        'graded_at',
        'is_published',
    ];

    protected function casts(): array
    {
        return [
            'midterm_score' => 'decimal:2',
            'final_score' => 'decimal:2',
            'coursework_score' => 'decimal:2',
            'practical_score' => 'decimal:2',
            'total_score' => 'decimal:2',
            'grade_points' => 'decimal:2',
            'credit_hours' => 'integer',
            'is_pass' => 'boolean',
            'graded_at' => 'datetime',
            'is_published' => 'boolean',
        ];
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function courseSection()
    {
        return $this->belongsTo(CourseSection::class);
    }

    public function semester()
    {
        return $this->belongsTo(Semester::class);
    }

    public function grader()
    {
        return $this->belongsTo(User::class, 'graded_by');
    }
}
