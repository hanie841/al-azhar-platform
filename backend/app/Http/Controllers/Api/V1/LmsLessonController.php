<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\LmsLessonResource;
use App\Models\LessonProgress;
use App\Models\LmsLesson;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class LmsLessonController extends Controller
{
    public function index(Request $request, int $moduleId): AnonymousResourceCollection
    {
        $lessons = LmsLesson::where('lms_module_id', $moduleId)
            ->orderBy('order')
            ->get();

        return LmsLessonResource::collection($lessons);
    }

    public function show(int $id): LmsLessonResource
    {
        $lesson = LmsLesson::with('module')->findOrFail($id);

        return new LmsLessonResource($lesson);
    }

    public function store(Request $request): LmsLessonResource
    {
        $validated = $request->validate([
            'lms_module_id' => ['required', 'exists:lms_modules,id'],
            'title' => ['required', 'array'],
            'title.ar' => ['required', 'string', 'max:255'],
            'title.en' => ['nullable', 'string', 'max:255'],
            'content_type' => ['required', 'string', 'in:video,document,text,quiz,external,scorm'],
            'content' => ['nullable', 'array'],
            'content.ar' => ['nullable', 'string'],
            'content.en' => ['nullable', 'string'],
            'file_path' => ['nullable', 'string', 'max:500'],
            'video_url' => ['nullable', 'url', 'max:500'],
            'external_url' => ['nullable', 'url', 'max:500'],
            'duration_minutes' => ['nullable', 'integer', 'min:0'],
            'order' => ['integer', 'min:0'],
            'is_published' => ['boolean'],
            'is_downloadable' => ['boolean'],
        ]);

        $lesson = LmsLesson::create($validated);

        return new LmsLessonResource($lesson);
    }

    public function update(Request $request, int $id): LmsLessonResource
    {
        $lesson = LmsLesson::findOrFail($id);

        $validated = $request->validate([
            'title' => ['sometimes', 'array'],
            'title.ar' => ['sometimes', 'string', 'max:255'],
            'title.en' => ['nullable', 'string', 'max:255'],
            'content_type' => ['sometimes', 'string', 'in:video,document,text,quiz,external,scorm'],
            'content' => ['nullable', 'array'],
            'content.ar' => ['nullable', 'string'],
            'content.en' => ['nullable', 'string'],
            'file_path' => ['nullable', 'string', 'max:500'],
            'video_url' => ['nullable', 'url', 'max:500'],
            'external_url' => ['nullable', 'url', 'max:500'],
            'duration_minutes' => ['nullable', 'integer', 'min:0'],
            'order' => ['integer', 'min:0'],
            'is_published' => ['boolean'],
            'is_downloadable' => ['boolean'],
        ]);

        $lesson->update($validated);

        return new LmsLessonResource($lesson->fresh());
    }

    public function markComplete(Request $request, int $id): JsonResponse
    {
        $lesson = LmsLesson::findOrFail($id);

        $validated = $request->validate([
            'student_id' => ['required', 'integer'],
            'progress_percentage' => ['integer', 'min:0', 'max:100'],
            'last_position' => ['nullable', 'integer', 'min:0'],
        ]);

        $progress = LessonProgress::updateOrCreate(
            [
                'lms_lesson_id' => $lesson->id,
                'student_id' => $validated['student_id'],
            ],
            [
                'status' => 'completed',
                'progress_percentage' => $validated['progress_percentage'] ?? 100,
                'last_position' => $validated['last_position'] ?? null,
                'completed_at' => now(),
            ]
        );

        return response()->json([
            'message' => 'Lesson marked as complete.',
            'data' => $progress,
        ]);
    }
}
