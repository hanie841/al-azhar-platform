<?php

namespace App\Filament\Resources\CommitteeMembershipResource\Pages;

use App\Filament\Resources\CommitteeMembershipResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditCommitteeMembership extends EditRecord
{
    protected static string $resource = CommitteeMembershipResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
