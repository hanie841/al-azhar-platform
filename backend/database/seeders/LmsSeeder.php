<?php

namespace Database\Seeders;

use App\Models\CourseSection;
use App\Models\DiscussionForum;
use App\Models\DiscussionReply;
use App\Models\DiscussionThread;
use App\Models\LmsAnnouncement;
use App\Models\LmsAssignment;
use App\Models\LmsCourse;
use App\Models\LmsLesson;
use App\Models\LmsModule;
use App\Models\Semester;
use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Seeder;

class LmsSeeder extends Seeder
{
    public function run(): void
    {
        $currentSemester = Semester::where('is_current', true)->first();

        if (! $currentSemester) {
            return;
        }

        $sections = CourseSection::where('semester_id', $currentSemester->id)
            ->with('course')
            ->take(5)
            ->get();

        $facultyUser = User::where('role', 'faculty_member')->first();
        $studentUsers = User::where('role', 'student')->take(3)->get();

        $lmsCourses = [
            [
                'title' => ['ar' => 'أصول الفقه - المحتوى الإلكتروني', 'en' => 'Principles of Islamic Jurisprudence - Online Content'],
                'description' => ['ar' => 'المحتوى الإلكتروني لمقرر أصول الفقه يشمل المحاضرات والتكليفات والمناقشات', 'en' => 'Online content for the Principles of Islamic Jurisprudence course including lectures, assignments, and discussions'],
                'modules' => [
                    [
                        'title' => ['ar' => 'الوحدة الأولى: مقدمة في أصول الفقه', 'en' => 'Unit 1: Introduction to Usul al-Fiqh'],
                        'description' => ['ar' => 'تعريف بعلم أصول الفقه ونشأته وتطوره', 'en' => 'Introduction to the science of Usul al-Fiqh, its origins and development'],
                        'lessons' => [
                            ['title' => ['ar' => 'تعريف أصول الفقه وأهميته', 'en' => 'Definition and Importance of Usul al-Fiqh'], 'content_type' => 'video', 'duration' => 45],
                            ['title' => ['ar' => 'نشأة علم أصول الفقه', 'en' => 'Origins of Usul al-Fiqh'], 'content_type' => 'video', 'duration' => 40],
                            ['title' => ['ar' => 'مصادر التشريع الإسلامي', 'en' => 'Sources of Islamic Legislation'], 'content_type' => 'document', 'duration' => 30],
                            ['title' => ['ar' => 'قراءات مساعدة', 'en' => 'Supplementary Readings'], 'content_type' => 'text', 'duration' => 20],
                        ],
                    ],
                    [
                        'title' => ['ar' => 'الوحدة الثانية: الأدلة الشرعية', 'en' => 'Unit 2: Legal Sources'],
                        'description' => ['ar' => 'دراسة الأدلة الشرعية المتفق عليها والمختلف فيها', 'en' => 'Study of agreed-upon and disputed legal sources'],
                        'lessons' => [
                            ['title' => ['ar' => 'القرآن الكريم كمصدر تشريعي', 'en' => 'The Quran as a Legislative Source'], 'content_type' => 'video', 'duration' => 50],
                            ['title' => ['ar' => 'السنة النبوية وحجيتها', 'en' => 'The Prophetic Sunnah and Its Authority'], 'content_type' => 'video', 'duration' => 45],
                            ['title' => ['ar' => 'الإجماع والقياس', 'en' => 'Consensus and Analogical Reasoning'], 'content_type' => 'document', 'duration' => 35],
                        ],
                    ],
                    [
                        'title' => ['ar' => 'الوحدة الثالثة: القواعد الأصولية', 'en' => 'Unit 3: Fundamental Principles'],
                        'description' => ['ar' => 'القواعد الكلية في أصول الفقه وتطبيقاتها', 'en' => 'Universal principles in Usul al-Fiqh and their applications'],
                        'lessons' => [
                            ['title' => ['ar' => 'الأمر والنهي', 'en' => 'Commands and Prohibitions'], 'content_type' => 'video', 'duration' => 40],
                            ['title' => ['ar' => 'العام والخاص', 'en' => 'The General and Specific'], 'content_type' => 'video', 'duration' => 35],
                            ['title' => ['ar' => 'المطلق والمقيد', 'en' => 'The Absolute and Restricted'], 'content_type' => 'text', 'duration' => 25],
                            ['title' => ['ar' => 'تطبيقات عملية', 'en' => 'Practical Applications'], 'content_type' => 'document', 'duration' => 30],
                            ['title' => ['ar' => 'ملخص الوحدة', 'en' => 'Unit Summary'], 'content_type' => 'text', 'duration' => 15],
                        ],
                    ],
                ],
            ],
            [
                'title' => ['ar' => 'مقدمة في البرمجة - المعمل الافتراضي', 'en' => 'Introduction to Programming - Virtual Lab'],
                'description' => ['ar' => 'بيئة التعلم الإلكتروني لمقرر البرمجة تشمل دروساً تفاعلية وتكليفات عملية', 'en' => 'E-learning environment for the programming course with interactive lessons and practical assignments'],
                'modules' => [
                    [
                        'title' => ['ar' => 'الوحدة الأولى: أساسيات بايثون', 'en' => 'Unit 1: Python Basics'],
                        'description' => ['ar' => 'المتغيرات وأنواع البيانات والعمليات الأساسية', 'en' => 'Variables, data types, and basic operations'],
                        'lessons' => [
                            ['title' => ['ar' => 'تثبيت بايثون وبيئة التطوير', 'en' => 'Installing Python and IDE Setup'], 'content_type' => 'video', 'duration' => 30],
                            ['title' => ['ar' => 'المتغيرات وأنواع البيانات', 'en' => 'Variables and Data Types'], 'content_type' => 'video', 'duration' => 40],
                            ['title' => ['ar' => 'العمليات الحسابية والمنطقية', 'en' => 'Arithmetic and Logical Operations'], 'content_type' => 'video', 'duration' => 35],
                        ],
                    ],
                    [
                        'title' => ['ar' => 'الوحدة الثانية: التحكم في التدفق', 'en' => 'Unit 2: Flow Control'],
                        'description' => ['ar' => 'الشروط والحلقات التكرارية', 'en' => 'Conditions and loops'],
                        'lessons' => [
                            ['title' => ['ar' => 'عبارات الشرط if/else', 'en' => 'If/Else Statements'], 'content_type' => 'video', 'duration' => 35],
                            ['title' => ['ar' => 'حلقات for و while', 'en' => 'For and While Loops'], 'content_type' => 'video', 'duration' => 40],
                            ['title' => ['ar' => 'تمارين تطبيقية', 'en' => 'Practice Exercises'], 'content_type' => 'text', 'duration' => 60],
                        ],
                    ],
                    [
                        'title' => ['ar' => 'الوحدة الثالثة: الدوال', 'en' => 'Unit 3: Functions'],
                        'description' => ['ar' => 'تعريف واستخدام الدوال في بايثون', 'en' => 'Defining and using functions in Python'],
                        'lessons' => [
                            ['title' => ['ar' => 'تعريف الدوال والمعاملات', 'en' => 'Defining Functions and Parameters'], 'content_type' => 'video', 'duration' => 45],
                            ['title' => ['ar' => 'القيم المرجعة والنطاق', 'en' => 'Return Values and Scope'], 'content_type' => 'video', 'duration' => 35],
                            ['title' => ['ar' => 'الدوال المتقدمة', 'en' => 'Advanced Functions'], 'content_type' => 'document', 'duration' => 30],
                            ['title' => ['ar' => 'مشروع تطبيقي', 'en' => 'Hands-on Project'], 'content_type' => 'text', 'duration' => 90],
                        ],
                    ],
                    [
                        'title' => ['ar' => 'الوحدة الرابعة: هياكل البيانات', 'en' => 'Unit 4: Data Structures'],
                        'description' => ['ar' => 'القوائم والقواميس والمجموعات', 'en' => 'Lists, dictionaries, and sets'],
                        'lessons' => [
                            ['title' => ['ar' => 'القوائم والصفوف', 'en' => 'Lists and Tuples'], 'content_type' => 'video', 'duration' => 40],
                            ['title' => ['ar' => 'القواميس', 'en' => 'Dictionaries'], 'content_type' => 'video', 'duration' => 35],
                            ['title' => ['ar' => 'المجموعات', 'en' => 'Sets'], 'content_type' => 'document', 'duration' => 25],
                        ],
                    ],
                ],
            ],
            [
                'title' => ['ar' => 'الفيزياء العامة - المحتوى الرقمي', 'en' => 'General Physics - Digital Content'],
                'description' => ['ar' => 'محتوى تعليمي رقمي لمقرر الفيزياء العامة', 'en' => 'Digital educational content for the General Physics course'],
                'modules' => [
                    [
                        'title' => ['ar' => 'الوحدة الأولى: الميكانيكا', 'en' => 'Unit 1: Mechanics'],
                        'description' => ['ar' => 'قوانين نيوتن والحركة', 'en' => 'Newton\'s laws and motion'],
                        'lessons' => [
                            ['title' => ['ar' => 'قوانين نيوتن للحركة', 'en' => 'Newton\'s Laws of Motion'], 'content_type' => 'video', 'duration' => 50],
                            ['title' => ['ar' => 'الشغل والطاقة', 'en' => 'Work and Energy'], 'content_type' => 'video', 'duration' => 45],
                            ['title' => ['ar' => 'كمية الحركة والتصادم', 'en' => 'Momentum and Collisions'], 'content_type' => 'document', 'duration' => 35],
                        ],
                    ],
                    [
                        'title' => ['ar' => 'الوحدة الثانية: الحرارة', 'en' => 'Unit 2: Thermodynamics'],
                        'description' => ['ar' => 'درجة الحرارة والطاقة الحرارية', 'en' => 'Temperature and thermal energy'],
                        'lessons' => [
                            ['title' => ['ar' => 'القياسات الحرارية', 'en' => 'Thermal Measurements'], 'content_type' => 'video', 'duration' => 40],
                            ['title' => ['ar' => 'القانون الأول للديناميكا الحرارية', 'en' => 'First Law of Thermodynamics'], 'content_type' => 'video', 'duration' => 45],
                            ['title' => ['ar' => 'تجارب معملية', 'en' => 'Lab Experiments'], 'content_type' => 'document', 'duration' => 60],
                        ],
                    ],
                    [
                        'title' => ['ar' => 'الوحدة الثالثة: الكهرباء', 'en' => 'Unit 3: Electricity'],
                        'description' => ['ar' => 'الشحنات والمجالات الكهربية', 'en' => 'Charges and electric fields'],
                        'lessons' => [
                            ['title' => ['ar' => 'الشحنة الكهربية وقانون كولوم', 'en' => 'Electric Charge and Coulomb\'s Law'], 'content_type' => 'video', 'duration' => 45],
                            ['title' => ['ar' => 'الدوائر الكهربية البسيطة', 'en' => 'Simple Electric Circuits'], 'content_type' => 'video', 'duration' => 40],
                            ['title' => ['ar' => 'مسائل محلولة', 'en' => 'Solved Problems'], 'content_type' => 'text', 'duration' => 30],
                        ],
                    ],
                ],
            ],
            [
                'title' => ['ar' => 'النحو والصرف - منصة التعلم', 'en' => 'Arabic Grammar - Learning Platform'],
                'description' => ['ar' => 'منصة تعليمية لمقرر النحو والصرف تحتوي على دروس وتمارين', 'en' => 'Learning platform for Arabic Grammar course with lessons and exercises'],
                'modules' => [
                    [
                        'title' => ['ar' => 'الوحدة الأولى: المرفوعات', 'en' => 'Unit 1: Nominative Cases'],
                        'description' => ['ar' => 'الفاعل ونائب الفاعل والمبتدأ والخبر', 'en' => 'Subject, proxy subject, and predicate-topic constructions'],
                        'lessons' => [
                            ['title' => ['ar' => 'الفاعل وأحكامه', 'en' => 'The Subject and Its Rules'], 'content_type' => 'video', 'duration' => 40],
                            ['title' => ['ar' => 'نائب الفاعل', 'en' => 'The Proxy Subject'], 'content_type' => 'video', 'duration' => 35],
                            ['title' => ['ar' => 'المبتدأ والخبر', 'en' => 'Topic and Comment'], 'content_type' => 'document', 'duration' => 30],
                        ],
                    ],
                    [
                        'title' => ['ar' => 'الوحدة الثانية: المنصوبات', 'en' => 'Unit 2: Accusative Cases'],
                        'description' => ['ar' => 'المفعول به والمفعول المطلق والحال والتمييز', 'en' => 'Direct object, absolute object, circumstantial expression, and specification'],
                        'lessons' => [
                            ['title' => ['ar' => 'المفعول به', 'en' => 'The Direct Object'], 'content_type' => 'video', 'duration' => 35],
                            ['title' => ['ar' => 'الحال والتمييز', 'en' => 'Circumstantial and Specification'], 'content_type' => 'video', 'duration' => 40],
                            ['title' => ['ar' => 'تدريبات إعرابية', 'en' => 'Parsing Exercises'], 'content_type' => 'text', 'duration' => 45],
                        ],
                    ],
                    [
                        'title' => ['ar' => 'الوحدة الثالثة: الصرف', 'en' => 'Unit 3: Morphology'],
                        'description' => ['ar' => 'الميزان الصرفي والاشتقاق', 'en' => 'Morphological patterns and derivation'],
                        'lessons' => [
                            ['title' => ['ar' => 'الميزان الصرفي', 'en' => 'Morphological Patterns'], 'content_type' => 'video', 'duration' => 45],
                            ['title' => ['ar' => 'أوزان الأفعال', 'en' => 'Verb Forms'], 'content_type' => 'video', 'duration' => 40],
                            ['title' => ['ar' => 'المشتقات', 'en' => 'Derivatives'], 'content_type' => 'document', 'duration' => 30],
                            ['title' => ['ar' => 'تمارين شاملة', 'en' => 'Comprehensive Exercises'], 'content_type' => 'text', 'duration' => 50],
                        ],
                    ],
                ],
            ],
            [
                'title' => ['ar' => 'التشريح - المكتبة الرقمية', 'en' => 'Human Anatomy - Digital Library'],
                'description' => ['ar' => 'مكتبة رقمية لمقرر التشريح تحتوي على محاضرات وصور تشريحية تفاعلية', 'en' => 'Digital library for the Anatomy course with lectures and interactive anatomical images'],
                'modules' => [
                    [
                        'title' => ['ar' => 'الوحدة الأولى: الجهاز الهيكلي', 'en' => 'Unit 1: Skeletal System'],
                        'description' => ['ar' => 'تشريح العظام والمفاصل', 'en' => 'Anatomy of bones and joints'],
                        'lessons' => [
                            ['title' => ['ar' => 'عظام الجمجمة', 'en' => 'Skull Bones'], 'content_type' => 'video', 'duration' => 50],
                            ['title' => ['ar' => 'العمود الفقري', 'en' => 'The Vertebral Column'], 'content_type' => 'video', 'duration' => 45],
                            ['title' => ['ar' => 'عظام الطرف العلوي', 'en' => 'Upper Limb Bones'], 'content_type' => 'document', 'duration' => 40],
                        ],
                    ],
                    [
                        'title' => ['ar' => 'الوحدة الثانية: الجهاز العضلي', 'en' => 'Unit 2: Muscular System'],
                        'description' => ['ar' => 'تشريح العضلات الرئيسية', 'en' => 'Anatomy of major muscles'],
                        'lessons' => [
                            ['title' => ['ar' => 'عضلات الطرف العلوي', 'en' => 'Upper Limb Muscles'], 'content_type' => 'video', 'duration' => 50],
                            ['title' => ['ar' => 'عضلات الجذع', 'en' => 'Trunk Muscles'], 'content_type' => 'video', 'duration' => 45],
                            ['title' => ['ar' => 'أطلس تشريحي تفاعلي', 'en' => 'Interactive Anatomical Atlas'], 'content_type' => 'document', 'duration' => 60],
                        ],
                    ],
                    [
                        'title' => ['ar' => 'الوحدة الثالثة: الجهاز العصبي', 'en' => 'Unit 3: Nervous System'],
                        'description' => ['ar' => 'تشريح الدماغ والأعصاب', 'en' => 'Anatomy of the brain and nerves'],
                        'lessons' => [
                            ['title' => ['ar' => 'تشريح الدماغ', 'en' => 'Brain Anatomy'], 'content_type' => 'video', 'duration' => 55],
                            ['title' => ['ar' => 'الأعصاب القحفية', 'en' => 'Cranial Nerves'], 'content_type' => 'video', 'duration' => 50],
                            ['title' => ['ar' => 'الحبل الشوكي', 'en' => 'Spinal Cord'], 'content_type' => 'document', 'duration' => 40],
                            ['title' => ['ar' => 'مراجعة شاملة', 'en' => 'Comprehensive Review'], 'content_type' => 'text', 'duration' => 30],
                        ],
                    ],
                ],
            ],
        ];

        foreach ($lmsCourses as $courseIndex => $lmsCourseData) {
            $section = $sections->get($courseIndex);

            if (! $section) {
                continue;
            }

            $lmsCourse = LmsCourse::create([
                'course_section_id' => $section->id,
                'title' => $lmsCourseData['title'],
                'description' => $lmsCourseData['description'],
                'is_published' => true,
                'published_at' => now()->subDays(rand(10, 30)),
                'created_by' => $facultyUser?->id,
            ]);

            // Create modules and lessons
            foreach ($lmsCourseData['modules'] as $moduleOrder => $moduleData) {
                $module = LmsModule::create([
                    'lms_course_id' => $lmsCourse->id,
                    'title' => $moduleData['title'],
                    'description' => $moduleData['description'],
                    'order' => $moduleOrder + 1,
                    'is_published' => true,
                ]);

                foreach ($moduleData['lessons'] as $lessonOrder => $lessonData) {
                    LmsLesson::create([
                        'lms_module_id' => $module->id,
                        'title' => $lessonData['title'],
                        'content_type' => $lessonData['content_type'],
                        'content' => $lessonData['content_type'] === 'text'
                            ? ['ar' => 'محتوى الدرس سيتم إضافته قريباً', 'en' => 'Lesson content will be added soon']
                            : null,
                        'duration_minutes' => $lessonData['duration'],
                        'order' => $lessonOrder + 1,
                        'is_published' => true,
                        'is_downloadable' => $lessonData['content_type'] === 'document',
                    ]);
                }
            }

            // Create assignments (2-3 per course)
            $assignmentTemplates = [
                [
                    'title' => ['ar' => 'التكليف الأول', 'en' => 'Assignment 1'],
                    'description' => ['ar' => 'تكليف بحثي حول الموضوعات المقررة في الوحدة الأولى', 'en' => 'Research assignment on topics covered in Unit 1'],
                    'type' => 'assignment',
                    'max_score' => 20,
                    'weight' => 10,
                    'due_days' => 30,
                ],
                [
                    'title' => ['ar' => 'التكليف الثاني', 'en' => 'Assignment 2'],
                    'description' => ['ar' => 'تكليف تطبيقي حول الوحدة الثانية يتضمن حل مسائل وتمارين', 'en' => 'Practical assignment on Unit 2 with problem-solving exercises'],
                    'type' => 'homework',
                    'max_score' => 15,
                    'weight' => 8,
                    'due_days' => 60,
                ],
                [
                    'title' => ['ar' => 'المشروع النهائي', 'en' => 'Final Project'],
                    'description' => ['ar' => 'مشروع شامل يغطي جميع الوحدات الدراسية', 'en' => 'Comprehensive project covering all course units'],
                    'type' => 'project',
                    'max_score' => 30,
                    'weight' => 15,
                    'due_days' => 90,
                ],
            ];

            $assignmentCount = rand(2, 3);
            for ($a = 0; $a < $assignmentCount; $a++) {
                $template = $assignmentTemplates[$a];
                LmsAssignment::create([
                    'lms_course_id' => $lmsCourse->id,
                    'title' => $template['title'],
                    'description' => $template['description'],
                    'assignment_type' => $template['type'],
                    'max_score' => $template['max_score'],
                    'weight_percentage' => $template['weight'],
                    'due_date' => now()->addDays($template['due_days']),
                    'allow_late' => $a < 2,
                    'late_penalty_percent' => $a < 2 ? 10 : 0,
                    'max_attempts' => 1,
                    'is_published' => true,
                ]);
            }

            // Create announcements (1-2 per course)
            LmsAnnouncement::create([
                'lms_course_id' => $lmsCourse->id,
                'title' => ['ar' => 'مرحباً بكم في المقرر', 'en' => 'Welcome to the Course'],
                'content' => ['ar' => 'أهلاً وسهلاً بجميع الطلاب في هذا المقرر. يرجى مراجعة خطة المقرر والمواعيد المهمة. نتمنى لكم فصلاً دراسياً موفقاً.', 'en' => 'Welcome all students to this course. Please review the syllabus and important dates. We wish you a successful semester.'],
                'is_pinned' => true,
                'published_by' => $facultyUser?->id,
                'published_at' => now()->subDays(25),
            ]);

            if ($courseIndex % 2 === 0) {
                LmsAnnouncement::create([
                    'lms_course_id' => $lmsCourse->id,
                    'title' => ['ar' => 'تحديث موعد التكليف الأول', 'en' => 'Assignment 1 Deadline Update'],
                    'content' => ['ar' => 'تم تمديد موعد تسليم التكليف الأول أسبوعاً إضافياً. الموعد الجديد سيتم الإعلان عنه لاحقاً.', 'en' => 'The deadline for Assignment 1 has been extended by one week. The new deadline will be announced later.'],
                    'is_pinned' => false,
                    'published_by' => $facultyUser?->id,
                    'published_at' => now()->subDays(10),
                ]);
            }

            // Create discussion forum with threads and replies
            $forum = DiscussionForum::create([
                'lms_course_id' => $lmsCourse->id,
                'title' => ['ar' => 'منتدى النقاش العام', 'en' => 'General Discussion Forum'],
                'description' => ['ar' => 'منتدى للنقاش وطرح الأسئلة حول محتوى المقرر', 'en' => 'Forum for discussion and questions about course content'],
                'is_locked' => false,
                'order' => 1,
            ]);

            // Create threads
            $threadData = [
                [
                    'title' => 'سؤال عن محتوى الوحدة الأولى',
                    'body' => 'السلام عليكم، هل يمكن توضيح النقطة المتعلقة بالموضوع الأول في الوحدة الأولى؟ شكراً',
                ],
                [
                    'title' => 'مشكلة في الوصول للمحتوى',
                    'body' => 'واجهت مشكلة في تحميل ملفات الوحدة الثانية. هل يمكن المساعدة؟',
                ],
                [
                    'title' => 'مناقشة حول التكليف الأول',
                    'body' => 'هل المطلوب في التكليف الأول بحث نظري فقط أم يشمل الجانب التطبيقي أيضاً؟',
                ],
            ];

            foreach ($threadData as $tIndex => $tData) {
                $threadUser = $studentUsers->get($tIndex % $studentUsers->count());

                if (! $threadUser) {
                    continue;
                }

                $thread = DiscussionThread::create([
                    'discussion_forum_id' => $forum->id,
                    'user_id' => $threadUser->id,
                    'title' => $tData['title'],
                    'body' => $tData['body'],
                    'is_pinned' => $tIndex === 0,
                    'is_locked' => false,
                    'replies_count' => 0,
                ]);

                // Add a reply from faculty
                if ($facultyUser) {
                    DiscussionReply::create([
                        'discussion_thread_id' => $thread->id,
                        'user_id' => $facultyUser->id,
                        'body' => 'شكراً لسؤالك. سأقوم بالرد عليه بالتفصيل في المحاضرة القادمة إن شاء الله.',
                    ]);
                    $thread->increment('replies_count');
                }

                // Add a reply from another student
                $replyUser = $studentUsers->get(($tIndex + 1) % $studentUsers->count());
                if ($replyUser) {
                    DiscussionReply::create([
                        'discussion_thread_id' => $thread->id,
                        'user_id' => $replyUser->id,
                        'body' => 'أنا أيضاً لدي نفس السؤال. شكراً للطرح.',
                    ]);
                    $thread->increment('replies_count');
                }
            }
        }
    }
}
