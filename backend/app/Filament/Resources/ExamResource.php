<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ExamResource\Pages;
use App\Models\Exam;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Tabs;
use Filament\Forms\Components\Tabs\Tab;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class ExamResource extends Resource
{
    protected static ?string $model = Exam::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-clipboard-document-check';

    protected static string | \UnitEnum | null $navigationGroup = 'Examination System';

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
                                                TextInput::make('title.ar')
                                                    ->label('العنوان')
                                                    ->required(),
                                                Textarea::make('description.ar')
                                                    ->label('الوصف')
                                                    ->rows(3)
                                                    ->columnSpanFull(),
                                                Textarea::make('instructions.ar')
                                                    ->label('التعليمات')
                                                    ->rows(3)
                                                    ->columnSpanFull(),
                                            ]),
                                        Tab::make('English')
                                            ->schema([
                                                TextInput::make('title.en')
                                                    ->label('Title'),
                                                Textarea::make('description.en')
                                                    ->label('Description')
                                                    ->rows(3)
                                                    ->columnSpanFull(),
                                                Textarea::make('instructions.en')
                                                    ->label('Instructions')
                                                    ->rows(3)
                                                    ->columnSpanFull(),
                                            ]),
                                    ])
                                    ->columnSpanFull(),

                                Section::make('Exam Configuration')
                                    ->schema([
                                        Select::make('exam_type')
                                            ->options([
                                                'midterm' => 'Midterm',
                                                'final' => 'Final',
                                                'quiz' => 'Quiz',
                                                'assignment' => 'Assignment',
                                                'practice' => 'Practice',
                                            ])
                                            ->required(),
                                        Select::make('creation_method')
                                            ->options([
                                                'manual' => 'Manual',
                                                'random' => 'Random from Bank',
                                                'mixed' => 'Mixed',
                                            ])
                                            ->default('manual'),
                                        TextInput::make('total_marks')
                                            ->numeric()
                                            ->required()
                                            ->minValue(0),
                                        TextInput::make('pass_marks')
                                            ->numeric()
                                            ->nullable()
                                            ->minValue(0),
                                        TextInput::make('duration_minutes')
                                            ->label('Duration (minutes)')
                                            ->numeric()
                                            ->required()
                                            ->minValue(1),
                                        TextInput::make('max_attempts')
                                            ->numeric()
                                            ->default(1)
                                            ->minValue(1),
                                    ])
                                    ->columns(3),

                                Section::make('Schedule')
                                    ->schema([
                                        DateTimePicker::make('starts_at')
                                            ->nullable(),
                                        DateTimePicker::make('ends_at')
                                            ->nullable()
                                            ->after('starts_at'),
                                        DateTimePicker::make('results_available_at')
                                            ->nullable(),
                                    ])
                                    ->columns(3),

                                Section::make('Exam Questions')
                                    ->schema([
                                        Repeater::make('examQuestions')
                                            ->relationship()
                                            ->schema([
                                                Select::make('question_id')
                                                    ->relationship('question', 'content')
                                                    ->searchable()
                                                    ->preload()
                                                    ->required(),
                                                TextInput::make('order')
                                                    ->numeric()
                                                    ->default(0),
                                                TextInput::make('points_override')
                                                    ->numeric()
                                                    ->nullable()
                                                    ->placeholder('Use question default'),
                                                Toggle::make('is_required')
                                                    ->default(true),
                                            ])
                                            ->columns(4)
                                            ->columnSpanFull()
                                            ->defaultItems(0)
                                            ->addActionLabel('Add Question'),
                                    ]),

                                Section::make('Randomization Rules')
                                    ->schema([
                                        Repeater::make('randomizationRules')
                                            ->relationship()
                                            ->schema([
                                                Select::make('question_bank_id')
                                                    ->relationship('questionBank', 'name')
                                                    ->searchable()
                                                    ->preload()
                                                    ->required(),
                                                Select::make('question_category_id')
                                                    ->relationship('questionCategory', 'name')
                                                    ->searchable()
                                                    ->preload()
                                                    ->nullable(),
                                                Select::make('question_type')
                                                    ->options([
                                                        'mcq' => 'MCQ',
                                                        'true_false' => 'True/False',
                                                        'fill_blank' => 'Fill Blank',
                                                        'matching' => 'Matching',
                                                        'essay' => 'Essay',
                                                        'short_answer' => 'Short Answer',
                                                    ])
                                                    ->nullable(),
                                                Select::make('difficulty')
                                                    ->options([
                                                        'easy' => 'Easy',
                                                        'medium' => 'Medium',
                                                        'hard' => 'Hard',
                                                    ])
                                                    ->nullable(),
                                                TextInput::make('count')
                                                    ->numeric()
                                                    ->required()
                                                    ->minValue(1),
                                                TextInput::make('points_per_question')
                                                    ->numeric()
                                                    ->required()
                                                    ->minValue(0),
                                            ])
                                            ->columns(3)
                                            ->columnSpanFull()
                                            ->defaultItems(0)
                                            ->addActionLabel('Add Rule'),
                                    ]),
                            ])
                            ->columnSpan(2),

                        Section::make('Settings')
                            ->schema([
                                TextInput::make('slug')
                                    ->disabled()
                                    ->dehydrated(),
                                Select::make('show_results')
                                    ->options([
                                        'after_submission' => 'After Submission',
                                        'after_deadline' => 'After Deadline',
                                        'after_grading' => 'After Grading',
                                        'never' => 'Never',
                                    ])
                                    ->default('after_submission'),
                                Toggle::make('shuffle_questions')
                                    ->default(false),
                                Toggle::make('shuffle_options')
                                    ->default(false),
                                Toggle::make('allow_backtrack')
                                    ->default(true),
                                Toggle::make('is_proctored')
                                    ->default(false),
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
                TextColumn::make('title')
                    ->getStateUsing(fn ($record) => $record->getTranslation('title', 'ar', false) ?? $record->getTranslation('title', 'en', false))
                    ->searchable(query: function (Builder $query, string $search): Builder {
                        return $query->where('title', 'like', "%{$search}%");
                    })
                    ->limit(50),
                TextColumn::make('exam_type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'midterm' => 'warning',
                        'final' => 'danger',
                        'quiz' => 'info',
                        'assignment' => 'primary',
                        'practice' => 'success',
                        default => 'gray',
                    }),
                TextColumn::make('total_marks')
                    ->sortable(),
                TextColumn::make('duration_minutes')
                    ->label('Duration')
                    ->suffix(' min')
                    ->sortable(),
                TextColumn::make('exam_questions_count')
                    ->counts('examQuestions')
                    ->label('Questions'),
                TextColumn::make('starts_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(),
                TextColumn::make('ends_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(),
                IconColumn::make('is_published')
                    ->boolean(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('exam_type')
                    ->options([
                        'midterm' => 'Midterm',
                        'final' => 'Final',
                        'quiz' => 'Quiz',
                        'assignment' => 'Assignment',
                        'practice' => 'Practice',
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
            'index' => Pages\ListExams::route('/'),
            'create' => Pages\CreateExam::route('/create'),
            'edit' => Pages\EditExam::route('/{record}/edit'),
        ];
    }
}
