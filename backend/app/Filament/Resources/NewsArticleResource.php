<?php

namespace App\Filament\Resources;

use App\Filament\Resources\NewsArticleResource\Pages;
use App\Models\NewsArticle;
use App\Models\NewsCategory;
use App\Models\User;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Tabs;
use Filament\Forms\Components\Tabs\Tab;
use Filament\Forms\Components\Textarea;
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

class NewsArticleResource extends Resource
{
    protected static ?string $model = NewsArticle::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-newspaper';

    protected static string | \UnitEnum | null $navigationGroup = 'Content Management';

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
                                                TextInput::make('title.ar')
                                                    ->label('العنوان')
                                                    ->required(),
                                                Textarea::make('excerpt.ar')
                                                    ->label('المقتطف')
                                                    ->rows(3),
                                                RichEditor::make('content.ar')
                                                    ->label('المحتوى')
                                                    ->columnSpanFull(),
                                            ]),
                                        Tab::make('English')
                                            ->schema([
                                                TextInput::make('title.en')
                                                    ->label('Title'),
                                                Textarea::make('excerpt.en')
                                                    ->label('Excerpt')
                                                    ->rows(3),
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
                                Select::make('category_id')
                                    ->label('Category')
                                    ->relationship('category', 'name')
                                    ->getOptionLabelFromRecordUsing(fn (NewsCategory $record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false))
                                    ->searchable()
                                    ->preload()
                                    ->required(),
                                Select::make('author_id')
                                    ->label('Author')
                                    ->relationship('author', 'name')
                                    ->searchable()
                                    ->preload(),
                                FileUpload::make('featured_image')
                                    ->image()
                                    ->directory('news/images')
                                    ->disk('public'),
                                Toggle::make('is_featured')
                                    ->default(false),
                                Toggle::make('is_published')
                                    ->default(false),
                                DateTimePicker::make('published_at'),
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
                TextColumn::make('category.name')
                    ->getStateUsing(fn ($record) => $record->category?->getTranslation('name', 'ar', false) ?? $record->category?->getTranslation('name', 'en', false)),
                TextColumn::make('author.name'),
                IconColumn::make('is_featured')
                    ->boolean(),
                ToggleColumn::make('is_published'),
                TextColumn::make('published_at')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('views_count')
                    ->numeric()
                    ->sortable()
                    ->toggleable(),
            ])
            ->defaultSort('published_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('category_id')
                    ->label('Category')
                    ->relationship('category', 'name')
                    ->getOptionLabelFromRecordUsing(fn (NewsCategory $record) => $record->getTranslation('name', 'ar', false) ?? $record->getTranslation('name', 'en', false)),
                Tables\Filters\TernaryFilter::make('is_published'),
                Tables\Filters\TernaryFilter::make('is_featured'),
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
            'index' => Pages\ListNewsArticles::route('/'),
            'create' => Pages\CreateNewsArticle::route('/create'),
            'edit' => Pages\EditNewsArticle::route('/{record}/edit'),
        ];
    }
}
