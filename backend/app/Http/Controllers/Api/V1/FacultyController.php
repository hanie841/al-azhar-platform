<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\FacultyResource;
use App\Models\Faculty;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class FacultyController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Faculty::where('is_published', true)
            ->withCount('departments');

        if ($request->filled('type')) {
            $query->where('type', $request->query('type'));
        }

        if ($request->filled('q')) {
            $search = $request->query('q');
            $query->where('name', 'LIKE', "%{$search}%");
        }

        $faculties = $query->orderBy('order', 'asc')->get();

        return FacultyResource::collection($faculties);
    }

    public function show(string $slug): FacultyResource
    {
        $faculty = Faculty::where('slug', $slug)
            ->where('is_published', true)
            ->with(['departments' => function ($q) {
                $q->where('is_published', true)->orderBy('name');
            }])
            ->withCount('departments')
            ->firstOrFail();

        return new FacultyResource($faculty);
    }
}
