<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AdmissionResource\Pages;
use App\Models\Admission;
use Filament\Forms\Components\DatePicker;
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

class AdmissionResource extends Resource
{
    protected static ?string $model = Admission::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-document-text';

    protected static string | \UnitEnum | null $navigationGroup = 'Student Information System';

    protected static ?int $navigationSort = 4;

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

                                Section::make('Applicant Information')
                                    ->schema([
                                        TextInput::make('email')
                                            ->email()
                                            ->required(),
                                        TextInput::make('phone')
                                            ->required(),
                                        TextInput::make('national_id'),
                                        DatePicker::make('date_of_birth'),
                                        Select::make('gender')
                                            ->options([
                                                'male' => 'Male',
                                                'female' => 'Female',
                                            ])
                                            ->required(),
                                        TextInput::make('nationality'),
                                        Textarea::make('address')
                                            ->columnSpanFull(),
                                    ])
                                    ->columns(2),

                                Section::make('Academic Choices')
                                    ->schema([
                                        Select::make('academic_year_id')
                                            ->relationship('academicYear', 'name')
                                            ->getOptionLabelFromRecordUsing(fn ($record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false))
                                            ->required()
                                            ->searchable()
                                            ->preload(),
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
                                        Select::make('academic_program_id')
                                            ->relationship('academicProgram', 'name')
                                            ->getOptionLabelFromRecordUsing(fn ($record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false))
                                            ->searchable()
                                            ->preload(),
                                        Select::make('degree_level')
                                            ->options([
                                                'bachelor' => 'Bachelor',
                                                'master' => 'Master',
                                                'phd' => 'PhD',
                                                'diploma' => 'Diploma',
                                            ])
                                            ->required(),
                                    ])
                                    ->columns(2),

                                Section::make('Previous Education')
                                    ->schema([
                                        TextInput::make('high_school_score')
                                            ->numeric()
                                            ->step(0.01)
                                            ->minValue(0)
                                            ->maxValue(100),
                                        TextInput::make('previous_degree'),
                                        TextInput::make('previous_university'),
                                        TextInput::make('previous_gpa')
                                            ->numeric()
                                            ->step(0.01)
                                            ->minValue(0)
                                            ->maxValue(4),
                                    ])
                                    ->columns(2),
                            ])
                            ->columnSpan(2),

                        Section::make('Review')
                            ->schema([
                                TextInput::make('application_number')
                                    ->disabled()
                                    ->dehydrated(),
                                Select::make('status')
                                    ->options([
                                        'pending' => 'Pending',
                                        'under_review' => 'Under Review',
                                        'accepted' => 'Accepted',
                                        'rejected' => 'Rejected',
                                        'waitlisted' => 'Waitlisted',
                                    ])
                                    ->default('pending'),
                                Textarea::make('rejection_reason')
                                    ->visible(fn ($get) => $get('status') === 'rejected'),
                                Textarea::make('notes'),
                            ])
                            ->columnSpan(1),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('application_number')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('name')
                    ->getStateUsing(fn ($record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false))
                    ->searchable(query: fn (Builder $query, string $search) => $query->where('name', 'like', "%{$search}%"))
                    ->limit(40),
                TextColumn::make('email')
                    ->searchable()
                    ->toggleable(),
                TextColumn::make('faculty.name')
                    ->getStateUsing(fn ($record) => $record->faculty?->getTranslation('name', 'ar', false))
                    ->label('Faculty')
                    ->limit(30),
                TextColumn::make('degree_level')
                    ->badge(),
                TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending' => 'gray',
                        'under_review' => 'warning',
                        'accepted' => 'success',
                        'rejected' => 'danger',
                        'waitlisted' => 'info',
                        default => 'gray',
                    }),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'under_review' => 'Under Review',
                        'accepted' => 'Accepted',
                        'rejected' => 'Rejected',
                        'waitlisted' => 'Waitlisted',
                    ]),
                Tables\Filters\SelectFilter::make('faculty_id')
                    ->relationship('faculty', 'name')
                    ->getOptionLabelFromRecordUsing(fn ($record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false))
                    ->label('Faculty')
                    ->searchable()
                    ->preload(),
                Tables\Filters\SelectFilter::make('academic_year_id')
                    ->relationship('academicYear', 'name')
                    ->getOptionLabelFromRecordUsing(fn ($record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false))
                    ->label('Academic Year')
                    ->searchable()
                    ->preload(),
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
            'index' => Pages\ListAdmissions::route('/'),
            'create' => Pages\CreateAdmission::route('/create'),
            'edit' => Pages\EditAdmission::route('/{record}/edit'),
        ];
    }
}
