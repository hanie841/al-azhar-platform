<?php

namespace App\Filament\Resources\LmsCourseResource\Pages;

use App\Filament\Resources\LmsCourseResource;
use Filament\Resources\Pages\CreateRecord;

class CreateLmsCourse extends CreateRecord
{
    protected static string $resource = LmsCourseResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['created_by'] = auth()->id();

        return $data;
    }
}
