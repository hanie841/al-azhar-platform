<?php

namespace App\Filament\Resources;

use App\Filament\Resources\LeaveRequestResource\Pages;
use App\Models\LeaveRequest;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class LeaveRequestResource extends Resource
{
    protected static ?string $model = LeaveRequest::class;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-calendar-days';

    protected static string | \UnitEnum | null $navigationGroup = 'Faculty Portal';

    protected static ?int $navigationSort = 2;

    public static function form(Schema $form): Schema
    {
        return $form
            ->schema([
                Section::make('Leave Details')
                    ->schema([
                        Select::make('faculty_profile_id')
                            ->relationship('facultyProfile', 'id')
                            ->getOptionLabelFromRecordUsing(fn ($record) => $record->user?->name ?? "Profile #{$record->id}")
                            ->searchable()
                            ->preload()
                            ->required(),
                        Select::make('leave_type')
                            ->options([
                                'annual' => 'Annual Leave',
                                'sick' => 'Sick Leave',
                                'emergency' => 'Emergency Leave',
                                'maternity' => 'Maternity Leave',
                                'study' => 'Study Leave',
                                'unpaid' => 'Unpaid Leave',
                                'other' => 'Other',
                            ])
                            ->required(),
                        DatePicker::make('start_date')
                            ->required(),
                        DatePicker::make('end_date')
                            ->required()
                            ->afterOrEqual('start_date'),
                        Textarea::make('reason')
                            ->required()
                            ->maxLength(2000)
                            ->columnSpanFull(),
                        FileUpload::make('attachment_path')
                            ->label('Attachment')
                            ->directory('leave-attachments')
                            ->disk('public')
                            ->nullable()
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Section::make('Status')
                    ->schema([
                        Select::make('status')
                            ->options([
                                'pending' => 'Pending',
                                'approved' => 'Approved',
                                'rejected' => 'Rejected',
                                'cancelled' => 'Cancelled',
                            ])
                            ->default('pending')
                            ->required(),
                        TextInput::make('approved_by')
                            ->numeric()
                            ->nullable()
                            ->hidden(),
                        Textarea::make('rejection_reason')
                            ->maxLength(2000)
                            ->nullable()
                            ->columnSpanFull(),
                        Textarea::make('notes')
                            ->maxLength(1000)
                            ->nullable()
                            ->columnSpanFull(),
                    ]),
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
                TextColumn::make('leave_type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'annual' => 'info',
                        'sick' => 'danger',
                        'emergency' => 'warning',
                        'maternity' => 'success',
                        'study' => 'primary',
                        'unpaid' => 'gray',
                        default => 'gray',
                    }),
                TextColumn::make('start_date')
                    ->date()
                    ->sortable(),
                TextColumn::make('end_date')
                    ->date()
                    ->sortable(),
                TextColumn::make('duration')
                    ->label('Duration')
                    ->getStateUsing(fn ($record) => $record->durationDays() . ' days'),
                TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending' => 'warning',
                        'approved' => 'success',
                        'rejected' => 'danger',
                        'cancelled' => 'gray',
                        default => 'gray',
                    }),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'approved' => 'Approved',
                        'rejected' => 'Rejected',
                        'cancelled' => 'Cancelled',
                    ]),
                Tables\Filters\SelectFilter::make('leave_type')
                    ->options([
                        'annual' => 'Annual',
                        'sick' => 'Sick',
                        'emergency' => 'Emergency',
                        'maternity' => 'Maternity',
                        'study' => 'Study',
                        'unpaid' => 'Unpaid',
                        'other' => 'Other',
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
            'index' => Pages\ListLeaveRequests::route('/'),
            'create' => Pages\CreateLeaveRequest::route('/create'),
            'edit' => Pages\EditLeaveRequest::route('/{record}/edit'),
        ];
    }
}
