<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\ExamResource;
use App\Models\Exam;
use App\Models\ExamQuestion;
use App\Models\ExamRandomizationRule;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\JsonResponse;

class ExamController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Exam::withCount('examQuestions');

        if ($request->filled('course_section_id')) {
            $query->where('course_section_id', $request->query('course_section_id'));
        }

        if ($request->filled('lms_course_id')) {
            $query->where('lms_course_id', $request->query('lms_course_id'));
        }

        if ($request->filled('exam_type')) {
            $query->where('exam_type', $request->query('exam_type'));
        }

        if ($request->filled('is_published')) {
            $query->where('is_published', filter_var($request->query('is_published'), FILTER_VALIDATE_BOOLEAN));
        }

        $exams = $query->orderBy('created_at', 'desc')->paginate($request->integer('per_page', 15));

        return ExamResource::collection($exams);
    }

    public function show(string $slug): ExamResource
    {
        $exam = Exam::where('slug', $slug)
            ->with(['examQuestions.question', 'randomizationRules'])
            ->withCount('examQuestions')
            ->firstOrFail();

        return new ExamResource($exam);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|array',
            'title.ar' => 'required|string|max:255',
            'title.en' => 'nullable|string|max:255',
            'description' => 'nullable|array',
            'description.ar' => 'nullable|string',
            'description.en' => 'nullable|string',
            'course_section_id' => 'nullable|integer',
            'lms_course_id' => 'nullable|integer',
            'exam_type' => 'required|string|in:midterm,final,quiz,assignment,practice',
            'creation_method' => 'sometimes|string|in:manual,random,mixed',
            'total_marks' => 'required|numeric|min:0',
            'pass_marks' => 'nullable|numeric|min:0',
            'duration_minutes' => 'required|integer|min:1',
            'max_attempts' => 'sometimes|integer|min:1',
            'shuffle_questions' => 'boolean',
            'shuffle_options' => 'boolean',
            'show_results' => 'sometimes|string|in:after_submission,after_deadline,after_grading,never',
            'results_available_at' => 'nullable|date',
            'starts_at' => 'nullable|date',
            'ends_at' => 'nullable|date|after_or_equal:starts_at',
            'instructions' => 'nullable|array',
            'instructions.ar' => 'nullable|string',
            'instructions.en' => 'nullable|string',
            'is_proctored' => 'boolean',
            'allow_backtrack' => 'boolean',
            'questions' => 'nullable|array',
            'questions.*.question_id' => 'required_with:questions|integer|exists:questions,id',
            'questions.*.order' => 'nullable|integer',
            'questions.*.points_override' => 'nullable|numeric|min:0',
            'questions.*.is_required' => 'boolean',
            'randomization_rules' => 'nullable|array',
            'randomization_rules.*.question_bank_id' => 'required_with:randomization_rules|integer|exists:question_banks,id',
            'randomization_rules.*.question_category_id' => 'nullable|integer|exists:question_categories,id',
            'randomization_rules.*.question_type' => 'nullable|string',
            'randomization_rules.*.difficulty' => 'nullable|string',
            'randomization_rules.*.count' => 'required_with:randomization_rules|integer|min:1',
            'randomization_rules.*.points_per_question' => 'required_with:randomization_rules|numeric|min:0',
        ]);

        $validated['created_by'] = $request->user()->id;

        $exam = Exam::create($validated);

        // Attach questions if provided
        if (! empty($validated['questions'])) {
            foreach ($validated['questions'] as $index => $questionData) {
                ExamQuestion::create([
                    'exam_id' => $exam->id,
                    'question_id' => $questionData['question_id'],
                    'order' => $questionData['order'] ?? $index,
                    'points_override' => $questionData['points_override'] ?? null,
                    'is_required' => $questionData['is_required'] ?? true,
                ]);
            }
        }

        // Create randomization rules if provided
        if (! empty($validated['randomization_rules'])) {
            foreach ($validated['randomization_rules'] as $ruleData) {
                ExamRandomizationRule::create([
                    'exam_id' => $exam->id,
                    ...$ruleData,
                ]);
            }
        }

        return (new ExamResource($exam->load('examQuestions.question', 'randomizationRules')->loadCount('examQuestions')))
            ->response()
            ->setStatusCode(201);
    }

    public function update(Request $request, int $id): ExamResource
    {
        $exam = Exam::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|array',
            'title.ar' => 'sometimes|string|max:255',
            'title.en' => 'nullable|string|max:255',
            'description' => 'nullable|array',
            'description.ar' => 'nullable|string',
            'description.en' => 'nullable|string',
            'course_section_id' => 'nullable|integer',
            'lms_course_id' => 'nullable|integer',
            'exam_type' => 'sometimes|string|in:midterm,final,quiz,assignment,practice',
            'creation_method' => 'sometimes|string|in:manual,random,mixed',
            'total_marks' => 'sometimes|numeric|min:0',
            'pass_marks' => 'nullable|numeric|min:0',
            'duration_minutes' => 'sometimes|integer|min:1',
            'max_attempts' => 'sometimes|integer|min:1',
            'shuffle_questions' => 'boolean',
            'shuffle_options' => 'boolean',
            'show_results' => 'sometimes|string|in:after_submission,after_deadline,after_grading,never',
            'results_available_at' => 'nullable|date',
            'starts_at' => 'nullable|date',
            'ends_at' => 'nullable|date|after_or_equal:starts_at',
            'instructions' => 'nullable|array',
            'instructions.ar' => 'nullable|string',
            'instructions.en' => 'nullable|string',
            'is_proctored' => 'boolean',
            'allow_backtrack' => 'boolean',
        ]);

        $exam->update($validated);

        return new ExamResource($exam->load('examQuestions.question')->loadCount('examQuestions'));
    }

    public function publish(int $id): JsonResponse
    {
        $exam = Exam::findOrFail($id);

        if ($exam->examQuestions()->count() === 0 && $exam->randomizationRules()->count() === 0) {
            return response()->json([
                'message' => 'Cannot publish an exam with no questions and no randomization rules.',
            ], 422);
        }

        $exam->update(['is_published' => true]);

        return response()->json([
            'message' => 'Exam published successfully.',
            'data' => new ExamResource($exam),
        ]);
    }

    public function unpublish(int $id): JsonResponse
    {
        $exam = Exam::findOrFail($id);
        $exam->update(['is_published' => false]);

        return response()->json([
            'message' => 'Exam unpublished successfully.',
            'data' => new ExamResource($exam),
        ]);
    }

    public function generateFromRules(int $id): JsonResponse
    {
        $exam = Exam::with('randomizationRules')->findOrFail($id);

        if ($exam->randomizationRules->isEmpty()) {
            return response()->json([
                'message' => 'No randomization rules defined for this exam.',
            ], 422);
        }

        // Remove existing generated questions
        $exam->examQuestions()->delete();

        $order = 0;

        foreach ($exam->randomizationRules as $rule) {
            $query = Question::where('question_bank_id', $rule->question_bank_id)
                ->where('is_active', true);

            if ($rule->question_category_id) {
                $query->where('question_category_id', $rule->question_category_id);
            }

            if ($rule->question_type) {
                $query->where('question_type', $rule->question_type);
            }

            if ($rule->difficulty) {
                $query->where('difficulty', $rule->difficulty);
            }

            $questions = $query->inRandomOrder()->limit($rule->count)->get();

            foreach ($questions as $question) {
                ExamQuestion::create([
                    'exam_id' => $exam->id,
                    'question_id' => $question->id,
                    'order' => $order++,
                    'points_override' => $rule->points_per_question,
                    'is_required' => true,
                ]);
            }
        }

        $exam->load('examQuestions.question')->loadCount('examQuestions');

        return response()->json([
            'message' => 'Exam questions generated successfully.',
            'data' => new ExamResource($exam),
        ]);
    }
}
