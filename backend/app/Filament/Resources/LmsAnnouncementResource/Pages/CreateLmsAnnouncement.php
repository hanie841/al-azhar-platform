<?php

namespace App\Filament\Resources\LmsAnnouncementResource\Pages;

use App\Filament\Resources\LmsAnnouncementResource;
use Filament\Resources\Pages\CreateRecord;

class CreateLmsAnnouncement extends CreateRecord
{
    protected static string $resource = LmsAnnouncementResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['published_by'] = auth()->id();

        return $data;
    }
}
