<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class CommitteeMembership extends Model
{
    use HasFactory, HasTranslations;

    protected $fillable = [
        'faculty_profile_id',
        'committee_name',
        'role',
        'description',
        'start_date',
        'end_date',
        'is_active',
    ];

    public array $translatable = [
        'committee_name',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
            'is_active' => 'boolean',
        ];
    }

    public function facultyProfile()
    {
        return $this->belongsTo(FacultyProfile::class);
    }
}
