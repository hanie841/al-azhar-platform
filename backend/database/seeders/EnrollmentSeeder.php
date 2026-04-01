<?php

namespace Database\Seeders;

use App\Models\CourseSection;
use App\Models\Enrollment;
use App\Models\Semester;
use App\Models\Student;
use Illuminate\Database\Seeder;

class EnrollmentSeeder extends Seeder
{
    public function run(): void
    {
        $currentSemester = Semester::where('is_current', true)->first();

        if (! $currentSemester) {
            return;
        }

        $students = Student::all();
        $currentSections = CourseSection::where('semester_id', $currentSemester->id)->get();

        if ($currentSections->isEmpty()) {
            return;
        }

        foreach ($students as $student) {
            // Get sections from courses relevant to the student's faculty
            $facultySections = $currentSections->filter(function ($section) use ($student) {
                return $section->course && $section->course->faculty_id === $student->faculty_id;
            });

            // If not enough faculty-specific sections, add some general ones
            if ($facultySections->count() < 4) {
                $facultySections = $currentSections;
            }

            // Pick 4-6 random sections
            $count = min(rand(4, 6), $facultySections->count());
            $selectedSections = $facultySections->random($count);

            foreach ($selectedSections as $section) {
                // Avoid duplicate enrollments
                $exists = Enrollment::where('student_id', $student->id)
                    ->where('course_section_id', $section->id)
                    ->exists();

                if (! $exists) {
                    Enrollment::create([
                        'student_id' => $student->id,
                        'course_section_id' => $section->id,
                        'semester_id' => $currentSemester->id,
                        'status' => 'enrolled',
                        'enrolled_at' => $currentSemester->registration_start?->addDays(rand(0, 10)) ?? now(),
                    ]);

                    // Update enrolled count
                    $section->increment('enrolled_count');
                }
            }
        }
    }
}
