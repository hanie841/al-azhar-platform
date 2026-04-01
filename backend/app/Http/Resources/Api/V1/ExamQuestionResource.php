<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExamQuestionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'exam_id' => $this->exam_id,
            'question_id' => $this->question_id,
            'order' => $this->order,
            'points_override' => $this->points_override ? (float) $this->points_override : null,
            'effective_points' => (float) $this->getEffectivePoints(),
            'is_required' => $this->is_required,
            'question' => new QuestionResource($this->whenLoaded('question')),
        ];
    }
}
