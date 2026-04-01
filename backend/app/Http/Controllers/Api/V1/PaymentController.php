<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\StudentFee;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        $query = Payment::query()->with(['studentFee.feeType', 'student']);

        if ($request->filled('student_id')) {
            $query->where('student_id', $request->query('student_id'));
        }

        if ($request->filled('status')) {
            $query->where('status', $request->query('status'));
        }

        $payments = $query->orderBy('created_at', 'desc')->paginate(20);

        return response()->json($payments);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_fee_id' => 'required|exists:student_fees,id',
            'student_id' => 'required|exists:students,id',
            'amount' => 'required|numeric|min:0.01',
            'payment_method' => 'required|string|in:cash,bank_transfer,credit_card,online',
            'transaction_reference' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $studentFee = StudentFee::findOrFail($validated['student_fee_id']);
        $remaining = $studentFee->amount - $studentFee->discount_amount - $studentFee->paid_amount;

        if ($validated['amount'] > $remaining) {
            abort(422, 'Payment amount exceeds remaining balance.');
        }

        $validated['status'] = 'completed';
        $validated['paid_at'] = now();

        $payment = Payment::create($validated);

        $studentFee->increment('paid_amount', $validated['amount']);
        $newPaid = $studentFee->fresh()->paid_amount;
        $totalDue = $studentFee->amount - $studentFee->discount_amount;

        if ($newPaid >= $totalDue) {
            $studentFee->update(['status' => 'paid']);
        } elseif ($newPaid > 0) {
            $studentFee->update(['status' => 'partial']);
        }

        return response()->json([
            'message' => 'Payment recorded successfully.',
            'payment' => $payment,
            'receipt_number' => $payment->receipt_number,
        ], 201);
    }

    public function show(int $id)
    {
        $payment = Payment::with(['studentFee.feeType', 'student'])->findOrFail($id);

        return response()->json($payment);
    }
}
