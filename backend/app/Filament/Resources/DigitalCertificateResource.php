<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DigitalCertificateResource\Pages;
use App\Models\DigitalCertificate;
use App\Models\LmsCourse;
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

class DigitalCertificateResource extends Resource
{
    protected static ?string $model = DigitalCertificate::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-trophy';

    protected static string | \UnitEnum | null $navigationGroup = 'Learning Management';

    protected static ?int $navigationSort = 7;

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
                                            ]),
                                        Tab::make('English')
                                            ->schema([
                                                TextInput::make('title.en')
                                                    ->label('Title'),
                                            ]),
                                    ])
                                    ->columnSpanFull(),

                                Section::make('Certificate Details')
                                    ->schema([
                                        TextInput::make('student_id')
                                            ->label('Student ID')
                                            ->numeric()
                                            ->required(),
                                        Select::make('lms_course_id')
                                            ->label('Course')
                                            ->options(LmsCourse::all()->pluck('title', 'id')->map(fn ($t) => is_array($t) ? ($t['ar'] ?? $t['en'] ?? '') : $t))
                                            ->searchable()
                                            ->nullable(),
                                        Select::make('certificate_type')
                                            ->options([
                                                'completion' => 'Course Completion',
                                                'excellence' => 'Excellence',
                                                'participation' => 'Participation',
                                                'achievement' => 'Achievement',
                                                'professional' => 'Professional Development',
                                            ])
                                            ->required(),
                                        Textarea::make('description')
                                            ->rows(3),
                                        DatePicker::make('issued_at')
                                            ->required()
                                            ->default(now()),
                                        DatePicker::make('expires_at')
                                            ->nullable(),
                                    ])
                                    ->columns(2),
                            ])
                            ->columnSpan(2),

                        Section::make('Generated Info')
                            ->schema([
                                TextInput::make('certificate_number')
                                    ->disabled()
                                    ->dehydrated()
                                    ->helperText('Auto-generated on creation'),
                                TextInput::make('verification_url')
                                    ->disabled()
                                    ->dehydrated()
                                    ->helperText('Auto-generated on creation'),
                                TextInput::make('qr_code')
                                    ->label('QR Code Path'),
                            ])
                            ->columnSpan(1),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('certificate_number')
                    ->searchable()
                    ->copyable(),
                TextColumn::make('title')
                    ->getStateUsing(fn ($record) => $record->getTranslation('title', 'ar', false) ?? $record->getTranslation('title', 'en', false))
                    ->searchable(query: function (Builder $query, string $search): Builder {
                        return $query->where('title', 'like', "%{$search}%");
                    })
                    ->limit(40),
                TextColumn::make('certificate_type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'completion' => 'success',
                        'excellence' => 'warning',
                        'participation' => 'info',
                        'achievement' => 'primary',
                        'professional' => 'danger',
                        default => 'gray',
                    }),
                TextColumn::make('student_id')
                    ->sortable(),
                TextColumn::make('course.title')
                    ->getStateUsing(fn ($record) => $record->course?->getTranslation('title', 'ar', false))
                    ->label('Course')
                    ->limit(25),
                TextColumn::make('issued_at')
                    ->date()
                    ->sortable(),
                TextColumn::make('expires_at')
                    ->date()
                    ->sortable()
                    ->toggleable(),
            ])
            ->defaultSort('issued_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('certificate_type')
                    ->options([
                        'completion' => 'Completion',
                        'excellence' => 'Excellence',
                        'participation' => 'Participation',
                        'achievement' => 'Achievement',
                        'professional' => 'Professional',
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
            'index' => Pages\ListDigitalCertificates::route('/'),
            'create' => Pages\CreateDigitalCertificate::route('/create'),
            'edit' => Pages\EditDigitalCertificate::route('/{record}/edit'),
        ];
    }
}
