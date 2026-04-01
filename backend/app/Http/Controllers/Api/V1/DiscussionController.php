<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\DiscussionReplyResource;
use App\Http\Resources\Api\V1\DiscussionThreadResource;
use App\Models\DiscussionForum;
use App\Models\DiscussionReply;
use App\Models\DiscussionThread;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class DiscussionController extends Controller
{
    public function forums(int $courseId): \Illuminate\Http\JsonResponse
    {
        $forums = DiscussionForum::where('lms_course_id', $courseId)
            ->withCount('threads')
            ->orderBy('order')
            ->get();

        $locale = app()->getLocale();

        return response()->json([
            'data' => $forums->map(fn (DiscussionForum $forum) => [
                'id' => $forum->id,
                'lms_course_id' => $forum->lms_course_id,
                'title' => $forum->getTranslation('title', $locale, false),
                'description' => $forum->getTranslation('description', $locale, false),
                'is_locked' => $forum->is_locked,
                'order' => $forum->order,
                'threads_count' => $forum->threads_count,
                'created_at' => $forum->created_at?->toISOString(),
            ]),
        ]);
    }

    public function threads(int $forumId): AnonymousResourceCollection
    {
        $threads = DiscussionThread::where('discussion_forum_id', $forumId)
            ->with('user')
            ->orderByDesc('is_pinned')
            ->latest()
            ->paginate(20);

        return DiscussionThreadResource::collection($threads);
    }

    public function createThread(Request $request, int $forumId): DiscussionThreadResource
    {
        $forum = DiscussionForum::findOrFail($forumId);

        if ($forum->is_locked) {
            abort(403, 'This forum is locked.');
        }

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string'],
        ]);

        $thread = DiscussionThread::create([
            'discussion_forum_id' => $forum->id,
            'user_id' => $request->user()->id,
            'title' => $validated['title'],
            'body' => $validated['body'],
        ]);

        return new DiscussionThreadResource($thread->load('user'));
    }

    public function replies(int $threadId): AnonymousResourceCollection
    {
        $replies = DiscussionReply::where('discussion_thread_id', $threadId)
            ->whereNull('parent_id')
            ->with(['user', 'children.user'])
            ->latest()
            ->paginate(20);

        return DiscussionReplyResource::collection($replies);
    }

    public function createReply(Request $request, int $threadId): DiscussionReplyResource
    {
        $thread = DiscussionThread::findOrFail($threadId);

        if ($thread->is_locked) {
            abort(403, 'This thread is locked.');
        }

        $validated = $request->validate([
            'body' => ['required', 'string'],
            'parent_id' => ['nullable', 'exists:discussion_replies,id'],
        ]);

        $reply = DiscussionReply::create([
            'discussion_thread_id' => $thread->id,
            'user_id' => $request->user()->id,
            'parent_id' => $validated['parent_id'] ?? null,
            'body' => $validated['body'],
        ]);

        $thread->increment('replies_count');

        return new DiscussionReplyResource($reply->load('user'));
    }
}
