<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\PersonResource;
use App\Models\Person;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PersonController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Person::query();

        if ($request->filled('era')) {
            $query->byEra($request->query('era'));
        }

        if ($request->has('leadership') && filter_var($request->query('leadership'), FILTER_VALIDATE_BOOLEAN)) {
            $query->currentLeadership();
        }

        if ($request->has('historical') && filter_var($request->query('historical'), FILTER_VALIDATE_BOOLEAN)) {
            $query->historical();
        }

        $people = $query->orderBy('order', 'asc')->get();

        return PersonResource::collection($people);
    }

    public function show(string $slug): PersonResource
    {
        $person = Person::where('slug', $slug)->firstOrFail();

        return new PersonResource($person);
    }
}
