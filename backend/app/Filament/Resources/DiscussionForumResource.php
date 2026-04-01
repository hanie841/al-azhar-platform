<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DiscussionForumResource\Pages;
use App\Models\DiscussionForum;
use App\Models\LmsCourse;
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
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class DiscussionForumResource extends Resource
{
    protected static ?string $model = DiscussionForum::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-chat-bubble-left-right';

    protected static string | \UnitEnum | null $navigationGroup = 'Learning Management';

    protected static ?int $navigationSort = 5;

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
                            ])
                            ->columnSpan(2),

                        Section::make('Settings')
                            ->schema([
                                TextInput::make('order')
                                    ->numeric()
                                    ->default(0),
                                Toggle::make('is_locked')
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
                TextColumn::make('threads_count')
                    ->counts('threads')
                    ->label('Threads'),
                TextColumn::make('order')
                    ->sortable(),
                IconColumn::make('is_locked')
                    ->boolean(),
            ])
            ->defaultSort('order')
            ->filters([
                Tables\Filters\SelectFilter::make('lms_course_id')
                    ->label('Course')
                    ->options(LmsCourse::all()->pluck('title', 'id')->map(fn ($t) => is_array($t) ? ($t['ar'] ?? $t['en'] ?? '') : $t)),
                Tables\Filters\TernaryFilter::make('is_locked'),
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
            'index' => Pages\ListDiscussionForums::route('/'),
            'create' => Pages\CreateDiscussionForum::route('/create'),
            'edit' => Pages\EditDiscussionForum::route('/{record}/edit'),
        ];
    }
}
