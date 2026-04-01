<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DiscussionReplyResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'discussion_thread_id' => $this->discussion_thread_id,
            'user_id' => $this->user_id,
            'user' => $this->whenLoaded('user', fn () => [
                'id' => $this->user->id,
                'name' => $this->user->name,
            ]),
            'parent_id' => $this->parent_id,
            'body' => $this->body,
            'children' => DiscussionReplyResource::collection($this->whenLoaded('children')),
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
