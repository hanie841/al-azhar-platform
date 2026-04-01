<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\AssignmentSubmission;
use App\Models\Attendance;
use App\Models\CourseSection;
use App\Models\ExamAttempt;
use App\Models\FacultyProfile;
use App\Models\Grade;
use App\Models\LmsCourse;
use App\Models\Semester;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FacultyDashboardController extends Controller
{
    /**
     * Aggregated dashboard data for the authenticated faculty member.
     */
    public function dashboard(Request $request): JsonResponse
    {
        $userId = $request->user()->id;
        $locale = app()->getLocale();

        $profile = FacultyProfile::where('user_id', $userId)->first();

        if (! $profile) {
            return response()->json([
                'message' => 'Faculty profile not found.',
            ], 404);
        }

        // Current semester
        $currentSemester = Semester::where('is_current', true)->first();

        // Current course sections
        $sections = collect();
        $totalStudents = 0;

        if ($currentSemester) {
            $sections = CourseSection::where('instructor_id', $userId)
                ->where('semester_id', $currentSemester->id)
                ->where('is_active', true)
                ->with('course')
                ->get();

            $totalStudents = $sections->sum('enrolled_count');
        }

        $coursesData = $sections->map(function ($section) use ($locale) {
            return [
                'section_id' => $section->id,
                'section_number' => $section->section_number,
                'course_name' => $section->course?->getTranslation('name', $locale, false),
                'course_code' => $section->course?->code ?? null,
                'enrolled_count' => $section->enrolled_count,
                'capacity' => $section->capacity,
                'room' => $section->room,
                'building' => $section->building,
                'schedule' => $section->schedule,
            ];
        });

        // Pending assignment submissions (for LMS courses owned by this faculty)
        $lmsCourseIds = LmsCourse::where('instructor_id', $userId)->pluck('id');
        $pendingSubmissions = 0;
        if ($lmsCourseIds->isNotEmpty()) {
            $pendingSubmissions = AssignmentSubmission::whereHas('assignment', function ($q) use ($lmsCourseIds) {
                $q->whereIn('lms_course_id', $lmsCourseIds);
            })
                ->where('status', 'submitted')
                ->whereNull('graded_by')
                ->count();
        }

        // Pending exam grading
        $pendingExamGrading = ExamAttempt::whereHas('exam', function ($q) use ($userId) {
            $q->where('created_by', $userId);
        })
            ->where('status', 'submitted')
            ->count();

        // Schedule for next 7 days
        $schedule = $this->buildSchedule($sections, 7);

        return response()->json([
            'data' => [
                'current_semester' => $currentSemester ? [
                    'id' => $currentSemester->id,
                    'name' => $currentSemester->getTranslation('name', $locale, false),
                ] : null,
                'courses' => $coursesData,
                'total_students' => $totalStudents,
                'pending_submissions' => $pendingSubmissions,
                'pending_exam_grading' => $pendingExamGrading,
                'schedule' => $schedule,
            ],
        ]);
    }

    /**
     * Detailed list of faculty's course sections.
     */
    public function myCourses(Request $request): JsonResponse
    {
        $userId = $request->user()->id;
        $locale = app()->getLocale();

        $query = CourseSection::where('instructor_id', $userId)
            ->with(['course', 'semester']);

        if ($request->filled('semester_id')) {
            $query->where('semester_id', $request->query('semester_id'));
        } else {
            // Default to current semester
            $currentSemester = Semester::where('is_current', true)->first();
            if ($currentSemester) {
                $query->where('semester_id', $currentSemester->id);
            }
        }

        $sections = $query->orderBy('created_at', 'desc')->get();

        $data = $sections->map(function ($section) use ($locale) {
            return [
                'section_id' => $section->id,
                'section_number' => $section->section_number,
                'course' => [
                    'id' => $section->course?->id,
                    'name' => $section->course?->getTranslation('name', $locale, false),
                    'code' => $section->course?->code ?? null,
                ],
                'semester' => [
                    'id' => $section->semester?->id,
                    'name' => $section->semester?->getTranslation('name', $locale, false),
                    'type' => $section->semester?->type,
                ],
                'room' => $section->room,
                'building' => $section->building,
                'capacity' => $section->capacity,
                'enrolled_count' => $section->enrolled_count,
                'schedule' => $section->schedule,
                'is_active' => $section->is_active,
            ];
        });

        return response()->json(['data' => $data]);
    }

    /**
     * List students in a specific course section with attendance and grade info.
     */
    public function courseStudents(Request $request, int $sectionId): JsonResponse
    {
        $userId = $request->user()->id;

        $section = CourseSection::where('id', $sectionId)
            ->where('instructor_id', $userId)
            ->firstOrFail();

        $enrollments = \App\Models\Enrollment::where('course_section_id', $sectionId)
            ->with(['student.user'])
            ->get();

        $data = $enrollments->map(function ($enrollment) use ($sectionId) {
            $student = $enrollment->student;
            $user = $student?->user;

            // Attendance summary
            $attendanceQuery = Attendance::where('course_section_id', $sectionId)
                ->where('student_id', $student?->id);

            $presentCount = (clone $attendanceQuery)->where('status', 'present')->count();
            $absentCount = (clone $attendanceQuery)->where('status', 'absent')->count();
            $lateCount = (clone $attendanceQuery)->where('status', 'late')->count();

            // Grade info
            $grade = Grade::where('course_section_id', $sectionId)
                ->where('student_id', $student?->id)
                ->first();

            return [
                'enrollment_id' => $enrollment->id,
                'student' => [
                    'id' => $student?->id,
                    'student_id' => $student?->student_id ?? null,
                    'name' => $user?->name,
                    'email' => $user?->email,
                ],
                'status' => $enrollment->status,
                'attendance' => [
                    'present' => $presentCount,
                    'absent' => $absentCount,
                    'late' => $lateCount,
                    'total' => $presentCount + $absentCount + $lateCount,
                ],
                'grade' => $grade ? [
                    'midterm' => $grade->midterm ?? null,
                    'final' => $grade->final ?? null,
                    'coursework' => $grade->coursework ?? null,
                    'total' => $grade->total ?? null,
                    'letter_grade' => $grade->letter_grade ?? null,
                ] : null,
            ];
        });

        return response()->json([
            'data' => [
                'section' => [
                    'id' => $section->id,
                    'section_number' => $section->section_number,
                    'course_name' => $section->course?->getTranslation('name', app()->getLocale(), false),
                    'enrolled_count' => $section->enrolled_count,
                ],
                'students' => $data,
            ],
        ]);
    }

    /**
     * Build a schedule array for the next N days from section schedule JSON.
     */
    private function buildSchedule($sections, int $days): array
    {
        $schedule = [];
        $today = Carbon::today();
        $locale = app()->getLocale();

        for ($i = 0; $i < $days; $i++) {
            $date = $today->copy()->addDays($i);
            $dayName = strtolower($date->format('l')); // e.g., "sunday", "monday"

            $daySchedule = [];

            foreach ($sections as $section) {
                if (! is_array($section->schedule)) {
                    continue;
                }

                foreach ($section->schedule as $slot) {
                    $slotDay = strtolower($slot['day'] ?? '');
                    if ($slotDay === $dayName) {
                        $daySchedule[] = [
                            'section_id' => $section->id,
                            'course_name' => $section->course?->getTranslation('name', $locale, false),
                            'course_code' => $section->course?->code ?? null,
                            'section_number' => $section->section_number,
                            'room' => $section->room,
                            'building' => $section->building,
                            'start_time' => $slot['start'] ?? null,
                            'end_time' => $slot['end'] ?? null,
                        ];
                    }
                }
            }

            // Sort by start time
            usort($daySchedule, function ($a, $b) {
                return strcmp($a['start_time'] ?? '', $b['start_time'] ?? '');
            });

            $schedule[] = [
                'date' => $date->toDateString(),
                'day' => $dayName,
                'classes' => $daySchedule,
            ];
        }

        return $schedule;
    }
}
