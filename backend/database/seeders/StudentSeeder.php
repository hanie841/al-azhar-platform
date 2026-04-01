<?php

namespace Database\Seeders;

use App\Models\Faculty;
use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class StudentSeeder extends Seeder
{
    public function run(): void
    {
        $islamicStudies = Faculty::where('slug', 'faculty-of-sharia-and-law')->first();
        $arabic = Faculty::where('slug', 'faculty-of-arabic-language')->first();
        $science = Faculty::where('slug', 'faculty-of-science')->first();
        $engineering = Faculty::where('slug', 'faculty-of-engineering')->first();
        $medicine = Faculty::where('slug', 'faculty-of-medicine')->first();
        $computers = Faculty::where('slug', 'faculty-of-science')->first();

        $students = [
            [
                'user' => ['name' => 'أحمد محمد عبدالله', 'email' => 'ahmed.abdullah@student.azhar.edu.eg'],
                'student' => [
                    'name' => ['ar' => 'أحمد محمد عبدالله', 'en' => 'Ahmed Mohamed Abdullah'],
                    'national_id' => '30001011234567',
                    'date_of_birth' => '2000-01-01',
                    'gender' => 'male',
                    'nationality' => 'Egyptian',
                    'phone' => '+20-10-1234-5001',
                    'address' => 'القاهرة، مدينة نصر',
                    'faculty_id' => $islamicStudies?->id,
                    'academic_level' => 3,
                    'enrollment_date' => '2023-09-01',
                    'expected_graduation' => '2027-06-30',
                    'academic_status' => 'active',
                    'cgpa' => 3.45,
                    'total_credit_hours' => 120,
                    'total_earned_hours' => 72,
                ],
            ],
            [
                'user' => ['name' => 'فاطمة علي حسن', 'email' => 'fatma.hassan@student.azhar.edu.eg'],
                'student' => [
                    'name' => ['ar' => 'فاطمة علي حسن', 'en' => 'Fatma Ali Hassan'],
                    'national_id' => '30103021234568',
                    'date_of_birth' => '2001-03-02',
                    'gender' => 'female',
                    'nationality' => 'Egyptian',
                    'phone' => '+20-10-1234-5002',
                    'address' => 'الجيزة، الدقي',
                    'faculty_id' => $arabic?->id,
                    'academic_level' => 2,
                    'enrollment_date' => '2024-09-01',
                    'expected_graduation' => '2028-06-30',
                    'academic_status' => 'active',
                    'cgpa' => 3.78,
                    'total_credit_hours' => 120,
                    'total_earned_hours' => 36,
                ],
            ],
            [
                'user' => ['name' => 'محمود إبراهيم سعيد', 'email' => 'mahmoud.said@student.azhar.edu.eg'],
                'student' => [
                    'name' => ['ar' => 'محمود إبراهيم سعيد', 'en' => 'Mahmoud Ibrahim Said'],
                    'national_id' => '30205151234569',
                    'date_of_birth' => '2002-05-15',
                    'gender' => 'male',
                    'nationality' => 'Egyptian',
                    'phone' => '+20-10-1234-5003',
                    'address' => 'القاهرة، المعادي',
                    'faculty_id' => $science?->id,
                    'academic_level' => 1,
                    'enrollment_date' => '2025-09-01',
                    'expected_graduation' => '2029-06-30',
                    'academic_status' => 'active',
                    'cgpa' => 3.10,
                    'total_credit_hours' => 140,
                    'total_earned_hours' => 18,
                ],
            ],
            [
                'user' => ['name' => 'نورهان أحمد يوسف', 'email' => 'nourhan.youssef@student.azhar.edu.eg'],
                'student' => [
                    'name' => ['ar' => 'نورهان أحمد يوسف', 'en' => 'Nourhan Ahmed Youssef'],
                    'national_id' => '30107201234570',
                    'date_of_birth' => '2001-07-20',
                    'gender' => 'female',
                    'nationality' => 'Egyptian',
                    'phone' => '+20-10-1234-5004',
                    'address' => 'القاهرة، مصر الجديدة',
                    'faculty_id' => $computers?->id,
                    'academic_level' => 2,
                    'enrollment_date' => '2024-09-01',
                    'expected_graduation' => '2028-06-30',
                    'academic_status' => 'active',
                    'cgpa' => 3.62,
                    'total_credit_hours' => 136,
                    'total_earned_hours' => 40,
                ],
            ],
            [
                'user' => ['name' => 'عمر خالد عبدالرحمن', 'email' => 'omar.khalid@student.azhar.edu.eg'],
                'student' => [
                    'name' => ['ar' => 'عمر خالد عبدالرحمن', 'en' => 'Omar Khaled Abdulrahman'],
                    'national_id' => '30003101234571',
                    'date_of_birth' => '2000-03-10',
                    'gender' => 'male',
                    'nationality' => 'Egyptian',
                    'phone' => '+20-10-1234-5005',
                    'address' => 'الإسكندرية، سموحة',
                    'faculty_id' => $engineering?->id,
                    'academic_level' => 4,
                    'enrollment_date' => '2022-09-01',
                    'expected_graduation' => '2027-06-30',
                    'academic_status' => 'active',
                    'cgpa' => 2.85,
                    'total_credit_hours' => 170,
                    'total_earned_hours' => 130,
                ],
            ],
            [
                'user' => ['name' => 'مريم حسين محمد', 'email' => 'mariam.hussein@student.azhar.edu.eg'],
                'student' => [
                    'name' => ['ar' => 'مريم حسين محمد', 'en' => 'Mariam Hussein Mohamed'],
                    'national_id' => '30209121234572',
                    'date_of_birth' => '2002-09-12',
                    'gender' => 'female',
                    'nationality' => 'Egyptian',
                    'phone' => '+20-10-1234-5006',
                    'address' => 'القاهرة، الزمالك',
                    'faculty_id' => $medicine?->id,
                    'academic_level' => 1,
                    'enrollment_date' => '2025-09-01',
                    'expected_graduation' => '2031-06-30',
                    'academic_status' => 'active',
                    'cgpa' => 3.55,
                    'total_credit_hours' => 210,
                    'total_earned_hours' => 24,
                ],
            ],
            [
                'user' => ['name' => 'يوسف عبدالعزيز حسن', 'email' => 'youssef.hassan@student.azhar.edu.eg'],
                'student' => [
                    'name' => ['ar' => 'يوسف عبدالعزيز حسن', 'en' => 'Youssef Abdelaziz Hassan'],
                    'national_id' => '30106251234573',
                    'date_of_birth' => '2001-06-25',
                    'gender' => 'male',
                    'nationality' => 'Egyptian',
                    'phone' => '+20-10-1234-5007',
                    'address' => 'القاهرة، شبرا',
                    'faculty_id' => $islamicStudies?->id,
                    'academic_level' => 2,
                    'enrollment_date' => '2024-09-01',
                    'expected_graduation' => '2028-06-30',
                    'academic_status' => 'active',
                    'cgpa' => 2.50,
                    'total_credit_hours' => 120,
                    'total_earned_hours' => 30,
                ],
            ],
            [
                'user' => ['name' => 'آية محمد السيد', 'email' => 'aya.elsayed@student.azhar.edu.eg'],
                'student' => [
                    'name' => ['ar' => 'آية محمد السيد', 'en' => 'Aya Mohamed Elsayed'],
                    'national_id' => '30208081234574',
                    'date_of_birth' => '2002-08-08',
                    'gender' => 'female',
                    'nationality' => 'Egyptian',
                    'phone' => '+20-10-1234-5008',
                    'address' => 'القاهرة، حلوان',
                    'faculty_id' => $science?->id,
                    'academic_level' => 2,
                    'enrollment_date' => '2024-09-01',
                    'expected_graduation' => '2028-06-30',
                    'academic_status' => 'active',
                    'cgpa' => 3.30,
                    'total_credit_hours' => 140,
                    'total_earned_hours' => 35,
                ],
            ],
            [
                'user' => ['name' => 'عبدالرحمن طارق علي', 'email' => 'abdelrahman.tarek@student.azhar.edu.eg'],
                'student' => [
                    'name' => ['ar' => 'عبدالرحمن طارق علي', 'en' => 'Abdelrahman Tarek Ali'],
                    'national_id' => '30004181234575',
                    'date_of_birth' => '2000-04-18',
                    'gender' => 'male',
                    'nationality' => 'Egyptian',
                    'phone' => '+20-10-1234-5009',
                    'address' => 'الجيزة، فيصل',
                    'faculty_id' => $computers?->id,
                    'academic_level' => 3,
                    'enrollment_date' => '2023-09-01',
                    'expected_graduation' => '2027-06-30',
                    'academic_status' => 'active',
                    'cgpa' => 3.15,
                    'total_credit_hours' => 136,
                    'total_earned_hours' => 78,
                ],
            ],
            [
                'user' => ['name' => 'سلمى إبراهيم عثمان', 'email' => 'salma.othman@student.azhar.edu.eg'],
                'student' => [
                    'name' => ['ar' => 'سلمى إبراهيم عثمان', 'en' => 'Salma Ibrahim Othman'],
                    'national_id' => '30111301234576',
                    'date_of_birth' => '2001-11-30',
                    'gender' => 'female',
                    'nationality' => 'Egyptian',
                    'phone' => '+20-10-1234-5010',
                    'address' => 'القاهرة، التجمع الخامس',
                    'faculty_id' => $arabic?->id,
                    'academic_level' => 3,
                    'enrollment_date' => '2023-09-01',
                    'expected_graduation' => '2027-06-30',
                    'academic_status' => 'active',
                    'cgpa' => 3.68,
                    'total_credit_hours' => 120,
                    'total_earned_hours' => 75,
                ],
            ],
        ];

        foreach ($students as $data) {
            $user = User::create([
                'name' => $data['user']['name'],
                'email' => $data['user']['email'],
                'password' => Hash::make('password'),
                'role' => 'student',
                'is_active' => true,
            ]);

            Student::create(array_merge($data['student'], [
                'user_id' => $user->id,
            ]));
        }
    }
}
