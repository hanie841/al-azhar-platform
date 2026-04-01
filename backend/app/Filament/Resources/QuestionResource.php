<?php

namespace App\Filament\Resources;

use App\Filament\Resources\QuestionResource\Pages;
use App\Models\Question;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Tabs;
use Filament\Forms\Components\Tabs\Tab;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Get;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class QuestionResource extends Resource
{
    protected static ?string $model = Question::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-question-mark-circle';

    protected static string | \UnitEnum | null $navigationGroup = 'Examination System';

    protected static ?int $navigationSort = 2;

    public static function form(Schema $form): Schema
    {
        return $form
            ->schema([
                Grid::make(3)
                    ->schema([
                        Grid::make(1)
                            ->schema([
                                Section::make('Question Details')
                                    ->schema([
                                        Select::make('question_bank_id')
                                            ->relationship('questionBank', 'name')
                                            ->searchable()
                                            ->preload()
                                            ->required(),
                                        Select::make('question_category_id')
                                            ->relationship('category', 'name')
                                            ->searchable()
                                            ->preload()
                                            ->nullable(),
                                        Select::make('question_type')
                                            ->options([
                                                'mcq' => 'Multiple Choice',
                                                'true_false' => 'True / False',
                                                'fill_blank' => 'Fill in the Blank',
                                                'matching' => 'Matching',
                                                'essay' => 'Essay',
                                                'short_answer' => 'Short Answer',
                                            ])
                                            ->required()
                                            ->live()
                                            ->afterStateUpdated(fn ($set) => $set('options', null)),
                                        Select::make('difficulty')
                                            ->options([
                                                'easy' => 'Easy',
                                                'medium' => 'Medium',
                                                'hard' => 'Hard',
                                            ])
                                            ->default('medium')
                                            ->required(),
                                    ])
                                    ->columns(2),

                                Tabs::make('Content')
                                    ->tabs([
                                        Tab::make('Arabic')
                                            ->schema([
                                                RichEditor::make('content.ar')
                                                    ->label('نص السؤال')
                                                    ->required()
                                                    ->columnSpanFull(),
                                                Textarea::make('explanation.ar')
                                                    ->label('الشرح')
                                                    ->rows(2)
                                                    ->columnSpanFull(),
                                            ]),
                                        Tab::make('English')
                                            ->schema([
                                                RichEditor::make('content.en')
                                                    ->label('Question Text')
                                                    ->columnSpanFull(),
                                                Textarea::make('explanation.en')
                                                    ->label('Explanation')
                                                    ->rows(2)
                                                    ->columnSpanFull(),
                                            ]),
                                    ])
                                    ->columnSpanFull(),

                                // MCQ Options
                                Section::make('MCQ Options')
                                    ->schema([
                                        Repeater::make('options')
                                            ->schema([
                                                TextInput::make('text')
                                                    ->label('Option Text')
                                                    ->required(),
                                                Toggle::make('is_correct')
                                                    ->label('Correct Answer')
                                                    ->default(false),
                                            ])
                                            ->columns(2)
                                            ->minItems(2)
                                            ->maxItems(10)
                                            ->defaultItems(4)
                                            ->columnSpanFull(),
                                    ])
                                    ->visible(fn (Get $get): bool => $get('question_type') === 'mcq'),

                                // True/False
                                Section::make('Correct Answer')
                                    ->schema([
                                        Select::make('correct_answer.answer')
                                            ->label('Correct Answer')
                                            ->options([
                                                'true' => 'True',
                                                'false' => 'False',
                                            ])
                                            ->required(),
                                    ])
                                    ->visible(fn (Get $get): bool => $get('question_type') === 'true_false'),

                                // Fill in the Blank
                                Section::make('Accepted Answers')
                                    ->schema([
                                        TagsInput::make('correct_answer')
                                            ->label('Accepted Answers (one per tag)')
                                            ->placeholder('Type an accepted answer and press Enter'),
                                    ])
                                    ->visible(fn (Get $get): bool => $get('question_type') === 'fill_blank'),

                                // Matching
                                Section::make('Matching Pairs')
                                    ->schema([
                                        Repeater::make('options')
                                            ->label('Pairs')
                                            ->schema([
                                                TextInput::make('left')
                                                    ->label('Left Item')
                                                    ->required(),
                                                TextInput::make('right')
                                                    ->label('Right Item')
                                                    ->required(),
                                            ])
                                            ->columns(2)
                                            ->minItems(2)
                                            ->maxItems(10)
                                            ->defaultItems(4)
                                            ->columnSpanFull(),
                                    ])
                                    ->visible(fn (Get $get): bool => $get('question_type') === 'matching'),
                            ])
                            ->columnSpan(2),

                        Section::make('Settings')
                            ->schema([
                                TextInput::make('points')
                                    ->numeric()
                                    ->default(1)
                                    ->minValue(0)
                                    ->step(0.5),
                                TextInput::make('time_limit_seconds')
                                    ->label('Time Limit (seconds)')
                                    ->numeric()
                                    ->nullable()
                                    ->minValue(0),
                                TextInput::make('learning_outcome')
                                    ->nullable(),
                                TagsInput::make('tags')
                                    ->placeholder('Add tags'),
                                Toggle::make('is_active')
                                    ->default(true),
                            ])
                            ->columnSpan(1),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('content')
                    ->getStateUsing(fn ($record) => strip_tags($record->getTranslation('content', 'ar', false) ?? $record->getTranslation('content', 'en', false) ?? ''))
                    ->limit(60)
                    ->searchable(query: function (Builder $query, string $search): Builder {
                        return $query->where('content', 'like', "%{$search}%");
                    }),
                TextColumn::make('question_type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'mcq' => 'success',
                        'true_false' => 'info',
                        'fill_blank' => 'warning',
                        'matching' => 'primary',
                        'essay' => 'danger',
                        'short_answer' => 'gray',
                        default => 'gray',
                    }),
                TextColumn::make('difficulty')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'easy' => 'success',
                        'medium' => 'warning',
                        'hard' => 'danger',
                        default => 'gray',
                    }),
                TextColumn::make('points')
                    ->sortable(),
                TextColumn::make('questionBank.name')
                    ->getStateUsing(fn ($record) => $record->questionBank?->getTranslation('name', 'ar', false))
                    ->label('Bank')
                    ->toggleable(),
                IconColumn::make('is_active')
                    ->boolean(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('question_type')
                    ->options([
                        'mcq' => 'Multiple Choice',
                        'true_false' => 'True / False',
                        'fill_blank' => 'Fill in the Blank',
                        'matching' => 'Matching',
                        'essay' => 'Essay',
                        'short_answer' => 'Short Answer',
                    ]),
                Tables\Filters\SelectFilter::make('difficulty')
                    ->options([
                        'easy' => 'Easy',
                        'medium' => 'Medium',
                        'hard' => 'Hard',
                    ]),
                Tables\Filters\SelectFilter::make('question_bank_id')
                    ->relationship('questionBank', 'name')
                    ->label('Question Bank'),
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
            'index' => Pages\ListQuestions::route('/'),
            'create' => Pages\CreateQuestion::route('/create'),
            'edit' => Pages\EditQuestion::route('/{record}/edit'),
        ];
    }
}
