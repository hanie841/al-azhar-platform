<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CourseSectionResource\Pages;
use App\Models\CourseSection;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\KeyValue;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class CourseSectionResource extends Resource
{
    protected static ?string $model = CourseSection::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-rectangle-group';

    protected static string | \UnitEnum | null $navigationGroup = 'Student Information System';

    protected static ?int $navigationSort = 7;

    public static function form(Schema $form): Schema
    {
        return $form
            ->schema([
                Section::make('Section Details')
                    ->schema([
                        Select::make('course_id')
                            ->relationship('course', 'code')
                            ->getOptionLabelFromRecordUsing(fn ($record) => $record->code . ' - ' . ($record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false)))
                            ->required()
                            ->searchable()
                            ->preload(),
                        Select::make('semester_id')
                            ->relationship('semester', 'name')
                            ->getOptionLabelFromRecordUsing(fn ($record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false))
                            ->required()
                            ->searchable()
                            ->preload(),
                        TextInput::make('section_number')
                            ->required(),
                        Select::make('instructor_id')
                            ->relationship('instructor', 'name')
                            ->searchable()
                            ->preload(),
                    ])
                    ->columns(2),

                Section::make('Location & Capacity')
                    ->schema([
                        TextInput::make('room'),
                        TextInput::make('building'),
                        TextInput::make('capacity')
                            ->numeric()
                            ->default(40)
                            ->minValue(1),
                        TextInput::make('enrolled_count')
                            ->numeric()
                            ->default(0)
                            ->disabled()
                            ->dehydrated(),
                    ])
                    ->columns(2),

                Section::make('Schedule & Status')
                    ->schema([
                        KeyValue::make('schedule')
                            ->keyLabel('Day')
                            ->valueLabel('Time')
                            ->columnSpanFull(),
                        Toggle::make('is_active')
                            ->default(true),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('course.code')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('course.name')
                    ->getStateUsing(fn ($record) => $record->course?->getTranslation('name', 'ar', false) ?? $record->course?->getTranslation('name', 'en', false))
                    ->label('Course Name')
                    ->limit(30),
                TextColumn::make('section_number')
                    ->sortable(),
                TextColumn::make('semester.name')
                    ->getStateUsing(fn ($record) => $record->semester?->getTranslation('name', 'ar', false))
                    ->label('Semester'),
                TextColumn::make('instructor.name')
                    ->label('Instructor')
                    ->toggleable(),
                TextColumn::make('room')
                    ->toggleable(),
                TextColumn::make('enrolled_count')
                    ->label('Enrolled')
                    ->suffix(fn ($record) => '/' . $record->capacity),
                ToggleColumn::make('is_active'),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('semester_id')
                    ->relationship('semester', 'name')
                    ->getOptionLabelFromRecordUsing(fn ($record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false))
                    ->label('Semester')
                    ->searchable()
                    ->preload(),
                Tables\Filters\SelectFilter::make('course_id')
                    ->relationship('course', 'code')
                    ->label('Course')
                    ->searchable()
                    ->preload(),
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
            'index' => Pages\ListCourseSections::route('/'),
            'create' => Pages\CreateCourseSection::route('/create'),
            'edit' => Pages\EditCourseSection::route('/{record}/edit'),
        ];
    }
}
