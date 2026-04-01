<?php

namespace Database\Seeders;

use App\Models\AcademicYear;
use App\Models\Semester;
use Illuminate\Database\Seeder;

class AcademicYearSeeder extends Seeder
{
    public function run(): void
    {
        // 2024/2025 Academic Year (past)
        $year2024 = AcademicYear::create([
            'name' => ['ar' => 'العام الدراسي 2024/2025', 'en' => 'Academic Year 2024/2025'],
            'start_date' => '2024-09-01',
            'end_date' => '2025-06-30',
            'is_current' => false,
            'is_registration_open' => false,
        ]);

        Semester::create([
            'academic_year_id' => $year2024->id,
            'name' => ['ar' => 'الفصل الدراسي الأول 2024/2025', 'en' => 'Fall Semester 2024/2025'],
            'type' => 'fall',
            'start_date' => '2024-09-01',
            'end_date' => '2025-01-15',
            'registration_start' => '2024-08-01',
            'registration_end' => '2024-08-25',
            'is_current' => false,
        ]);

        Semester::create([
            'academic_year_id' => $year2024->id,
            'name' => ['ar' => 'الفصل الدراسي الثاني 2024/2025', 'en' => 'Spring Semester 2024/2025'],
            'type' => 'spring',
            'start_date' => '2025-02-01',
            'end_date' => '2025-06-15',
            'registration_start' => '2025-01-15',
            'registration_end' => '2025-01-28',
            'is_current' => false,
        ]);

        // 2025/2026 Academic Year (current)
        $year2025 = AcademicYear::create([
            'name' => ['ar' => 'العام الدراسي 2025/2026', 'en' => 'Academic Year 2025/2026'],
            'start_date' => '2025-09-01',
            'end_date' => '2026-06-30',
            'is_current' => true,
            'is_registration_open' => true,
        ]);

        Semester::create([
            'academic_year_id' => $year2025->id,
            'name' => ['ar' => 'الفصل الدراسي الأول 2025/2026', 'en' => 'Fall Semester 2025/2026'],
            'type' => 'fall',
            'start_date' => '2025-09-01',
            'end_date' => '2026-01-15',
            'registration_start' => '2025-08-01',
            'registration_end' => '2025-08-25',
            'is_current' => false,
        ]);

        Semester::create([
            'academic_year_id' => $year2025->id,
            'name' => ['ar' => 'الفصل الدراسي الثاني 2025/2026', 'en' => 'Spring Semester 2025/2026'],
            'type' => 'spring',
            'start_date' => '2026-02-01',
            'end_date' => '2026-06-15',
            'registration_start' => '2026-01-15',
            'registration_end' => '2026-01-28',
            'is_current' => true,
        ]);
    }
}
