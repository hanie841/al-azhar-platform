<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ExamAttemptResource\Pages;
use App\Models\ExamAttempt;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ExamAttemptResource extends Resource
{
    protected static ?string $model = ExamAttempt::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-document-text';

    protected static string | \UnitEnum | null $navigationGroup = 'Examination System';

    protected static ?int $navigationSort = 4;

    public static function form(Schema $form): Schema
    {
        return $form
            ->schema([
                Grid::make(3)
                    ->schema([
                        Grid::make(1)
                            ->schema([
                                Section::make('Attempt Information')
                                    ->schema([
                                        Placeholder::make('exam_title')
                                            ->label('Exam')
                                            ->content(fn ($record) => $record->exam?->getTranslation('title', 'ar', false) ?? $record->exam?->getTranslation('title', 'en', false)),
                                        Placeholder::make('student_name')
                                            ->label('Student')
                                            ->content(fn ($record) => $record->student?->user?->name ?? 'Student #' . $record->student_id),
                                        Placeholder::make('attempt_number_display')
                                            ->label('Attempt #')
                                            ->content(fn ($record) => $record->attempt_number),
                                        Placeholder::make('status_display')
                                            ->label('Status')
                                            ->content(fn ($record) => ucfirst(str_replace('_', ' ', $record->status))),
                                    ])
                                    ->columns(2),

                                Section::make('Timing')
                                    ->schema([
                                        Placeholder::make('started_at_display')
                                            ->label('Started At')
                                            ->content(fn ($record) => $record->started_at?->format('Y-m-d H:i:s')),
                                        Placeholder::make('submitted_at_display')
                                            ->label('Submitted At')
                                            ->content(fn ($record) => $record->submitted_at?->format('Y-m-d H:i:s') ?? '-'),
                                        Placeholder::make('time_spent_display')
                                            ->label('Time Spent')
                                            ->content(fn ($record) => $record->time_spent_seconds
                                                ? gmdate('H:i:s', $record->time_spent_seconds)
                                                : '-'),
                                    ])
                                    ->columns(3),

                                Section::make('Answers')
                                    ->schema([
                                        Placeholder::make('answers_display')
                                            ->label('')
                                            ->content(function ($record) {
                                                $answers = $record->answers()->with(['question', 'examQuestion'])->get();
                                                if ($answers->isEmpty()) {
                                                    return 'No answers recorded.';
                                                }

                                                $html = '<div class="space-y-3">';
                                                foreach ($answers as $i => $answer) {
                                                    $q = $answer->question;
                                                    $questionText = strip_tags($q->getTranslation('content', 'ar', false) ?? $q->getTranslation('content', 'en', false) ?? '');
                                                    $score = $answer->final_score !== null ? $answer->final_score : 'Not graded';
                                                    $maxPts = $answer->examQuestion->getEffectivePoints();
                                                    $bgColor = $answer->is_correct === true ? '#dcfce7' : ($answer->is_correct === false ? '#fef2f2' : '#f3f4f6');

                                                    $html .= "<div style='padding:8px;border-radius:6px;background:{$bgColor};margin-bottom:4px;'>";
                                                    $html .= "<strong>Q" . ($i + 1) . " ({$q->question_type}):</strong> " . mb_substr($questionText, 0, 100);
                                                    $html .= "<br><strong>Answer:</strong> " . (is_array($answer->answer_content) ? json_encode($answer->answer_content) : ($answer->answer_content ?? '-'));
                                                    $html .= " | <strong>Score:</strong> {$score} / {$maxPts}";
                                                    if ($answer->feedback) {
                                                        $html .= "<br><em>Feedback: {$answer->feedback}</em>";
                                                    }
                                                    $html .= '</div>';
                                                }
                                                $html .= '</div>';

                                                return new \Illuminate\Support\HtmlString($html);
                                            })
                                            ->columnSpanFull(),
                                    ]),
                            ])
                            ->columnSpan(2),

                        Section::make('Scoring')
                            ->schema([
                                Placeholder::make('total_score_display')
                                    ->label('Total Score')
                                    ->content(fn ($record) => $record->total_score !== null ? $record->total_score . ' / ' . $record->exam?->total_marks : 'Not graded'),
                                Placeholder::make('percentage_display')
                                    ->label('Percentage')
                                    ->content(fn ($record) => $record->percentage !== null ? $record->percentage . '%' : '-'),
                                Placeholder::make('is_passed_display')
                                    ->label('Passed')
                                    ->content(fn ($record) => match ($record->is_passed) {
                                        true => 'Yes',
                                        false => 'No',
                                        null => '-',
                                    }),
                                Placeholder::make('graded_by_display')
                                    ->label('Graded By')
                                    ->content(fn ($record) => $record->grader?->name ?? '-'),
                                Placeholder::make('graded_at_display')
                                    ->label('Graded At')
                                    ->content(fn ($record) => $record->graded_at?->format('Y-m-d H:i:s') ?? '-'),
                                Placeholder::make('ip_display')
                                    ->label('IP Address')
                                    ->content(fn ($record) => $record->ip_address ?? '-'),
                            ])
                            ->columnSpan(1),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('exam.title')
                    ->getStateUsing(fn ($record) => $record->exam?->getTranslation('title', 'ar', false) ?? $record->exam?->getTranslation('title', 'en', false))
                    ->label('Exam')
                    ->limit(40)
                    ->searchable(query: function ($query, string $search) {
                        return $query->whereHas('exam', fn ($q) => $q->where('title', 'like', "%{$search}%"));
                    }),
                TextColumn::make('student_id')
                    ->label('Student'),
                TextColumn::make('attempt_number')
                    ->label('Attempt #'),
                TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'in_progress' => 'warning',
                        'submitted' => 'info',
                        'graded' => 'success',
                        default => 'gray',
                    }),
                TextColumn::make('total_score')
                    ->sortable(),
                TextColumn::make('percentage')
                    ->suffix('%')
                    ->sortable(),
                IconColumn::make('is_passed')
                    ->boolean()
                    ->label('Passed'),
                TextColumn::make('started_at')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('submitted_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(),
            ])
            ->defaultSort('started_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'in_progress' => 'In Progress',
                        'submitted' => 'Submitted',
                        'graded' => 'Graded',
                    ]),
                Tables\Filters\TernaryFilter::make('is_passed')
                    ->label('Passed'),
            ])
            ->actions([
                \Filament\Actions\EditAction::make()
                    ->label('View'),
            ])
            ->bulkActions([]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListExamAttempts::route('/'),
            'edit' => Pages\EditExamAttempt::route('/{record}/edit'),
        ];
    }

    public static function canCreate(): bool
    {
        return false;
    }
}
