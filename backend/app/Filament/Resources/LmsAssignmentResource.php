<?php

namespace App\Filament\Resources;

use App\Filament\Resources\LmsAssignmentResource\Pages;
use App\Models\LmsAssignment;
use App\Models\LmsCourse;
use Filament\Forms\Components\DateTimePicker;
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

class LmsAssignmentResource extends Resource
{
    protected static ?string $model = LmsAssignment::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-clipboard-document-check';

    protected static string | \UnitEnum | null $navigationGroup = 'Learning Management';

    protected static ?int $navigationSort = 4;

    public static function form(Schema $form): Schema
    {
        return $form
            ->schema([
                Grid::make(3)
                    ->schema([
                        Grid::make(1)
                            ->schema([
                                Select::make('lms_course_id')
                                    ->label('Course')
                                    ->options(LmsCourse::all()->pluck('title', 'id')->map(fn ($t) => is_array($t) ? ($t['ar'] ?? $t['en'] ?? '') : $t))
                                    ->searchable()
                                    ->required(),

                                Tabs::make('Translations')
                                    ->tabs([
                                        Tab::make('Arabic')
                                            ->schema([
                                                TextInput::make('title.ar')
                                                    ->label('العنوان')
                                                    ->required(),
                                                RichEditor::make('description.ar')
                                                    ->label('الوصف')
                                                    ->columnSpanFull(),
                                            ]),
                                        Tab::make('English')
                                            ->schema([
                                                TextInput::make('title.en')
                                                    ->label('Title'),
                                                RichEditor::make('description.en')
                                                    ->label('Description')
                                                    ->columnSpanFull(),
                                            ]),
                                    ])
                                    ->columnSpanFull(),

                                Section::make('Assignment Details')
                                    ->schema([
                                        Select::make('assignment_type')
                                            ->options([
                                                'essay' => 'Essay',
                                                'file_upload' => 'File Upload',
                                                'quiz' => 'Quiz',
                                                'project' => 'Project',
                                                'presentation' => 'Presentation',
                                                'code' => 'Code',
                                            ])
                                            ->required(),
                                        TextInput::make('max_score')
                                            ->numeric()
                                            ->default(100)
                                            ->minValue(0),
                                        TextInput::make('weight_percentage')
                                            ->numeric()
                                            ->suffix('%')
                                            ->minValue(0)
                                            ->maxValue(100),
                                        DateTimePicker::make('due_date'),
                                        TextInput::make('max_attempts')
                                            ->numeric()
                                            ->default(1)
                                            ->minValue(1),
                                    ])
                                    ->columns(2),

                                Section::make('Late Submission')
                                    ->schema([
                                        Toggle::make('allow_late')
                                            ->default(false),
                                        TextInput::make('late_penalty_percent')
                                            ->numeric()
                                            ->default(0)
                                            ->suffix('%')
                                            ->minValue(0)
                                            ->maxValue(100),
                                    ])
                                    ->columns(2),
                            ])
                            ->columnSpan(2),

                        Section::make('Settings')
                            ->schema([
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
                TextColumn::make('course.title')
                    ->getStateUsing(fn ($record) => $record->course?->getTranslation('title', 'ar', false))
                    ->label('Course')
                    ->limit(30),
                TextColumn::make('assignment_type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'essay' => 'info',
                        'file_upload' => 'success',
                        'quiz' => 'warning',
                        'project' => 'primary',
                        'presentation' => 'danger',
                        'code' => 'gray',
                        default => 'gray',
                    }),
                TextColumn::make('max_score')
                    ->sortable(),
                TextColumn::make('due_date')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('submissions_count')
                    ->counts('submissions')
                    ->label('Submissions'),
                ToggleColumn::make('is_published'),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('assignment_type')
                    ->options([
                        'essay' => 'Essay',
                        'file_upload' => 'File Upload',
                        'quiz' => 'Quiz',
                        'project' => 'Project',
                        'presentation' => 'Presentation',
                        'code' => 'Code',
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
            'index' => Pages\ListLmsAssignments::route('/'),
            'create' => Pages\CreateLmsAssignment::route('/create'),
            'edit' => Pages\EditLmsAssignment::route('/{record}/edit'),
        ];
    }
}
