<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\EventResource;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class EventController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Event::where('is_published', true);

        if ($request->has('upcoming') && filter_var($request->query('upcoming'), FILTER_VALIDATE_BOOLEAN)) {
            $query->where('starts_at', '>=', now())
                ->orderBy('starts_at', 'asc');
        } else {
            $query->orderBy('starts_at', 'desc');
        }

        $events = $query->paginate(15);

        return EventResource::collection($events);
    }

    public function show(string $slug): EventResource
    {
        $event = Event::where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        return new EventResource($event);
    }
}
