<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\NewsArticleResource;
use App\Models\NewsArticle;
use App\Models\NewsCategory;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class NewsController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = NewsArticle::where('is_published', true)
            ->with('category');

        if ($request->filled('category')) {
            $category = NewsCategory::where('slug', $request->query('category'))->first();
            if ($category) {
                $query->where('category_id', $category->id);
            }
        }

        if ($request->has('featured')) {
            $query->where('is_featured', filter_var($request->query('featured'), FILTER_VALIDATE_BOOLEAN));
        }

        if ($request->filled('q')) {
            $search = $request->query('q');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'LIKE', "%{$search}%")
                  ->orWhere('excerpt', 'LIKE', "%{$search}%");
            });
        }

        $articles = $query->orderBy('published_at', 'desc')
            ->paginate(15);

        return NewsArticleResource::collection($articles);
    }

    public function show(string $slug): NewsArticleResource
    {
        $article = NewsArticle::where('slug', $slug)
            ->where('is_published', true)
            ->with('category')
            ->firstOrFail();

        $article->increment('views_count');

        return new NewsArticleResource($article);
    }
}
