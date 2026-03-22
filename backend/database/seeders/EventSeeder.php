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
                'slug' => 'countering-extremism-conference',
                'title' => [
                    'ar' => 'المؤتمر الدولي لمكافحة التطرف والإرهاب',
                    'en' => 'International Conference on Countering Extremism and Terrorism',
                    'fr' => 'Conference internationale sur la lutte contre l\'extremisme et le terrorisme',
                    'es' => 'Conferencia internacional sobre la lucha contra el extremismo y el terrorismo',
                    'zh' => '打击极端主义和恐怖主义国际会议',
                    'ru' => 'Международная конференция по борьбе с экстремизмом и терроризмом',
                    'ur' => 'انتہا پسندی اور دہشت گردی کے خلاف بین الاقوامی کانفرنس',
                ],
                'description' => [
                    'ar' => 'نظمت جامعة الأزهر المؤتمر الدولي لمكافحة التطرف والإرهاب بحضور أكثر من 400 عالم وباحث من 50 دولة. ألقى الإمام الأكبر أحمد الطيب خطاباً تاريخياً أكد فيه على رسالة الوسطية والاعتدال. ناقش المؤتمر استراتيجيات مواجهة الفكر المتطرف وتعزيز الحوار بين الثقافات.',
                    'en' => 'Al-Azhar University organized the International Conference on Countering Extremism and Terrorism, attended by over 400 scholars and researchers from 50 countries. Grand Imam Ahmed el-Tayeb delivered a historic address reaffirming the message of moderation. The conference discussed strategies to counter extremist thought and promote intercultural dialogue.',
                    'fr' => 'L\'Universite d\'Al-Azhar a organise la conference avec plus de 400 erudits de 50 pays pour discuter des strategies de lutte contre l\'extremisme.',
                    'es' => 'La Universidad de Al-Azhar organizo la conferencia con mas de 400 eruditos de 50 paises para discutir estrategias contra el extremismo.',
                    'zh' => '艾资哈尔大学举办了有来自50个国家400多位学者参加的国际会议，讨论反极端主义战略。',
                    'ru' => 'Аль-Азхар организовал конференцию с участием 400 учёных из 50 стран для обсуждения стратегий борьбы с экстремизмом.',
                    'ur' => 'الازہر نے 50 ممالک سے 400 سے زائد علماء کی شرکت سے انتہا پسندی کے خلاف بین الاقوامی کانفرنس کا اہتمام کیا۔',
                ],
                'location' => [
                    'ar' => 'مركز المؤتمرات - جامعة الأزهر - القاهرة',
                    'en' => 'Conference Center - Al-Azhar University - Cairo',
                    'fr' => 'Centre de conferences - Universite d\'Al-Azhar - Le Caire',
                    'es' => 'Centro de conferencias - Universidad de Al-Azhar - El Cairo',
                    'zh' => '会议中心 - 艾资哈尔大学 - 开罗',
                    'ru' => 'Конференц-центр - Университет Аль-Азхар - Каир',
                    'ur' => 'کانفرنس سینٹر - الازہر یونیورسٹی - قاہرہ',
                ],
                'starts_at' => now()->subDays(90),
                'ends_at' => now()->subDays(87),
                'is_published' => true,
            ],
            [
                'slug' => 'annual-quran-competition',
                'title' => [
                    'ar' => 'مسابقة القرآن الكريم السنوية',
                    'en' => 'Annual Holy Quran Competition',
                    'fr' => 'Concours annuel du Saint Coran',
                    'es' => 'Competencia anual del Sagrado Coran',
                    'zh' => '年度古兰经竞赛',
                    'ru' => 'Ежегодный конкурс Священного Корана',
                    'ur' => 'سالانہ قرآن مجید مقابلہ',
                ],
                'description' => [
                    'ar' => 'أقامت جامعة الأزهر مسابقتها السنوية لحفظ القرآن الكريم وتجويده بمشاركة أكثر من 500 طالب من كليات الجامعة وفروعها. شملت فئات الحفظ الكامل وعشرين جزءاً وعشرة أجزاء وأفضل صوت في التلاوة.',
                    'en' => 'Al-Azhar University held its annual Quran memorization and recitation competition with over 500 students from various faculties and branches participating in categories of full memorization, twenty parts, ten parts, and best recitation voice.',
                    'fr' => 'Al-Azhar a tenu son concours annuel de memorisation du Coran avec plus de 500 etudiants.',
                    'es' => 'Al-Azhar celebro su concurso anual de memorizacion del Coran con mas de 500 estudiantes.',
                    'zh' => '艾资哈尔举办了500多名学生参加的年度古兰经背诵和诵读比赛。',
                    'ru' => 'Аль-Азхар провёл ежегодный конкурс заучивания Корана с участием 500 студентов.',
                    'ur' => 'الازہر نے 500 سے زائد طلباء کی شرکت سے سالانہ قرآن حفظ اور تلاوت مقابلہ منعقد کیا۔',
                ],
                'location' => [
                    'ar' => 'الجامع الأزهر الشريف - القاهرة',
                    'en' => 'Al-Azhar Mosque - Cairo',
                    'fr' => 'Mosquee Al-Azhar - Le Caire',
                    'es' => 'Mezquita de Al-Azhar - El Cairo',
                    'zh' => '艾资哈尔清真寺 - 开罗',
                    'ru' => 'Мечеть Аль-Азхар - Каир',
                    'ur' => 'جامع الازہر الشریف - قاہرہ',
                ],
                'starts_at' => now()->subDays(45),
                'ends_at' => now()->subDays(43),
                'is_published' => true,
            ],
            [
                'slug' => 'cultural-heritage-festival',
                'title' => [
                    'ar' => 'مهرجان التراث الإسلامي والثقافي',
                    'en' => 'Islamic and Cultural Heritage Festival',
                    'fr' => 'Festival du patrimoine islamique et culturel',
                    'es' => 'Festival del patrimonio islamico y cultural',
                    'zh' => '伊斯兰文化遗产节',
                    'ru' => 'Фестиваль исламского и культурного наследия',
                    'ur' => 'اسلامی اور ثقافتی ورثے کا میلہ',
                ],
                'description' => [
                    'ar' => 'أقام الأزهر مهرجان التراث الإسلامي والثقافي بمشاركة طلاب من أكثر من 30 دولة. تضمن معارض للخط العربي والفنون الإسلامية وأمسيات شعرية وعروض ثقافية تمثل تنوع الطلاب الوافدين.',
                    'en' => 'Al-Azhar held the Islamic and Cultural Heritage Festival with students from over 30 countries participating. It featured Arabic calligraphy exhibitions, Islamic art displays, poetry evenings, and cultural performances representing the diversity of international students.',
                    'fr' => 'Al-Azhar a organise le festival avec des etudiants de plus de 30 pays, incluant calligraphie et art islamique.',
                    'es' => 'Al-Azhar organizo el festival con estudiantes de mas de 30 paises, incluyendo caligrafia y arte islamico.',
                    'zh' => '艾资哈尔举办了有来自30多个国家学生参加的文化遗产节，包括书法和伊斯兰艺术展览。',
                    'ru' => 'Аль-Азхар провёл фестиваль с участием студентов из 30 стран с выставками каллиграфии и исламского искусства.',
                    'ur' => 'الازہر نے 30 سے زائد ممالک کے طلباء کی شرکت سے ثقافتی ورثے کا میلہ منعقد کیا۔',
                ],
                'location' => [
                    'ar' => 'المدينة الجامعية - مدينة نصر - القاهرة',
                    'en' => 'University Campus - Nasr City - Cairo',
                    'fr' => 'Campus universitaire - Nasr City - Le Caire',
                    'es' => 'Campus universitario - Ciudad Nasr - El Cairo',
                    'zh' => '大学校园 - 纳赛尔城 - 开罗',
                    'ru' => 'Университетский кампус - Наср-Сити - Каир',
                    'ur' => 'یونیورسٹی کیمپس - نصر سٹی - قاہرہ',
                ],
                'starts_at' => now()->subDays(20),
                'ends_at' => now()->subDays(18),
                'is_published' => true,
            ],
            // Upcoming events
            [
                'slug' => 'interfaith-dialogue-symposium',
                'title' => [
                    'ar' => 'ندوة الحوار بين الأديان والحضارات',
                    'en' => 'Interfaith and Intercultural Dialogue Symposium',
                    'fr' => 'Symposium du dialogue interreligieux et interculturel',
                    'es' => 'Simposio de dialogo interreligioso e intercultural',
                    'zh' => '宗教间与文化间对话研讨会',
                    'ru' => 'Симпозиум межрелигиозного и межкультурного диалога',
                    'ur' => 'بین المذاہب اور بین الثقافتی مکالمے کی علمی نشست',
                ],
                'description' => [
                    'ar' => 'ينظم مركز الحوار بين الأديان بالأزهر ندوة دولية عن الحوار بين الأديان والحضارات. تستضيف الندوة قادة دينيين من مختلف الأديان وأكاديميين من جامعات عالمية لمناقشة سبل تعزيز التعايش والسلام العالمي.',
                    'en' => 'Al-Azhar\'s Center for Interreligious Dialogue is organizing an international symposium on interfaith and intercultural dialogue, hosting religious leaders from various faiths and academics from world universities to discuss ways to promote coexistence and global peace.',
                    'fr' => 'Le Centre d\'Al-Azhar organise un symposium international avec des leaders religieux et des universitaires du monde entier.',
                    'es' => 'El Centro de Al-Azhar organiza un simposio internacional con lideres religiosos y academicos de todo el mundo.',
                    'zh' => '艾资哈尔宗教间对话中心举办国际研讨会，邀请各宗教领袖和世界大学学者讨论促进共存与和平。',
                    'ru' => 'Центр Аль-Азхара организует международный симпозиум с религиозными лидерами и учёными со всего мира.',
                    'ur' => 'الازہر کا مرکز مختلف مذاہب کے رہنماؤں اور عالمی جامعات کے ماہرین کے ساتھ بین الاقوامی نشست منعقد کر رہا ہے۔',
                ],
                'location' => [
                    'ar' => 'مركز الحوار بين الأديان - الأزهر الشريف - القاهرة',
                    'en' => 'Center for Interreligious Dialogue - Al-Azhar - Cairo',
                    'fr' => 'Centre de dialogue interreligieux - Al-Azhar - Le Caire',
                    'es' => 'Centro de dialogo interreligioso - Al-Azhar - El Cairo',
                    'zh' => '宗教间对话中心 - 艾资哈尔 - 开罗',
                    'ru' => 'Центр межрелигиозного диалога - Аль-Азхар - Каир',
                    'ur' => 'بین المذاہب مکالمہ مرکز - الازہر الشریف - قاہرہ',
                ],
                'starts_at' => now()->addDays(20),
                'ends_at' => now()->addDays(22),
                'is_published' => true,
            ],
            [
                'slug' => 'international-student-day-2026',
                'title' => [
                    'ar' => 'اليوم العالمي للطلاب الوافدين 2026',
                    'en' => 'International Student Day 2026',
                    'fr' => 'Journee internationale des etudiants 2026',
                    'es' => 'Dia Internacional del Estudiante 2026',
                    'zh' => '2026年国际学生日',
                    'ru' => 'Международный день студентов 2026',
                    'ur' => 'بین الاقوامی طلبا دن 2026',
                ],
                'description' => [
                    'ar' => 'تحتفل جامعة الأزهر باليوم العالمي للطلاب الوافدين الممثلين لأكثر من 110 جنسية. يتضمن الاحتفال عروضاً ثقافية ومعرض مأكولات عالمية وندوات عن التعايش والتسامح. يخدم مركز تطوير تعليم الطلاب الوافدين أكثر من 40,000 طالب دولي.',
                    'en' => 'Al-Azhar University celebrates International Student Day honoring students from over 110 nationalities. The celebration features cultural performances, an international food fair, and seminars on coexistence and tolerance. The Center for International Students\' Education serves over 40,000 international students.',
                    'fr' => 'Al-Azhar celebre la Journee internationale avec des etudiants de plus de 110 nationalites.',
                    'es' => 'Al-Azhar celebra el Dia Internacional con estudiantes de mas de 110 nacionalidades.',
                    'zh' => '艾资哈尔庆祝国际学生日，来自110多个国家的学生参加。',
                    'ru' => 'Аль-Азхар отмечает Международный день студентов из более чем 110 стран.',
                    'ur' => 'الازہر 110 سے زائد قومیتوں کے طلباء کے اعزاز میں بین الاقوامی طلبا دن مناتا ہے۔',
                ],
                'location' => [
                    'ar' => 'المدينة الجامعية - جامعة الأزهر',
                    'en' => 'University Campus - Al-Azhar University',
                    'fr' => 'Campus universitaire - Universite d\'Al-Azhar',
                    'es' => 'Campus universitario - Universidad de Al-Azhar',
                    'zh' => '大学校园 - 艾资哈尔大学',
                    'ru' => 'Университетский кампус - Университет Аль-Азхар',
                    'ur' => 'یونیورسٹی کیمپس - الازہر یونیورسٹی',
                ],
                'starts_at' => now()->addDays(45),
                'ends_at' => now()->addDays(45)->addHours(8),
                'is_published' => true,
            ],
            [
                'slug' => 'ai-islamic-sciences-conference',
                'title' => [
                    'ar' => 'مؤتمر الذكاء الاصطناعي في خدمة العلوم الإسلامية',
                    'en' => 'AI in Service of Islamic Sciences Conference',
                    'fr' => 'Conference sur l\'IA au service des sciences islamiques',
                    'es' => 'Conferencia sobre IA al servicio de las ciencias islamicas',
                    'zh' => '人工智能服务伊斯兰科学会议',
                    'ru' => 'Конференция по ИИ на службе исламских наук',
                    'ur' => 'اسلامی علوم کی خدمت میں مصنوعی ذہانت کانفرنس',
                ],
                'description' => [
                    'ar' => 'تنظم جامعة الأزهر مؤتمراً دولياً حول توظيف الذكاء الاصطناعي في خدمة العلوم الإسلامية. يناقش المؤتمر تحليل النصوص العربية القديمة وأتمتة استخراج الأحكام الفقهية والتعلم التكيفي وحفظ التراث الإسلامي رقمياً.',
                    'en' => 'Al-Azhar University is organizing an international conference on employing AI in service of Islamic sciences, covering classical Arabic text analysis, automated jurisprudential ruling extraction, adaptive learning, and digital preservation of Islamic heritage.',
                    'fr' => 'L\'universite organise une conference internationale sur l\'utilisation de l\'IA pour les sciences islamiques.',
                    'es' => 'La universidad organiza una conferencia internacional sobre el uso de la IA para las ciencias islamicas.',
                    'zh' => '大学举办关于人工智能服务伊斯兰科学的国际会议。',
                    'ru' => 'Университет организует международную конференцию по применению ИИ в исламских науках.',
                    'ur' => 'یونیورسٹی اسلامی علوم میں مصنوعی ذہانت کے استعمال پر بین الاقوامی کانفرنس منعقد کر رہی ہے۔',
                ],
                'location' => [
                    'ar' => 'كلية الهندسة - جامعة الأزهر - القاهرة',
                    'en' => 'Faculty of Engineering - Al-Azhar University - Cairo',
                    'fr' => 'Faculte d\'ingenierie - Universite d\'Al-Azhar - Le Caire',
                    'es' => 'Facultad de Ingenieria - Universidad de Al-Azhar - El Cairo',
                    'zh' => '工程学院 - 艾资哈尔大学 - 开罗',
                    'ru' => 'Инженерный факультет - Университет Аль-Азхар - Каир',
                    'ur' => 'فیکلٹی آف انجینئرنگ - الازہر یونیورسٹی - قاہرہ',
                ],
                'starts_at' => now()->addDays(75),
                'ends_at' => now()->addDays(77),
                'is_published' => true,
            ],
        ];

        foreach ($events as $data) {
            Event::create($data);
        }
    }
}
