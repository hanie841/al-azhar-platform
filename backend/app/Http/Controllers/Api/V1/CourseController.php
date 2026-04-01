<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\CourseResource;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CourseController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Course::query()->where('is_active', true)->with(['faculty', 'department']);

        if ($request->filled('faculty_id')) {
            $query->where('faculty_id', $request->query('faculty_id'));
        }

        if ($request->filled('department_id')) {
            $query->where('department_id', $request->query('department_id'));
        }

        if ($request->filled('type')) {
            $query->where('course_type', $request->query('type'));
        }

        if ($request->filled('level')) {
            $query->where('academic_level', $request->query('level'));
        }

        if ($request->filled('q')) {
            $search = $request->query('q');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('code', 'LIKE', "%{$search}%");
            });
        }

        $courses = $query->orderBy('code')->get();

        return CourseResource::collection($courses);
    }

    public function show(string $slug): CourseResource
    {
        $course = Course::where('slug', $slug)
            ->where('is_active', true)
            ->with(['faculty', 'department', 'prerequisites', 'sections' => function ($q) {
                $q->where('is_active', true);
            }])
            ->firstOrFail();

        return new CourseResource($course);
    }
}
