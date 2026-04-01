<?php

namespace App\Filament\Resources\FacultyProfileResource\Pages;

use App\Filament\Resources\FacultyProfileResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListFacultyProfiles extends ListRecords
{
    protected static string $resource = FacultyProfileResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
