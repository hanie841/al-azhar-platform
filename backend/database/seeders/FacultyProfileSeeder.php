<?php

namespace Database\Seeders;

use App\Models\CommitteeMembership;
use App\Models\Faculty;
use App\Models\FacultyProfile;
use App\Models\LeaveRequest;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class FacultyProfileSeeder extends Seeder
{
    public function run(): void
    {
        $islamicStudies = Faculty::where('slug', 'faculty-of-sharia-and-law')->first();
        $arabic = Faculty::where('slug', 'faculty-of-arabic-language')->first();
        $computers = Faculty::where('slug', 'faculty-of-science')->first();
        $medicine = Faculty::where('slug', 'faculty-of-medicine')->first();
        $engineering = Faculty::where('slug', 'faculty-of-engineering')->first();

        $profiles = [
            [
                'user' => [
                    'name' => 'د. أحمد محمد الشافعي',
                    'email' => 'a.shafei@azhar.edu.eg',
                ],
                'profile' => [
                    'faculty_id' => $islamicStudies?->id,
                    'employee_id' => 'FAC-2010-001',
                    'title' => ['ar' => 'أستاذ دكتور', 'en' => 'Professor'],
                    'academic_rank' => 'professor',
                    'specialization' => ['ar' => 'أصول الفقه الإسلامي', 'en' => 'Principles of Islamic Jurisprudence'],
                    'bio' => [
                        'ar' => 'أستاذ متخصص في أصول الفقه الإسلامي والمقاصد الشرعية. حاصل على الدكتوراه من جامعة الأزهر عام 2005. له أكثر من 30 بحثاً منشوراً في المجلات العلمية المحكمة.',
                        'en' => 'Professor specializing in Islamic jurisprudence principles and Maqasid al-Shariah. PhD from Al-Azhar University in 2005. Published over 30 peer-reviewed research papers.',
                    ],
                    'phone' => '+20-2-2345-6001',
                    'office_location' => 'Building A, Room 201',
                    'office_hours' => [
                        ['day' => 'Sunday', 'from' => '10:00', 'to' => '12:00'],
                        ['day' => 'Tuesday', 'from' => '10:00', 'to' => '12:00'],
                    ],
                    'research_interests' => ['Islamic jurisprudence', 'Maqasid al-Shariah', 'Comparative Fiqh', 'Islamic finance'],
                    'qualifications' => [
                        ['degree' => 'PhD', 'field' => 'Islamic Jurisprudence', 'institution' => 'Al-Azhar University', 'year' => 2005],
                        ['degree' => 'MA', 'field' => 'Islamic Studies', 'institution' => 'Al-Azhar University', 'year' => 2000],
                        ['degree' => 'BA', 'field' => 'Sharia and Law', 'institution' => 'Al-Azhar University', 'year' => 1996],
                    ],
                    'publications_count' => 32,
                    'joined_at' => '2010-09-01',
                ],
            ],
            [
                'user' => [
                    'name' => 'د. سارة عبدالله النجار',
                    'email' => 's.najjar@azhar.edu.eg',
                ],
                'profile' => [
                    'faculty_id' => $arabic?->id,
                    'employee_id' => 'FAC-2012-002',
                    'title' => ['ar' => 'أستاذ مساعد', 'en' => 'Associate Professor'],
                    'academic_rank' => 'associate_professor',
                    'specialization' => ['ar' => 'البلاغة العربية والنقد الأدبي', 'en' => 'Arabic Rhetoric and Literary Criticism'],
                    'bio' => [
                        'ar' => 'أستاذ مساعد متخصصة في البلاغة العربية والنقد الأدبي. حاصلة على الدكتوراه من جامعة القاهرة. لها عدة مؤلفات في البلاغة التطبيقية.',
                        'en' => 'Associate Professor specializing in Arabic rhetoric and literary criticism. PhD from Cairo University. Author of several books on applied rhetoric.',
                    ],
                    'phone' => '+20-2-2345-6002',
                    'office_location' => 'Building B, Room 305',
                    'office_hours' => [
                        ['day' => 'Monday', 'from' => '09:00', 'to' => '11:00'],
                        ['day' => 'Wednesday', 'from' => '09:00', 'to' => '11:00'],
                    ],
                    'research_interests' => ['Arabic rhetoric', 'Literary criticism', 'Discourse analysis', 'Quranic stylistics'],
                    'qualifications' => [
                        ['degree' => 'PhD', 'field' => 'Arabic Rhetoric', 'institution' => 'Cairo University', 'year' => 2008],
                        ['degree' => 'MA', 'field' => 'Arabic Language', 'institution' => 'Ain Shams University', 'year' => 2004],
                        ['degree' => 'BA', 'field' => 'Arabic Language', 'institution' => 'Al-Azhar University', 'year' => 2000],
                    ],
                    'publications_count' => 18,
                    'joined_at' => '2012-09-01',
                ],
            ],
            [
                'user' => [
                    'name' => 'د. محمد حسن إبراهيم',
                    'email' => 'm.ibrahim@azhar.edu.eg',
                ],
                'profile' => [
                    'faculty_id' => $computers?->id,
                    'employee_id' => 'FAC-2015-003',
                    'title' => ['ar' => 'أستاذ مساعد', 'en' => 'Assistant Professor'],
                    'academic_rank' => 'assistant_professor',
                    'specialization' => ['ar' => 'علوم الحاسب والذكاء الاصطناعي', 'en' => 'Computer Science and Artificial Intelligence'],
                    'bio' => [
                        'ar' => 'أستاذ مساعد في قسم علوم الحاسب. متخصص في الذكاء الاصطناعي وتعلم الآلة. حاصل على الدكتوراه من جامعة مانشستر.',
                        'en' => 'Assistant Professor in the Computer Science department. Specializes in AI and machine learning. PhD from the University of Manchester.',
                    ],
                    'phone' => '+20-2-2345-6003',
                    'office_location' => 'IT Building, Room 102',
                    'office_hours' => [
                        ['day' => 'Sunday', 'from' => '11:00', 'to' => '13:00'],
                        ['day' => 'Thursday', 'from' => '11:00', 'to' => '13:00'],
                    ],
                    'research_interests' => ['Artificial intelligence', 'Machine learning', 'Natural language processing', 'Data science'],
                    'qualifications' => [
                        ['degree' => 'PhD', 'field' => 'Computer Science', 'institution' => 'University of Manchester', 'year' => 2014],
                        ['degree' => 'MSc', 'field' => 'Artificial Intelligence', 'institution' => 'University of Manchester', 'year' => 2010],
                        ['degree' => 'BSc', 'field' => 'Computer Science', 'institution' => 'Al-Azhar University', 'year' => 2008],
                    ],
                    'publications_count' => 24,
                    'joined_at' => '2015-02-01',
                ],
            ],
            [
                'user' => [
                    'name' => 'د. فاطمة أحمد المصري',
                    'email' => 'f.masry@azhar.edu.eg',
                ],
                'profile' => [
                    'faculty_id' => $medicine?->id,
                    'employee_id' => 'FAC-2018-004',
                    'title' => ['ar' => 'مدرس', 'en' => 'Lecturer'],
                    'academic_rank' => 'lecturer',
                    'specialization' => ['ar' => 'التشريح البشري', 'en' => 'Human Anatomy'],
                    'bio' => [
                        'ar' => 'مدرس في قسم التشريح بكلية الطب. حاصلة على الدكتوراه من جامعة الأزهر. متخصصة في التشريح السريري والأجنة.',
                        'en' => 'Lecturer in the Anatomy department. PhD from Al-Azhar University. Specializes in clinical anatomy and embryology.',
                    ],
                    'phone' => '+20-2-2345-6004',
                    'office_location' => 'Medical Building, Room 410',
                    'office_hours' => [
                        ['day' => 'Monday', 'from' => '13:00', 'to' => '15:00'],
                        ['day' => 'Wednesday', 'from' => '13:00', 'to' => '15:00'],
                    ],
                    'research_interests' => ['Clinical anatomy', 'Embryology', 'Medical education', 'Histology'],
                    'qualifications' => [
                        ['degree' => 'PhD', 'field' => 'Human Anatomy', 'institution' => 'Al-Azhar University', 'year' => 2017],
                        ['degree' => 'MSc', 'field' => 'Anatomy', 'institution' => 'Al-Azhar University', 'year' => 2013],
                        ['degree' => 'MBBCh', 'field' => 'Medicine', 'institution' => 'Al-Azhar University', 'year' => 2010],
                    ],
                    'publications_count' => 11,
                    'joined_at' => '2018-09-01',
                ],
            ],
            [
                'user' => [
                    'name' => 'د. عمر يوسف الأزهري',
                    'email' => 'o.azhari@azhar.edu.eg',
                ],
                'profile' => [
                    'faculty_id' => $engineering?->id,
                    'employee_id' => 'FAC-2020-005',
                    'title' => ['ar' => 'معيد', 'en' => 'Teaching Assistant'],
                    'academic_rank' => 'teaching_assistant',
                    'specialization' => ['ar' => 'الهندسة الكهربية', 'en' => 'Electrical Engineering'],
                    'bio' => [
                        'ar' => 'معيد بقسم الهندسة الكهربية. يحضر حالياً لدرجة الماجستير في مجال الطاقة المتجددة.',
                        'en' => 'Teaching assistant in the Electrical Engineering department. Currently pursuing an MSc in renewable energy.',
                    ],
                    'phone' => '+20-2-2345-6005',
                    'office_location' => 'Engineering Building, Room 115',
                    'office_hours' => [
                        ['day' => 'Tuesday', 'from' => '14:00', 'to' => '16:00'],
                    ],
                    'research_interests' => ['Renewable energy', 'Power systems', 'Smart grids'],
                    'qualifications' => [
                        ['degree' => 'BSc', 'field' => 'Electrical Engineering', 'institution' => 'Al-Azhar University', 'year' => 2019],
                    ],
                    'publications_count' => 3,
                    'joined_at' => '2020-09-01',
                ],
            ],
        ];

        $adminUser = User::where('email', 'test@example.com')->first();

        foreach ($profiles as $data) {
            $user = User::create([
                'name' => $data['user']['name'],
                'email' => $data['user']['email'],
                'password' => Hash::make('password'),
                'role' => 'faculty_member',
                'is_active' => true,
            ]);

            $profile = FacultyProfile::create(array_merge($data['profile'], [
                'user_id' => $user->id,
                'is_active' => true,
                'is_public' => true,
            ]));
        }

        // Create leave requests for the first three profiles
        $profiles = FacultyProfile::all();

        if ($profiles->count() >= 3) {
            // Approved leave
            LeaveRequest::create([
                'faculty_profile_id' => $profiles[0]->id,
                'leave_type' => 'annual',
                'start_date' => '2026-01-15',
                'end_date' => '2026-01-22',
                'reason' => 'إجازة سنوية للسفر',
                'status' => 'approved',
                'approved_by' => $adminUser?->id,
                'approved_at' => '2026-01-10 09:00:00',
            ]);

            // Pending leave
            LeaveRequest::create([
                'faculty_profile_id' => $profiles[1]->id,
                'leave_type' => 'sick',
                'start_date' => '2026-04-05',
                'end_date' => '2026-04-08',
                'reason' => 'إجازة مرضية',
                'status' => 'pending',
            ]);

            // Rejected leave
            LeaveRequest::create([
                'faculty_profile_id' => $profiles[2]->id,
                'leave_type' => 'conference',
                'start_date' => '2026-03-20',
                'end_date' => '2026-03-25',
                'reason' => 'حضور مؤتمر دولي في ماليزيا',
                'status' => 'rejected',
                'approved_by' => $adminUser?->id,
                'approved_at' => '2026-03-15 10:00:00',
                'rejection_reason' => 'تعارض مع موعد الامتحانات',
            ]);
        }

        // Create committee memberships
        if ($profiles->count() >= 3) {
            CommitteeMembership::create([
                'faculty_profile_id' => $profiles[0]->id,
                'committee_name' => ['ar' => 'لجنة الدراسات العليا والبحوث', 'en' => 'Graduate Studies and Research Committee'],
                'role' => 'chair',
                'description' => ['ar' => 'الإشراف على برامج الدراسات العليا وخطط البحث العلمي', 'en' => 'Overseeing graduate programs and scientific research plans'],
                'start_date' => '2024-09-01',
                'is_active' => true,
            ]);

            CommitteeMembership::create([
                'faculty_profile_id' => $profiles[1]->id,
                'committee_name' => ['ar' => 'لجنة تطوير المناهج', 'en' => 'Curriculum Development Committee'],
                'role' => 'member',
                'description' => ['ar' => 'مراجعة وتطوير المناهج الدراسية لمواكبة المعايير الدولية', 'en' => 'Reviewing and developing curricula to meet international standards'],
                'start_date' => '2025-01-01',
                'is_active' => true,
            ]);

            CommitteeMembership::create([
                'faculty_profile_id' => $profiles[2]->id,
                'committee_name' => ['ar' => 'لجنة الجودة والاعتماد', 'en' => 'Quality Assurance and Accreditation Committee'],
                'role' => 'member',
                'description' => ['ar' => 'ضمان جودة التعليم والتحضير لعمليات الاعتماد الأكاديمي', 'en' => 'Ensuring education quality and preparing for academic accreditation processes'],
                'start_date' => '2025-02-01',
                'is_active' => true,
            ]);
        }
    }
}
