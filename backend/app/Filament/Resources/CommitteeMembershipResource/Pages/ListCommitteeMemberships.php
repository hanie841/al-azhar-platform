<?php

namespace App\Filament\Resources\CommitteeMembershipResource\Pages;

use App\Filament\Resources\CommitteeMembershipResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListCommitteeMemberships extends ListRecords
{
    protected static string $resource = CommitteeMembershipResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
