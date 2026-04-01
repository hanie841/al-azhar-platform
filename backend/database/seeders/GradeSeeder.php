<?php

namespace Database\Seeders;

use App\Models\CourseSection;
use App\Models\Enrollment;
use App\Models\Grade;
use App\Models\Semester;
use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Seeder;

class GradeSeeder extends Seeder
{
    public function run(): void
    {
        // Get Fall 2025/2026 semester (previous semester for grades)
        $fallSemester = Semester::where('type', 'fall')
            ->whereHas('academicYear', fn ($q) => $q->where('is_current', true))
            ->first();

        if (! $fallSemester) {
            return;
        }

        $students = Student::all();
        $fallSections = CourseSection::where('semester_id', $fallSemester->id)->get();
        $graderUser = User::where('role', 'faculty_member')->first();

        if ($fallSections->isEmpty()) {
            return;
        }

        // Grade distribution patterns
        $gradePatterns = [
            ['midterm' => 38, 'final' => 52, 'coursework' => 18, 'letter' => 'A', 'points' => 4.00],
            ['midterm' => 35, 'final' => 48, 'coursework' => 17, 'letter' => 'A-', 'points' => 3.70],
            ['midterm' => 32, 'final' => 45, 'coursework' => 16, 'letter' => 'B+', 'points' => 3.30],
            ['midterm' => 30, 'final' => 42, 'coursework' => 15, 'letter' => 'B', 'points' => 3.00],
            ['midterm' => 28, 'final' => 38, 'coursework' => 14, 'letter' => 'B-', 'points' => 2.70],
            ['midterm' => 25, 'final' => 35, 'coursework' => 13, 'letter' => 'C+', 'points' => 2.30],
            ['midterm' => 22, 'final' => 30, 'coursework' => 12, 'letter' => 'C', 'points' => 2.00],
            ['midterm' => 18, 'final' => 25, 'coursework' => 10, 'letter' => 'D', 'points' => 1.00],
            ['midterm' => 12, 'final' => 18, 'coursework' => 8, 'letter' => 'F', 'points' => 0.00],
        ];

        $studentIndex = 0;

        foreach ($students as $student) {
            // Each student gets grades for 4-5 fall sections
            $count = min(rand(4, 5), $fallSections->count());
            $selectedSections = $fallSections->random($count);

            // First create enrollments for fall semester
            foreach ($selectedSections as $section) {
                Enrollment::firstOrCreate([
                    'student_id' => $student->id,
                    'course_section_id' => $section->id,
                    'semester_id' => $fallSemester->id,
                ], [
                    'status' => 'completed',
                    'enrolled_at' => $fallSemester->registration_start?->addDays(rand(0, 10)) ?? now()->subMonths(6),
                ]);
            }

            foreach ($selectedSections as $sectionIndex => $section) {
                // Vary grade quality per student, with occasional low grades
                $patternIndex = ($studentIndex + $sectionIndex) % count($gradePatterns);

                // One student gets an F in one course
                if ($studentIndex === 6 && $sectionIndex === 2) {
                    $patternIndex = 8; // F grade
                }

                $pattern = $gradePatterns[$patternIndex];
                $creditHours = $section->course?->credit_hours ?? 3;

                // Add some randomness
                $midterm = $pattern['midterm'] + rand(-2, 2);
                $final = $pattern['final'] + rand(-3, 3);
                $coursework = $pattern['coursework'] + rand(-1, 1);
                $total = $midterm + $final + $coursework;

                // Clamp values
                $midterm = max(0, min(40, $midterm));
                $final = max(0, min(60, $final));
                $coursework = max(0, min(20, $coursework));
                $total = $midterm + $final + $coursework;

                Grade::create([
                    'student_id' => $student->id,
                    'course_section_id' => $section->id,
                    'semester_id' => $fallSemester->id,
                    'midterm_score' => $midterm,
                    'final_score' => $final,
                    'coursework_score' => $coursework,
                    'practical_score' => null,
                    'total_score' => $total,
                    'letter_grade' => $pattern['letter'],
                    'grade_points' => $pattern['points'],
                    'credit_hours' => $creditHours,
                    'is_pass' => $pattern['letter'] !== 'F',
                    'notes' => null,
                    'graded_by' => $graderUser?->id,
                    'graded_at' => $fallSemester->end_date?->addDays(rand(5, 15)) ?? now()->subMonths(2),
                    'is_published' => true,
                ]);
            }

            $studentIndex++;
        }
    }
}
