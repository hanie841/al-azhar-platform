<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class DigitalCertificate extends Model
{
    use HasFactory, HasTranslations;

    protected $fillable = [
        'student_id',
        'lms_course_id',
        'certificate_type',
        'title',
        'description',
        'certificate_number',
        'qr_code',
        'verification_url',
        'issued_at',
        'expires_at',
        'template_data',
    ];

    public array $translatable = [
        'title',
    ];

    protected function casts(): array
    {
        return [
            'issued_at' => 'date',
            'expires_at' => 'date',
            'template_data' => 'array',
        ];
    }

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (DigitalCertificate $certificate) {
            if (empty($certificate->certificate_number)) {
                $year = now()->year;
                $latest = static::whereYear('created_at', $year)->count() + 1;
                $certificate->certificate_number = sprintf('CERT-%d-%05d', $year, $latest);
            }

            if (empty($certificate->verification_url)) {
                $certificate->verification_url = url("/api/v1/lms/certificates/verify/{$certificate->certificate_number}");
            }
        });
    }

    public function course()
    {
        return $this->belongsTo(LmsCourse::class, 'lms_course_id');
    }
}
