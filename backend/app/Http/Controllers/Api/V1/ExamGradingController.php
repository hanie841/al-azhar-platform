<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\ExamAnswerResource;
use App\Http\Resources\Api\V1\ExamAttemptResource;
use App\Models\Exam;
use App\Models\ExamAnswer;
use App\Models\ExamAttempt;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ExamGradingController extends Controller
{
    public function pendingGrading(Request $request): AnonymousResourceCollection
    {
        $query = ExamAttempt::where('status', 'submitted')
            ->whereHas('answers', function ($q) {
                $q->whereNull('final_score')
                    ->whereHas('question', function ($qq) {
                        $qq->whereIn('question_type', ['essay', 'short_answer']);
                    });
            })
            ->with(['exam', 'student', 'answers' => function ($q) {
                $q->whereNull('final_score')
                    ->whereHas('question', function ($qq) {
                        $qq->whereIn('question_type', ['essay', 'short_answer']);
                    });
                $q->with(['question', 'examQuestion']);
            }]);

        if ($request->filled('exam_id')) {
            $query->where('exam_id', $request->query('exam_id'));
        }

        $attempts = $query->orderBy('submitted_at', 'asc')
            ->paginate($request->integer('per_page', 15));

        return ExamAttemptResource::collection($attempts);
    }

    public function gradeAnswer(Request $request, int $answerId): JsonResponse
    {
        $answer = ExamAnswer::with(['examQuestion', 'question'])->findOrFail($answerId);

        $maxPoints = $answer->examQuestion->getEffectivePoints();

        $validated = $request->validate([
            'manual_score' => "required|numeric|min:0|max:{$maxPoints}",
            'feedback' => 'nullable|string|max:5000',
        ]);

        $answer->update([
            'manual_score' => $validated['manual_score'],
            'final_score' => $validated['manual_score'],
            'is_correct' => $validated['manual_score'] >= ($maxPoints * 0.5),
            'feedback' => $validated['feedback'] ?? null,
        ]);

        return response()->json([
            'message' => 'Answer graded successfully.',
            'answer' => new ExamAnswerResource($answer),
        ]);
    }

    public function gradeAttempt(Request $request, int $attemptId): JsonResponse
    {
        $attempt = ExamAttempt::with(['answers.examQuestion', 'exam'])->findOrFail($attemptId);

        // Recalculate total score from all final_scores
        $totalScore = $attempt->answers->sum('final_score');
        $totalPossible = $attempt->exam->total_marks;
        $percentage = $totalPossible > 0 ? round(($totalScore / $totalPossible) * 100, 2) : 0;

        $updateData = [
            'total_score' => $totalScore,
            'percentage' => $percentage,
            'status' => 'graded',
            'graded_by' => $request->user()->id,
            'graded_at' => now(),
        ];

        if ($attempt->exam->pass_marks !== null) {
            $updateData['is_passed'] = $totalScore >= $attempt->exam->pass_marks;
        }

        $attempt->update($updateData);

        return response()->json([
            'message' => 'Attempt grading finalized.',
            'attempt' => new ExamAttemptResource($attempt->refresh()->load(['answers.question', 'exam'])),
        ]);
    }

    public function statistics(int $examId): JsonResponse
    {
        $exam = Exam::with('examQuestions.question')->findOrFail($examId);

        $attempts = ExamAttempt::where('exam_id', $examId)
            ->whereIn('status', ['submitted', 'graded'])
            ->get();

        if ($attempts->isEmpty()) {
            return response()->json([
                'exam_id' => $examId,
                'total_attempts' => 0,
                'message' => 'No completed attempts yet.',
            ]);
        }

        $gradedAttempts = $attempts->where('status', 'graded');
        $scores = $gradedAttempts->pluck('total_score')->filter(fn ($s) => $s !== null);
        $percentages = $gradedAttempts->pluck('percentage')->filter(fn ($p) => $p !== null);

        // Score distribution buckets
        $distribution = [
            '0-10' => 0, '11-20' => 0, '21-30' => 0, '31-40' => 0, '41-50' => 0,
            '51-60' => 0, '61-70' => 0, '71-80' => 0, '81-90' => 0, '91-100' => 0,
        ];

        foreach ($percentages as $pct) {
            $bucket = match (true) {
                $pct <= 10 => '0-10',
                $pct <= 20 => '11-20',
                $pct <= 30 => '21-30',
                $pct <= 40 => '31-40',
                $pct <= 50 => '41-50',
                $pct <= 60 => '51-60',
                $pct <= 70 => '61-70',
                $pct <= 80 => '71-80',
                $pct <= 90 => '81-90',
                default => '91-100',
            };
            $distribution[$bucket]++;
        }

        // Item analysis per question
        $itemAnalysis = [];
        foreach ($exam->examQuestions as $examQuestion) {
            $answers = ExamAnswer::where('exam_question_id', $examQuestion->id)
                ->whereHas('examAttempt', function ($q) {
                    $q->whereIn('status', ['submitted', 'graded']);
                })
                ->get();

            $totalAnswered = $answers->count();
            $correctCount = $answers->where('is_correct', true)->count();
            $avgScore = $totalAnswered > 0 ? round($answers->avg('final_score'), 2) : 0;

            $itemAnalysis[] = [
                'exam_question_id' => $examQuestion->id,
                'question_id' => $examQuestion->question_id,
                'question_type' => $examQuestion->question->question_type,
                'difficulty' => $examQuestion->question->difficulty,
                'total_answered' => $totalAnswered,
                'correct_count' => $correctCount,
                'correct_percentage' => $totalAnswered > 0 ? round(($correctCount / $totalAnswered) * 100, 2) : 0,
                'average_score' => $avgScore,
                'max_points' => (float) $examQuestion->getEffectivePoints(),
            ];
        }

        $passRate = null;
        if ($exam->pass_marks !== null && $gradedAttempts->isNotEmpty()) {
            $passedCount = $gradedAttempts->where('is_passed', true)->count();
            $passRate = round(($passedCount / $gradedAttempts->count()) * 100, 2);
        }

        return response()->json([
            'exam_id' => $examId,
            'total_attempts' => $attempts->count(),
            'graded_attempts' => $gradedAttempts->count(),
            'pending_grading' => $attempts->where('status', 'submitted')->count(),
            'average_score' => $scores->isNotEmpty() ? round($scores->avg(), 2) : null,
            'highest_score' => $scores->isNotEmpty() ? round($scores->max(), 2) : null,
            'lowest_score' => $scores->isNotEmpty() ? round($scores->min(), 2) : null,
            'average_percentage' => $percentages->isNotEmpty() ? round($percentages->avg(), 2) : null,
            'pass_rate' => $passRate,
            'score_distribution' => $distribution,
            'item_analysis' => $itemAnalysis,
        ]);
    }
}
