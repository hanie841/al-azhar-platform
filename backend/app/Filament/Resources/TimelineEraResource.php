<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TimelineEraResource\Pages;
use App\Models\TimelineEra;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Tabs;
use Filament\Forms\Components\Tabs\Tab;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class TimelineEraResource extends Resource
{
    protected static ?string $model = TimelineEra::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-clock';

    protected static string | \UnitEnum | null $navigationGroup = 'Timeline';

    protected static ?int $navigationSort = 1;

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

                Section::make('Details')
                    ->schema([
                        TextInput::make('start_year')
                            ->numeric()
                            ->required(),
                        TextInput::make('end_year')
                            ->numeric(),
                        FileUpload::make('cover_image')
                            ->image()
                            ->directory('timeline/eras')
                            ->disk('public'),
                        TextInput::make('order')
                            ->numeric()
                            ->default(0),
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
                    }),
                TextColumn::make('start_year')
                    ->sortable(),
                TextColumn::make('end_year')
                    ->sortable(),
                TextColumn::make('events_count')
                    ->counts('events')
                    ->label('Events'),
                TextColumn::make('order')
                    ->sortable(),
            ])
            ->defaultSort('order')
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
            'index' => Pages\ListTimelineEras::route('/'),
            'create' => Pages\CreateTimelineEra::route('/create'),
            'edit' => Pages\EditTimelineEra::route('/{record}/edit'),
        ];
    }
}
