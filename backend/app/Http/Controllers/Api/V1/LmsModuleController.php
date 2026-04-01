<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\LmsModuleResource;
use App\Models\LmsModule;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class LmsModuleController extends Controller
{
    public function index(Request $request, int $courseId): AnonymousResourceCollection
    {
        $modules = LmsModule::where('lms_course_id', $courseId)
            ->withCount('lessons')
            ->orderBy('order')
            ->get();

        return LmsModuleResource::collection($modules);
    }

    public function store(Request $request): LmsModuleResource
    {
        $validated = $request->validate([
            'lms_course_id' => ['required', 'exists:lms_courses,id'],
            'title' => ['required', 'array'],
            'title.ar' => ['required', 'string', 'max:255'],
            'title.en' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'array'],
            'description.ar' => ['nullable', 'string'],
            'description.en' => ['nullable', 'string'],
            'order' => ['integer', 'min:0'],
            'is_published' => ['boolean'],
            'unlock_at' => ['nullable', 'date'],
        ]);

        $module = LmsModule::create($validated);

        return new LmsModuleResource($module);
    }

    public function update(Request $request, int $id): LmsModuleResource
    {
        $module = LmsModule::findOrFail($id);

        $validated = $request->validate([
            'title' => ['sometimes', 'array'],
            'title.ar' => ['sometimes', 'string', 'max:255'],
            'title.en' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'array'],
            'description.ar' => ['nullable', 'string'],
            'description.en' => ['nullable', 'string'],
            'order' => ['integer', 'min:0'],
            'is_published' => ['boolean'],
            'unlock_at' => ['nullable', 'date'],
        ]);

        $module->update($validated);

        return new LmsModuleResource($module->fresh());
    }

    public function reorder(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'modules' => ['required', 'array'],
            'modules.*.id' => ['required', 'exists:lms_modules,id'],
            'modules.*.order' => ['required', 'integer', 'min:0'],
        ]);

        foreach ($validated['modules'] as $item) {
            LmsModule::where('id', $item['id'])->update(['order' => $item['order']]);
        }

        return response()->json(['message' => 'Modules reordered successfully.']);
    }
}
