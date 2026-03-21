<?php

namespace Database\Seeders;

use App\Models\NewsArticle;
use App\Models\NewsCategory;
use Illuminate\Database\Seeder;

class NewsArticleSeeder extends Seeder
{
    public function run(): void
    {
        $universityNews = NewsCategory::where('slug', 'university-news')->first();
        $research = NewsCategory::where('slug', 'scientific-research')->first();
        $cultural = NewsCategory::where('slug', 'cultural-events')->first();
        $international = NewsCategory::where('slug', 'international-cooperation')->first();
        $achievements = NewsCategory::where('slug', 'student-achievements')->first();

        $articles = [
            [
                'slug' => 'azhar-ranks-first-islamic-studies',
                'title' => [
                    'ar' => 'جامعة الأزهر تحتل المرتبة الأولى في تصنيف الدراسات الإسلامية',
                    'en' => 'Al-Azhar University Ranks First in Islamic Studies Classification',
                ],
                'excerpt' => [
                    'ar' => 'حققت جامعة الأزهر المركز الأول عالمياً في تصنيف الدراسات الإسلامية وفقاً لأحدث التقييمات الدولية.',
                    'en' => 'Al-Azhar University achieved the top global ranking in Islamic Studies according to the latest international assessments.',
                ],
                'content' => [
                    'ar' => 'حققت جامعة الأزهر إنجازاً تاريخياً بحصولها على المركز الأول عالمياً في تصنيف الدراسات الإسلامية وفقاً لأحدث التقييمات الدولية. يأتي هذا التصنيف تتويجاً لجهود الجامعة المستمرة في تطوير المناهج الدراسية والبحث العلمي في مجال الدراسات الإسلامية. وأكد رئيس الجامعة أن هذا الإنجاز يعكس مكانة الأزهر العريقة كمنارة للعلم والوسطية في العالم الإسلامي، مشيراً إلى أن الجامعة ستواصل مسيرتها في تحقيق التميز والريادة.',
                    'en' => 'Al-Azhar University achieved a historic milestone by securing the top global ranking in Islamic Studies according to the latest international assessments. This ranking crowns the university\'s continuous efforts in developing curricula and scientific research in Islamic Studies. The university president confirmed that this achievement reflects Al-Azhar\'s prestigious position as a beacon of knowledge and moderation in the Islamic world, noting that the university will continue its journey of excellence and leadership.',
                ],
                'category_id' => $universityNews?->id,
                'is_published' => true,
                'published_at' => now()->subDays(5),
            ],
            [
                'slug' => 'ai-center-engineering',
                'title' => [
                    'ar' => 'افتتاح مركز جديد للذكاء الاصطناعي بكلية الهندسة',
                    'en' => 'New AI Center Opens at Faculty of Engineering',
                ],
                'excerpt' => [
                    'ar' => 'افتتح رئيس الجامعة مركزاً جديداً للذكاء الاصطناعي والتعلم الآلي بكلية الهندسة بتكلفة 50 مليون جنيه.',
                    'en' => 'The university president inaugurated a new Artificial Intelligence and Machine Learning center at the Faculty of Engineering.',
                ],
                'content' => [
                    'ar' => 'افتتح رئيس جامعة الأزهر مركزاً جديداً للذكاء الاصطناعي والتعلم الآلي بكلية الهندسة، وذلك في إطار خطة الجامعة للتحول الرقمي ومواكبة التطورات التكنولوجية العالمية. يضم المركز أحدث الأجهزة والبرمجيات في مجال الذكاء الاصطناعي، ويهدف إلى تدريب الطلاب والباحثين على تقنيات الذكاء الاصطناعي وتطبيقاتها في مختلف المجالات. كما سيعمل المركز على تطوير تطبيقات ذكاء اصطناعي لخدمة الدراسات الإسلامية وتحليل النصوص العربية.',
                    'en' => 'The president of Al-Azhar University inaugurated a new Artificial Intelligence and Machine Learning center at the Faculty of Engineering, as part of the university\'s digital transformation plan and keeping pace with global technological developments. The center houses the latest equipment and software in artificial intelligence, aiming to train students and researchers on AI techniques and their applications across various fields. The center will also develop AI applications to serve Islamic studies and Arabic text analysis.',
                ],
                'category_id' => $research?->id,
                'is_published' => true,
                'published_at' => now()->subDays(12),
            ],
            [
                'slug' => 'oxford-cooperation',
                'title' => [
                    'ar' => 'بروتوكول تعاون مع جامعة أكسفورد في مجال الدراسات الإسلامية',
                    'en' => 'Cooperation Protocol with Oxford University in Islamic Studies',
                ],
                'excerpt' => [
                    'ar' => 'وقعت جامعة الأزهر بروتوكول تعاون أكاديمي وبحثي مع جامعة أكسفورد البريطانية.',
                    'en' => 'Al-Azhar University signed an academic and research cooperation protocol with the University of Oxford.',
                ],
                'content' => [
                    'ar' => 'وقعت جامعة الأزهر بروتوكول تعاون أكاديمي وبحثي مع جامعة أكسفورد البريطانية في مجال الدراسات الإسلامية والحوار بين الحضارات. يشمل البروتوكول تبادل الأساتذة والباحثين وتنظيم مؤتمرات مشتركة وإطلاق برامج بحثية في مجالات الفقه المقارن والتاريخ الإسلامي واللغة العربية. وأكد رئيس الجامعة أن هذا التعاون يعزز دور الأزهر في نشر صورة الإسلام الصحيحة والحوار مع الثقافات الأخرى.',
                    'en' => 'Al-Azhar University signed an academic and research cooperation protocol with the University of Oxford in the field of Islamic studies and interfaith dialogue. The protocol includes exchange of professors and researchers, organizing joint conferences, and launching research programs in comparative jurisprudence, Islamic history, and Arabic language. The university president emphasized that this cooperation enhances Al-Azhar\'s role in spreading the true image of Islam and engaging in dialogue with other cultures.',
                ],
                'category_id' => $international?->id,
                'is_published' => true,
                'published_at' => now()->subDays(20),
            ],
            [
                'slug' => 'gold-medal-math-olympiad',
                'title' => [
                    'ar' => 'طلاب الأزهر يحصدون الميدالية الذهبية في أولمبياد الرياضيات الدولي',
                    'en' => 'Al-Azhar Students Win Gold Medal at International Mathematics Olympiad',
                ],
                'excerpt' => [
                    'ar' => 'فاز فريق من طلاب كلية العلوم بجامعة الأزهر بالميدالية الذهبية في أولمبياد الرياضيات الدولي.',
                    'en' => 'A team from Al-Azhar University\'s Faculty of Science won the gold medal at the International Mathematics Olympiad.',
                ],
                'content' => [
                    'ar' => 'حقق فريق من طلاب كلية العلوم بجامعة الأزهر إنجازاً مشرفاً بحصوله على الميدالية الذهبية في أولمبياد الرياضيات الدولي الذي أقيم بمشاركة أكثر من 200 جامعة من 50 دولة. تفوق الفريق في حل المسائل الرياضية المعقدة في مجالات الجبر والتحليل ونظرية الأعداد. وهنأ رئيس الجامعة الفريق مؤكداً أن هذا الإنجاز يثبت تميز طلاب الأزهر في العلوم الأساسية والتطبيقية.',
                    'en' => 'A team from Al-Azhar University\'s Faculty of Science achieved an honorable distinction by winning the gold medal at the International Mathematics Olympiad, held with participation from over 200 universities from 50 countries. The team excelled in solving complex mathematical problems in algebra, analysis, and number theory. The university president congratulated the team, confirming that this achievement proves Al-Azhar students\' excellence in basic and applied sciences.',
                ],
                'category_id' => $achievements?->id,
                'is_published' => true,
                'published_at' => now()->subDays(30),
            ],
            [
                'slug' => 'together-we-build-initiative',
                'title' => [
                    'ar' => 'الأزهر يطلق مبادرة "معاً نبني" لخدمة المجتمع',
                    'en' => 'Al-Azhar Launches "Together We Build" Community Service Initiative',
                ],
                'excerpt' => [
                    'ar' => 'أطلقت جامعة الأزهر مبادرة مجتمعية شاملة تستهدف تقديم خدمات تعليمية وصحية وثقافية للمجتمعات المحيطة.',
                    'en' => 'Al-Azhar University launched a comprehensive community initiative aimed at providing educational, health, and cultural services to surrounding communities.',
                ],
                'content' => [
                    'ar' => 'أطلقت جامعة الأزهر مبادرة "معاً نبني" لخدمة المجتمع، والتي تتضمن تقديم قوافل طبية مجانية وبرامج محو الأمية ودورات تدريبية مهنية وندوات توعوية. تستهدف المبادرة القرى والمناطق الأكثر احتياجاً في محافظات مصر، وتشارك فيها جميع كليات الجامعة بما يتناسب مع تخصصاتها. وأوضح رئيس الجامعة أن خدمة المجتمع هي إحدى الركائز الأساسية لرسالة جامعة الأزهر.',
                    'en' => 'Al-Azhar University launched the "Together We Build" community service initiative, which includes providing free medical convoys, literacy programs, professional training courses, and awareness seminars. The initiative targets the most underserved villages and areas across Egypt\'s governorates, with all university faculties participating according to their specializations. The university president explained that community service is one of the fundamental pillars of Al-Azhar University\'s mission.',
                ],
                'category_id' => $universityNews?->id,
                'is_published' => true,
                'published_at' => now()->subDays(45),
            ],
            [
                'slug' => 'nature-biodiversity-study',
                'title' => [
                    'ar' => 'باحثون من الأزهر ينشرون دراسة رائدة في مجلة Nature عن التنوع البيولوجي',
                    'en' => 'Al-Azhar Researchers Publish Groundbreaking Study in Nature on Biodiversity',
                ],
                'excerpt' => [
                    'ar' => 'نشر فريق بحثي من كلية العلوم دراسة علمية رائدة في مجلة Nature حول التنوع البيولوجي في البيئة المصرية.',
                    'en' => 'A research team from the Faculty of Science published a groundbreaking study in Nature journal on biodiversity in the Egyptian environment.',
                ],
                'content' => [
                    'ar' => 'نجح فريق بحثي من كلية العلوم بجامعة الأزهر في نشر دراسة علمية رائدة في مجلة Nature العالمية حول التنوع البيولوجي في البيئة الصحراوية المصرية. اكتشف الفريق أنواعاً جديدة من الكائنات الدقيقة في الصحراء الغربية قد تكون لها تطبيقات واعدة في مجال التكنولوجيا الحيوية والطب. استغرق البحث ثلاث سنوات وشارك فيه باحثون من عدة جامعات مصرية ودولية. يمثل هذا النشر إنجازاً علمياً كبيراً لجامعة الأزهر في مجال البحث العلمي.',
                    'en' => 'A research team from Al-Azhar University\'s Faculty of Science successfully published a groundbreaking study in the international journal Nature on biodiversity in the Egyptian desert environment. The team discovered new species of microorganisms in the Western Desert that may have promising applications in biotechnology and medicine. The research took three years and involved researchers from several Egyptian and international universities. This publication represents a significant scientific achievement for Al-Azhar University in scientific research.',
                ],
                'category_id' => $research?->id,
                'is_published' => true,
                'published_at' => now()->subDays(55),
            ],
            [
                'slug' => 'annual-cultural-festival',
                'title' => [
                    'ar' => 'المهرجان الثقافي السنوي يحتفي بالتراث الإسلامي',
                    'en' => 'Annual Cultural Festival Celebrates Islamic Heritage',
                ],
                'excerpt' => [
                    'ar' => 'أقامت جامعة الأزهر مهرجانها الثقافي السنوي الذي تضمن معارض فنية وأمسيات شعرية وعروض خط عربي.',
                    'en' => 'Al-Azhar University held its annual cultural festival featuring art exhibitions, poetry evenings, and Arabic calligraphy shows.',
                ],
                'content' => [
                    'ar' => 'أثمر المهرجان الثقافي السنوي لجامعة الأزهر هذا العام بتضمنه فعاليات متنوعة احتفاءً بالتراث الإسلامي والعربي. شمل المهرجان معارض للخط العربي والفنون الإسلامية وأمسيات شعرية وندوات فكرية ومسابقات في حفظ القرآن الكريم والحديث الشريف. شارك في المهرجان طلاب من أكثر من 30 دولة يدرسون في الأزهر، مما أضفى طابعاً دولياً مميزاً على الفعاليات. وقد لاقى المهرجان إقبالاً كبيراً من الطلاب وأعضاء هيئة التدريس والمجتمع المحلي.',
                    'en' => 'Al-Azhar University\'s annual cultural festival this year featured diverse events celebrating Islamic and Arabic heritage. The festival included Arabic calligraphy and Islamic art exhibitions, poetry evenings, intellectual seminars, and competitions in Quran and Hadith memorization. Students from over 30 countries studying at Al-Azhar participated, giving the events a distinctive international character. The festival was met with great enthusiasm from students, faculty members, and the local community.',
                ],
                'category_id' => $cultural?->id,
                'is_published' => true,
                'published_at' => now()->subDays(70),
            ],
            [
                'slug' => 'malaysia-academic-delegation',
                'title' => [
                    'ar' => 'وفد أكاديمي من جامعة الأزهر يزور ماليزيا لتعزيز التعاون',
                    'en' => 'Al-Azhar Academic Delegation Visits Malaysia to Strengthen Cooperation',
                ],
                'excerpt' => [
                    'ar' => 'زار وفد أكاديمي رفيع المستوى من جامعة الأزهر عدة جامعات ماليزية لتوقيع اتفاقيات تعاون.',
                    'en' => 'A high-level academic delegation from Al-Azhar University visited several Malaysian universities to sign cooperation agreements.',
                ],
                'content' => [
                    'ar' => 'قام وفد أكاديمي رفيع المستوى من جامعة الأزهر بزيارة عدة جامعات ماليزية بهدف تعزيز التعاون الأكاديمي والبحثي. تم خلال الزيارة توقيع اتفاقيات تعاون مع الجامعة الإسلامية العالمية بماليزيا وجامعة مالايا في مجالات الدراسات الإسلامية واللغة العربية والعلوم الطبية. كما تم الاتفاق على إطلاق برنامج مشترك للدراسات العليا وتبادل الطلاب والأساتذة. وأشاد الوفد الماليزي بدور الأزهر في نشر الوسطية والاعتدال في العالم الإسلامي.',
                    'en' => 'A high-level academic delegation from Al-Azhar University visited several Malaysian universities to strengthen academic and research cooperation. During the visit, cooperation agreements were signed with the International Islamic University Malaysia and University of Malaya in the fields of Islamic studies, Arabic language, and medical sciences. A joint graduate program and student-faculty exchange program were also agreed upon. The Malaysian delegation praised Al-Azhar\'s role in spreading moderation in the Islamic world.',
                ],
                'category_id' => $international?->id,
                'is_published' => true,
                'published_at' => now()->subDays(85),
            ],
        ];

        foreach ($articles as $data) {
            NewsArticle::create($data);
        }
    }
}
