<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1/auth')->group(function () {
    Route::post('register', [V1\AuthController::class, 'register']);
    Route::post('login', [V1\AuthController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', [V1\AuthController::class, 'logout']);
        Route::get('me', [V1\AuthController::class, 'me']);
    });
});

Route::prefix('v1')->group(function () {
    // Public routes
    Route::get('pages', [V1\PageController::class, 'index']);
    Route::get('pages/{slug}', [V1\PageController::class, 'show']);

    Route::get('news', [V1\NewsController::class, 'index']);
    Route::get('news/{slug}', [V1\NewsController::class, 'show']);

    Route::get('events', [V1\EventController::class, 'index']);
    Route::get('events/{slug}', [V1\EventController::class, 'show']);

    Route::get('faculties', [V1\FacultyController::class, 'index']);
    Route::get('faculties/{slug}', [V1\FacultyController::class, 'show']);

    Route::get('departments', [V1\DepartmentController::class, 'index']);
    Route::get('departments/{slug}', [V1\DepartmentController::class, 'show']);

    Route::get('programs', [V1\AcademicProgramController::class, 'index']);
    Route::get('programs/{slug}', [V1\AcademicProgramController::class, 'show']);

    Route::get('people', [V1\PersonController::class, 'index']);
    Route::get('people/{slug}', [V1\PersonController::class, 'show']);

    Route::get('org-structure', [V1\OrganizationalUnitController::class, 'tree']);
    Route::get('org-structure/{slug}', [V1\OrganizationalUnitController::class, 'show']);

    Route::get('library', [V1\LibraryController::class, 'index']);
    Route::get('library/collections', [V1\LibraryController::class, 'collections']);
    Route::get('library/collections/{slug}', [V1\LibraryController::class, 'collection']);
    Route::get('library/{slug}', [V1\LibraryController::class, 'show']);
    Route::get('library/{slug}/download', [V1\LibraryController::class, 'download']);
    Route::get('library/{slug}/preview', [V1\LibraryController::class, 'preview']);
    Route::post('library/{slug}/upload', [V1\LibraryController::class, 'upload']);

    Route::get('timeline', [V1\TimelineController::class, 'index']);
    Route::get('timeline/{slug}', [V1\TimelineController::class, 'show']);

    Route::get('search', [V1\SearchController::class, 'search']);

    Route::post('chat', [V1\ChatController::class, 'ask']);

    Route::post('contact', [V1\ContactController::class, 'store']);

    // Authenticated routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('bookmarks', [V1\BookmarkController::class, 'index']);
        Route::post('bookmarks', [V1\BookmarkController::class, 'store']);
        Route::delete('bookmarks/{id}', [V1\BookmarkController::class, 'destroy']);
    });
});
