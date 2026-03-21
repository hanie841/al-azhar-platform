<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\TimelineEraResource;
use App\Models\TimelineEra;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class TimelineController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $eras = TimelineEra::with(['events' => function ($q) {
                $q->orderBy('year', 'asc')->orderBy('order', 'asc');
            }])
            ->orderBy('start_year', 'asc')
            ->get();

        return TimelineEraResource::collection($eras);
    }

    public function show(string $slug): TimelineEraResource
    {
        $era = TimelineEra::where('slug', $slug)
            ->with(['events' => function ($q) {
                $q->orderBy('year', 'asc')->orderBy('order', 'asc');
            }])
            ->firstOrFail();

        return new TimelineEraResource($era);
    }
}
