<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\LibraryItemResource;
use App\Models\LibraryBookmark;
use App\Models\LibraryItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookmarkController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $bookmarks = LibraryBookmark::where('user_id', $request->user()->id)
            ->with('libraryItem')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        $data = $bookmarks->getCollection()->map(function ($bookmark) {
            return [
                'id' => $bookmark->id,
                'notes' => $bookmark->notes,
                'library_item' => new LibraryItemResource($bookmark->libraryItem),
                'created_at' => $bookmark->created_at?->toISOString(),
            ];
        });

        return response()->json([
            'data' => $data,
            'meta' => [
                'current_page' => $bookmarks->currentPage(),
                'last_page' => $bookmarks->lastPage(),
                'per_page' => $bookmarks->perPage(),
                'total' => $bookmarks->total(),
            ],
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'library_item_id' => 'required|exists:library_items,id',
            'notes' => 'nullable|string|max:1000',
        ]);

        // Check if bookmark already exists
        $existing = LibraryBookmark::where('user_id', $request->user()->id)
            ->where('library_item_id', $validated['library_item_id'])
            ->first();

        if ($existing) {
            return response()->json([
                'message' => 'Bookmark already exists.',
                'data' => [
                    'id' => $existing->id,
                    'notes' => $existing->notes,
                    'library_item_id' => $existing->library_item_id,
                ],
            ], 200);
        }

        $bookmark = LibraryBookmark::create([
            'user_id' => $request->user()->id,
            'library_item_id' => $validated['library_item_id'],
            'notes' => $validated['notes'] ?? null,
        ]);

        return response()->json([
            'message' => 'Bookmark created.',
            'data' => [
                'id' => $bookmark->id,
                'notes' => $bookmark->notes,
                'library_item_id' => $bookmark->library_item_id,
                'created_at' => $bookmark->created_at?->toISOString(),
            ],
        ], 201);
    }

    public function destroy(Request $request, int $id): JsonResponse
    {
        $bookmark = LibraryBookmark::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $bookmark->delete();

        return response()->json([
            'message' => 'Bookmark removed.',
        ], 200);
    }
}
