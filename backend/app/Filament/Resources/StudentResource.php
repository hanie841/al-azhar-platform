<?php

namespace App\Filament\Resources;

use App\Filament\Resources\StudentResource\Pages;
use App\Models\Student;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Tabs;
use Filament\Forms\Components\Tabs\Tab;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class StudentResource extends Resource
{
    protected static ?string $model = Student::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-user-group';

    protected static string | \UnitEnum | null $navigationGroup = 'Student Information System';

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
                                                TextInput::make('name.ar')
                                                    ->label('الاسم')
                                                    ->required(),
                                            ]),
                                        Tab::make('English')
                                            ->schema([
                                                TextInput::make('name.en')
                                                    ->label('Name'),
                                            ]),
                                    ])
                                    ->columnSpanFull(),

                                Section::make('Personal Information')
                                    ->schema([
                                        Select::make('user_id')
                                            ->relationship('user', 'name')
                                            ->required()
                                            ->searchable()
                                            ->preload(),
                                        TextInput::make('national_id'),
                                        DatePicker::make('date_of_birth'),
                                        Select::make('gender')
                                            ->options([
                                                'male' => 'Male',
                                                'female' => 'Female',
                                            ]),
                                        TextInput::make('nationality'),
                                        TextInput::make('phone')
                                            ->tel(),
                                        Textarea::make('address')
                                            ->columnSpanFull(),
                                    ])
                                    ->columns(2),

                                Section::make('Academic Information')
                                    ->schema([
                                        Select::make('faculty_id')
                                            ->relationship('faculty', 'name')
                                            ->getOptionLabelFromRecordUsing(fn ($record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false))
                                            ->searchable()
                                            ->preload(),
                                        Select::make('department_id')
                                            ->relationship('department', 'name')
                                            ->getOptionLabelFromRecordUsing(fn ($record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false))
                                            ->searchable()
                                            ->preload(),
                                        Select::make('academic_program_id')
                                            ->relationship('academicProgram', 'name')
                                            ->getOptionLabelFromRecordUsing(fn ($record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false))
                                            ->searchable()
                                            ->preload(),
                                        Select::make('academic_level')
                                            ->options([
                                                'first' => 'First Year',
                                                'second' => 'Second Year',
                                                'third' => 'Third Year',
                                                'fourth' => 'Fourth Year',
                                                'fifth' => 'Fifth Year',
                                                'sixth' => 'Sixth Year',
                                            ]),
                                        Select::make('academic_status')
                                            ->options([
                                                'active' => 'Active',
                                                'suspended' => 'Suspended',
                                                'graduated' => 'Graduated',
                                                'withdrawn' => 'Withdrawn',
                                                'dismissed' => 'Dismissed',
                                            ])
                                            ->default('active'),
                                        DatePicker::make('enrollment_date'),
                                        DatePicker::make('expected_graduation'),
                                    ])
                                    ->columns(2),
                            ])
                            ->columnSpan(2),

                        Section::make('Settings')
                            ->schema([
                                TextInput::make('student_id_number')
                                    ->disabled()
                                    ->dehydrated(),
                                TextInput::make('cgpa')
                                    ->numeric()
                                    ->step(0.01)
                                    ->minValue(0)
                                    ->maxValue(4),
                                TextInput::make('total_credit_hours')
                                    ->numeric()
                                    ->default(0),
                                TextInput::make('total_earned_hours')
                                    ->numeric()
                                    ->default(0),
                                FileUpload::make('photo')
                                    ->image()
                                    ->directory('students/photos')
                                    ->disk('public'),
                            ])
                            ->columnSpan(1),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('student_id_number')
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
                TextColumn::make('academic_level')
                    ->badge()
                    ->toggleable(),
                TextColumn::make('academic_status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'active' => 'success',
                        'suspended' => 'warning',
                        'graduated' => 'info',
                        'withdrawn' => 'gray',
                        'dismissed' => 'danger',
                        default => 'gray',
                    }),
                TextColumn::make('cgpa')
                    ->sortable(),
                TextColumn::make('enrollment_date')
                    ->date()
                    ->sortable()
                    ->toggleable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('faculty_id')
                    ->relationship('faculty', 'name')
                    ->getOptionLabelFromRecordUsing(fn ($record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false))
                    ->label('Faculty')
                    ->searchable()
                    ->preload(),
                Tables\Filters\SelectFilter::make('academic_status')
                    ->options([
                        'active' => 'Active',
                        'suspended' => 'Suspended',
                        'graduated' => 'Graduated',
                        'withdrawn' => 'Withdrawn',
                        'dismissed' => 'Dismissed',
                    ]),
                Tables\Filters\SelectFilter::make('academic_level')
                    ->options([
                        'first' => 'First Year',
                        'second' => 'Second Year',
                        'third' => 'Third Year',
                        'fourth' => 'Fourth Year',
                        'fifth' => 'Fifth Year',
                        'sixth' => 'Sixth Year',
                    ]),
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
            'index' => Pages\ListStudents::route('/'),
            'create' => Pages\CreateStudent::route('/create'),
            'edit' => Pages\EditStudent::route('/{record}/edit'),
        ];
    }
}
