<?php

namespace App\Filament\Resources\TimelineEraResource\Pages;

use App\Filament\Resources\TimelineEraResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditTimelineEra extends EditRecord
{
    protected static string $resource = TimelineEraResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
