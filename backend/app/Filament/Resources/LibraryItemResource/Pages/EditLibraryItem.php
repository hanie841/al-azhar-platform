<?php

namespace App\Filament\Resources\LibraryItemResource\Pages;

use App\Filament\Resources\LibraryItemResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditLibraryItem extends EditRecord
{
    protected static string $resource = LibraryItemResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
