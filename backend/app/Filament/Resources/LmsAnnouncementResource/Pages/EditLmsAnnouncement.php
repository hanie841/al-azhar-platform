<?php

namespace App\Filament\Resources\LmsAnnouncementResource\Pages;

use App\Filament\Resources\LmsAnnouncementResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditLmsAnnouncement extends EditRecord
{
    protected static string $resource = LmsAnnouncementResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
