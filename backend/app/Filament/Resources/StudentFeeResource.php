<?php

namespace App\Filament\Resources;

use App\Filament\Resources\StudentFeeResource\Pages;
use App\Models\StudentFee;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class StudentFeeResource extends Resource
{
    protected static ?string $model = StudentFee::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-currency-dollar';

    protected static string | \UnitEnum | null $navigationGroup = 'Student Information System';

    protected static ?int $navigationSort = 9;

    public static function form(Schema $form): Schema
    {
        return $form
            ->schema([
                Section::make('Fee Details')
                    ->schema([
                        Select::make('student_id')
                            ->relationship('student', 'student_id_number')
                            ->getOptionLabelFromRecordUsing(fn ($record) => $record->student_id_number . ' - ' . ($record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false)))
                            ->required()
                            ->searchable()
                            ->preload(),
                        Select::make('fee_type_id')
                            ->relationship('feeType', 'name')
                            ->getOptionLabelFromRecordUsing(fn ($record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false))
                            ->required()
                            ->searchable()
                            ->preload(),
                        Select::make('semester_id')
                            ->relationship('semester', 'name')
                            ->getOptionLabelFromRecordUsing(fn ($record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false))
                            ->searchable()
                            ->preload(),
                        Select::make('academic_year_id')
                            ->relationship('academicYear', 'name')
                            ->getOptionLabelFromRecordUsing(fn ($record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false))
                            ->searchable()
                            ->preload(),
                    ])
                    ->columns(2),

                Section::make('Amounts')
                    ->schema([
                        TextInput::make('amount')
                            ->numeric()
                            ->required()
                            ->step(0.01)
                            ->prefix('EGP'),
                        TextInput::make('discount_amount')
                            ->numeric()
                            ->default(0)
                            ->step(0.01)
                            ->prefix('EGP'),
                        TextInput::make('paid_amount')
                            ->numeric()
                            ->default(0)
                            ->step(0.01)
                            ->prefix('EGP')
                            ->disabled()
                            ->dehydrated(),
                        Select::make('status')
                            ->options([
                                'unpaid' => 'Unpaid',
                                'partial' => 'Partial',
                                'paid' => 'Paid',
                                'waived' => 'Waived',
                                'overdue' => 'Overdue',
                            ])
                            ->default('unpaid'),
                        DatePicker::make('due_date'),
                        Textarea::make('notes')
                            ->columnSpanFull(),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('student.student_id_number')
                    ->searchable()
                    ->sortable()
                    ->label('Student ID'),
                TextColumn::make('student.name')
                    ->getStateUsing(fn ($record) => $record->student?->getTranslation('name', 'ar', false) ?? $record->student?->getTranslation('name', 'en', false))
                    ->label('Student Name')
                    ->limit(30),
                TextColumn::make('feeType.name')
                    ->getStateUsing(fn ($record) => $record->feeType?->getTranslation('name', 'ar', false) ?? $record->feeType?->getTranslation('name', 'en', false))
                    ->label('Fee Type')
                    ->limit(30),
                TextColumn::make('amount')
                    ->money('EGP')
                    ->sortable(),
                TextColumn::make('paid_amount')
                    ->money('EGP'),
                TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'unpaid' => 'danger',
                        'partial' => 'warning',
                        'paid' => 'success',
                        'waived' => 'info',
                        'overdue' => 'danger',
                        default => 'gray',
                    }),
                TextColumn::make('due_date')
                    ->date()
                    ->sortable()
                    ->toggleable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'unpaid' => 'Unpaid',
                        'partial' => 'Partial',
                        'paid' => 'Paid',
                        'waived' => 'Waived',
                        'overdue' => 'Overdue',
                    ]),
                Tables\Filters\SelectFilter::make('fee_type_id')
                    ->relationship('feeType', 'name')
                    ->getOptionLabelFromRecordUsing(fn ($record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false))
                    ->label('Fee Type')
                    ->searchable()
                    ->preload(),
            ])
            ->actions([
                \Filament\Actions\EditAction::make(),
                \Filament\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                \Filament\Actions\BulkActionGroup::make([
                    \Filament\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListStudentFees::route('/'),
            'create' => Pages\CreateStudentFee::route('/create'),
            'edit' => Pages\EditStudentFee::route('/{record}/edit'),
        ];
    }
}
