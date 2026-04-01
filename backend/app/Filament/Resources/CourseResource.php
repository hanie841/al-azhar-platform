<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CourseResource\Pages;
use App\Models\Course;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Tabs;
use Filament\Forms\Components\Tabs\Tab;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\RichEditor;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class CourseResource extends Resource
{
    protected static ?string $model = Course::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-book-open';

    protected static string | \UnitEnum | null $navigationGroup = 'Student Information System';

    protected static ?int $navigationSort = 5;

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
                                                TextInput::make('name.ar')
                                                    ->label('الاسم')
                                                    ->required(),
                                                RichEditor::make('description.ar')
                                                    ->label('الوصف')
                                                    ->columnSpanFull(),
                                            ]),
                                        Tab::make('English')
                                            ->schema([
                                                TextInput::make('name.en')
                                                    ->label('Name'),
                                                RichEditor::make('description.en')
                                                    ->label('Description')
                                                    ->columnSpanFull(),
                                            ]),
                                    ])
                                    ->columnSpanFull(),

                                Section::make('Course Details')
                                    ->schema([
                                        TextInput::make('code')
                                            ->required()
                                            ->unique(ignoreRecord: true),
                                        Select::make('faculty_id')
                                            ->relationship('faculty', 'name')
                                            ->getOptionLabelFromRecordUsing(fn ($record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false))
                                            ->required()
                                            ->searchable()
                                            ->preload(),
                                        Select::make('department_id')
                                            ->relationship('department', 'name')
                                            ->getOptionLabelFromRecordUsing(fn ($record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false))
                                            ->searchable()
                                            ->preload(),
                                        Select::make('course_type')
                                            ->options([
                                                'required' => 'Required',
                                                'elective' => 'Elective',
                                                'university_requirement' => 'University Requirement',
                                                'faculty_requirement' => 'Faculty Requirement',
                                            ])
                                            ->default('required'),
                                        Select::make('academic_level')
                                            ->options([
                                                'first' => 'First Year',
                                                'second' => 'Second Year',
                                                'third' => 'Third Year',
                                                'fourth' => 'Fourth Year',
                                                'fifth' => 'Fifth Year',
                                                'sixth' => 'Sixth Year',
                                            ]),
                                    ])
                                    ->columns(2),

                                Section::make('Hours')
                                    ->schema([
                                        TextInput::make('credit_hours')
                                            ->numeric()
                                            ->required()
                                            ->minValue(1),
                                        TextInput::make('lecture_hours')
                                            ->numeric()
                                            ->default(0),
                                        TextInput::make('lab_hours')
                                            ->numeric()
                                            ->default(0),
                                    ])
                                    ->columns(3),
                            ])
                            ->columnSpan(2),

                        Section::make('Settings')
                            ->schema([
                                TextInput::make('slug')
                                    ->disabled()
                                    ->dehydrated(),
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
                TextColumn::make('code')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('name')
                    ->getStateUsing(fn ($record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false))
                    ->searchable(query: fn (Builder $query, string $search) => $query->where('name', 'like', "%{$search}%"))
                    ->limit(40),
                TextColumn::make('faculty.name')
                    ->getStateUsing(fn ($record) => $record->faculty?->getTranslation('name', 'ar', false))
                    ->label('Faculty')
                    ->limit(30)
                    ->toggleable(),
                TextColumn::make('credit_hours')
                    ->sortable(),
                TextColumn::make('course_type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'required' => 'success',
                        'elective' => 'info',
                        'university_requirement' => 'warning',
                        'faculty_requirement' => 'primary',
                        default => 'gray',
                    }),
                TextColumn::make('academic_level')
                    ->badge()
                    ->toggleable(),
                ToggleColumn::make('is_active'),
            ])
            ->defaultSort('code')
            ->filters([
                Tables\Filters\SelectFilter::make('faculty_id')
                    ->relationship('faculty', 'name')
                    ->getOptionLabelFromRecordUsing(fn ($record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false))
                    ->label('Faculty')
                    ->searchable()
                    ->preload(),
                Tables\Filters\SelectFilter::make('course_type')
                    ->options([
                        'required' => 'Required',
                        'elective' => 'Elective',
                        'university_requirement' => 'University Requirement',
                        'faculty_requirement' => 'Faculty Requirement',
                    ]),
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
            'index' => Pages\ListCourses::route('/'),
            'create' => Pages\CreateCourse::route('/create'),
            'edit' => Pages\EditCourse::route('/{record}/edit'),
        ];
    }
}
