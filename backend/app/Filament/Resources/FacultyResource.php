<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FacultyResource\Pages;
use App\Models\Faculty;
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
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class FacultyResource extends Resource
{
    protected static ?string $model = Faculty::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-academic-cap';

    protected static string | \UnitEnum | null $navigationGroup = 'University Structure';

    protected static ?int $navigationSort = 1;

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
                                                RichEditor::make('description.ar')
                                                    ->label('الوصف')
                                                    ->columnSpanFull(),
                                                RichEditor::make('dean_message.ar')
                                                    ->label('كلمة العميد')
                                                    ->columnSpanFull(),
                                            ]),
                                        Tab::make('English')
                                            ->schema([
                                                TextInput::make('name.en')
                                                    ->label('Name'),
                                                RichEditor::make('description.en')
                                                    ->label('Description')
                                                    ->columnSpanFull(),
                                                RichEditor::make('dean_message.en')
                                                    ->label('Dean Message')
                                                    ->columnSpanFull(),
                                            ]),
                                    ])
                                    ->columnSpanFull(),

                                Section::make('Details')
                                    ->schema([
                                        Select::make('type')
                                            ->options([
                                                'faculty' => 'Faculty',
                                                'institute' => 'Institute',
                                                'center' => 'Center',
                                                'hospital' => 'Hospital',
                                            ])
                                            ->default('faculty')
                                            ->required(),
                                        TextInput::make('established_year')
                                            ->numeric()
                                            ->minValue(900)
                                            ->maxValue(2100),
                                        TextInput::make('email')
                                            ->email(),
                                        TextInput::make('phone'),
                                        TextInput::make('website_url')
                                            ->url(),
                                    ])
                                    ->columns(2),

                                Section::make('Media')
                                    ->schema([
                                        FileUpload::make('logo')
                                            ->image()
                                            ->directory('faculties/logos')
                                            ->disk('public'),
                                        FileUpload::make('cover_image')
                                            ->image()
                                            ->directory('faculties/covers')
                                            ->disk('public'),
                                    ])
                                    ->columns(2),

                                Section::make('Location')
                                    ->schema([
                                        TextInput::make('location_lat')
                                            ->label('Latitude')
                                            ->numeric(),
                                        TextInput::make('location_lng')
                                            ->label('Longitude')
                                            ->numeric(),
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
                TextColumn::make('type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'faculty' => 'success',
                        'institute' => 'info',
                        'center' => 'warning',
                        'hospital' => 'danger',
                        default => 'gray',
                    }),
                TextColumn::make('established_year')
                    ->sortable()
                    ->toggleable(),
                TextColumn::make('departments_count')
                    ->counts('departments')
                    ->label('Departments'),
                TextColumn::make('order')
                    ->sortable(),
                ToggleColumn::make('is_published'),
            ])
            ->defaultSort('order')
            ->filters([
                Tables\Filters\SelectFilter::make('type')
                    ->options([
                        'faculty' => 'Faculty',
                        'institute' => 'Institute',
                        'center' => 'Center',
                        'hospital' => 'Hospital',
                    ]),
                Tables\Filters\TernaryFilter::make('is_published'),
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
            'index' => Pages\ListFaculties::route('/'),
            'create' => Pages\CreateFaculty::route('/create'),
            'edit' => Pages\EditFaculty::route('/{record}/edit'),
        ];
    }
}
