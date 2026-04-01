<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CommitteeMembershipResource\Pages;
use App\Models\CommitteeMembership;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Tabs;
use Filament\Forms\Components\Tabs\Tab;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class CommitteeMembershipResource extends Resource
{
    protected static ?string $model = CommitteeMembership::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-user-group';

    protected static string | \UnitEnum | null $navigationGroup = 'Faculty Portal';

    protected static ?int $navigationSort = 3;

    public static function form(Schema $form): Schema
    {
        return $form
            ->schema([
                Section::make('Committee Details')
                    ->schema([
                        Select::make('faculty_profile_id')
                            ->relationship('facultyProfile', 'id')
                            ->getOptionLabelFromRecordUsing(fn ($record) => $record->user?->name ?? "Profile #{$record->id}")
                            ->searchable()
                            ->preload()
                            ->required(),

                        Select::make('role')
                            ->options([
                                'member' => 'Member',
                                'chair' => 'Chair',
                                'secretary' => 'Secretary',
                                'coordinator' => 'Coordinator',
                            ])
                            ->default('member')
                            ->required(),
                    ])
                    ->columns(2),

                Tabs::make('Translations')
                    ->tabs([
                        Tab::make('Arabic')
                            ->schema([
                                TextInput::make('committee_name.ar')
                                    ->label('اسم اللجنة')
                                    ->required(),
                                Textarea::make('description.ar')
                                    ->label('الوصف'),
                            ]),
                        Tab::make('English')
                            ->schema([
                                TextInput::make('committee_name.en')
                                    ->label('Committee Name'),
                                Textarea::make('description.en')
                                    ->label('Description'),
                            ]),
                    ])
                    ->columnSpanFull(),

                Section::make('Dates & Status')
                    ->schema([
                        DatePicker::make('start_date')
                            ->required(),
                        DatePicker::make('end_date')
                            ->nullable()
                            ->afterOrEqual('start_date'),
                        Toggle::make('is_active')
                            ->default(true),
                    ])
                    ->columns(3),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('facultyProfile.user.name')
                    ->label('Faculty Member')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('committee_name')
                    ->label('Committee')
                    ->getStateUsing(fn ($record) => $record->getTranslation('committee_name', 'ar', false) ?? $record->getTranslation('committee_name', 'en', false))
                    ->searchable(query: function ($query, string $search) {
                        return $query->where('committee_name', 'like', "%{$search}%");
                    })
                    ->limit(40),
                TextColumn::make('role')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'chair' => 'success',
                        'secretary' => 'info',
                        'coordinator' => 'warning',
                        default => 'gray',
                    }),
                TextColumn::make('start_date')
                    ->date()
                    ->sortable(),
                TextColumn::make('end_date')
                    ->date()
                    ->sortable()
                    ->placeholder('Ongoing'),
                IconColumn::make('is_active')
                    ->boolean(),
            ])
            ->defaultSort('start_date', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('role')
                    ->options([
                        'member' => 'Member',
                        'chair' => 'Chair',
                        'secretary' => 'Secretary',
                        'coordinator' => 'Coordinator',
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
            'index' => Pages\ListCommitteeMemberships::route('/'),
            'create' => Pages\CreateCommitteeMembership::route('/create'),
            'edit' => Pages\EditCommitteeMembership::route('/{record}/edit'),
        ];
    }
}
