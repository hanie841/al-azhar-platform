<?php

namespace App\Filament\Resources;

use App\Filament\Resources\LmsCourseResource\Pages;
use App\Models\LmsCourse;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Section;
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

class LmsCourseResource extends Resource
{
    protected static ?string $model = LmsCourse::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-book-open';

    protected static string | \UnitEnum | null $navigationGroup = 'Learning Management';

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

                                Section::make('Details')
                                    ->schema([
                                        TextInput::make('course_section_id')
                                            ->label('Course Section ID')
                                            ->numeric()
                                            ->required(),
                                        FileUpload::make('cover_image')
                                            ->image()
                                            ->directory('lms/courses/covers')
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
                TextColumn::make('course_section_id')
                    ->label('Section ID')
                    ->sortable(),
                TextColumn::make('modules_count')
                    ->counts('modules')
                    ->label('Modules'),
                TextColumn::make('assignments_count')
                    ->counts('assignments')
                    ->label('Assignments'),
                ToggleColumn::make('is_published'),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
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
            'index' => Pages\ListLmsCourses::route('/'),
            'create' => Pages\CreateLmsCourse::route('/create'),
            'edit' => Pages\EditLmsCourse::route('/{record}/edit'),
        ];
    }
}
