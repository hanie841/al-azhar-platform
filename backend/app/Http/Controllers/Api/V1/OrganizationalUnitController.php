<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\OrganizationalUnitResource;
use App\Models\OrganizationalUnit;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class OrganizationalUnitController extends Controller
{
    public function tree(): AnonymousResourceCollection
    {
        $units = OrganizationalUnit::where('is_published', true)
            ->whereNull('parent_id')
            ->with(['head', 'children' => function ($q) {
                $q->where('is_published', true)
                    ->orderBy('order', 'asc')
                    ->with(['head', 'children' => function ($q2) {
                        $q2->where('is_published', true)
                            ->orderBy('order', 'asc')
                            ->with(['head', 'children' => function ($q3) {
                                $q3->where('is_published', true)
                                    ->orderBy('order', 'asc')
                                    ->with('head');
                            }]);
                    }]);
            }])
            ->orderBy('order', 'asc')
            ->get();

        return OrganizationalUnitResource::collection($units);
    }

    public function show(string $slug): OrganizationalUnitResource
    {
        $unit = OrganizationalUnit::where('slug', $slug)
            ->where('is_published', true)
            ->with(['head', 'children' => function ($q) {
                $q->where('is_published', true)
                    ->orderBy('order', 'asc')
                    ->with('head');
            }])
            ->firstOrFail();

        return new OrganizationalUnitResource($unit);
    }
}
