<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Faculty;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        $islamicStudies = Faculty::where('slug', 'faculty-of-sharia-and-law')->first();
        $arabic = Faculty::where('slug', 'faculty-of-arabic-language')->first();
        $science = Faculty::where('slug', 'faculty-of-science')->first();
        $engineering = Faculty::where('slug', 'faculty-of-engineering')->first();
        $medicine = Faculty::where('slug', 'faculty-of-medicine')->first();
        $computers = Faculty::where('slug', 'faculty-of-science')->first(); // CS courses under science faculty

        $courses = [
            // Islamic Studies
            [
                'code' => 'ISL101',
                'name' => ['ar' => 'أصول الفقه', 'en' => 'Principles of Islamic Jurisprudence'],
                'description' => ['ar' => 'دراسة القواعد والأصول التي يُبنى عليها استنباط الأحكام الشرعية من أدلتها التفصيلية', 'en' => 'Study of the principles and foundations upon which Islamic legal rulings are derived from their detailed sources'],
                'faculty_id' => $islamicStudies?->id,
                'credit_hours' => 3,
                'lecture_hours' => 3,
                'lab_hours' => 0,
                'course_type' => 'required',
                'academic_level' => 1,
            ],
            [
                'code' => 'ISL201',
                'name' => ['ar' => 'علوم القرآن', 'en' => 'Quranic Sciences'],
                'description' => ['ar' => 'دراسة شاملة لعلوم القرآن الكريم من أسباب النزول والناسخ والمنسوخ والمحكم والمتشابه', 'en' => 'Comprehensive study of Quranic sciences including reasons of revelation, abrogation, and interpretation'],
                'faculty_id' => $islamicStudies?->id,
                'credit_hours' => 3,
                'lecture_hours' => 3,
                'lab_hours' => 0,
                'course_type' => 'required',
                'academic_level' => 2,
            ],
            [
                'code' => 'ISL202',
                'name' => ['ar' => 'الحديث الشريف', 'en' => 'Prophetic Hadith'],
                'description' => ['ar' => 'دراسة الأحاديث النبوية الشريفة وعلم مصطلح الحديث والجرح والتعديل', 'en' => 'Study of Prophetic traditions, hadith terminology, and narrator criticism'],
                'faculty_id' => $islamicStudies?->id,
                'credit_hours' => 3,
                'lecture_hours' => 3,
                'lab_hours' => 0,
                'course_type' => 'required',
                'academic_level' => 2,
            ],
            [
                'code' => 'ISL301',
                'name' => ['ar' => 'التفسير', 'en' => 'Quranic Exegesis'],
                'description' => ['ar' => 'دراسة تفسير القرآن الكريم ومناهج المفسرين وأهم كتب التفسير', 'en' => 'Study of Quranic interpretation, exegetical methodologies, and major commentary works'],
                'faculty_id' => $islamicStudies?->id,
                'credit_hours' => 3,
                'lecture_hours' => 3,
                'lab_hours' => 0,
                'course_type' => 'required',
                'academic_level' => 3,
            ],
            [
                'code' => 'ISL102',
                'name' => ['ar' => 'العقيدة الإسلامية', 'en' => 'Islamic Creed'],
                'description' => ['ar' => 'دراسة أصول العقيدة الإسلامية والتوحيد والإيمان بالله وملائكته وكتبه ورسله واليوم الآخر', 'en' => 'Study of the foundations of Islamic creed, monotheism, and the six pillars of faith'],
                'faculty_id' => $islamicStudies?->id,
                'credit_hours' => 2,
                'lecture_hours' => 2,
                'lab_hours' => 0,
                'course_type' => 'required',
                'academic_level' => 1,
            ],

            // Arabic Language
            [
                'code' => 'ARB101',
                'name' => ['ar' => 'النحو والصرف', 'en' => 'Arabic Grammar and Morphology'],
                'description' => ['ar' => 'دراسة قواعد النحو العربي والصرف وإعراب الجمل والتراكيب اللغوية', 'en' => 'Study of Arabic syntax, morphology, parsing, and linguistic structures'],
                'faculty_id' => $arabic?->id,
                'credit_hours' => 3,
                'lecture_hours' => 3,
                'lab_hours' => 0,
                'course_type' => 'required',
                'academic_level' => 1,
            ],
            [
                'code' => 'ARB201',
                'name' => ['ar' => 'البلاغة العربية', 'en' => 'Arabic Rhetoric'],
                'description' => ['ar' => 'دراسة علوم البلاغة الثلاثة: المعاني والبيان والبديع مع التطبيق على النصوص الأدبية', 'en' => 'Study of the three rhetorical sciences: semantics, figurative language, and embellishment with literary applications'],
                'faculty_id' => $arabic?->id,
                'credit_hours' => 3,
                'lecture_hours' => 3,
                'lab_hours' => 0,
                'course_type' => 'required',
                'academic_level' => 2,
            ],
            [
                'code' => 'ARB301',
                'name' => ['ar' => 'الأدب العربي', 'en' => 'Arabic Literature'],
                'description' => ['ar' => 'دراسة الأدب العربي عبر العصور من الجاهلي إلى الحديث مع تحليل النصوص الأدبية', 'en' => 'Study of Arabic literature across eras from pre-Islamic to modern with literary text analysis'],
                'faculty_id' => $arabic?->id,
                'credit_hours' => 3,
                'lecture_hours' => 3,
                'lab_hours' => 0,
                'course_type' => 'required',
                'academic_level' => 3,
            ],

            // Science
            [
                'code' => 'PHY101',
                'name' => ['ar' => 'الفيزياء العامة', 'en' => 'General Physics'],
                'description' => ['ar' => 'مقدمة في الفيزياء تشمل الميكانيكا والحرارة والصوت والضوء والكهرباء', 'en' => 'Introduction to physics covering mechanics, heat, sound, light, and electricity'],
                'faculty_id' => $science?->id,
                'credit_hours' => 4,
                'lecture_hours' => 3,
                'lab_hours' => 2,
                'course_type' => 'required',
                'academic_level' => 1,
            ],
            [
                'code' => 'CHM201',
                'name' => ['ar' => 'الكيمياء العضوية', 'en' => 'Organic Chemistry'],
                'description' => ['ar' => 'دراسة المركبات العضوية وتفاعلاتها وآليات التفاعل والتسمية النظامية', 'en' => 'Study of organic compounds, their reactions, reaction mechanisms, and systematic nomenclature'],
                'faculty_id' => $science?->id,
                'credit_hours' => 4,
                'lecture_hours' => 3,
                'lab_hours' => 2,
                'course_type' => 'required',
                'academic_level' => 2,
            ],
            [
                'code' => 'BIO301',
                'name' => ['ar' => 'الأحياء الدقيقة', 'en' => 'Microbiology'],
                'description' => ['ar' => 'دراسة الكائنات الحية الدقيقة من بكتيريا وفيروسات وفطريات وتطبيقاتها', 'en' => 'Study of microorganisms including bacteria, viruses, and fungi and their applications'],
                'faculty_id' => $science?->id,
                'credit_hours' => 3,
                'lecture_hours' => 2,
                'lab_hours' => 2,
                'course_type' => 'required',
                'academic_level' => 3,
            ],
            [
                'code' => 'MTH101',
                'name' => ['ar' => 'حساب التفاضل والتكامل', 'en' => 'Calculus'],
                'description' => ['ar' => 'دراسة النهايات والاتصال والاشتقاق والتكامل وتطبيقاتهما', 'en' => 'Study of limits, continuity, differentiation, integration, and their applications'],
                'faculty_id' => $science?->id,
                'credit_hours' => 4,
                'lecture_hours' => 4,
                'lab_hours' => 0,
                'course_type' => 'required',
                'academic_level' => 1,
            ],

            // Engineering
            [
                'code' => 'ENG101',
                'name' => ['ar' => 'أساسيات الهندسة الكهربية', 'en' => 'Fundamentals of Electrical Engineering'],
                'description' => ['ar' => 'مقدمة في الدوائر الكهربية والمكونات الإلكترونية الأساسية وقوانين كيرشوف', 'en' => 'Introduction to electrical circuits, basic electronic components, and Kirchhoff\'s laws'],
                'faculty_id' => $engineering?->id,
                'credit_hours' => 3,
                'lecture_hours' => 2,
                'lab_hours' => 2,
                'course_type' => 'required',
                'academic_level' => 1,
            ],
            [
                'code' => 'ENG102',
                'name' => ['ar' => 'الرسم الهندسي', 'en' => 'Engineering Drawing'],
                'description' => ['ar' => 'أساسيات الرسم الهندسي والإسقاط والمقاطع والأبعاد باستخدام الأدوات اليدوية والحاسوب', 'en' => 'Fundamentals of engineering drawing, projections, sections, and dimensioning using manual tools and CAD'],
                'faculty_id' => $engineering?->id,
                'credit_hours' => 2,
                'lecture_hours' => 1,
                'lab_hours' => 2,
                'course_type' => 'required',
                'academic_level' => 1,
            ],

            // Medicine
            [
                'code' => 'MED101',
                'name' => ['ar' => 'التشريح', 'en' => 'Human Anatomy'],
                'description' => ['ar' => 'دراسة تفصيلية لتشريح جسم الإنسان وأجهزته المختلفة', 'en' => 'Detailed study of human body anatomy and its various systems'],
                'faculty_id' => $medicine?->id,
                'credit_hours' => 4,
                'lecture_hours' => 3,
                'lab_hours' => 3,
                'course_type' => 'required',
                'academic_level' => 1,
            ],
            [
                'code' => 'MED201',
                'name' => ['ar' => 'الفسيولوجيا', 'en' => 'Physiology'],
                'description' => ['ar' => 'دراسة وظائف أعضاء الجسم البشري وآليات عملها الطبيعية', 'en' => 'Study of human body organ functions and their normal working mechanisms'],
                'faculty_id' => $medicine?->id,
                'credit_hours' => 4,
                'lecture_hours' => 3,
                'lab_hours' => 2,
                'course_type' => 'required',
                'academic_level' => 2,
            ],

            // Computer Science
            [
                'code' => 'CS101',
                'name' => ['ar' => 'مقدمة في البرمجة', 'en' => 'Introduction to Programming'],
                'description' => ['ar' => 'أساسيات البرمجة باستخدام لغة بايثون: المتغيرات والشروط والحلقات والدوال والكائنات', 'en' => 'Programming fundamentals using Python: variables, conditions, loops, functions, and objects'],
                'faculty_id' => $computers?->id,
                'credit_hours' => 3,
                'lecture_hours' => 2,
                'lab_hours' => 2,
                'course_type' => 'required',
                'academic_level' => 1,
            ],
            [
                'code' => 'CS201',
                'name' => ['ar' => 'قواعد البيانات', 'en' => 'Database Systems'],
                'description' => ['ar' => 'تصميم وإدارة قواعد البيانات العلائقية ولغة SQL والتطبيع', 'en' => 'Design and management of relational databases, SQL language, and normalization'],
                'faculty_id' => $computers?->id,
                'credit_hours' => 3,
                'lecture_hours' => 2,
                'lab_hours' => 2,
                'course_type' => 'required',
                'academic_level' => 2,
            ],
        ];

        foreach ($courses as $course) {
            Course::create(array_merge($course, ['is_active' => true]));
        }
    }
}
