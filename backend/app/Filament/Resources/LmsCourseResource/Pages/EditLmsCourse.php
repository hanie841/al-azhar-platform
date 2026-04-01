<?php

namespace App\Filament\Resources\LmsCourseResource\Pages;

use App\Filament\Resources\LmsCourseResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditLmsCourse extends EditRecord
{
    protected static string $resource = LmsCourseResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
