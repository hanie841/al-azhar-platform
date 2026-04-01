<?php

use App\Http\Controllers\Api\V1\ExamAttemptController;
use App\Http\Controllers\Api\V1\ExamController;
use App\Http\Controllers\Api\V1\ExamGradingController;
use App\Http\Controllers\Api\V1\QuestionBankController;
use App\Http\Controllers\Api\V1\QuestionController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1/exams')->middleware('auth:sanctum')->group(function () {
    Route::apiResource('question-banks', QuestionBankController::class);
    Route::apiResource('questions', QuestionController::class);

    Route::get('/', [ExamController::class, 'index']);
    Route::post('/', [ExamController::class, 'store']);
    Route::get('{slug}', [ExamController::class, 'show']);
    Route::put('{id}', [ExamController::class, 'update']);
    Route::post('{id}/publish', [ExamController::class, 'publish']);
    Route::post('{id}/unpublish', [ExamController::class, 'unpublish']);
    Route::post('{id}/generate', [ExamController::class, 'generateFromRules']);

    Route::post('{examId}/start', [ExamAttemptController::class, 'start'])->name('exams.attempt.start');
    Route::post('attempts/{attemptId}/save-answer', [ExamAttemptController::class, 'saveAnswer'])->name('exams.attempt.save-answer');
    Route::post('attempts/{attemptId}/submit', [ExamAttemptController::class, 'submit'])->name('exams.attempt.submit');
    Route::get('attempts/{attemptId}', [ExamAttemptController::class, 'show'])->name('exams.attempt.show');
    Route::get('{examId}/my-attempts', [ExamAttemptController::class, 'myAttempts'])->name('exams.attempt.my-attempts');

    Route::get('grading/pending', [ExamGradingController::class, 'pendingGrading']);
    Route::post('grading/answers/{answerId}', [ExamGradingController::class, 'gradeAnswer']);
    Route::post('grading/attempts/{attemptId}/finalize', [ExamGradingController::class, 'gradeAttempt']);
    Route::get('{examId}/statistics', [ExamGradingController::class, 'statistics']);
});
