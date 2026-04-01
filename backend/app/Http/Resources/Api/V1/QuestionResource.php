<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class QuestionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();
        $isStudentContext = $request->routeIs('exams.attempt.*') || $request->query('context') === 'student';

        $data = [
            'id' => $this->id,
            'question_bank_id' => $this->question_bank_id,
            'question_category_id' => $this->question_category_id,
            'question_type' => $this->question_type,
            'difficulty' => $this->difficulty,
            'content' => $this->getTranslation('content', $locale, false),
            'points' => (float) $this->points,
            'time_limit_seconds' => $this->time_limit_seconds,
            'tags' => $this->tags,
            'learning_outcome' => $this->learning_outcome,
            'is_active' => $this->is_active,
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];

        // Hide correct answers and is_correct from options in student context
        if ($isStudentContext) {
            $options = $this->options;
            if (is_array($options)) {
                $data['options'] = array_map(function ($option) {
                    if (is_array($option)) {
                        unset($option['is_correct']);
                    }

                    return $option;
                }, $options);
            } else {
                $data['options'] = $options;
            }
        } else {
            $data['options'] = $this->options;
            $data['correct_answer'] = $this->correct_answer;
            $data['explanation'] = $this->getTranslation('explanation', $locale, false);
            $data['created_by'] = $this->created_by;
        }

        return $data;
    }
}
