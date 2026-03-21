<?php

namespace App\Filament\Resources\LibraryCollectionResource\Pages;

use App\Filament\Resources\LibraryCollectionResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditLibraryCollection extends EditRecord
{
    protected static string $resource = LibraryCollectionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
