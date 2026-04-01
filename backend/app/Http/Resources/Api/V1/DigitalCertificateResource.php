<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DigitalCertificateResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();

        return [
            'id' => $this->id,
            'student_id' => $this->student_id,
            'lms_course_id' => $this->lms_course_id,
            'certificate_type' => $this->certificate_type,
            'title' => $this->getTranslation('title', $locale, false),
            'description' => $this->description,
            'certificate_number' => $this->certificate_number,
            'qr_code' => $this->qr_code,
            'verification_url' => $this->verification_url,
            'issued_at' => $this->issued_at?->toDateString(),
            'expires_at' => $this->expires_at?->toDateString(),
            'template_data' => $this->template_data,
            'course' => new LmsCourseResource($this->whenLoaded('course')),
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
