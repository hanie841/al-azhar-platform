<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DiscussionThreadResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'discussion_forum_id' => $this->discussion_forum_id,
            'user_id' => $this->user_id,
            'user' => $this->whenLoaded('user', fn () => [
                'id' => $this->user->id,
                'name' => $this->user->name,
            ]),
            'title' => $this->title,
            'body' => $this->body,
            'is_pinned' => $this->is_pinned,
            'is_locked' => $this->is_locked,
            'replies_count' => $this->replies_count,
            'replies' => DiscussionReplyResource::collection($this->whenLoaded('replies')),
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
