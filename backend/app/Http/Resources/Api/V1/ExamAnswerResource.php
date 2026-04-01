<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExamAnswerResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'exam_attempt_id' => $this->exam_attempt_id,
            'exam_question_id' => $this->exam_question_id,
            'question_id' => $this->question_id,
            'answer_content' => $this->answer_content,
            'is_correct' => $this->is_correct,
            'auto_score' => $this->auto_score !== null ? (float) $this->auto_score : null,
            'manual_score' => $this->manual_score !== null ? (float) $this->manual_score : null,
            'final_score' => $this->final_score !== null ? (float) $this->final_score : null,
            'feedback' => $this->feedback,
            'answered_at' => $this->answered_at?->toISOString(),
            'question' => new QuestionResource($this->whenLoaded('question')),
            'exam_question' => new ExamQuestionResource($this->whenLoaded('examQuestion')),
        ];
    }
}
