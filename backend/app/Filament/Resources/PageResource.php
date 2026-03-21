<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PageResource\Pages;
use App\Models\Page;
use Filament\Forms;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Grid;
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

class PageResource extends Resource
{
    protected static ?string $model = Page::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-document-text';

    protected static string | \UnitEnum | null $navigationGroup = 'Content Management';

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
                                                RichEditor::make('content.ar')
                                                    ->label('المحتوى')
                                                    ->columnSpanFull(),
                                            ]),
                                        Tab::make('English')
                                            ->schema([
                                                TextInput::make('title.en')
                                                    ->label('Title'),
                                                RichEditor::make('content.en')
                                                    ->label('Content')
                                                    ->columnSpanFull(),
                                            ]),
                                    ])
                                    ->columnSpanFull(),
                            ])
                            ->columnSpan(2),

                        Section::make('Settings')
                            ->schema([
                                TextInput::make('slug')
                                    ->disabled()
                                    ->dehydrated(),
                                Select::make('template')
                                    ->options([
                                        'default' => 'Default',
                                        'landing' => 'Landing',
                                        'content' => 'Content',
                                    ])
                                    ->default('default'),
                                Select::make('parent_id')
                                    ->label('Parent Page')
                                    ->relationship('parent', 'title')
                                    ->getOptionLabelFromRecordUsing(fn (Page $record) => $record->getTranslation('title', 'ar', false) ?? $record->getTranslation('title', 'en', false))
                                    ->searchable()
                                    ->preload()
                                    ->nullable(),
                                FileUpload::make('featured_image')
                                    ->image()
                                    ->directory('pages/images')
                                    ->disk('public'),
                                TextInput::make('meta_title.ar')
                                    ->label('Meta Title (AR)'),
                                TextInput::make('meta_title.en')
                                    ->label('Meta Title (EN)'),
                                Forms\Components\Textarea::make('meta_description.ar')
                                    ->label('Meta Description (AR)')
                                    ->rows(2),
                                Forms\Components\Textarea::make('meta_description.en')
                                    ->label('Meta Description (EN)')
                                    ->rows(2),
                                Toggle::make('is_published')
                                    ->default(false),
                                DateTimePicker::make('published_at'),
                                TextInput::make('order')
                                    ->numeric()
                                    ->default(0),
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
                TextColumn::make('slug')
                    ->toggleable(),
                TextColumn::make('template')
                    ->badge()
                    ->toggleable(),
                TextColumn::make('parent.title')
                    ->getStateUsing(fn ($record) => $record->parent?->getTranslation('title', 'ar', false) ?? $record->parent?->getTranslation('title', 'en', false))
                    ->toggleable(),
                ToggleColumn::make('is_published'),
                TextColumn::make('published_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(),
                TextColumn::make('order')
                    ->sortable(),
            ])
            ->defaultSort('order')
            ->filters([
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
            'index' => Pages\ListPages::route('/'),
            'create' => Pages\CreatePage::route('/create'),
            'edit' => Pages\EditPage::route('/{record}/edit'),
        ];
    }
}
