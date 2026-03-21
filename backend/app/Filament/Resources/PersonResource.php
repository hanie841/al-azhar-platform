<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PersonResource\Pages;
use App\Models\Person;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Grid;
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

class PersonResource extends Resource
{
    protected static ?string $model = Person::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-user-group';

    protected static string | \UnitEnum | null $navigationGroup = 'University Structure';

    protected static ?int $navigationSort = 3;

    public static function form(Schema $form): Schema
    {
        return $form
            ->schema([
                Grid::make(3)
                    ->schema([
                        Grid::make(1)
                            ->schema([
                                Tabs::make('Translations')
                                    ->tabs([
                                        Tab::make('Arabic')
                                            ->schema([
                                                TextInput::make('name.ar')
                                                    ->label('الاسم')
                                                    ->required(),
                                                TextInput::make('title.ar')
                                                    ->label('اللقب'),
                                                RichEditor::make('bio.ar')
                                                    ->label('السيرة الذاتية')
                                                    ->columnSpanFull(),
                                            ]),
                                        Tab::make('English')
                                            ->schema([
                                                TextInput::make('name.en')
                                                    ->label('Name'),
                                                TextInput::make('title.en')
                                                    ->label('Title'),
                                                RichEditor::make('bio.en')
                                                    ->label('Biography')
                                                    ->columnSpanFull(),
                                            ]),
                                    ])
                                    ->columnSpanFull(),

                                Section::make('Details')
                                    ->schema([
                                        FileUpload::make('photo')
                                            ->image()
                                            ->directory('people/photos')
                                            ->disk('public'),
                                        TextInput::make('position'),
                                        TextInput::make('organization_unit'),
                                        Select::make('era')
                                            ->options([
                                                'fatimid' => 'Fatimid',
                                                'mamluk' => 'Mamluk',
                                                'ottoman' => 'Ottoman',
                                                'modern' => 'Modern',
                                                'contemporary' => 'Contemporary',
                                            ]),
                                    ])
                                    ->columns(2),

                                Section::make('Historical Info')
                                    ->schema([
                                        TextInput::make('birth_year')
                                            ->numeric(),
                                        TextInput::make('death_year')
                                            ->numeric(),
                                        Toggle::make('is_historical')
                                            ->default(false),
                                        Toggle::make('is_current_leadership')
                                            ->default(false),
                                    ])
                                    ->columns(2),
                            ])
                            ->columnSpan(2),

                        Section::make('Settings')
                            ->schema([
                                TextInput::make('slug')
                                    ->disabled()
                                    ->dehydrated(),
                                TextInput::make('order')
                                    ->numeric()
                                    ->default(0),
                                Toggle::make('is_published')
                                    ->default(false),
                            ])
                            ->columnSpan(1),
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
                TextColumn::make('position')
                    ->toggleable(),
                TextColumn::make('era')
                    ->badge()
                    ->color(fn (?string $state): string => match ($state) {
                        'fatimid' => 'warning',
                        'mamluk' => 'success',
                        'ottoman' => 'info',
                        'modern' => 'primary',
                        'contemporary' => 'gray',
                        default => 'gray',
                    }),
                IconColumn::make('is_historical')
                    ->boolean(),
                IconColumn::make('is_current_leadership')
                    ->boolean(),
                ToggleColumn::make('is_published'),
            ])
            ->defaultSort('order')
            ->filters([
                Tables\Filters\SelectFilter::make('era')
                    ->options([
                        'fatimid' => 'Fatimid',
                        'mamluk' => 'Mamluk',
                        'ottoman' => 'Ottoman',
                        'modern' => 'Modern',
                        'contemporary' => 'Contemporary',
                    ]),
                Tables\Filters\TernaryFilter::make('is_historical'),
                Tables\Filters\TernaryFilter::make('is_current_leadership'),
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
            'index' => Pages\ListPeople::route('/'),
            'create' => Pages\CreatePerson::route('/create'),
            'edit' => Pages\EditPerson::route('/{record}/edit'),
        ];
    }
}
