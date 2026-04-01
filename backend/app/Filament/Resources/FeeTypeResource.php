<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FeeTypeResource\Pages;
use App\Models\FeeType;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Tabs;
use Filament\Forms\Components\Tabs\Tab;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class FeeTypeResource extends Resource
{
    protected static ?string $model = FeeType::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-banknotes';

    protected static string | \UnitEnum | null $navigationGroup = 'Student Information System';

    protected static ?int $navigationSort = 8;

    public static function form(Schema $form): Schema
    {
        return $form
            ->schema([
                Section::make('Translations')
                    ->schema([
                        Tabs::make('Translations')
                            ->tabs([
                                Tab::make('Arabic')
                                    ->schema([
                                        TextInput::make('name.ar')
                                            ->label('الاسم')
                                            ->required(),
                                    ]),
                                Tab::make('English')
                                    ->schema([
                                        TextInput::make('name.en')
                                            ->label('Name'),
                                    ]),
                            ])
                            ->columnSpanFull(),
                    ]),

                Section::make('Details')
                    ->schema([
                        TextInput::make('slug')
                            ->disabled()
                            ->dehydrated(),
                        TextInput::make('amount')
                            ->numeric()
                            ->required()
                            ->step(0.01)
                            ->prefix('EGP'),
                        Select::make('currency')
                            ->options([
                                'EGP' => 'Egyptian Pound (EGP)',
                                'USD' => 'US Dollar (USD)',
                                'EUR' => 'Euro (EUR)',
                            ])
                            ->default('EGP'),
                        Select::make('fee_category')
                            ->options([
                                'tuition' => 'Tuition',
                                'registration' => 'Registration',
                                'laboratory' => 'Laboratory',
                                'library' => 'Library',
                                'activity' => 'Student Activity',
                                'insurance' => 'Insurance',
                                'housing' => 'Housing',
                                'other' => 'Other',
                            ])
                            ->required(),
                        Toggle::make('is_recurring')
                            ->default(false),
                        Toggle::make('is_active')
                            ->default(true),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->getStateUsing(fn ($record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false))
                    ->searchable(query: fn (Builder $query, string $search) => $query->where('name', 'like', "%{$search}%"))
                    ->limit(50),
                TextColumn::make('amount')
                    ->money('EGP')
                    ->sortable(),
                TextColumn::make('fee_category')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'tuition' => 'success',
                        'registration' => 'info',
                        'laboratory' => 'warning',
                        'library' => 'primary',
                        default => 'gray',
                    }),
                IconColumn::make('is_recurring')
                    ->boolean(),
                ToggleColumn::make('is_active'),
            ])
            ->defaultSort('name')
            ->filters([
                Tables\Filters\SelectFilter::make('fee_category')
                    ->options([
                        'tuition' => 'Tuition',
                        'registration' => 'Registration',
                        'laboratory' => 'Laboratory',
                        'library' => 'Library',
                        'activity' => 'Student Activity',
                        'insurance' => 'Insurance',
                        'housing' => 'Housing',
                        'other' => 'Other',
                    ]),
                Tables\Filters\TernaryFilter::make('is_active'),
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
            'index' => Pages\ListFeeTypes::route('/'),
            'create' => Pages\CreateFeeType::route('/create'),
            'edit' => Pages\EditFeeType::route('/{record}/edit'),
        ];
    }
}
