<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class QuestionCategoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();

        return [
            'id' => $this->id,
            'question_bank_id' => $this->question_bank_id,
            'name' => $this->getTranslation('name', $locale, false),
            'parent_id' => $this->parent_id,
            'order' => $this->order,
            'children' => QuestionCategoryResource::collection($this->whenLoaded('children')),
        ];
    }
}
