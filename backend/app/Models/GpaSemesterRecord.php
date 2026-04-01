<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GpaSemesterRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'semester_id',
        'attempted_hours',
        'earned_hours',
        'quality_points',
        'gpa',
        'cgpa',
        'academic_standing',
    ];

    protected function casts(): array
    {
        return [
            'attempted_hours' => 'integer',
            'earned_hours' => 'integer',
            'quality_points' => 'decimal:2',
            'gpa' => 'decimal:2',
            'cgpa' => 'decimal:2',
        ];
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function semester()
    {
        return $this->belongsTo(Semester::class);
    }
}
