<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\SemesterResource;
use App\Models\Semester;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class SemesterController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Semester::query()->with('academicYear');

        if ($request->filled('academic_year_id')) {
            $query->where('academic_year_id', $request->query('academic_year_id'));
        }

        if ($request->boolean('current')) {
            $query->where('is_current', true);
        }

        $semesters = $query->orderBy('start_date', 'desc')->get();

        return SemesterResource::collection($semesters);
    }

    public function show(string $slug): SemesterResource
    {
        $semester = Semester::where('slug', $slug)
            ->with('academicYear')
            ->firstOrFail();

        return new SemesterResource($semester);
    }
}
