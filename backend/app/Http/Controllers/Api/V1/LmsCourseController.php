<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\LmsCourseResource;
use App\Models\LmsCourse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class LmsCourseController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = LmsCourse::query()
            ->withCount(['modules', 'assignments']);

        if ($request->filled('semester_id')) {
            $query->whereHas('courseSection', function ($q) use ($request) {
                // CourseSection from M-SIS will have semester_id
            })->where('course_section_id', function ($sub) use ($request) {
                $sub->select('id')
                    ->from('course_sections')
                    ->where('semester_id', $request->query('semester_id'));
            });
        }

        if ($request->filled('instructor_id')) {
            $query->where('course_section_id', function ($sub) use ($request) {
                $sub->select('id')
                    ->from('course_sections')
                    ->where('instructor_id', $request->query('instructor_id'));
            });
        }

        if ($request->filled('is_published')) {
            $query->where('is_published', filter_var($request->query('is_published'), FILTER_VALIDATE_BOOLEAN));
        }

        if ($request->filled('q')) {
            $search = $request->query('q');
            $query->where('title', 'LIKE', "%{$search}%");
        }

        $courses = $query->latest()->paginate($request->integer('per_page', 15));

        return LmsCourseResource::collection($courses);
    }

    public function show(string $slug): LmsCourseResource
    {
        $course = LmsCourse::where('slug', $slug)
            ->with([
                'creator',
                'modules' => function ($q) {
                    $q->orderBy('order');
                },
                'modules.lessons' => function ($q) {
                    $q->orderBy('order');
                },
            ])
            ->withCount(['modules', 'assignments'])
            ->firstOrFail();

        return new LmsCourseResource($course);
    }

    public function store(Request $request): LmsCourseResource
    {
        $validated = $request->validate([
            'course_section_id' => ['required', 'integer'],
            'title' => ['required', 'array'],
            'title.ar' => ['required', 'string', 'max:255'],
            'title.en' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'array'],
            'description.ar' => ['nullable', 'string'],
            'description.en' => ['nullable', 'string'],
            'cover_image' => ['nullable', 'string', 'max:500'],
            'is_published' => ['boolean'],
        ]);

        $validated['created_by'] = $request->user()->id;

        if (! empty($validated['is_published']) && empty($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        $course = LmsCourse::create($validated);

        return new LmsCourseResource($course->load('creator'));
    }

    public function update(Request $request, int $id): LmsCourseResource
    {
        $course = LmsCourse::findOrFail($id);

        $validated = $request->validate([
            'course_section_id' => ['sometimes', 'integer'],
            'title' => ['sometimes', 'array'],
            'title.ar' => ['sometimes', 'string', 'max:255'],
            'title.en' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'array'],
            'description.ar' => ['nullable', 'string'],
            'description.en' => ['nullable', 'string'],
            'cover_image' => ['nullable', 'string', 'max:500'],
            'is_published' => ['boolean'],
        ]);

        if (! empty($validated['is_published']) && ! $course->is_published) {
            $validated['published_at'] = now();
        }

        $course->update($validated);

        return new LmsCourseResource($course->fresh('creator'));
    }
}
