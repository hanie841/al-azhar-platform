<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Translatable\HasTranslations;

class FacultyProfile extends Model
{
    use HasFactory, HasTranslations, SoftDeletes;

    protected $fillable = [
        'user_id',
        'faculty_id',
        'department_id',
        'employee_id',
        'title',
        'academic_rank',
        'specialization',
        'bio',
        'phone',
        'office_location',
        'office_hours',
        'research_interests',
        'qualifications',
        'publications_count',
        'cv_file_path',
        'website_url',
        'google_scholar_url',
        'orcid',
        'scopus_id',
        'photo',
        'is_active',
        'is_public',
        'joined_at',
    ];

    public array $translatable = [
        'title',
        'specialization',
        'bio',
    ];

    protected function casts(): array
    {
        return [
            'office_hours' => 'array',
            'research_interests' => 'array',
            'qualifications' => 'array',
            'is_active' => 'boolean',
            'is_public' => 'boolean',
            'joined_at' => 'date',
        ];
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

    public function leaveRequests()
    {
        return $this->hasMany(LeaveRequest::class);
    }

    public function committeeMemberships()
    {
        return $this->hasMany(CommitteeMembership::class);
    }

    /**
     * Get course sections where this faculty member is the instructor for the current semester.
     */
    public function currentSections()
    {
        return CourseSection::where('instructor_id', $this->user_id)
            ->whereHas('semester', function ($q) {
                $q->where('is_current', true);
            })
            ->with(['course', 'semester'])
            ->get();
    }

    /**
     * Get active (pending or approved) leave requests.
     */
    public function activeLeaves()
    {
        return $this->leaveRequests()
            ->whereIn('status', ['pending', 'approved'])
            ->where('end_date', '>=', now()->toDateString())
            ->orderBy('start_date')
            ->get();
    }
}
