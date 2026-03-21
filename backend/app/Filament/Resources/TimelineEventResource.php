<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TimelineEventResource\Pages;
use App\Models\TimelineEra;
use App\Models\TimelineEvent;
use Filament\Forms\Components\FileUpload;
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

class TimelineEventResource extends Resource
{
    protected static ?string $model = TimelineEvent::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-calendar';

    protected static string | \UnitEnum | null $navigationGroup = 'Timeline';

    protected static ?int $navigationSort = 2;

    public static function form(Schema $form): Schema
    {
        return $form
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
                        Select::make('era_id')
                            ->label('Era')
                            ->relationship('era', 'name')
                            ->getOptionLabelFromRecordUsing(fn (TimelineEra $record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false))
                            ->searchable()
                            ->preload()
                            ->required(),
                        TextInput::make('year')
                            ->numeric()
                            ->required(),
                        TextInput::make('year_hijri')
                            ->numeric(),
                        FileUpload::make('image')
                            ->image()
                            ->directory('timeline/events')
                            ->disk('public'),
                        TextInput::make('slug')
                            ->disabled()
                            ->dehydrated(),
                        TextInput::make('order')
                            ->numeric()
                            ->default(0),
                        Toggle::make('is_published')
                            ->default(false),
                    ])
                    ->columns(2),
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
                TextColumn::make('era.name')
                    ->getStateUsing(fn ($record) => $record->era?->getTranslation('name', 'ar', false) ?? $record->era?->getTranslation('name', 'en', false)),
                TextColumn::make('year')
                    ->sortable(),
                TextColumn::make('year_hijri')
                    ->sortable()
                    ->toggleable(),
                TextColumn::make('order')
                    ->sortable(),
                ToggleColumn::make('is_published'),
            ])
            ->defaultSort('year')
            ->filters([
                Tables\Filters\SelectFilter::make('era_id')
                    ->label('Era')
                    ->relationship('era', 'name')
                    ->getOptionLabelFromRecordUsing(fn (TimelineEra $record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false)),
                Tables\Filters\TernaryFilter::make('is_published'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
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
            'index' => Pages\ListTimelineEvents::route('/'),
            'create' => Pages\CreateTimelineEvent::route('/create'),
            'edit' => Pages\EditTimelineEvent::route('/{record}/edit'),
        ];
    }
}
