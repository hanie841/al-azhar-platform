<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\PageResource;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PageController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Page::where('is_published', true);

        if ($request->has('parent')) {
            $query->where('parent_id', $request->query('parent'));
        } else {
            $query->whereNull('parent_id');
        }

        $pages = $query->orderBy('order', 'asc')->get();

        return PageResource::collection($pages);
    }

    public function show(string $slug): PageResource
    {
        $page = Page::where('slug', $slug)
            ->where('is_published', true)
            ->with(['parent', 'children' => function ($q) {
                $q->where('is_published', true)->orderBy('order', 'asc');
            }])
            ->firstOrFail();

        return new PageResource($page);
    }
}
