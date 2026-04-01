<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DiscussionThread extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'discussion_forum_id',
        'user_id',
        'title',
        'body',
        'is_pinned',
        'is_locked',
        'replies_count',
    ];

    public array $translatable = [];

    protected function casts(): array
    {
        return [
            'is_pinned' => 'boolean',
            'is_locked' => 'boolean',
        ];
    }

    public function forum()
    {
        return $this->belongsTo(DiscussionForum::class, 'discussion_forum_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function replies()
    {
        return $this->hasMany(DiscussionReply::class);
    }
}
