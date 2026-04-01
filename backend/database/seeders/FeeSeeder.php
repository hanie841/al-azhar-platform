<?php

namespace Database\Seeders;

use App\Models\AcademicYear;
use App\Models\FeeType;
use App\Models\Payment;
use App\Models\Semester;
use App\Models\Student;
use App\Models\StudentFee;
use Illuminate\Database\Seeder;

class FeeSeeder extends Seeder
{
    public function run(): void
    {
        // Create fee types
        $feeTypes = [
            [
                'name' => ['ar' => 'رسوم الدراسة', 'en' => 'Tuition Fee'],
                'amount' => 5000.00,
                'currency' => 'EGP',
                'fee_category' => 'tuition',
                'is_recurring' => true,
                'is_active' => true,
            ],
            [
                'name' => ['ar' => 'رسوم التسجيل', 'en' => 'Registration Fee'],
                'amount' => 500.00,
                'currency' => 'EGP',
                'fee_category' => 'registration',
                'is_recurring' => true,
                'is_active' => true,
            ],
            [
                'name' => ['ar' => 'رسوم المعامل', 'en' => 'Laboratory Fee'],
                'amount' => 800.00,
                'currency' => 'EGP',
                'fee_category' => 'lab',
                'is_recurring' => true,
                'is_active' => true,
            ],
            [
                'name' => ['ar' => 'رسوم المكتبة', 'en' => 'Library Fee'],
                'amount' => 200.00,
                'currency' => 'EGP',
                'fee_category' => 'library',
                'is_recurring' => true,
                'is_active' => true,
            ],
            [
                'name' => ['ar' => 'رسوم الأنشطة الطلابية', 'en' => 'Student Activity Fee'],
                'amount' => 300.00,
                'currency' => 'EGP',
                'fee_category' => 'activity',
                'is_recurring' => true,
                'is_active' => true,
            ],
        ];

        $createdFeeTypes = [];
        foreach ($feeTypes as $feeType) {
            $createdFeeTypes[] = FeeType::create($feeType);
        }

        // Get current semester and academic year
        $currentSemester = Semester::where('is_current', true)->first();
        $currentYear = AcademicYear::where('is_current', true)->first();

        if (! $currentSemester || ! $currentYear) {
            return;
        }

        $students = Student::all();

        foreach ($students as $index => $student) {
            foreach ($createdFeeTypes as $feeType) {
                // Skip lab fee for non-science students
                if ($feeType->fee_category === 'lab') {
                    $scienceFaculties = ['faculty-of-science-boys-cairo', 'faculty-of-engineering-boys-cairo', 'faculty-of-medicine-boys-cairo', 'faculty-of-computers-and-information-boys-cairo'];
                    $studentFaculty = $student->faculty;
                    if ($studentFaculty && ! in_array($studentFaculty->slug, $scienceFaculties)) {
                        continue;
                    }
                }

                $dueDate = $currentSemester->start_date?->addDays(30) ?? now()->addDays(30);

                // Determine payment status based on student index for variety
                if ($index < 4) {
                    // First 4 students: fully paid
                    $status = 'paid';
                    $paidAmount = $feeType->amount;
                } elseif ($index < 7) {
                    // Next 3: partially paid
                    $status = 'partial';
                    $paidAmount = round($feeType->amount * 0.5, 2);
                } else {
                    // Last 3: pending
                    $status = 'pending';
                    $paidAmount = 0;
                }

                $studentFee = StudentFee::create([
                    'student_id' => $student->id,
                    'fee_type_id' => $feeType->id,
                    'semester_id' => $currentSemester->id,
                    'academic_year_id' => $currentYear->id,
                    'amount' => $feeType->amount,
                    'discount_amount' => 0,
                    'paid_amount' => $paidAmount,
                    'status' => $status,
                    'due_date' => $dueDate,
                ]);

                // Create payment records for paid and partial
                if ($paidAmount > 0) {
                    Payment::create([
                        'student_fee_id' => $studentFee->id,
                        'student_id' => $student->id,
                        'amount' => $paidAmount,
                        'payment_method' => collect(['cash', 'bank_transfer', 'online'])->random(),
                        'transaction_reference' => 'TXN-' . now()->format('Y') . '-' . str_pad(rand(1, 99999), 5, '0', STR_PAD_LEFT),
                        'status' => 'completed',
                        'paid_at' => $currentSemester->registration_start?->addDays(rand(1, 14)) ?? now()->subDays(rand(10, 30)),
                    ]);
                }
            }
        }
    }
}
