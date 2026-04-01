<?php

namespace App\Filament\Resources;

use App\Filament\Resources\StudyPlanResource\Pages;
use App\Models\StudyPlan;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Grid;
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
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class StudyPlanResource extends Resource
{
    protected static ?string $model = StudyPlan::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-clipboard-document-list';

    protected static string | \UnitEnum | null $navigationGroup = 'Student Information System';

    protected static ?int $navigationSort = 6;

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

                                Section::make('Details')
                                    ->schema([
                                        Select::make('academic_program_id')
                                            ->relationship('academicProgram', 'name')
                                            ->getOptionLabelFromRecordUsing(fn ($record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false))
                                            ->required()
                                            ->searchable()
                                            ->preload(),
                                        TextInput::make('total_credit_hours')
                                            ->numeric()
                                            ->required()
                                            ->minValue(1),
                                        TextInput::make('total_semesters')
                                            ->numeric()
                                            ->required()
                                            ->minValue(1),
                                        DatePicker::make('approved_at'),
                                    ])
                                    ->columns(2),
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
                TextColumn::make('name')
                    ->getStateUsing(fn ($record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false))
                    ->searchable(query: fn (Builder $query, string $search) => $query->where('name', 'like', "%{$search}%"))
                    ->limit(50),
                TextColumn::make('academicProgram.name')
                    ->getStateUsing(fn ($record) => $record->academicProgram?->getTranslation('name', 'ar', false))
                    ->label('Program')
                    ->limit(30),
                TextColumn::make('total_credit_hours')
                    ->sortable(),
                TextColumn::make('total_semesters')
                    ->sortable(),
                TextColumn::make('approved_at')
                    ->date()
                    ->sortable()
                    ->toggleable(),
                ToggleColumn::make('is_active'),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('academic_program_id')
                    ->relationship('academicProgram', 'name')
                    ->getOptionLabelFromRecordUsing(fn ($record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false))
                    ->label('Program')
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
            'index' => Pages\ListStudyPlans::route('/'),
            'create' => Pages\CreateStudyPlan::route('/create'),
            'edit' => Pages\EditStudyPlan::route('/{record}/edit'),
        ];
    }
}
