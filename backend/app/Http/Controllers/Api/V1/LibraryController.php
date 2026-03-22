<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\LibraryCollectionResource;
use App\Http\Resources\Api\V1\LibraryItemResource;
use App\Models\Faculty;
use App\Models\LibraryCollection;
use App\Models\LibraryItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\StreamedResponse;

class LibraryController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = LibraryItem::where('is_published', true);

        // Text search (LIKE for now, Meilisearch later)
        if ($request->filled('q')) {
            $search = $request->query('q');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'LIKE', "%{$search}%")
                  ->orWhere('authors', 'LIKE', "%{$search}%")
                  ->orWhere('description', 'LIKE', "%{$search}%")
                  ->orWhere('abstract', 'LIKE', "%{$search}%");
            });
        }

        // Type filter
        if ($request->filled('type')) {
            $query->where('type', $request->query('type'));
        }

        // Era filter
        if ($request->filled('era')) {
            $query->where('era', $request->query('era'));
        }

        // Language filter
        if ($request->filled('language')) {
            $query->where('language', $request->query('language'));
        }

        // Subject filter
        if ($request->filled('subject')) {
            $subject = $request->query('subject');
            $query->where('subjects', 'LIKE', "%{$subject}%");
        }

        // Faculty filter (by slug)
        if ($request->filled('faculty')) {
            $faculty = Faculty::where('slug', $request->query('faculty'))->first();
            if ($faculty) {
                $query->where('faculty_id', $faculty->id);
            }
        }

        // Access level filter
        if ($request->filled('access_level')) {
            $query->where('access_level', $request->query('access_level'));
        }

        // Sorting
        $sort = $request->query('sort', 'newest');
        switch ($sort) {
            case 'most_viewed':
                $query->orderBy('views_count', 'desc');
                break;
            case 'most_downloaded':
                $query->orderBy('downloads_count', 'desc');
                break;
            case 'oldest':
                $query->orderBy('publication_year', 'asc');
                break;
            case 'newest':
            default:
                $query->orderBy('published_at', 'desc')->orderBy('created_at', 'desc');
                break;
        }

        $perPage = min((int) $request->query('per_page', 20), 100);

        $items = $query->with(['faculty', 'department'])
            ->paginate($perPage);

        return LibraryItemResource::collection($items);
    }

    public function show(string $slug): LibraryItemResource
    {
        $item = LibraryItem::where('slug', $slug)
            ->where('is_published', true)
            ->with(['faculty', 'department'])
            ->firstOrFail();

        $item->increment('views_count');

        return new LibraryItemResource($item);
    }

    public function collections(): AnonymousResourceCollection
    {
        $collections = LibraryCollection::where('is_published', true)
            ->withCount('items')
            ->orderBy('name')
            ->get();

        return LibraryCollectionResource::collection($collections);
    }

    public function upload(Request $request, string $slug): JsonResponse
    {
        $item = LibraryItem::where('slug', $slug)->firstOrFail();

        $request->validate([
            'file' => 'required|file',
            'collection' => 'required|in:pdf,cover_image',
        ]);

        $collection = $request->input('collection');
        $file = $request->file('file');

        // Validate mime type based on collection
        if ($collection === 'pdf') {
            $request->validate(['file' => 'mimes:pdf|max:102400']); // 100MB max
        } else {
            $request->validate(['file' => 'image|mimes:jpeg,png,webp|max:10240']); // 10MB max
        }

        $item->addMedia($file)->toMediaCollection($collection);

        return response()->json([
            'message' => 'File uploaded successfully.',
            'data' => new LibraryItemResource($item->fresh()),
        ]);
    }

    public function download(string $slug): StreamedResponse
    {
        $item = LibraryItem::where('slug', $slug)->firstOrFail();

        $media = $item->getFirstMedia('pdf');

        if (! $media) {
            abort(404, 'No PDF file available for this item.');
        }

        $item->increment('downloads_count');

        return response()->streamDownload(function () use ($media) {
            echo file_get_contents($media->getPath());
        }, $media->file_name, [
            'Content-Type' => 'application/pdf',
        ]);
    }

    public function preview(string $slug): StreamedResponse
    {
        $item = LibraryItem::where('slug', $slug)->firstOrFail();

        $media = $item->getFirstMedia('pdf');

        if (! $media) {
            abort(404, 'No PDF file available for this item.');
        }

        return response()->streamDownload(function () use ($media) {
            echo file_get_contents($media->getPath());
        }, $media->file_name, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="' . $media->file_name . '"',
        ]);
    }

    public function collection(string $slug): LibraryCollectionResource
    {
        $collection = LibraryCollection::where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        // Paginate the items separately
        $items = $collection->items()
            ->where('is_published', true)
            ->orderByPivot('order', 'asc')
            ->paginate(20);

        // Load the collection with its paginated items data
        $collection->setRelation('items', $items->getCollection());

        return (new LibraryCollectionResource($collection))
            ->additional([
                'meta' => [
                    'items_current_page' => $items->currentPage(),
                    'items_last_page' => $items->lastPage(),
                    'items_per_page' => $items->perPage(),
                    'items_total' => $items->total(),
                ],
            ]);
    }
}
