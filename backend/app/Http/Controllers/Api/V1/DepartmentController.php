<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\DepartmentResource;
use App\Models\Department;
use App\Models\Faculty;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class DepartmentController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Department::where('is_published', true);

        if ($request->filled('faculty')) {
            $faculty = Faculty::where('slug', $request->query('faculty'))->first();
            if ($faculty) {
                $query->where('faculty_id', $faculty->id);
            }
        }

        $departments = $query->with('faculty')
            ->orderBy('name')
            ->get();

        return DepartmentResource::collection($departments);
    }

    public function show(string $slug): DepartmentResource
    {
        $department = Department::where('slug', $slug)
            ->where('is_published', true)
            ->with('faculty')
            ->firstOrFail();

        return new DepartmentResource($department);
    }
}
