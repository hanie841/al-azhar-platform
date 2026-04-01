<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_fee_id',
        'student_id',
        'amount',
        'payment_method',
        'transaction_reference',
        'gateway_response',
        'status',
        'paid_at',
        'receipt_number',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'gateway_response' => 'array',
            'paid_at' => 'datetime',
        ];
    }

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (Payment $payment) {
            if (empty($payment->receipt_number)) {
                $year = now()->format('Y');
                $lastId = static::max('id') ?? 0;
                $payment->receipt_number = 'REC-' . $year . '-' . str_pad($lastId + 1, 6, '0', STR_PAD_LEFT);
            }
        });
    }

    public function studentFee()
    {
        return $this->belongsTo(StudentFee::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
