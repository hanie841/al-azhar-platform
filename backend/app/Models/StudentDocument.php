<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentDocument extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'document_type',
        'title',
        'file_path',
        'issued_at',
        'is_verified',
        'verification_code',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'issued_at' => 'date',
            'is_verified' => 'boolean',
        ];
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
