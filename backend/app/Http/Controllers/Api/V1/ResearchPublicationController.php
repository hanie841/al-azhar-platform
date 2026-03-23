<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\ResearchPublicationResource;
use App\Models\ResearchPublication;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ResearchPublicationController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = ResearchPublication::where('is_published', true);

        if ($request->filled('research_area')) {
            $query->where('research_area', $request->query('research_area'));
        }

        if ($request->filled('publication_type')) {
            $query->where('publication_type', $request->query('publication_type'));
        }

        if ($request->filled('faculty_id')) {
            $query->where('faculty_id', $request->query('faculty_id'));
        }

        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }

        if ($request->filled('q')) {
            $search = $request->query('q');
            $query->where('title', 'LIKE', "%{$search}%");
        }

        $publications = $query->with('faculty')
            ->orderBy('publication_date', 'desc')
            ->paginate($request->integer('per_page', 15));

        return ResearchPublicationResource::collection($publications);
    }

    public function show(string $slug): ResearchPublicationResource
    {
        $publication = ResearchPublication::where('slug', $slug)
            ->where('is_published', true)
            ->with('faculty')
            ->firstOrFail();

        return new ResearchPublicationResource($publication);
    }
}
