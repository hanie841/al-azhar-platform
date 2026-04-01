<?php

namespace App\Filament\Resources\LmsLessonResource\Pages;

use App\Filament\Resources\LmsLessonResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditLmsLesson extends EditRecord
{
    protected static string $resource = LmsLessonResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
