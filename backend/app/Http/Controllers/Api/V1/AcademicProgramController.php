<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\AcademicProgramResource;
use App\Models\AcademicProgram;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class AcademicProgramController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = AcademicProgram::where('is_published', true);

        if ($request->filled('faculty_id')) {
            $query->where('faculty_id', $request->query('faculty_id'));
        }

        if ($request->filled('department_id')) {
            $query->where('department_id', $request->query('department_id'));
        }

        if ($request->filled('degree_level')) {
            $query->where('degree_level', $request->query('degree_level'));
        }

        if ($request->filled('q')) {
            $search = $request->query('q');
            $query->where('name', 'LIKE', "%{$search}%");
        }

        $programs = $query->with('faculty')
            ->orderBy('order', 'asc')
            ->get();

        return AcademicProgramResource::collection($programs);
    }

    public function show(string $slug): AcademicProgramResource
    {
        $program = AcademicProgram::where('slug', $slug)
            ->where('is_published', true)
            ->with(['faculty', 'department'])
            ->firstOrFail();

        return new AcademicProgramResource($program);
    }
}
