<?php

namespace App\Filament\Resources\LmsAnnouncementResource\Pages;

use App\Filament\Resources\LmsAnnouncementResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListLmsAnnouncements extends ListRecords
{
    protected static string $resource = LmsAnnouncementResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
