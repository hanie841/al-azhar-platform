<?php

namespace App\Filament\Resources;

use App\Filament\Resources\LmsLessonResource\Pages;
use App\Models\LmsLesson;
use App\Models\LmsModule;
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

class LmsLessonResource extends Resource
{
    protected static ?string $model = LmsLesson::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-play-circle';

    protected static string | \UnitEnum | null $navigationGroup = 'Learning Management';

    protected static ?int $navigationSort = 3;

    public static function form(Schema $form): Schema
    {
        return $form
            ->schema([
                Grid::make(3)
                    ->schema([
                        Grid::make(1)
                            ->schema([
                                Select::make('lms_module_id')
                                    ->label('Module')
                                    ->options(LmsModule::all()->pluck('title', 'id')->map(fn ($t) => is_array($t) ? ($t['ar'] ?? $t['en'] ?? '') : $t))
                                    ->searchable()
                                    ->required(),

                                Tabs::make('Translations')
                                    ->tabs([
                                        Tab::make('Arabic')
                                            ->schema([
                                                TextInput::make('title.ar')
                                                    ->label('العنوان')
                                                    ->required(),
                                                RichEditor::make('content.ar')
                                                    ->label('المحتوى')
                                                    ->columnSpanFull(),
                                            ]),
                                        Tab::make('English')
                                            ->schema([
                                                TextInput::make('title.en')
                                                    ->label('Title'),
                                                RichEditor::make('content.en')
                                                    ->label('Content')
                                                    ->columnSpanFull(),
                                            ]),
                                    ])
                                    ->columnSpanFull(),

                                Section::make('Media')
                                    ->schema([
                                        Select::make('content_type')
                                            ->options([
                                                'video' => 'Video',
                                                'document' => 'Document',
                                                'text' => 'Text',
                                                'quiz' => 'Quiz',
                                                'external' => 'External Link',
                                                'scorm' => 'SCORM',
                                            ])
                                            ->required(),
                                        FileUpload::make('file_path')
                                            ->directory('lms/lessons/files')
                                            ->disk('public'),
                                        TextInput::make('video_url')
                                            ->url()
                                            ->label('Video URL'),
                                        TextInput::make('external_url')
                                            ->url()
                                            ->label('External URL'),
                                        TextInput::make('duration_minutes')
                                            ->numeric()
                                            ->label('Duration (minutes)'),
                                    ])
                                    ->columns(2),
                            ])
                            ->columnSpan(2),

                        Section::make('Settings')
                            ->schema([
                                TextInput::make('order')
                                    ->numeric()
                                    ->default(0),
                                Toggle::make('is_published')
                                    ->default(false),
                                Toggle::make('is_downloadable')
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
                TextColumn::make('module.title')
                    ->getStateUsing(fn ($record) => $record->module?->getTranslation('title', 'ar', false))
                    ->label('Module')
                    ->limit(30),
                TextColumn::make('content_type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'video' => 'success',
                        'document' => 'info',
                        'text' => 'gray',
                        'quiz' => 'warning',
                        'external' => 'primary',
                        'scorm' => 'danger',
                        default => 'gray',
                    }),
                TextColumn::make('order')
                    ->sortable(),
                TextColumn::make('duration_minutes')
                    ->label('Duration')
                    ->suffix(' min')
                    ->toggleable(),
                ToggleColumn::make('is_published'),
            ])
            ->defaultSort('order')
            ->filters([
                Tables\Filters\SelectFilter::make('content_type')
                    ->options([
                        'video' => 'Video',
                        'document' => 'Document',
                        'text' => 'Text',
                        'quiz' => 'Quiz',
                        'external' => 'External',
                        'scorm' => 'SCORM',
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
            'index' => Pages\ListLmsLessons::route('/'),
            'create' => Pages\CreateLmsLesson::route('/create'),
            'edit' => Pages\EditLmsLesson::route('/{record}/edit'),
        ];
    }
}
