<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Translatable\HasTranslations;

class Admission extends Model
{
    use HasFactory, HasTranslations, SoftDeletes;

    protected $fillable = [
        'application_number',
        'user_id',
        'student_id',
        'academic_year_id',
        'name',
        'email',
        'phone',
        'national_id',
        'date_of_birth',
        'gender',
        'nationality',
        'address',
        'faculty_id',
        'department_id',
        'academic_program_id',
        'degree_level',
        'high_school_score',
        'previous_degree',
        'previous_university',
        'previous_gpa',
        'status',
        'rejection_reason',
        'notes',
        'reviewed_by',
        'reviewed_at',
        'submitted_at',
    ];

    public array $translatable = [
        'name',
    ];

    protected function casts(): array
    {
        return [
            'date_of_birth' => 'date',
            'high_school_score' => 'decimal:2',
            'previous_gpa' => 'decimal:2',
            'reviewed_at' => 'datetime',
            'submitted_at' => 'datetime',
        ];
    }

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (Admission $admission) {
            if (empty($admission->application_number)) {
                $year = now()->format('Y');
                $lastId = static::withTrashed()->max('id') ?? 0;
                $admission->application_number = 'ADM-' . $year . '-' . str_pad($lastId + 1, 6, '0', STR_PAD_LEFT);
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function academicYear()
    {
        return $this->belongsTo(AcademicYear::class);
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

    public function documents()
    {
        return $this->hasMany(AdmissionDocument::class);
    }

    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }
}
