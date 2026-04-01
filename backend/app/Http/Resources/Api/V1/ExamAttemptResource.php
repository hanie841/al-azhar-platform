<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExamAttemptResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'exam_id' => $this->exam_id,
            'student_id' => $this->student_id,
            'attempt_number' => $this->attempt_number,
            'status' => $this->status,
            'started_at' => $this->started_at?->toISOString(),
            'submitted_at' => $this->submitted_at?->toISOString(),
            'time_spent_seconds' => $this->time_spent_seconds,
            'time_remaining' => $this->when(! $this->isCompleted(), fn () => $this->timeRemaining()),
            'total_score' => $this->when($this->isCompleted(), (float) $this->total_score),
            'percentage' => $this->when($this->isCompleted(), (float) $this->percentage),
            'is_passed' => $this->when($this->isCompleted(), $this->is_passed),
            'graded_by' => $this->graded_by,
            'graded_at' => $this->graded_at?->toISOString(),
            'answers' => ExamAnswerResource::collection($this->whenLoaded('answers')),
            'exam' => new ExamResource($this->whenLoaded('exam')),
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
