<?php

namespace App\Filament\Resources\DiscussionForumResource\Pages;

use App\Filament\Resources\DiscussionForumResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditDiscussionForum extends EditRecord
{
    protected static string $resource = DiscussionForumResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
