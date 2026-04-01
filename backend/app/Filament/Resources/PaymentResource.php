<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PaymentResource\Pages;
use App\Models\Payment;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class PaymentResource extends Resource
{
    protected static ?string $model = Payment::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-credit-card';

    protected static string | \UnitEnum | null $navigationGroup = 'Student Information System';

    protected static ?int $navigationSort = 10;

    public static function form(Schema $form): Schema
    {
        return $form
            ->schema([
                Section::make('Payment Details')
                    ->schema([
                        Select::make('student_fee_id')
                            ->relationship('studentFee', 'id')
                            ->getOptionLabelFromRecordUsing(fn ($record) => 'Fee #' . $record->id . ' - ' . ($record->feeType?->getTranslation('name', 'ar', false) ?? $record->feeType?->getTranslation('name', 'en', false)) . ' (' . $record->student?->student_id_number . ')')
                            ->required()
                            ->searchable()
                            ->preload(),
                        Select::make('student_id')
                            ->relationship('student', 'student_id_number')
                            ->getOptionLabelFromRecordUsing(fn ($record) => $record->student_id_number . ' - ' . ($record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false)))
                            ->required()
                            ->searchable()
                            ->preload(),
                        TextInput::make('amount')
                            ->numeric()
                            ->required()
                            ->step(0.01)
                            ->prefix('EGP'),
                        Select::make('payment_method')
                            ->options([
                                'cash' => 'Cash',
                                'bank_transfer' => 'Bank Transfer',
                                'credit_card' => 'Credit Card',
                                'online' => 'Online Payment',
                            ])
                            ->required(),
                        TextInput::make('transaction_reference'),
                        Select::make('status')
                            ->options([
                                'pending' => 'Pending',
                                'completed' => 'Completed',
                                'failed' => 'Failed',
                                'refunded' => 'Refunded',
                            ])
                            ->default('pending'),
                    ])
                    ->columns(2),

                Section::make('Receipt')
                    ->schema([
                        TextInput::make('receipt_number')
                            ->disabled()
                            ->dehydrated(),
                        Textarea::make('notes'),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('receipt_number')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('student.student_id_number')
                    ->searchable()
                    ->label('Student ID'),
                TextColumn::make('student.name')
                    ->getStateUsing(fn ($record) => $record->student?->getTranslation('name', 'ar', false) ?? $record->student?->getTranslation('name', 'en', false))
                    ->label('Student Name')
                    ->limit(30),
                TextColumn::make('amount')
                    ->money('EGP')
                    ->sortable(),
                TextColumn::make('payment_method')
                    ->badge(),
                TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending' => 'warning',
                        'completed' => 'success',
                        'failed' => 'danger',
                        'refunded' => 'info',
                        default => 'gray',
                    }),
                TextColumn::make('paid_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'completed' => 'Completed',
                        'failed' => 'Failed',
                        'refunded' => 'Refunded',
                    ]),
                Tables\Filters\SelectFilter::make('payment_method')
                    ->options([
                        'cash' => 'Cash',
                        'bank_transfer' => 'Bank Transfer',
                        'credit_card' => 'Credit Card',
                        'online' => 'Online',
                    ]),
            ])
            ->actions([
                \Filament\Actions\EditAction::make(),
            ])
            ->bulkActions([]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPayments::route('/'),
            'create' => Pages\CreatePayment::route('/create'),
            'edit' => Pages\EditPayment::route('/{record}/edit'),
        ];
    }
}
