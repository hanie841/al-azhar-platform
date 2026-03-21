<?php

namespace Database\Seeders;

use App\Models\OrganizationalUnit;
use Illuminate\Database\Seeder;

class OrganizationalUnitSeeder extends Seeder
{
    public function run(): void
    {
        // Top level: University Presidency
        $presidency = OrganizationalUnit::create([
            'slug' => 'university-presidency',
            'type' => 'presidency',
            'name' => ['ar' => 'رئاسة الجامعة', 'en' => 'University Presidency'],
            'description' => [
                'ar' => 'رئاسة جامعة الأزهر هي الجهة العليا المسؤولة عن إدارة شؤون الجامعة ورسم سياساتها الأكاديمية والإدارية والبحثية. تشرف على جميع الكليات والمعاهد والمراكز البحثية التابعة للجامعة.',
                'en' => 'The University Presidency is the supreme body responsible for managing the university\'s affairs and setting its academic, administrative, and research policies. It oversees all faculties, institutes, and research centers affiliated with the university.',
            ],
            'parent_id' => null,
            'is_published' => true,
            'order' => 1,
        ]);

        // Vice Presidents and Secretary General
        $vpEducation = OrganizationalUnit::create([
            'slug' => 'vp-education-students',
            'type' => 'vice_presidency',
            'name' => ['ar' => 'نائب رئيس الجامعة لشؤون التعليم والطلاب', 'en' => 'Vice President for Education & Student Affairs'],
            'description' => [
                'ar' => 'يختص بالإشراف على العملية التعليمية وشؤون الطلاب في جميع كليات الجامعة، بما في ذلك القبول والتسجيل والامتحانات والأنشطة الطلابية والرعاية الاجتماعية للطلاب.',
                'en' => 'Responsible for overseeing the educational process and student affairs across all university faculties, including admissions, registration, examinations, student activities, and social welfare for students.',
            ],
            'parent_id' => $presidency->id,
            'is_published' => true,
            'order' => 1,
        ]);

        $vpGraduate = OrganizationalUnit::create([
            'slug' => 'vp-graduate-studies-research',
            'type' => 'vice_presidency',
            'name' => ['ar' => 'نائب رئيس الجامعة للدراسات العليا والبحوث', 'en' => 'Vice President for Graduate Studies & Research'],
            'description' => [
                'ar' => 'يشرف على برامج الدراسات العليا (الماجستير والدكتوراه) والبحث العلمي في الجامعة. يعمل على تعزيز الإنتاج البحثي وتطوير برامج الدراسات العليا وإقامة شراكات بحثية مع المؤسسات الدولية.',
                'en' => 'Oversees graduate programs (Master\'s and PhD) and scientific research at the university. Works to enhance research output, develop graduate programs, and establish research partnerships with international institutions.',
            ],
            'parent_id' => $presidency->id,
            'is_published' => true,
            'order' => 2,
        ]);

        $vpCommunity = OrganizationalUnit::create([
            'slug' => 'vp-community-service',
            'type' => 'vice_presidency',
            'name' => ['ar' => 'نائب رئيس الجامعة لشؤون خدمة المجتمع', 'en' => 'Vice President for Community Service'],
            'description' => [
                'ar' => 'يختص بالإشراف على أنشطة خدمة المجتمع وتنمية البيئة التي تقوم بها الجامعة، بما في ذلك البرامج التدريبية والاستشارات والتعاون مع مؤسسات المجتمع المدني والجهات الحكومية.',
                'en' => 'Responsible for overseeing community service and environmental development activities undertaken by the university, including training programs, consultations, and cooperation with civil society organizations and government agencies.',
            ],
            'parent_id' => $presidency->id,
            'is_published' => true,
            'order' => 3,
        ]);

        $secretaryGeneral = OrganizationalUnit::create([
            'slug' => 'secretary-general',
            'type' => 'office',
            'name' => ['ar' => 'الأمين العام للجامعة', 'en' => 'Secretary General'],
            'description' => [
                'ar' => 'الأمين العام للجامعة هو المسؤول عن الشؤون الإدارية والمالية والتنظيمية للجامعة. يشرف على الإدارات المركزية ويتابع تنفيذ قرارات مجلس الجامعة.',
                'en' => 'The Secretary General is responsible for the administrative, financial, and organizational affairs of the university. Oversees central administrations and monitors the implementation of university council decisions.',
            ],
            'parent_id' => $presidency->id,
            'is_published' => true,
            'order' => 4,
        ]);

        // Sub-units under Secretary General
        OrganizationalUnit::create([
            'slug' => 'student-affairs',
            'type' => 'department',
            'name' => ['ar' => 'إدارة شؤون الطلاب', 'en' => 'Student Affairs Administration'],
            'description' => [
                'ar' => 'تختص بجميع الشؤون المتعلقة بالطلاب من قبول وتسجيل وتحويلات ومنح وإعانات وأنشطة طلابية ورعاية اجتماعية وصحية.',
                'en' => 'Handles all student-related affairs including admissions, registration, transfers, scholarships, financial aid, student activities, and social and health welfare.',
            ],
            'parent_id' => $secretaryGeneral->id,
            'is_published' => true,
            'order' => 1,
        ]);

        OrganizationalUnit::create([
            'slug' => 'financial-affairs',
            'type' => 'department',
            'name' => ['ar' => 'إدارة الشؤون المالية', 'en' => 'Financial Affairs Administration'],
            'description' => [
                'ar' => 'تختص بإدارة الموارد المالية للجامعة وإعداد الميزانيات ومراقبة الإنفاق وتحصيل الرسوم وإدارة المشتريات والعقود.',
                'en' => 'Manages the university\'s financial resources, budget preparation, expenditure monitoring, fee collection, and procurement and contract management.',
            ],
            'parent_id' => $secretaryGeneral->id,
            'is_published' => true,
            'order' => 2,
        ]);

        OrganizationalUnit::create([
            'slug' => 'digital-transformation',
            'type' => 'department',
            'name' => ['ar' => 'إدارة التحول الرقمي', 'en' => 'Digital Transformation Administration'],
            'description' => [
                'ar' => 'تختص بقيادة عملية التحول الرقمي في الجامعة، وتطوير البنية التحتية التقنية، وأتمتة الخدمات الإدارية والأكاديمية، وتطوير المنصات الإلكترونية للتعليم والبحث العلمي.',
                'en' => 'Leads the digital transformation process at the university, developing technical infrastructure, automating administrative and academic services, and developing electronic platforms for education and scientific research.',
            ],
            'parent_id' => $secretaryGeneral->id,
            'is_published' => true,
            'order' => 3,
        ]);
    }
}
