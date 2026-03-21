<?php

namespace App\Filament\Resources\LibraryCollectionResource\Pages;

use App\Filament\Resources\LibraryCollectionResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListLibraryCollections extends ListRecords
{
    protected static string $resource = LibraryCollectionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
