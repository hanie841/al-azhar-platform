<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FacultyProfileResource\Pages;
use App\Models\FacultyProfile;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Tabs;
use Filament\Forms\Components\Tabs\Tab;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class FacultyProfileResource extends Resource
{
    protected static ?string $model = FacultyProfile::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-user-circle';

    protected static string | \UnitEnum | null $navigationGroup = 'Faculty Portal';

    protected static ?int $navigationSort = 1;

    public static function form(Schema $form): Schema
    {
        return $form
            ->schema([
                Grid::make(3)
                    ->schema([
                        Grid::make(1)
                            ->schema([
                                Section::make('Assignment')
                                    ->schema([
                                        Select::make('user_id')
                                            ->relationship('user', 'name')
                                            ->searchable()
                                            ->preload()
                                            ->required(),
                                        Select::make('faculty_id')
                                            ->relationship('faculty', 'name')
                                            ->searchable()
                                            ->preload()
                                            ->nullable(),
                                        Select::make('department_id')
                                            ->relationship('department', 'name')
                                            ->searchable()
                                            ->preload()
                                            ->nullable(),
                                        Select::make('academic_rank')
                                            ->options([
                                                'professor' => 'Professor',
                                                'associate_professor' => 'Associate Professor',
                                                'assistant_professor' => 'Assistant Professor',
                                                'lecturer' => 'Lecturer',
                                                'teaching_assistant' => 'Teaching Assistant',
                                                'researcher' => 'Researcher',
                                            ])
                                            ->nullable(),
                                        TextInput::make('employee_id')
                                            ->maxLength(50)
                                            ->unique(ignoreRecord: true)
                                            ->nullable(),
                                    ])
                                    ->columns(2),

                                Tabs::make('Translations')
                                    ->tabs([
                                        Tab::make('Arabic')
                                            ->schema([
                                                TextInput::make('title.ar')
                                                    ->label('اللقب'),
                                                TextInput::make('specialization.ar')
                                                    ->label('التخصص'),
                                                RichEditor::make('bio.ar')
                                                    ->label('السيرة الذاتية')
                                                    ->columnSpanFull(),
                                            ]),
                                        Tab::make('English')
                                            ->schema([
                                                TextInput::make('title.en')
                                                    ->label('Title'),
                                                TextInput::make('specialization.en')
                                                    ->label('Specialization'),
                                                RichEditor::make('bio.en')
                                                    ->label('Bio')
                                                    ->columnSpanFull(),
                                            ]),
                                    ])
                                    ->columnSpanFull(),

                                Section::make('Contact & Office')
                                    ->schema([
                                        TextInput::make('phone')
                                            ->tel()
                                            ->nullable(),
                                        TextInput::make('office_location')
                                            ->maxLength(255)
                                            ->nullable(),
                                    ])
                                    ->columns(2),

                                Section::make('Qualifications')
                                    ->schema([
                                        Repeater::make('qualifications')
                                            ->schema([
                                                TextInput::make('degree')
                                                    ->required(),
                                                TextInput::make('institution')
                                                    ->required(),
                                                TextInput::make('year')
                                                    ->nullable(),
                                            ])
                                            ->columns(3)
                                            ->defaultItems(0)
                                            ->columnSpanFull(),
                                    ]),

                                Section::make('Office Hours')
                                    ->schema([
                                        Repeater::make('office_hours')
                                            ->schema([
                                                Select::make('day')
                                                    ->options([
                                                        'sunday' => 'Sunday',
                                                        'monday' => 'Monday',
                                                        'tuesday' => 'Tuesday',
                                                        'wednesday' => 'Wednesday',
                                                        'thursday' => 'Thursday',
                                                        'saturday' => 'Saturday',
                                                    ])
                                                    ->required(),
                                                TextInput::make('start')
                                                    ->placeholder('09:00')
                                                    ->required(),
                                                TextInput::make('end')
                                                    ->placeholder('11:00')
                                                    ->required(),
                                            ])
                                            ->columns(3)
                                            ->defaultItems(0)
                                            ->columnSpanFull(),
                                    ]),

                                Section::make('Research')
                                    ->schema([
                                        TagsInput::make('research_interests')
                                            ->placeholder('Add research interest')
                                            ->columnSpanFull(),
                                        TextInput::make('publications_count')
                                            ->numeric()
                                            ->default(0)
                                            ->minValue(0),
                                    ]),

                                Section::make('External Links')
                                    ->schema([
                                        TextInput::make('website_url')
                                            ->url()
                                            ->nullable(),
                                        TextInput::make('google_scholar_url')
                                            ->url()
                                            ->nullable(),
                                        TextInput::make('orcid')
                                            ->maxLength(50)
                                            ->nullable(),
                                        TextInput::make('scopus_id')
                                            ->maxLength(50)
                                            ->nullable(),
                                    ])
                                    ->columns(2),

                                Section::make('Files')
                                    ->schema([
                                        FileUpload::make('cv_file_path')
                                            ->label('CV')
                                            ->directory('cvs')
                                            ->disk('public')
                                            ->acceptedFileTypes(['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
                                            ->nullable(),
                                        FileUpload::make('photo')
                                            ->image()
                                            ->directory('faculty-photos')
                                            ->disk('public')
                                            ->nullable(),
                                    ])
                                    ->columns(2),
                            ])
                            ->columnSpan(2),

                        Section::make('Settings')
                            ->schema([
                                Toggle::make('is_active')
                                    ->default(true),
                                Toggle::make('is_public')
                                    ->default(true),
                                DatePicker::make('joined_at')
                                    ->nullable(),
                            ])
                            ->columnSpan(1),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')
                    ->label('Name')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('faculty.name')
                    ->label('Faculty')
                    ->getStateUsing(fn ($record) => $record->faculty?->getTranslation('name', 'ar', false))
                    ->toggleable(),
                TextColumn::make('department.name')
                    ->label('Department')
                    ->getStateUsing(fn ($record) => $record->department?->getTranslation('name', 'ar', false))
                    ->toggleable(),
                TextColumn::make('academic_rank')
                    ->badge()
                    ->color(fn (?string $state): string => match ($state) {
                        'professor' => 'success',
                        'associate_professor' => 'info',
                        'assistant_professor' => 'primary',
                        'lecturer' => 'warning',
                        'teaching_assistant' => 'gray',
                        'researcher' => 'danger',
                        default => 'gray',
                    })
                    ->toggleable(),
                TextColumn::make('publications_count')
                    ->label('Publications')
                    ->sortable(),
                IconColumn::make('is_active')
                    ->boolean(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('faculty_id')
                    ->relationship('faculty', 'name')
                    ->label('Faculty')
                    ->searchable()
                    ->preload(),
                Tables\Filters\SelectFilter::make('department_id')
                    ->relationship('department', 'name')
                    ->label('Department')
                    ->searchable()
                    ->preload(),
                Tables\Filters\SelectFilter::make('academic_rank')
                    ->options([
                        'professor' => 'Professor',
                        'associate_professor' => 'Associate Professor',
                        'assistant_professor' => 'Assistant Professor',
                        'lecturer' => 'Lecturer',
                        'teaching_assistant' => 'Teaching Assistant',
                        'researcher' => 'Researcher',
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
            'index' => Pages\ListFacultyProfiles::route('/'),
            'create' => Pages\CreateFacultyProfile::route('/create'),
            'edit' => Pages\EditFacultyProfile::route('/{record}/edit'),
        ];
    }
}
