<?php

namespace App\Filament\Resources\ResearchPublicationResource\Pages;

use App\Filament\Resources\ResearchPublicationResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditResearchPublication extends EditRecord
{
    protected static string $resource = ResearchPublicationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
