<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    public function run(): void
    {
        // About Page
        Page::create([
            'slug' => 'about',
            'title' => ['ar' => 'عن الجامعة', 'en' => 'About the University'],
            'content' => [
                'ar' => '<h2>جامعة الأزهر - منارة العلم والوسطية</h2>
<p>جامعة الأزهر هي أقدم جامعة في العالم لا تزال تعمل حتى اليوم، تأسست عام 970م (359هـ) على يد القائد جوهر الصقلي بأمر من الخليفة الفاطمي المعز لدين الله. يقع الجامع الأزهر في قلب القاهرة التاريخية، وقد تحول عبر أكثر من ألف عام من مسجد جامع إلى أعرق مؤسسة تعليمية إسلامية في العالم.</p>

<h3>رسالتنا</h3>
<p>تلتزم جامعة الأزهر بنشر العلم الشرعي الصحيح وقيم الوسطية والاعتدال، مع مواكبة التطور العلمي والتكنولوجي المعاصر. تسعى الجامعة لتخريج كوادر علمية متميزة تجمع بين العلوم الشرعية والعلوم الحديثة، قادرة على خدمة المجتمع والإنسانية.</p>

<h3>رؤيتنا</h3>
<p>أن تكون جامعة الأزهر الجامعة الرائدة عالمياً في تقديم نموذج متكامل يجمع بين الأصالة والمعاصرة، وأن تكون المرجع الأول في العلوم الإسلامية مع التميز في العلوم الحديثة والتطبيقية.</p>

<h3>الأزهر بالأرقام</h3>
<ul>
<li>أكثر من 1050 عاماً من العطاء المستمر</li>
<li>أكثر من 80 كلية في مختلف التخصصات</li>
<li>أكثر من 500,000 طالب وطالبة</li>
<li>طلاب وافدون من أكثر من 100 دولة</li>
<li>فروع في أكثر من 20 محافظة مصرية</li>
</ul>

<h3>القيم الجوهرية</h3>
<p>الوسطية والاعتدال - التميز العلمي - خدمة المجتمع - الانفتاح على الآخر - الحفاظ على الهوية الإسلامية - التجديد مع الأصالة</p>',
                'en' => '<h2>Al-Azhar University - Beacon of Knowledge and Moderation</h2>
<p>Al-Azhar University is the oldest continuously operating university in the world, founded in 970 CE (359 AH) by Commander Jawhar Al-Siqilli under the orders of Fatimid Caliph Al-Mu\'izz li-Din Allah. Located in the heart of historic Cairo, Al-Azhar has transformed over more than a thousand years from a congregational mosque into the most prestigious Islamic educational institution in the world.</p>

<h3>Our Mission</h3>
<p>Al-Azhar University is committed to spreading authentic Islamic knowledge and the values of moderation, while keeping pace with contemporary scientific and technological advancement. The university strives to graduate distinguished scientific cadres combining Islamic and modern sciences, capable of serving society and humanity.</p>

<h3>Our Vision</h3>
<p>To be the globally leading university in presenting an integrated model combining authenticity and modernity, and to be the primary reference in Islamic sciences while excelling in modern and applied sciences.</p>

<h3>Al-Azhar in Numbers</h3>
<ul>
<li>Over 1,050 years of continuous service</li>
<li>More than 80 faculties across various disciplines</li>
<li>Over 500,000 students</li>
<li>International students from more than 100 countries</li>
<li>Branches in more than 20 Egyptian governorates</li>
</ul>

<h3>Core Values</h3>
<p>Moderation - Scientific Excellence - Community Service - Openness to Others - Preservation of Islamic Identity - Renewal with Authenticity</p>',
            ],
            'meta_title' => ['ar' => 'عن جامعة الأزهر', 'en' => 'About Al-Azhar University'],
            'meta_description' => [
                'ar' => 'تعرف على جامعة الأزهر، أقدم جامعة في العالم، تاريخها العريق ورسالتها في نشر العلم والوسطية.',
                'en' => 'Learn about Al-Azhar University, the oldest university in the world, its rich history and mission of spreading knowledge and moderation.',
            ],
            'order' => 1,
            'is_published' => true,
        ]);

        // Contact Page
        Page::create([
            'slug' => 'contact',
            'title' => ['ar' => 'اتصل بنا', 'en' => 'Contact Us'],
            'content' => [
                'ar' => '<h2>تواصل معنا</h2>
<p>نرحب بتواصلكم معنا عبر القنوات التالية:</p>

<h3>العنوان الرئيسي</h3>
<p>جامعة الأزهر - مدينة نصر<br>
شارع الأزهر، القاهرة، جمهورية مصر العربية<br>
الرمز البريدي: 11751</p>

<h3>أرقام الهاتف</h3>
<ul>
<li>الخط الساخن: 16111</li>
<li>السنترال الرئيسي: 02-2623-2138</li>
<li>مكتب رئيس الجامعة: 02-2623-2150</li>
<li>شؤون الطلاب: 02-2623-2160</li>
<li>الدراسات العليا: 02-2623-2170</li>
</ul>

<h3>البريد الإلكتروني</h3>
<ul>
<li>الاستفسارات العامة: info@azhar.edu.eg</li>
<li>القبول والتسجيل: admission@azhar.edu.eg</li>
<li>الدراسات العليا: postgrad@azhar.edu.eg</li>
<li>التعاون الدولي: international@azhar.edu.eg</li>
</ul>

<h3>ساعات العمل</h3>
<p>الأحد - الخميس: 8:00 صباحاً - 3:00 مساءً<br>
الجمعة والسبت: عطلة رسمية</p>

<h3>وسائل التواصل الاجتماعي</h3>
<p>تابعونا على منصات التواصل الاجتماعي للاطلاع على آخر أخبار الجامعة وفعالياتها.</p>',
                'en' => '<h2>Get in Touch</h2>
<p>We welcome your contact through the following channels:</p>

<h3>Main Address</h3>
<p>Al-Azhar University - Nasr City<br>
Al-Azhar Street, Cairo, Arab Republic of Egypt<br>
Postal Code: 11751</p>

<h3>Phone Numbers</h3>
<ul>
<li>Hotline: 16111</li>
<li>Main Switchboard: 02-2623-2138</li>
<li>University President\'s Office: 02-2623-2150</li>
<li>Student Affairs: 02-2623-2160</li>
<li>Graduate Studies: 02-2623-2170</li>
</ul>

<h3>Email</h3>
<ul>
<li>General Inquiries: info@azhar.edu.eg</li>
<li>Admissions: admission@azhar.edu.eg</li>
<li>Graduate Studies: postgrad@azhar.edu.eg</li>
<li>International Cooperation: international@azhar.edu.eg</li>
</ul>

<h3>Working Hours</h3>
<p>Sunday - Thursday: 8:00 AM - 3:00 PM<br>
Friday and Saturday: Official Holidays</p>

<h3>Social Media</h3>
<p>Follow us on social media platforms to stay updated with the latest university news and events.</p>',
            ],
            'meta_title' => ['ar' => 'اتصل بجامعة الأزهر', 'en' => 'Contact Al-Azhar University'],
            'meta_description' => [
                'ar' => 'تواصل مع جامعة الأزهر - العنوان وأرقام الهاتف والبريد الإلكتروني وساعات العمل.',
                'en' => 'Contact Al-Azhar University - address, phone numbers, email, and working hours.',
            ],
            'order' => 2,
            'is_published' => true,
        ]);

        // Services Page
        Page::create([
            'slug' => 'services',
            'title' => ['ar' => 'الخدمات', 'en' => 'Services'],
            'content' => [
                'ar' => '<h2>خدمات جامعة الأزهر</h2>
<p>تقدم جامعة الأزهر مجموعة شاملة من الخدمات الأكاديمية والإدارية والمجتمعية:</p>

<h3>الخدمات الأكاديمية</h3>
<ul>
<li><strong>القبول والتسجيل:</strong> خدمات التقديم والقبول في مرحلتي البكالوريوس والدراسات العليا</li>
<li><strong>المكتبة الرقمية:</strong> الوصول إلى آلاف الكتب والمخطوطات والأبحاث العلمية إلكترونياً</li>
<li><strong>التعليم الإلكتروني:</strong> منصة متكاملة للتعلم عن بعد والموارد التعليمية الرقمية</li>
<li><strong>الشهادات والتصديقات:</strong> إصدار الشهادات وكشوف الدرجات والتصديقات الرسمية</li>
</ul>

<h3>خدمات الطلاب</h3>
<ul>
<li><strong>المدن الجامعية:</strong> سكن مجهز للطلاب والطالبات مع كافة الخدمات</li>
<li><strong>الرعاية الصحية:</strong> مستشفيات جامعية تقدم خدمات طبية شاملة للطلاب ومنسوبي الجامعة</li>
<li><strong>الأنشطة الطلابية:</strong> أندية ثقافية ورياضية وفنية وعلمية</li>
<li><strong>الإرشاد الأكاديمي:</strong> خدمات التوجيه والإرشاد للطلاب</li>
</ul>

<h3>خدمات المجتمع</h3>
<ul>
<li><strong>القوافل الطبية:</strong> قوافل طبية مجانية للمناطق المحرومة</li>
<li><strong>الدورات التدريبية:</strong> برامج تدريبية في مختلف المجالات للمجتمع المحلي</li>
<li><strong>الاستشارات:</strong> خدمات استشارية في المجالات الشرعية والقانونية والاقتصادية</li>
<li><strong>الفتوى:</strong> خدمة الإجابة على الاستفسارات الشرعية</li>
</ul>

<h3>الخدمات الإلكترونية</h3>
<ul>
<li><strong>بوابة الطالب:</strong> نظام إلكتروني متكامل لإدارة شؤون الطلاب</li>
<li><strong>البريد الجامعي:</strong> حسابات بريد إلكتروني لجميع منسوبي الجامعة</li>
<li><strong>نظام إدارة التعلم:</strong> منصة Moodle للتعليم الإلكتروني</li>
<li><strong>البحث العلمي:</strong> قاعدة بيانات للأبحاث والرسائل العلمية</li>
</ul>',
                'en' => '<h2>Al-Azhar University Services</h2>
<p>Al-Azhar University offers a comprehensive range of academic, administrative, and community services:</p>

<h3>Academic Services</h3>
<ul>
<li><strong>Admissions:</strong> Application and admission services for undergraduate and graduate programs</li>
<li><strong>Digital Library:</strong> Electronic access to thousands of books, manuscripts, and research papers</li>
<li><strong>E-Learning:</strong> Comprehensive platform for distance learning and digital educational resources</li>
<li><strong>Certificates:</strong> Issuance of certificates, transcripts, and official attestations</li>
</ul>

<h3>Student Services</h3>
<ul>
<li><strong>Student Housing:</strong> Fully equipped dormitories for male and female students</li>
<li><strong>Healthcare:</strong> University hospitals providing comprehensive medical services</li>
<li><strong>Student Activities:</strong> Cultural, sports, arts, and scientific clubs</li>
<li><strong>Academic Advising:</strong> Guidance and counseling services for students</li>
</ul>

<h3>Community Services</h3>
<ul>
<li><strong>Medical Convoys:</strong> Free medical convoys to underserved areas</li>
<li><strong>Training Programs:</strong> Training programs in various fields for the local community</li>
<li><strong>Consultations:</strong> Advisory services in Islamic, legal, and economic fields</li>
<li><strong>Fatwa Service:</strong> Answering Islamic legal inquiries</li>
</ul>

<h3>Electronic Services</h3>
<ul>
<li><strong>Student Portal:</strong> Integrated electronic system for student affairs management</li>
<li><strong>University Email:</strong> Email accounts for all university members</li>
<li><strong>Learning Management System:</strong> Moodle platform for e-learning</li>
<li><strong>Research Database:</strong> Database for research papers and theses</li>
</ul>',
            ],
            'meta_title' => ['ar' => 'خدمات جامعة الأزهر', 'en' => 'Al-Azhar University Services'],
            'meta_description' => [
                'ar' => 'تعرف على الخدمات الأكاديمية والطلابية والمجتمعية والإلكترونية التي تقدمها جامعة الأزهر.',
                'en' => 'Explore the academic, student, community, and electronic services offered by Al-Azhar University.',
            ],
            'order' => 3,
            'is_published' => true,
        ]);
    }
}
