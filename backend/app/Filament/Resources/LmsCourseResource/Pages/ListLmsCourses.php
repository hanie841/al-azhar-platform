<?php

namespace App\Filament\Resources\LmsCourseResource\Pages;

use App\Filament\Resources\LmsCourseResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListLmsCourses extends ListRecords
{
    protected static string $resource = LmsCourseResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
