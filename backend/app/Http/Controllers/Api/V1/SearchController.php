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
    private const LIMIT = 5;

    private const TYPE_MAP = [
        'library' => [
            'model' => LibraryItem::class,
            'resource' => LibraryItemResource::class,
            'label' => 'Library',
            'scope' => 'published',
        ],
        'news' => [
            'model' => NewsArticle::class,
            'resource' => NewsArticleResource::class,
            'label' => 'News',
            'scope' => 'published',
        ],
        'faculties' => [
            'model' => Faculty::class,
            'resource' => FacultyResource::class,
            'label' => 'Faculties',
            'scope' => 'active',
        ],
        'people' => [
            'model' => Person::class,
            'resource' => PersonResource::class,
            'label' => 'People',
            'scope' => null,
        ],
        'events' => [
            'model' => Event::class,
            'resource' => EventResource::class,
            'label' => 'Events',
            'scope' => 'published',
        ],
    ];

    public function search(Request $request): JsonResponse
    {
        $q = $request->query('q', '');

        if (strlen($q) < 2) {
            return response()->json([
                'data' => [],
                'message' => 'Search query must be at least 2 characters.',
            ], 422);
        }

        $type = $request->query('type');
        $searchTypes = $type && isset(self::TYPE_MAP[$type])
            ? [$type => self::TYPE_MAP[$type]]
            : self::TYPE_MAP;

        $results = [];

        foreach ($searchTypes as $key => $config) {
            $query = $config['model']::search($q);

            $items = $query->get();

            // Apply visibility filters after Scout retrieval (Scout database
            // driver returns Eloquent models, so we can filter in-memory).
            $items = $items->filter(function ($item) use ($config) {
                if ($config['scope'] === 'published') {
                    return $item->is_published ?? true;
                }
                if ($config['scope'] === 'active') {
                    return $item->is_active ?? true;
                }

                return true;
            })->take(self::LIMIT);

            if ($items->isNotEmpty()) {
                $results[] = [
                    'type' => $key,
                    'label' => $config['label'],
                    'items' => $config['resource']::collection($items),
                ];
            }
        }

        return response()->json(['data' => $results]);
    }
}
