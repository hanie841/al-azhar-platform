<?php

use App\Http\Controllers\Api\V1\CommitteeMembershipController;
use App\Http\Controllers\Api\V1\FacultyDashboardController;
use App\Http\Controllers\Api\V1\FacultyProfileController;
use App\Http\Controllers\Api\V1\LeaveRequestController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1/faculty-portal')->group(function () {
    // Public
    Route::get('profiles', [FacultyProfileController::class, 'index']);
    Route::get('profiles/{id}', [FacultyProfileController::class, 'show']);

    // Authenticated
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('me', [FacultyProfileController::class, 'me']);
        Route::put('me', [FacultyProfileController::class, 'update']);
        Route::post('me/cv', [FacultyProfileController::class, 'uploadCv']);

        Route::get('dashboard', [FacultyDashboardController::class, 'dashboard']);
        Route::get('my-courses', [FacultyDashboardController::class, 'myCourses']);
        Route::get('courses/{sectionId}/students', [FacultyDashboardController::class, 'courseStudents']);

        Route::get('leaves', [LeaveRequestController::class, 'index']);
        Route::post('leaves', [LeaveRequestController::class, 'store']);
        Route::get('leaves/{id}', [LeaveRequestController::class, 'show']);
        Route::put('leaves/{id}/cancel', [LeaveRequestController::class, 'cancel']);
        Route::put('leaves/{id}/approve', [LeaveRequestController::class, 'approve']);
        Route::put('leaves/{id}/reject', [LeaveRequestController::class, 'reject']);

        Route::apiResource('committees', CommitteeMembershipController::class);
    });
});
