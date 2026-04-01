<?php

use App\Http\Controllers\Api\V1\CertificateController;
use App\Http\Controllers\Api\V1\DiscussionController;
use App\Http\Controllers\Api\V1\LmsAssignmentController;
use App\Http\Controllers\Api\V1\LmsCourseController;
use App\Http\Controllers\Api\V1\LmsLessonController;
use App\Http\Controllers\Api\V1\LmsModuleController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1/lms')->group(function () {
    // Public
    Route::get('certificates/verify/{certificateNumber}', [CertificateController::class, 'verify']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('courses', [LmsCourseController::class, 'index']);
        Route::get('courses/{slug}', [LmsCourseController::class, 'show']);
        Route::post('courses', [LmsCourseController::class, 'store']);
        Route::put('courses/{id}', [LmsCourseController::class, 'update']);

        Route::get('courses/{courseId}/modules', [LmsModuleController::class, 'index']);
        Route::post('modules', [LmsModuleController::class, 'store']);
        Route::put('modules/{id}', [LmsModuleController::class, 'update']);
        Route::put('modules/reorder', [LmsModuleController::class, 'reorder']);

        Route::get('modules/{moduleId}/lessons', [LmsLessonController::class, 'index']);
        Route::get('lessons/{id}', [LmsLessonController::class, 'show']);
        Route::post('lessons', [LmsLessonController::class, 'store']);
        Route::put('lessons/{id}', [LmsLessonController::class, 'update']);
        Route::post('lessons/{id}/complete', [LmsLessonController::class, 'markComplete']);

        Route::get('courses/{courseId}/assignments', [LmsAssignmentController::class, 'index']);
        Route::get('assignments/{id}', [LmsAssignmentController::class, 'show']);
        Route::post('assignments', [LmsAssignmentController::class, 'store']);
        Route::put('assignments/{id}', [LmsAssignmentController::class, 'update']);
        Route::post('assignments/{id}/submit', [LmsAssignmentController::class, 'submit']);
        Route::post('assignments/{id}/grade/{submissionId}', [LmsAssignmentController::class, 'grade']);

        Route::get('courses/{courseId}/forums', [DiscussionController::class, 'forums']);
        Route::get('forums/{forumId}/threads', [DiscussionController::class, 'threads']);
        Route::post('forums/{forumId}/threads', [DiscussionController::class, 'createThread']);
        Route::get('threads/{threadId}/replies', [DiscussionController::class, 'replies']);
        Route::post('threads/{threadId}/replies', [DiscussionController::class, 'createReply']);

        Route::get('certificates', [CertificateController::class, 'index']);
        Route::get('certificates/{id}', [CertificateController::class, 'show']);
    });
});
