<?php

namespace App\Filament\Resources;

use App\Filament\Resources\LibraryItemResource\Pages;
use App\Models\Department;
use App\Models\Faculty;
use App\Models\LibraryItem;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Tabs;
use Filament\Forms\Components\Tabs\Tab;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Filament\Forms\Get;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class LibraryItemResource extends Resource
{
    protected static ?string $model = LibraryItem::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-book-open';

    protected static string | \UnitEnum | null $navigationGroup = 'Digital Library';

    protected static ?int $navigationSort = 1;

    public static function form(Schema $form): Schema
    {
        return $form
            ->schema([
                Grid::make(3)
                    ->schema([
                        Grid::make(1)
                            ->schema([
                                Section::make('Basic Information')
                                    ->schema([
                                        Tabs::make('Translations')
                                            ->tabs([
                                                Tab::make('Arabic')
                                                    ->schema([
                                                        TextInput::make('title.ar')
                                                            ->label('العنوان')
                                                            ->required(),
                                                        TextInput::make('subtitle.ar')
                                                            ->label('العنوان الفرعي'),
                                                        RichEditor::make('description.ar')
                                                            ->label('الوصف')
                                                            ->columnSpanFull(),
                                                        Textarea::make('abstract.ar')
                                                            ->label('الملخص')
                                                            ->rows(4)
                                                            ->columnSpanFull(),
                                                    ]),
                                                Tab::make('English')
                                                    ->schema([
                                                        TextInput::make('title.en')
                                                            ->label('Title'),
                                                        TextInput::make('subtitle.en')
                                                            ->label('Subtitle'),
                                                        RichEditor::make('description.en')
                                                            ->label('Description')
                                                            ->columnSpanFull(),
                                                        Textarea::make('abstract.en')
                                                            ->label('Abstract')
                                                            ->rows(4)
                                                            ->columnSpanFull(),
                                                    ]),
                                            ])
                                            ->columnSpanFull(),
                                    ]),

                                Section::make('Classification')
                                    ->schema([
                                        Select::make('type')
                                            ->options([
                                                'manuscript' => 'Manuscript',
                                                'book' => 'Book',
                                                'thesis' => 'Thesis',
                                                'research' => 'Research',
                                                'journal_article' => 'Journal Article',
                                            ])
                                            ->required(),
                                        Select::make('language')
                                            ->options([
                                                'ar' => 'Arabic',
                                                'en' => 'English',
                                                'fr' => 'French',
                                                'de' => 'German',
                                                'es' => 'Spanish',
                                                'tr' => 'Turkish',
                                                'fa' => 'Persian',
                                                'ur' => 'Urdu',
                                                'ms' => 'Malay',
                                                'id' => 'Indonesian',
                                            ])
                                            ->default('ar'),
                                        Select::make('era')
                                            ->options([
                                                'fatimid' => 'Fatimid',
                                                'mamluk' => 'Mamluk',
                                                'ottoman' => 'Ottoman',
                                                'modern' => 'Modern',
                                                'contemporary' => 'Contemporary',
                                            ]),
                                        Select::make('access_level')
                                            ->options([
                                                'free' => 'Free',
                                                'registered' => 'Registered',
                                                'premium' => 'Premium',
                                            ])
                                            ->default('free'),
                                        Select::make('faculty_id')
                                            ->label('Faculty')
                                            ->relationship('faculty', 'name')
                                            ->getOptionLabelFromRecordUsing(fn (Faculty $record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false))
                                            ->searchable()
                                            ->preload()
                                            ->live()
                                            ->nullable(),
                                        Select::make('department_id')
                                            ->label('Department')
                                            ->options(function (Get $get) {
                                                $facultyId = $get('faculty_id');
                                                if (! $facultyId) {
                                                    return [];
                                                }

                                                return Department::where('faculty_id', $facultyId)
                                                    ->get()
                                                    ->mapWithKeys(fn (Department $dept) => [
                                                        $dept->id => $dept->getTranslation('name', 'ar', false) ?? $dept->getTranslation('name', 'en', false),
                                                    ]);
                                            })
                                            ->searchable()
                                            ->preload()
                                            ->nullable(),
                                        TagsInput::make('subjects')
                                            ->placeholder('Add subject')
                                            ->columnSpanFull(),
                                        TagsInput::make('authors')
                                            ->placeholder('Add author')
                                            ->columnSpanFull(),
                                    ])
                                    ->columns(2),

                                Section::make('Publication Details')
                                    ->schema([
                                        TextInput::make('publisher'),
                                        TextInput::make('publication_year')
                                            ->numeric()
                                            ->minValue(600)
                                            ->maxValue(2100),
                                        TextInput::make('edition'),
                                        TextInput::make('isbn'),
                                        TextInput::make('issn'),
                                        TextInput::make('doi'),
                                        TextInput::make('page_count')
                                            ->numeric(),
                                    ])
                                    ->columns(2)
                                    ->collapsible(),

                                Section::make('Files')
                                    ->schema([
                                        FileUpload::make('file_path')
                                            ->label('Document File')
                                            ->acceptedFileTypes(['application/pdf', 'application/epub+zip'])
                                            ->directory('library/files')
                                            ->disk('public')
                                            ->maxSize(102400),
                                        FileUpload::make('cover_image')
                                            ->image()
                                            ->directory('library/covers')
                                            ->disk('public'),
                                        FileUpload::make('manuscript_images')
                                            ->label('Manuscript Images')
                                            ->image()
                                            ->multiple()
                                            ->reorderable()
                                            ->directory('library/manuscripts')
                                            ->disk('public'),
                                    ])
                                    ->columns(2),
                            ])
                            ->columnSpan(2),

                        Section::make('Settings')
                            ->schema([
                                TextInput::make('slug')
                                    ->disabled()
                                    ->dehydrated(),
                                Toggle::make('is_published')
                                    ->default(false),
                                DateTimePicker::make('published_at'),
                            ])
                            ->columnSpan(1),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->getStateUsing(fn ($record) => $record->getTranslation('title', 'ar', false) ?? $record->getTranslation('title', 'en', false))
                    ->searchable(query: function (Builder $query, string $search): Builder {
                        return $query->where('title', 'like', "%{$search}%");
                    })
                    ->limit(50),
                TextColumn::make('type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'manuscript' => 'warning',
                        'book' => 'success',
                        'thesis' => 'info',
                        'research' => 'primary',
                        'journal_article' => 'gray',
                        default => 'gray',
                    }),
                TextColumn::make('language')
                    ->badge()
                    ->toggleable(),
                TextColumn::make('faculty.name')
                    ->getStateUsing(fn ($record) => $record->faculty?->getTranslation('name', 'ar', false) ?? $record->faculty?->getTranslation('name', 'en', false))
                    ->toggleable(),
                TextColumn::make('access_level')
                    ->badge()
                    ->color(fn (?string $state): string => match ($state) {
                        'free' => 'success',
                        'registered' => 'info',
                        'premium' => 'warning',
                        default => 'gray',
                    })
                    ->toggleable(),
                TextColumn::make('views_count')
                    ->numeric()
                    ->sortable()
                    ->toggleable(),
                TextColumn::make('downloads_count')
                    ->numeric()
                    ->sortable()
                    ->toggleable(),
                ToggleColumn::make('is_published'),
            ])
            ->defaultSort('published_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('type')
                    ->options([
                        'manuscript' => 'Manuscript',
                        'book' => 'Book',
                        'thesis' => 'Thesis',
                        'research' => 'Research',
                        'journal_article' => 'Journal Article',
                    ]),
                Tables\Filters\SelectFilter::make('language')
                    ->options([
                        'ar' => 'Arabic',
                        'en' => 'English',
                        'fr' => 'French',
                        'de' => 'German',
                        'tr' => 'Turkish',
                        'fa' => 'Persian',
                    ]),
                Tables\Filters\SelectFilter::make('era')
                    ->options([
                        'fatimid' => 'Fatimid',
                        'mamluk' => 'Mamluk',
                        'ottoman' => 'Ottoman',
                        'modern' => 'Modern',
                        'contemporary' => 'Contemporary',
                    ]),
                Tables\Filters\SelectFilter::make('access_level')
                    ->options([
                        'free' => 'Free',
                        'registered' => 'Registered',
                        'premium' => 'Premium',
                    ]),
                Tables\Filters\SelectFilter::make('faculty_id')
                    ->label('Faculty')
                    ->relationship('faculty', 'name')
                    ->getOptionLabelFromRecordUsing(fn (Faculty $record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false)),
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
            'index' => Pages\ListLibraryItems::route('/'),
            'create' => Pages\CreateLibraryItem::route('/create'),
            'edit' => Pages\EditLibraryItem::route('/{record}/edit'),
        ];
    }
}
