<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        $events = [
            // Past events
            [
                'slug' => 'islamic-studies-conference',
                'title' => [
                    'ar' => 'المؤتمر الدولي للدراسات الإسلامية',
                    'en' => 'International Islamic Studies Conference',
                ],
                'description' => [
                    'ar' => 'نظمت جامعة الأزهر المؤتمر الدولي للدراسات الإسلامية تحت عنوان "الإسلام والتحديات المعاصرة". شارك في المؤتمر أكثر من 300 باحث وعالم من 45 دولة، وتم تقديم 150 بحثاً في مجالات الفقه والتفسير والحديث والدراسات المقارنة. ناقش المؤتمر قضايا معاصرة مثل الذكاء الاصطناعي في خدمة العلوم الإسلامية وتجديد الفكر الديني ومواجهة التطرف.',
                    'en' => 'Al-Azhar University organized the International Islamic Studies Conference under the theme "Islam and Contemporary Challenges." Over 300 researchers and scholars from 45 countries participated, presenting 150 papers in jurisprudence, exegesis, hadith, and comparative studies. The conference discussed contemporary issues such as AI in Islamic sciences, renewal of religious thought, and countering extremism.',
                ],
                'location' => [
                    'ar' => 'قاعة المؤتمرات الكبرى - جامعة الأزهر - القاهرة',
                    'en' => 'Grand Conference Hall - Al-Azhar University - Cairo',
                ],
                'starts_at' => now()->subDays(60),
                'ends_at' => now()->subDays(57),
                'is_published' => true,
            ],
            [
                'slug' => 'quran-competition',
                'title' => [
                    'ar' => 'مسابقة القرآن الكريم السنوية',
                    'en' => 'Annual Quran Competition',
                ],
                'description' => [
                    'ar' => 'أقامت جامعة الأزهر مسابقتها السنوية لحفظ القرآن الكريم وتجويده بمشاركة أكثر من 500 طالب من مختلف كليات الجامعة وفروعها. تشمل المسابقة فئات متعددة: حفظ القرآن كاملاً، حفظ عشرين جزءاً، حفظ عشرة أجزاء، وأفضل صوت في التلاوة. يتم تكريم الفائزين بجوائز مالية وشهادات تقدير من رئيس الجامعة.',
                    'en' => 'Al-Azhar University held its annual Quran memorization and recitation competition with over 500 students from various faculties and branches participating. The competition includes multiple categories: full Quran memorization, twenty parts, ten parts, and best recitation voice. Winners are honored with financial prizes and certificates of appreciation from the university president.',
                ],
                'location' => [
                    'ar' => 'مسجد الأزهر الشريف - القاهرة',
                    'en' => 'Al-Azhar Mosque - Cairo',
                ],
                'starts_at' => now()->subDays(40),
                'ends_at' => now()->subDays(38),
                'is_published' => true,
            ],
            [
                'slug' => 'graduation-2025',
                'title' => [
                    'ar' => 'حفل تخريج دفعة 2025',
                    'en' => 'Class of 2025 Graduation Ceremony',
                ],
                'description' => [
                    'ar' => 'أقامت جامعة الأزهر حفل تخريج دفعة 2025 وسط أجواء من الفرح والاحتفال. تم تخريج أكثر من 15,000 طالب وطالبة من مختلف الكليات النظرية والعملية. حضر الحفل رئيس الجامعة ونوابه وعمداء الكليات وأولياء أمور الخريجين. تم تكريم المتفوقين والأوائل على مستوى الكليات والأقسام.',
                    'en' => 'Al-Azhar University held the Class of 2025 graduation ceremony in a joyful and celebratory atmosphere. Over 15,000 male and female students graduated from various theoretical and practical faculties. The ceremony was attended by the university president, vice presidents, faculty deans, and graduates\' families. Top-performing students were honored across faculties and departments.',
                ],
                'location' => [
                    'ar' => 'المدينة الجامعية - جامعة الأزهر - مدينة نصر',
                    'en' => 'University Campus - Al-Azhar University - Nasr City',
                ],
                'starts_at' => now()->subDays(20),
                'ends_at' => now()->subDays(20)->addHours(4),
                'is_published' => true,
            ],
            // Upcoming events
            [
                'slug' => 'digital-transformation-workshop',
                'title' => [
                    'ar' => 'ورشة عمل التحول الرقمي في التعليم الأزهري',
                    'en' => 'Digital Transformation in Azhari Education Workshop',
                ],
                'description' => [
                    'ar' => 'تنظم جامعة الأزهر ورشة عمل متخصصة حول التحول الرقمي في التعليم الأزهري. تتناول الورشة استخدام التكنولوجيا الحديثة في تطوير المناهج الدراسية والتعليم عن بعد والمنصات الإلكترونية. يشارك في الورشة خبراء من شركات التكنولوجيا العالمية وأساتذة من الجامعة.',
                    'en' => 'Al-Azhar University organizes a specialized workshop on digital transformation in Azhari education. The workshop covers the use of modern technology in curriculum development, distance learning, and electronic platforms. Experts from global technology companies and university professors will participate.',
                ],
                'location' => [
                    'ar' => 'مركز التحول الرقمي - جامعة الأزهر',
                    'en' => 'Digital Transformation Center - Al-Azhar University',
                ],
                'starts_at' => now()->addDays(15),
                'ends_at' => now()->addDays(16),
                'is_published' => true,
            ],
            [
                'slug' => 'international-student-day',
                'title' => [
                    'ar' => 'اليوم العالمي للطلاب الوافدين',
                    'en' => 'International Student Day',
                ],
                'description' => [
                    'ar' => 'تحتفل جامعة الأزهر باليوم العالمي للطلاب الوافدين الذين يمثلون أكثر من 100 جنسية. يتضمن الاحتفال عروضاً ثقافية من مختلف البلدان ومعرضاً للمأكولات العالمية وندوات عن التعايش والتسامح. يهدف الحدث إلى تعزيز التواصل بين الطلاب من مختلف الثقافات وإبراز الطابع العالمي لجامعة الأزهر.',
                    'en' => 'Al-Azhar University celebrates International Student Day honoring students representing over 100 nationalities. The celebration includes cultural performances from various countries, an international food fair, and seminars on coexistence and tolerance. The event aims to enhance communication among students from different cultures and highlight Al-Azhar University\'s global character.',
                ],
                'location' => [
                    'ar' => 'المدينة الجامعية - جامعة الأزهر',
                    'en' => 'University Campus - Al-Azhar University',
                ],
                'starts_at' => now()->addDays(30),
                'ends_at' => now()->addDays(30)->addHours(8),
                'is_published' => true,
            ],
            [
                'slug' => 'research-innovation-summit',
                'title' => [
                    'ar' => 'قمة الابتكار البحثي',
                    'en' => 'Research Innovation Summit',
                ],
                'description' => [
                    'ar' => 'تستضيف جامعة الأزهر قمة الابتكار البحثي التي تجمع باحثين من مختلف التخصصات لعرض أحدث ابتكاراتهم ومشاريعهم البحثية. تتضمن القمة جلسات علمية ومعرضاً للمشاريع البحثية ومسابقة لأفضل ابتكار طلابي. تهدف القمة إلى تشجيع روح الابتكار والبحث العلمي بين طلاب وأساتذة الجامعة.',
                    'en' => 'Al-Azhar University hosts the Research Innovation Summit bringing together researchers from various disciplines to present their latest innovations and research projects. The summit includes scientific sessions, a research projects exhibition, and a competition for the best student innovation. The summit aims to encourage innovation and scientific research among university students and faculty.',
                ],
                'location' => [
                    'ar' => 'قاعة المؤتمرات الكبرى - جامعة الأزهر',
                    'en' => 'Grand Conference Hall - Al-Azhar University',
                ],
                'starts_at' => now()->addDays(60),
                'ends_at' => now()->addDays(62),
                'is_published' => true,
            ],
        ];

        foreach ($events as $data) {
            Event::create($data);
        }
    }
}
