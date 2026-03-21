<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\EventResource;
use App\Http\Resources\Api\V1\FacultyResource;
use App\Http\Resources\Api\V1\LibraryItemResource;
use App\Http\Resources\Api\V1\NewsArticleResource;
use App\Http\Resources\Api\V1\PersonResource;
use App\Models\Event;
use App\Models\Faculty;
use App\Models\LibraryItem;
use App\Models\NewsArticle;
use App\Models\Person;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request): JsonResponse
    {
        $q = $request->query('q', '');

        if (strlen($q) < 2) {
            return response()->json([
                'data' => [],
                'message' => 'Search query must be at least 2 characters.',
            ], 422);
        }

        $results = [];

        // News articles
        $news = NewsArticle::where('is_published', true)
            ->where('title', 'LIKE', "%{$q}%")
            ->orderBy('published_at', 'desc')
            ->limit(5)
            ->get();
        if ($news->isNotEmpty()) {
            $results[] = [
                'type' => 'news',
                'label' => 'News',
                'items' => NewsArticleResource::collection($news),
            ];
        }

        // Library items
        $libraryItems = LibraryItem::where('is_published', true)
            ->where(function ($query) use ($q) {
                $query->where('title', 'LIKE', "%{$q}%")
                    ->orWhere('authors', 'LIKE', "%{$q}%");
            })
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();
        if ($libraryItems->isNotEmpty()) {
            $results[] = [
                'type' => 'library',
                'label' => 'Library',
                'items' => LibraryItemResource::collection($libraryItems),
            ];
        }

        // People
        $people = Person::where('name', 'LIKE', "%{$q}%")
            ->orderBy('order', 'asc')
            ->limit(5)
            ->get();
        if ($people->isNotEmpty()) {
            $results[] = [
                'type' => 'people',
                'label' => 'People',
                'items' => PersonResource::collection($people),
            ];
        }

        // Faculties
        $faculties = Faculty::where('is_published', true)
            ->where('name', 'LIKE', "%{$q}%")
            ->orderBy('order', 'asc')
            ->limit(5)
            ->get();
        if ($faculties->isNotEmpty()) {
            $results[] = [
                'type' => 'faculties',
                'label' => 'Faculties',
                'items' => FacultyResource::collection($faculties),
            ];
        }

        // Events
        $events = Event::where('is_published', true)
            ->where('title', 'LIKE', "%{$q}%")
            ->orderBy('starts_at', 'desc')
            ->limit(5)
            ->get();
        if ($events->isNotEmpty()) {
            $results[] = [
                'type' => 'events',
                'label' => 'Events',
                'items' => EventResource::collection($events),
            ];
        }

        return response()->json(['data' => $results]);
    }
}
