<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Translatable\HasTranslations;

class Student extends Model
{
    use HasFactory, HasTranslations, SoftDeletes;

    protected $fillable = [
        'user_id',
        'student_id_number',
        'national_id',
        'name',
        'date_of_birth',
        'gender',
        'nationality',
        'phone',
        'address',
        'photo',
        'faculty_id',
        'department_id',
        'academic_program_id',
        'academic_level',
        'enrollment_date',
        'expected_graduation',
        'academic_status',
        'cgpa',
        'total_credit_hours',
        'total_earned_hours',
    ];

    public array $translatable = [
        'name',
    ];

    protected function casts(): array
    {
        return [
            'date_of_birth' => 'date',
            'enrollment_date' => 'date',
            'expected_graduation' => 'date',
            'cgpa' => 'decimal:2',
            'total_credit_hours' => 'integer',
            'total_earned_hours' => 'integer',
        ];
    }

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (Student $student) {
            if (empty($student->student_id_number)) {
                $year = now()->format('Y');
                $lastId = static::withTrashed()->max('id') ?? 0;
                $student->student_id_number = 'AZH-' . $year . '-' . str_pad($lastId + 1, 6, '0', STR_PAD_LEFT);
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function faculty()
    {
        return $this->belongsTo(Faculty::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function academicProgram()
    {
        return $this->belongsTo(AcademicProgram::class);
    }

    public function admissions()
    {
        return $this->hasMany(Admission::class);
    }

    public function documents()
    {
        return $this->hasMany(StudentDocument::class);
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }

    public function grades()
    {
        return $this->hasMany(Grade::class);
    }

    public function gpaSemesterRecords()
    {
        return $this->hasMany(GpaSemesterRecord::class);
    }

    public function fees()
    {
        return $this->hasMany(StudentFee::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}
