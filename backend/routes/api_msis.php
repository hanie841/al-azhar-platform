<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AcademicYearController;
use App\Http\Controllers\Api\V1\SemesterController;
use App\Http\Controllers\Api\V1\StudentController;
use App\Http\Controllers\Api\V1\AdmissionController;
use App\Http\Controllers\Api\V1\CourseController;
use App\Http\Controllers\Api\V1\EnrollmentController;
use App\Http\Controllers\Api\V1\GradeController;
use App\Http\Controllers\Api\V1\PaymentController;

Route::prefix('v1/msis')->group(function () {
    Route::get('academic-years', [AcademicYearController::class, 'index']);
    Route::get('academic-years/{slug}', [AcademicYearController::class, 'show']);
    Route::get('semesters', [SemesterController::class, 'index']);
    Route::get('semesters/{slug}', [SemesterController::class, 'show']);
    Route::get('courses', [CourseController::class, 'index']);
    Route::get('courses/{slug}', [CourseController::class, 'show']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::apiResource('students', StudentController::class);
        Route::apiResource('admissions', AdmissionController::class);
        Route::get('enrollments', [EnrollmentController::class, 'index']);
        Route::post('enrollments', [EnrollmentController::class, 'store']);
        Route::delete('enrollments/{id}', [EnrollmentController::class, 'destroy']);
        Route::get('grades', [GradeController::class, 'index']);
        Route::post('grades', [GradeController::class, 'store']);
        Route::put('grades/{id}', [GradeController::class, 'update']);
        Route::get('grades/transcript/{studentId}', [GradeController::class, 'transcript']);
        Route::get('payments', [PaymentController::class, 'index']);
        Route::post('payments', [PaymentController::class, 'store']);
        Route::get('payments/{id}', [PaymentController::class, 'show']);
    });
});
