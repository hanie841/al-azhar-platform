<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ResearchPublicationResource\Pages;
use App\Models\Faculty;
use App\Models\ResearchPublication;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Tabs;
use Filament\Forms\Components\Tabs\Tab;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class ResearchPublicationResource extends Resource
{
    protected static ?string $model = ResearchPublication::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-beaker';

    protected static string | \UnitEnum | null $navigationGroup = 'Research';

    protected static ?int $navigationSort = 10;

    public static function form(Schema $form): Schema
    {
        return $form
            ->schema([
                Tabs::make('Translations')
                    ->tabs([
                        Tab::make('Arabic')
                            ->schema([
                                TextInput::make('title.ar')
                                    ->label('العنوان')
                                    ->required(),
                                RichEditor::make('abstract.ar')
                                    ->label('الملخص')
                                    ->columnSpanFull(),
                                TextInput::make('journal_name.ar')
                                    ->label('اسم المجلة'),
                            ]),
                        Tab::make('English')
                            ->schema([
                                TextInput::make('title.en')
                                    ->label('Title'),
                                RichEditor::make('abstract.en')
                                    ->label('Abstract')
                                    ->columnSpanFull(),
                                TextInput::make('journal_name.en')
                                    ->label('Journal Name'),
                            ]),
                    ])
                    ->columnSpanFull(),

                Section::make('Publication Details')
                    ->schema([
                        TagsInput::make('authors')
                            ->label('Authors')
                            ->placeholder('Add author name')
                            ->columnSpanFull(),
                        DatePicker::make('publication_date')
                            ->label('Publication Date'),
                        TextInput::make('doi')
                            ->label('DOI')
                            ->placeholder('10.xxxx/xxxxx'),
                        TextInput::make('citation_count')
                            ->label('Citation Count')
                            ->numeric()
                            ->default(0),
                        Select::make('research_area')
                            ->label('Research Area')
                            ->options([
                                'islamic_studies' => 'Islamic Studies',
                                'science' => 'Science',
                                'medicine' => 'Medicine',
                                'engineering' => 'Engineering',
                                'humanities' => 'Humanities',
                                'law' => 'Law',
                                'education' => 'Education',
                                'agriculture' => 'Agriculture',
                            ]),
                        Select::make('publication_type')
                            ->label('Publication Type')
                            ->options([
                                'journal_article' => 'Journal Article',
                                'conference_paper' => 'Conference Paper',
                                'book' => 'Book',
                                'thesis' => 'Thesis',
                                'report' => 'Report',
                            ]),
                        Select::make('faculty_id')
                            ->label('Faculty')
                            ->relationship('faculty', 'name')
                            ->getOptionLabelFromRecordUsing(fn (Faculty $record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false))
                            ->searchable()
                            ->preload()
                            ->nullable(),
                        TextInput::make('pdf_url')
                            ->label('PDF URL')
                            ->url(),
                        TextInput::make('external_url')
                            ->label('External URL')
                            ->url(),
                        TextInput::make('slug')
                            ->disabled()
                            ->dehydrated(),
                        Toggle::make('is_featured')
                            ->default(false),
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
                TextColumn::make('title')
                    ->getStateUsing(fn ($record) => $record->getTranslation('title', 'ar', false) ?? $record->getTranslation('title', 'en', false))
                    ->searchable(query: function (Builder $query, string $search): Builder {
                        return $query->where('title', 'like', "%{$search}%");
                    })
                    ->limit(50),
                TextColumn::make('research_area')
                    ->badge()
                    ->sortable(),
                TextColumn::make('publication_type')
                    ->badge()
                    ->sortable(),
                TextColumn::make('citation_count')
                    ->sortable(),
                ToggleColumn::make('is_featured'),
                ToggleColumn::make('is_published'),
                TextColumn::make('publication_date')
                    ->date()
                    ->sortable(),
            ])
            ->defaultSort('publication_date', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('research_area')
                    ->options([
                        'islamic_studies' => 'Islamic Studies',
                        'science' => 'Science',
                        'medicine' => 'Medicine',
                        'engineering' => 'Engineering',
                        'humanities' => 'Humanities',
                        'law' => 'Law',
                        'education' => 'Education',
                        'agriculture' => 'Agriculture',
                    ]),
                Tables\Filters\SelectFilter::make('publication_type')
                    ->options([
                        'journal_article' => 'Journal Article',
                        'conference_paper' => 'Conference Paper',
                        'book' => 'Book',
                        'thesis' => 'Thesis',
                        'report' => 'Report',
                    ]),
                Tables\Filters\SelectFilter::make('faculty_id')
                    ->label('Faculty')
                    ->relationship('faculty', 'name')
                    ->getOptionLabelFromRecordUsing(fn (Faculty $record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false)),
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
            'index' => Pages\ListResearchPublications::route('/'),
            'create' => Pages\CreateResearchPublication::route('/create'),
            'edit' => Pages\EditResearchPublication::route('/{record}/edit'),
        ];
    }
}
