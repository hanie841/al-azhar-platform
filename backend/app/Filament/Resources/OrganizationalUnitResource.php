<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrganizationalUnitResource\Pages;
use App\Models\OrganizationalUnit;
use App\Models\Person;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Tabs;
use Filament\Forms\Components\Tabs\Tab;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class OrganizationalUnitResource extends Resource
{
    protected static ?string $model = OrganizationalUnit::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-building-office-2';

    protected static string | \UnitEnum | null $navigationGroup = 'University Structure';

    protected static ?int $navigationSort = 4;

    public static function form(Schema $form): Schema
    {
        return $form
            ->schema([
                Tabs::make('Translations')
                    ->tabs([
                        Tab::make('Arabic')
                            ->schema([
                                TextInput::make('name.ar')
                                    ->label('الاسم')
                                    ->required(),
                                RichEditor::make('description.ar')
                                    ->label('الوصف')
                                    ->columnSpanFull(),
                            ]),
                        Tab::make('English')
                            ->schema([
                                TextInput::make('name.en')
                                    ->label('Name'),
                                RichEditor::make('description.en')
                                    ->label('Description')
                                    ->columnSpanFull(),
                            ]),
                    ])
                    ->columnSpanFull(),

                Section::make('Settings')
                    ->schema([
                        Select::make('type')
                            ->options([
                                'department' => 'Department',
                                'division' => 'Division',
                                'office' => 'Office',
                                'committee' => 'Committee',
                            ])
                            ->required(),
                        Select::make('parent_id')
                            ->label('Parent Unit')
                            ->relationship('parent', 'name')
                            ->getOptionLabelFromRecordUsing(fn (OrganizationalUnit $record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false))
                            ->searchable()
                            ->preload()
                            ->nullable(),
                        Select::make('head_id')
                            ->label('Head')
                            ->relationship('head', 'name')
                            ->getOptionLabelFromRecordUsing(fn (Person $record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false))
                            ->searchable()
                            ->preload()
                            ->nullable(),
                        TextInput::make('slug')
                            ->disabled()
                            ->dehydrated(),
                        TextInput::make('order')
                            ->numeric()
                            ->default(0),
                        Toggle::make('is_published')
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
                    ->searchable(query: function (Builder $query, string $search): Builder {
                        return $query->where('name', 'like', "%{$search}%");
                    })
                    ->limit(50),
                TextColumn::make('type')
                    ->badge(),
                TextColumn::make('parent.name')
                    ->getStateUsing(fn ($record) => $record->parent?->getTranslation('name', 'ar', false) ?? $record->parent?->getTranslation('name', 'en', false))
                    ->label('Parent'),
                TextColumn::make('head.name')
                    ->getStateUsing(fn ($record) => $record->head?->getTranslation('name', 'ar', false) ?? $record->head?->getTranslation('name', 'en', false))
                    ->label('Head'),
                TextColumn::make('order')
                    ->sortable(),
                ToggleColumn::make('is_published'),
            ])
            ->defaultSort('order')
            ->filters([
                Tables\Filters\SelectFilter::make('type')
                    ->options([
                        'department' => 'Department',
                        'division' => 'Division',
                        'office' => 'Office',
                        'committee' => 'Committee',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
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
            'index' => Pages\ListOrganizationalUnits::route('/'),
            'create' => Pages\CreateOrganizationalUnit::route('/create'),
            'edit' => Pages\EditOrganizationalUnit::route('/{record}/edit'),
        ];
    }
}
