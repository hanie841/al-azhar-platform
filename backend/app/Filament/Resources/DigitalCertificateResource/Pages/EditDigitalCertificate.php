<?php

namespace App\Filament\Resources\DigitalCertificateResource\Pages;

use App\Filament\Resources\DigitalCertificateResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditDigitalCertificate extends EditRecord
{
    protected static string $resource = DigitalCertificateResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
