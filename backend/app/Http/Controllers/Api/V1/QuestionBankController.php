<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\QuestionBankResource;
use App\Models\QuestionBank;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\JsonResponse;

class QuestionBankController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = QuestionBank::withCount('questions');

        if ($request->filled('course_id')) {
            $query->where('course_id', $request->query('course_id'));
        }

        if ($request->filled('faculty_id')) {
            $query->where('faculty_id', $request->query('faculty_id'));
        }

        if ($request->filled('is_shared')) {
            $query->where('is_shared', filter_var($request->query('is_shared'), FILTER_VALIDATE_BOOLEAN));
        }

        if ($request->filled('q')) {
            $search = $request->query('q');
            $query->where('name', 'LIKE', "%{$search}%");
        }

        $banks = $query->orderBy('created_at', 'desc')->paginate($request->integer('per_page', 15));

        return QuestionBankResource::collection($banks);
    }

    public function show(int $id): QuestionBankResource
    {
        $bank = QuestionBank::with(['categories.children', 'questions'])
            ->withCount('questions')
            ->findOrFail($id);

        return new QuestionBankResource($bank);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|array',
            'name.ar' => 'required|string|max:255',
            'name.en' => 'nullable|string|max:255',
            'description' => 'nullable|array',
            'description.ar' => 'nullable|string',
            'description.en' => 'nullable|string',
            'course_id' => 'nullable|integer|exists:courses,id',
            'faculty_id' => 'nullable|integer|exists:faculties,id',
            'department_id' => 'nullable|integer|exists:departments,id',
            'is_shared' => 'boolean',
        ]);

        $validated['created_by'] = $request->user()->id;

        $bank = QuestionBank::create($validated);

        return (new QuestionBankResource($bank->loadCount('questions')))
            ->response()
            ->setStatusCode(201);
    }

    public function update(Request $request, int $id): QuestionBankResource
    {
        $bank = QuestionBank::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|array',
            'name.ar' => 'sometimes|string|max:255',
            'name.en' => 'nullable|string|max:255',
            'description' => 'nullable|array',
            'description.ar' => 'nullable|string',
            'description.en' => 'nullable|string',
            'course_id' => 'nullable|integer|exists:courses,id',
            'faculty_id' => 'nullable|integer|exists:faculties,id',
            'department_id' => 'nullable|integer|exists:departments,id',
            'is_shared' => 'boolean',
        ]);

        $bank->update($validated);

        return new QuestionBankResource($bank->loadCount('questions'));
    }

    public function destroy(int $id): JsonResponse
    {
        $bank = QuestionBank::findOrFail($id);
        $bank->delete();

        return response()->json(['message' => 'Question bank deleted successfully.']);
    }
}
