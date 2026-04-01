<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\ExamAttemptResource;
use App\Http\Resources\Api\V1\ExamQuestionResource;
use App\Models\Exam;
use App\Models\ExamAnswer;
use App\Models\ExamAttempt;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ExamAttemptController extends Controller
{
    public function start(Request $request, int $examId): JsonResponse
    {
        $exam = Exam::with('examQuestions.question')->findOrFail($examId);
        $user = $request->user();

        // Find student record for the authenticated user
        $student = Student::where('user_id', $user->id)->firstOrFail();

        // Verify exam is active
        if (! $exam->isActive()) {
            return response()->json([
                'message' => 'This exam is not currently available.',
            ], 403);
        }

        // Check max attempts
        $existingAttempts = ExamAttempt::where('exam_id', $exam->id)
            ->where('student_id', $student->id)
            ->count();

        if ($existingAttempts >= $exam->max_attempts) {
            return response()->json([
                'message' => 'Maximum number of attempts reached.',
            ], 403);
        }

        // Check for an in-progress attempt (resume it)
        $inProgressAttempt = ExamAttempt::where('exam_id', $exam->id)
            ->where('student_id', $student->id)
            ->where('status', 'in_progress')
            ->first();

        if ($inProgressAttempt) {
            // Check if time has expired
            if ($inProgressAttempt->timeRemaining() <= 0) {
                // Auto-submit expired attempt
                $this->finalizeAttempt($inProgressAttempt);

                // If max attempts reached after auto-submit, deny
                $existingAttempts = ExamAttempt::where('exam_id', $exam->id)
                    ->where('student_id', $student->id)
                    ->count();

                if ($existingAttempts >= $exam->max_attempts) {
                    return response()->json([
                        'message' => 'Maximum number of attempts reached.',
                    ], 403);
                }
            } else {
                // Resume existing attempt
                $questions = $exam->examQuestions->load('question');
                if ($exam->shuffle_questions) {
                    $questions = $questions->shuffle();
                }

                return response()->json([
                    'message' => 'Resuming existing attempt.',
                    'attempt' => new ExamAttemptResource($inProgressAttempt->load('answers')),
                    'questions' => ExamQuestionResource::collection($questions),
                    'time_remaining' => $inProgressAttempt->timeRemaining(),
                ]);
            }
        }

        // Create new attempt
        $attempt = ExamAttempt::create([
            'exam_id' => $exam->id,
            'student_id' => $student->id,
            'attempt_number' => $existingAttempts + 1,
            'status' => 'in_progress',
            'started_at' => now(),
            'ip_address' => $request->ip(),
            'browser_info' => $request->userAgent(),
        ]);

        // Return questions without correct answers (handled by QuestionResource in student context)
        $questions = $exam->examQuestions->load('question');
        if ($exam->shuffle_questions) {
            $questions = $questions->shuffle()->values();
        }

        return response()->json([
            'message' => 'Exam started successfully.',
            'attempt' => new ExamAttemptResource($attempt),
            'questions' => ExamQuestionResource::collection($questions),
            'time_remaining' => $attempt->timeRemaining(),
        ], 201);
    }

    public function saveAnswer(Request $request, int $attemptId): JsonResponse
    {
        $attempt = ExamAttempt::findOrFail($attemptId);

        // Verify ownership
        $student = Student::where('user_id', $request->user()->id)->firstOrFail();
        if ($attempt->student_id !== $student->id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        // Verify attempt is still in progress
        if ($attempt->status !== 'in_progress') {
            return response()->json(['message' => 'This attempt has already been submitted.'], 403);
        }

        // Check time
        if ($attempt->timeRemaining() <= 0) {
            $this->finalizeAttempt($attempt);

            return response()->json(['message' => 'Time has expired. Attempt auto-submitted.'], 403);
        }

        $validated = $request->validate([
            'exam_question_id' => 'required|integer|exists:exam_questions,id',
            'answer_content' => 'nullable',
        ]);

        // Verify the exam_question belongs to this exam
        $examQuestion = $attempt->exam->examQuestions()->where('id', $validated['exam_question_id'])->firstOrFail();

        $answer = ExamAnswer::updateOrCreate(
            [
                'exam_attempt_id' => $attempt->id,
                'exam_question_id' => $validated['exam_question_id'],
            ],
            [
                'question_id' => $examQuestion->question_id,
                'answer_content' => $validated['answer_content'],
                'answered_at' => now(),
            ]
        );

        $attempt->update(['auto_saved_at' => now()]);

        return response()->json([
            'message' => 'Answer saved.',
            'answer_id' => $answer->id,
        ]);
    }

    public function submit(Request $request, int $attemptId): JsonResponse
    {
        $attempt = ExamAttempt::with('exam')->findOrFail($attemptId);

        // Verify ownership
        $student = Student::where('user_id', $request->user()->id)->firstOrFail();
        if ($attempt->student_id !== $student->id) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        if ($attempt->status !== 'in_progress') {
            return response()->json(['message' => 'This attempt has already been submitted.'], 403);
        }

        $this->finalizeAttempt($attempt);

        $attempt->refresh()->load(['answers.question', 'answers.examQuestion', 'exam']);

        return response()->json([
            'message' => 'Exam submitted successfully.',
            'attempt' => new ExamAttemptResource($attempt),
        ]);
    }

    public function show(Request $request, int $attemptId): JsonResponse
    {
        $attempt = ExamAttempt::with(['exam', 'answers.question', 'answers.examQuestion'])->findOrFail($attemptId);

        // Check if user can view results
        $student = Student::where('user_id', $request->user()->id)->first();
        $isOwner = $student && $attempt->student_id === $student->id;

        if ($isOwner && ! $attempt->isCompleted()) {
            // Student can see their in-progress attempt
            return response()->json([
                'attempt' => new ExamAttemptResource($attempt),
            ]);
        }

        if ($isOwner) {
            // Check show_results setting
            $exam = $attempt->exam;
            $canViewResults = match ($exam->show_results) {
                'after_submission' => true,
                'after_deadline' => $exam->ends_at && now()->gte($exam->ends_at),
                'after_grading' => $attempt->status === 'graded',
                'never' => false,
                default => true,
            };

            if ($canViewResults && $exam->results_available_at && now()->lt($exam->results_available_at)) {
                $canViewResults = false;
            }

            if (! $canViewResults) {
                return response()->json([
                    'message' => 'Results are not available yet.',
                    'attempt' => [
                        'id' => $attempt->id,
                        'status' => $attempt->status,
                        'submitted_at' => $attempt->submitted_at?->toISOString(),
                    ],
                ], 403);
            }
        }

        return response()->json([
            'attempt' => new ExamAttemptResource($attempt),
        ]);
    }

    public function myAttempts(Request $request, int $examId): AnonymousResourceCollection
    {
        $student = Student::where('user_id', $request->user()->id)->firstOrFail();

        $attempts = ExamAttempt::where('exam_id', $examId)
            ->where('student_id', $student->id)
            ->with('exam')
            ->orderBy('attempt_number', 'desc')
            ->get();

        return ExamAttemptResource::collection($attempts);
    }

    private function finalizeAttempt(ExamAttempt $attempt): void
    {
        $attempt->update([
            'submitted_at' => now(),
            'time_spent_seconds' => now()->diffInSeconds($attempt->started_at),
        ]);

        // Auto-grade objective questions
        $attempt->autoGradeObjective();
    }
}
