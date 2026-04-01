<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\AcademicYearResource;
use App\Models\AcademicYear;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class AcademicYearController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = AcademicYear::query()->withCount('semesters');

        if ($request->boolean('current')) {
            $query->where('is_current', true);
        }

        $academicYears = $query->orderBy('start_date', 'desc')->get();

        return AcademicYearResource::collection($academicYears);
    }

    public function show(string $slug): AcademicYearResource
    {
        $academicYear = AcademicYear::where('slug', $slug)
            ->with(['semesters' => fn ($q) => $q->orderBy('start_date')])
            ->firstOrFail();

        return new AcademicYearResource($academicYear);
    }
}
