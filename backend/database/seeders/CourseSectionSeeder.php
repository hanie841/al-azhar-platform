<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\CourseSection;
use App\Models\Semester;
use App\Models\User;
use Illuminate\Database\Seeder;

class CourseSectionSeeder extends Seeder
{
    public function run(): void
    {
        $currentSemester = Semester::where('is_current', true)->first();
        $fallSemester = Semester::where('type', 'fall')
            ->whereHas('academicYear', fn ($q) => $q->where('is_current', true))
            ->first();

        if (! $currentSemester) {
            return;
        }

        // Get faculty member users as instructors
        $instructors = User::where('role', 'faculty_member')->get();
        $instructorIds = $instructors->pluck('id')->toArray();

        $courses = Course::all();

        $buildings = [
            ['ar' => 'مبنى الشريعة', 'en' => 'Sharia Building'],
            ['ar' => 'مبنى اللغة العربية', 'en' => 'Arabic Language Building'],
            ['ar' => 'مبنى العلوم', 'en' => 'Science Building'],
            ['ar' => 'مبنى الهندسة', 'en' => 'Engineering Building'],
            ['ar' => 'مبنى الطب', 'en' => 'Medical Building'],
            ['ar' => 'مبنى الحاسبات', 'en' => 'IT Building'],
        ];

        $rooms = ['قاعة 101', 'قاعة 102', 'قاعة 201', 'قاعة 202', 'قاعة 301', 'معمل 1', 'معمل 2', 'معمل 3'];

        $schedules = [
            [
                ['day' => 'Sunday', 'start' => '08:00', 'end' => '09:30'],
                ['day' => 'Tuesday', 'start' => '08:00', 'end' => '09:30'],
            ],
            [
                ['day' => 'Sunday', 'start' => '10:00', 'end' => '11:30'],
                ['day' => 'Tuesday', 'start' => '10:00', 'end' => '11:30'],
            ],
            [
                ['day' => 'Monday', 'start' => '08:00', 'end' => '09:30'],
                ['day' => 'Wednesday', 'start' => '08:00', 'end' => '09:30'],
            ],
            [
                ['day' => 'Monday', 'start' => '10:00', 'end' => '11:30'],
                ['day' => 'Wednesday', 'start' => '10:00', 'end' => '11:30'],
            ],
            [
                ['day' => 'Monday', 'start' => '12:00', 'end' => '13:30'],
                ['day' => 'Wednesday', 'start' => '12:00', 'end' => '13:30'],
            ],
            [
                ['day' => 'Sunday', 'start' => '14:00', 'end' => '15:30'],
                ['day' => 'Thursday', 'start' => '14:00', 'end' => '15:30'],
            ],
        ];

        $sectionIndex = 0;

        foreach ($courses as $course) {
            $sectionsCount = rand(2, 3);

            for ($s = 1; $s <= $sectionsCount; $s++) {
                $buildingIndex = $sectionIndex % count($buildings);
                $roomIndex = $sectionIndex % count($rooms);
                $scheduleIndex = $sectionIndex % count($schedules);
                $instructorIndex = $sectionIndex % max(count($instructorIds), 1);

                // Create sections for current semester (Spring)
                CourseSection::create([
                    'course_id' => $course->id,
                    'semester_id' => $currentSemester->id,
                    'section_number' => 'S' . $s,
                    'instructor_id' => $instructorIds[$instructorIndex] ?? null,
                    'room' => $rooms[$roomIndex],
                    'building' => $buildings[$buildingIndex]['ar'],
                    'capacity' => rand(30, 60),
                    'enrolled_count' => 0,
                    'schedule' => $schedules[$scheduleIndex],
                    'is_active' => true,
                ]);

                $sectionIndex++;
            }

            // Also create sections for Fall semester (for grades)
            if ($fallSemester) {
                for ($s = 1; $s <= 2; $s++) {
                    $buildingIndex = $sectionIndex % count($buildings);
                    $roomIndex = $sectionIndex % count($rooms);
                    $scheduleIndex = $sectionIndex % count($schedules);
                    $instructorIndex = $sectionIndex % max(count($instructorIds), 1);

                    CourseSection::create([
                        'course_id' => $course->id,
                        'semester_id' => $fallSemester->id,
                        'section_number' => 'S' . $s,
                        'instructor_id' => $instructorIds[$instructorIndex] ?? null,
                        'room' => $rooms[$roomIndex],
                        'building' => $buildings[$buildingIndex]['ar'],
                        'capacity' => rand(30, 60),
                        'enrolled_count' => 0,
                        'schedule' => $schedules[$scheduleIndex],
                        'is_active' => true,
                    ]);

                    $sectionIndex++;
                }
            }
        }
    }
}
