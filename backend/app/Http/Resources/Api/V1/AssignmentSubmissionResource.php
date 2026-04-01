<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AssignmentSubmissionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'lms_assignment_id' => $this->lms_assignment_id,
            'student_id' => $this->student_id,
            'content' => $this->content,
            'file_path' => $this->file_path,
            'link_url' => $this->link_url,
            'attempt_number' => $this->attempt_number,
            'status' => $this->status,
            'score' => $this->score,
            'feedback' => $this->feedback,
            'graded_by' => $this->graded_by,
            'graded_at' => $this->graded_at?->toISOString(),
            'submitted_at' => $this->submitted_at?->toISOString(),
            'is_late' => $this->is_late,
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
