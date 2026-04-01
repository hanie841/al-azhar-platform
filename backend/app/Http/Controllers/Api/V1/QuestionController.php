<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\QuestionResource;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\JsonResponse;

class QuestionController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Question::with('questionBank');

        if ($request->filled('bank_id')) {
            $query->where('question_bank_id', $request->query('bank_id'));
        }

        if ($request->filled('type')) {
            $query->where('question_type', $request->query('type'));
        }

        if ($request->filled('difficulty')) {
            $query->where('difficulty', $request->query('difficulty'));
        }

        if ($request->filled('learning_outcome')) {
            $query->where('learning_outcome', 'LIKE', '%' . $request->query('learning_outcome') . '%');
        }

        if ($request->filled('category_id')) {
            $query->where('question_category_id', $request->query('category_id'));
        }

        if ($request->filled('is_active')) {
            $query->where('is_active', filter_var($request->query('is_active'), FILTER_VALIDATE_BOOLEAN));
        }

        $questions = $query->orderBy('created_at', 'desc')->paginate($request->integer('per_page', 15));

        return QuestionResource::collection($questions);
    }

    public function show(int $id): QuestionResource
    {
        $question = Question::with(['questionBank', 'category'])->findOrFail($id);

        return new QuestionResource($question);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'question_bank_id' => 'required|integer|exists:question_banks,id',
            'question_category_id' => 'nullable|integer|exists:question_categories,id',
            'question_type' => 'required|string|in:mcq,true_false,fill_blank,matching,essay,short_answer',
            'difficulty' => 'sometimes|string|in:easy,medium,hard',
            'content' => 'required|array',
            'content.ar' => 'required|string',
            'content.en' => 'nullable|string',
            'options' => 'nullable|array',
            'correct_answer' => 'nullable',
            'explanation' => 'nullable|array',
            'explanation.ar' => 'nullable|string',
            'explanation.en' => 'nullable|string',
            'points' => 'sometimes|numeric|min:0',
            'time_limit_seconds' => 'nullable|integer|min:0',
            'tags' => 'nullable|array',
            'tags.*' => 'string',
            'learning_outcome' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        $validated['created_by'] = $request->user()->id;

        $question = Question::create($validated);

        return (new QuestionResource($question))
            ->response()
            ->setStatusCode(201);
    }

    public function update(Request $request, int $id): QuestionResource
    {
        $question = Question::findOrFail($id);

        $validated = $request->validate([
            'question_bank_id' => 'sometimes|integer|exists:question_banks,id',
            'question_category_id' => 'nullable|integer|exists:question_categories,id',
            'question_type' => 'sometimes|string|in:mcq,true_false,fill_blank,matching,essay,short_answer',
            'difficulty' => 'sometimes|string|in:easy,medium,hard',
            'content' => 'sometimes|array',
            'content.ar' => 'sometimes|string',
            'content.en' => 'nullable|string',
            'options' => 'nullable|array',
            'correct_answer' => 'nullable',
            'explanation' => 'nullable|array',
            'explanation.ar' => 'nullable|string',
            'explanation.en' => 'nullable|string',
            'points' => 'sometimes|numeric|min:0',
            'time_limit_seconds' => 'nullable|integer|min:0',
            'tags' => 'nullable|array',
            'tags.*' => 'string',
            'learning_outcome' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        $question->update($validated);

        return new QuestionResource($question);
    }

    public function destroy(int $id): JsonResponse
    {
        $question = Question::findOrFail($id);
        $question->delete();

        return response()->json(['message' => 'Question deleted successfully.']);
    }
}
