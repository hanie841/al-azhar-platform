<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DepartmentResource\Pages;
use App\Models\Department;
use App\Models\Faculty;
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

class DepartmentResource extends Resource
{
    protected static ?string $model = Department::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-building-library';

    protected static string | \UnitEnum | null $navigationGroup = 'University Structure';

    protected static ?int $navigationSort = 2;

    public static function form(Schema $form): Schema
    {
        return $form
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

                Section::make('Settings')
                    ->schema([
                        Select::make('faculty_id')
                            ->label('Faculty')
                            ->relationship('faculty', 'name')
                            ->getOptionLabelFromRecordUsing(fn (Faculty $record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false))
                            ->searchable()
                            ->preload()
                            ->required(),
                        TextInput::make('slug')
                            ->disabled()
                            ->dehydrated(),
                        TextInput::make('order')
                            ->numeric()
                            ->default(0),
                        Toggle::make('is_published')
                            ->default(true),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->getStateUsing(fn ($record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false))
                    ->searchable(query: function (Builder $query, string $search): Builder {
                        return $query->where('name', 'like', "%{$search}%");
                    })
                    ->limit(50),
                TextColumn::make('faculty.name')
                    ->getStateUsing(fn ($record) => $record->faculty?->getTranslation('name', 'ar', false) ?? $record->faculty?->getTranslation('name', 'en', false)),
                TextColumn::make('order')
                    ->sortable(),
                ToggleColumn::make('is_published'),
            ])
            ->defaultSort('order')
            ->filters([
                Tables\Filters\SelectFilter::make('faculty_id')
                    ->label('Faculty')
                    ->relationship('faculty', 'name')
                    ->getOptionLabelFromRecordUsing(fn (Faculty $record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false)),
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
            'index' => Pages\ListDepartments::route('/'),
            'create' => Pages\CreateDepartment::route('/create'),
            'edit' => Pages\EditDepartment::route('/{record}/edit'),
        ];
    }
}
