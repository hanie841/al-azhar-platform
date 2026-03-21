<?php

namespace App\Filament\Resources;

use App\Filament\Resources\LibraryCollectionResource\Pages;
use App\Models\LibraryCollection;
use App\Models\LibraryItem;
use Filament\Forms\Components\FileUpload;
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
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class LibraryCollectionResource extends Resource
{
    protected static ?string $model = LibraryCollection::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static string | \UnitEnum | null $navigationGroup = 'Digital Library';

    protected static ?int $navigationSort = 2;

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
                        FileUpload::make('cover_image')
                            ->image()
                            ->directory('library/collections')
                            ->disk('public'),
                        Toggle::make('is_featured')
                            ->default(false),
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

                Section::make('Library Items')
                    ->schema([
                        Select::make('items')
                            ->label('Items in Collection')
                            ->multiple()
                            ->relationship('items', 'title')
                            ->getOptionLabelFromRecordUsing(fn (LibraryItem $record) => $record->getTranslation('title', 'ar', false) ?? $record->getTranslation('title', 'en', false))
                            ->searchable()
                            ->preload(),
                    ]),
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
                TextColumn::make('items_count')
                    ->counts('items')
                    ->label('Items'),
                IconColumn::make('is_featured')
                    ->boolean(),
                TextColumn::make('order')
                    ->sortable(),
                ToggleColumn::make('is_published'),
            ])
            ->defaultSort('order')
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
            'index' => Pages\ListLibraryCollections::route('/'),
            'create' => Pages\CreateLibraryCollection::route('/create'),
            'edit' => Pages\EditLibraryCollection::route('/{record}/edit'),
        ];
    }
}
