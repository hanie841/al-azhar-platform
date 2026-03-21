<?php

namespace Database\Seeders;

use App\Models\TimelineEra;
use App\Models\TimelineEvent;
use Illuminate\Database\Seeder;

class TimelineSeeder extends Seeder
{
    public function run(): void
    {
        // Era 1: The Fatimid Era
        $fatimid = TimelineEra::create([
            'slug' => 'the-fatimid-era',
            'name' => ['ar' => 'العصر الفاطمي', 'en' => 'The Fatimid Era'],
            'description' => [
                'ar' => 'بدأ العصر الفاطمي بتأسيس الجامع الأزهر عام 970م على يد القائد جوهر الصقلي بأمر من الخليفة المعز لدين الله الفاطمي، ليصبح منارة للعلم والمعرفة في العالم الإسلامي. شهد هذا العصر تحول الأزهر من مسجد إلى جامعة عريقة تدرس فيها العلوم الشرعية واللغوية والفلسفية.',
                'en' => 'The Fatimid era began with the founding of Al-Azhar Mosque in 970 CE by the commander Jawhar Al-Siqilli under the orders of Caliph Al-Mu\'izz li-Din Allah. This era witnessed Al-Azhar\'s transformation from a mosque into a prestigious university teaching Islamic sciences, linguistics, and philosophy.',
            ],
            'start_year' => 969,
            'end_year' => 1171,
            'order' => 1,
        ]);

        TimelineEvent::create([
            'slug' => 'founding-of-al-azhar',
            'title' => ['ar' => 'تأسيس الجامع الأزهر', 'en' => 'Founding of Al-Azhar Mosque'],
            'description' => [
                'ar' => 'أسس القائد جوهر الصقلي الجامع الأزهر بأمر من الخليفة المعز لدين الله الفاطمي. بدأ البناء في 24 جمادى الأولى 359هـ (970م) واكتمل في رمضان 361هـ (972م). سمي بالأزهر نسبة إلى السيدة فاطمة الزهراء بنت النبي محمد صلى الله عليه وسلم.',
                'en' => 'Commander Jawhar Al-Siqilli founded Al-Azhar Mosque by order of Fatimid Caliph Al-Mu\'izz li-Din Allah. Construction began on 24 Jumada al-Ula 359 AH (970 CE) and was completed in Ramadan 361 AH (972 CE). It was named Al-Azhar in honor of Fatimah al-Zahra, daughter of Prophet Muhammad (PBUH).',
            ],
            'era_id' => $fatimid->id,
            'year' => 972,
            'order' => 1,
        ]);

        TimelineEvent::create([
            'slug' => 'first-lecture-circles',
            'title' => ['ar' => 'بداية حلقات الدرس', 'en' => 'Beginning of Lecture Circles'],
            'description' => [
                'ar' => 'بدأت حلقات الدرس في الجامع الأزهر حيث كان العلماء يجلسون في حلقات لتدريس الفقه والحديث والتفسير واللغة العربية. كانت هذه الحلقات نواة النظام التعليمي الذي تطور لاحقاً ليصبح أقدم جامعة في العالم لا تزال تعمل.',
                'en' => 'Teaching circles began at Al-Azhar Mosque where scholars sat in circles to teach jurisprudence, hadith, Quranic exegesis, and Arabic language. These circles formed the nucleus of the educational system that later evolved into the oldest continuously operating university in the world.',
            ],
            'era_id' => $fatimid->id,
            'year' => 975,
            'order' => 2,
        ]);

        TimelineEvent::create([
            'slug' => 'first-islamic-library',
            'title' => ['ar' => 'إنشاء أول مكتبة إسلامية كبرى', 'en' => 'Establishment of the First Major Islamic Library'],
            'description' => [
                'ar' => 'أنشئت مكتبة ضخمة في الجامع الأزهر ضمت آلاف المخطوطات في مختلف العلوم الشرعية والطبيعية والفلسفية. كانت هذه المكتبة من أعظم مكتبات العالم الإسلامي وقصدها الباحثون من جميع الأقطار.',
                'en' => 'A massive library was established at Al-Azhar containing thousands of manuscripts in various Islamic, natural, and philosophical sciences. This library was among the greatest in the Islamic world and attracted researchers from all regions.',
            ],
            'era_id' => $fatimid->id,
            'year' => 1005,
            'order' => 3,
        ]);

        TimelineEvent::create([
            'slug' => 'center-of-fatimid-learning',
            'title' => ['ar' => 'الأزهر مركزاً للتعلم الفاطمي', 'en' => 'Al-Azhar Becomes Center of Fatimid Learning'],
            'description' => [
                'ar' => 'تحول الأزهر إلى المركز الرئيسي للتعليم والدعوة الفاطمية، وأصبح يستقطب العلماء والطلاب من جميع أنحاء العالم الإسلامي. تم تخصيص أوقاف كبيرة لدعم العلماء والطلاب وتوفير السكن والطعام لهم.',
                'en' => 'Al-Azhar transformed into the primary center for Fatimid education and da\'wa, attracting scholars and students from across the Islamic world. Large endowments were dedicated to support scholars and students, providing them with housing and sustenance.',
            ],
            'era_id' => $fatimid->id,
            'year' => 1050,
            'order' => 4,
        ]);

        // Era 2: The Mamluk Era
        $mamluk = TimelineEra::create([
            'slug' => 'the-mamluk-era',
            'name' => ['ar' => 'عصر المماليك', 'en' => 'The Mamluk Era'],
            'description' => [
                'ar' => 'شهد عصر المماليك نهضة علمية كبرى في الأزهر حيث أصبح المركز الأول للعلوم الإسلامية السنية بعد سقوط الدولة الفاطمية. توسع الأزهر في هذه الفترة وأضيفت إليه أروقة جديدة لاستيعاب الطلاب القادمين من مختلف البلدان الإسلامية.',
                'en' => 'The Mamluk era witnessed a major scholarly renaissance at Al-Azhar as it became the foremost center for Sunni Islamic sciences after the fall of the Fatimid dynasty. Al-Azhar expanded during this period with new student quarters (riwaq) added to accommodate students from various Islamic countries.',
            ],
            'start_year' => 1250,
            'end_year' => 1517,
            'order' => 2,
        ]);

        TimelineEvent::create([
            'slug' => 'sultan-barquq-dome',
            'title' => ['ar' => 'إضافة قبة السلطان برقوق', 'en' => 'Sultan Barquq\'s Dome Addition'],
            'description' => [
                'ar' => 'أمر السلطان برقوق بإضافة قبة جديدة وتوسعة كبيرة للجامع الأزهر، مما عزز مكانته كأهم مؤسسة تعليمية في العالم الإسلامي. كما أوقف أوقافاً كبيرة لدعم العلماء والطلاب.',
                'en' => 'Sultan Barquq ordered the addition of a new dome and major expansion of Al-Azhar Mosque, reinforcing its position as the most important educational institution in the Islamic world. He also established significant endowments to support scholars and students.',
            ],
            'era_id' => $mamluk->id,
            'year' => 1390,
            'order' => 1,
        ]);

        TimelineEvent::create([
            'slug' => 'flourishing-jurisprudence',
            'title' => ['ar' => 'ازدهار دراسات الفقه', 'en' => 'Flourishing of Jurisprudence Studies'],
            'description' => [
                'ar' => 'شهد الأزهر ازدهاراً كبيراً في دراسات الفقه الإسلامي بمذاهبه الأربعة، وأصبح المرجع الأول في الفتوى والقضاء الشرعي في العالم الإسلامي. تأسست حلقات متخصصة لكل مذهب فقهي.',
                'en' => 'Al-Azhar witnessed a great flourishing in Islamic jurisprudence studies across all four schools of thought, becoming the primary reference for fatwa and Islamic judiciary in the Muslim world. Specialized study circles were established for each school of jurisprudence.',
            ],
            'era_id' => $mamluk->id,
            'year' => 1310,
            'order' => 2,
        ]);

        TimelineEvent::create([
            'slug' => 'riwaq-expansion',
            'title' => ['ar' => 'توسعة نظام الأروقة', 'en' => 'Expansion of the Riwaq System'],
            'description' => [
                'ar' => 'توسع نظام الأروقة في الأزهر ليشمل أروقة مخصصة للطلاب من مختلف البلدان الإسلامية: رواق المغاربة، رواق الأتراك، رواق الشوام، ورواق الهنود. وفر هذا النظام السكن والإعاشة للطلاب الوافدين.',
                'en' => 'The riwaq system expanded to include dedicated quarters for students from various Islamic countries: the Moroccan riwaq, Turkish riwaq, Levantine riwaq, and Indian riwaq. This system provided housing and sustenance for international students.',
            ],
            'era_id' => $mamluk->id,
            'year' => 1340,
            'order' => 3,
        ]);

        TimelineEvent::create([
            'slug' => 'ibn-khaldun-at-azhar',
            'title' => ['ar' => 'ابن خلدون يدرّس في الأزهر', 'en' => 'Ibn Khaldun Teaches at Al-Azhar'],
            'description' => [
                'ar' => 'قدم العلامة عبد الرحمن بن خلدون إلى مصر عام 1382م حيث عُيّن قاضياً للقضاة المالكية ودرّس في الجامع الأزهر. ألقى دروساً في الفقه المالكي والتاريخ والعمران، تاركاً أثراً كبيراً في الحياة العلمية بالأزهر.',
                'en' => 'The great scholar Ibn Khaldun arrived in Egypt in 1382 CE where he was appointed as the Maliki Chief Judge and taught at Al-Azhar. He delivered lectures on Maliki jurisprudence, history, and civilization, leaving a significant impact on Al-Azhar\'s scholarly life.',
            ],
            'era_id' => $mamluk->id,
            'year' => 1382,
            'order' => 4,
        ]);

        // Era 3: The Ottoman Era
        $ottoman = TimelineEra::create([
            'slug' => 'the-ottoman-era',
            'name' => ['ar' => 'العصر العثماني', 'en' => 'The Ottoman Era'],
            'description' => [
                'ar' => 'خلال العصر العثماني حافظ الأزهر على مكانته كأهم مؤسسة دينية وعلمية في مصر والعالم الإسلامي. لعب علماء الأزهر دوراً محورياً في قيادة المقاومة الاجتماعية والسياسية، وشهدت هذه الفترة توسعات معمارية كبيرة.',
                'en' => 'During the Ottoman era, Al-Azhar maintained its position as the most important religious and scholarly institution in Egypt and the Islamic world. Al-Azhar scholars played a pivotal role in leading social and political resistance, and this period saw significant architectural expansions.',
            ],
            'start_year' => 1517,
            'end_year' => 1798,
            'order' => 3,
        ]);

        TimelineEvent::create([
            'slug' => 'ottoman-mosque-expansion',
            'title' => ['ar' => 'توسعة المسجد وبناء مآذن جديدة', 'en' => 'Mosque Expansion and New Minarets'],
            'description' => [
                'ar' => 'أجريت توسعات كبيرة للجامع الأزهر شملت إضافة مآذن جديدة وبوابات وأروقة. أضاف الأمير عبد الرحمن كتخدا مئذنة ورواقاً جديداً ومدخلاً رئيسياً يعد من أجمل العناصر المعمارية في الجامع.',
                'en' => 'Major expansions were carried out at Al-Azhar Mosque including new minarets, gates, and halls. Emir Abd al-Rahman Katkhuda added a minaret, a new hall, and a main entrance that is considered among the mosque\'s most beautiful architectural elements.',
            ],
            'era_id' => $ottoman->id,
            'year' => 1753,
            'order' => 1,
        ]);

        TimelineEvent::create([
            'slug' => 'scholars-social-resistance',
            'title' => ['ar' => 'علماء الأزهر يقودون المقاومة الاجتماعية', 'en' => 'Al-Azhar Scholars Lead Social Resistance'],
            'description' => [
                'ar' => 'لعب علماء الأزهر دوراً بارزاً في الدفاع عن حقوق الشعب المصري أمام الولاة العثمانيين. كانوا يتصدون للظلم ويرفعون مطالب الناس، مما جعل الأزهر مؤسسة اجتماعية وسياسية بالإضافة إلى دوره العلمي والديني.',
                'en' => 'Al-Azhar scholars played a prominent role in defending the rights of the Egyptian people against Ottoman governors. They confronted injustice and raised people\'s demands, making Al-Azhar a social and political institution in addition to its scholarly and religious role.',
            ],
            'era_id' => $ottoman->id,
            'year' => 1670,
            'order' => 2,
        ]);

        TimelineEvent::create([
            'slug' => 'new-academic-disciplines',
            'title' => ['ar' => 'تأسيس تخصصات أكاديمية جديدة', 'en' => 'Establishment of New Academic Disciplines'],
            'description' => [
                'ar' => 'توسعت المناهج الدراسية في الأزهر لتشمل علوم الفلك والرياضيات والطب إلى جانب العلوم الشرعية واللغوية التقليدية. أصبح الأزهر مركزاً شاملاً للمعرفة الإنسانية.',
                'en' => 'Al-Azhar\'s curricula expanded to include astronomy, mathematics, and medicine alongside traditional Islamic and linguistic sciences. Al-Azhar became a comprehensive center for human knowledge.',
            ],
            'era_id' => $ottoman->id,
            'year' => 1600,
            'order' => 3,
        ]);

        TimelineEvent::create([
            'slug' => 'napoleon-encounter',
            'title' => ['ar' => 'مواجهة نابليون لعلماء الأزهر', 'en' => 'Napoleon\'s Encounter with Al-Azhar Scholars'],
            'description' => [
                'ar' => 'عندما غزا نابليون بونابرت مصر عام 1798م، كان الأزهر مركز المقاومة الشعبية. قاد علماء الأزهر ثورة القاهرة الأولى ضد الاحتلال الفرنسي، مما أدى إلى قصف الفرنسيين للجامع الأزهر في حادثة مؤلمة أظهرت دور الأزهر الوطني.',
                'en' => 'When Napoleon Bonaparte invaded Egypt in 1798, Al-Azhar was the center of popular resistance. Al-Azhar scholars led the First Cairo Revolt against French occupation, which led to the French bombardment of Al-Azhar Mosque in a painful incident that demonstrated Al-Azhar\'s national role.',
            ],
            'era_id' => $ottoman->id,
            'year' => 1798,
            'order' => 4,
        ]);

        // Era 4: The Modern Era
        $modern = TimelineEra::create([
            'slug' => 'the-modern-era',
            'name' => ['ar' => 'العصر الحديث', 'en' => 'The Modern Era'],
            'description' => [
                'ar' => 'يمتد العصر الحديث من الحملة الفرنسية وحتى يومنا هذا، وشهد تحولات جذرية في بنية الأزهر التعليمية والإدارية. تحول الأزهر من نظام الحلقات التقليدية إلى جامعة حديثة متكاملة تضم كليات نظرية وعملية.',
                'en' => 'The modern era extends from the French campaign to the present day, witnessing fundamental transformations in Al-Azhar\'s educational and administrative structure. Al-Azhar transformed from a traditional circle-based system to a comprehensive modern university with both theoretical and practical faculties.',
            ],
            'start_year' => 1798,
            'end_year' => null,
            'order' => 4,
        ]);

        TimelineEvent::create([
            'slug' => 'muhammad-abduh-reforms',
            'title' => ['ar' => 'إصلاحات الإمام محمد عبده', 'en' => 'Imam Muhammad Abduh\'s Reforms'],
            'description' => [
                'ar' => 'قاد الإمام محمد عبده حركة إصلاحية شاملة في الأزهر شملت تطوير المناهج الدراسية وإدخال العلوم الحديثة وتحسين أساليب التدريس. دعا إلى الاجتهاد والتجديد في الفكر الإسلامي مع الحفاظ على الأصالة والهوية.',
                'en' => 'Imam Muhammad Abduh led a comprehensive reform movement at Al-Azhar that included developing curricula, introducing modern sciences, and improving teaching methods. He called for ijtihad and renewal in Islamic thought while preserving authenticity and identity.',
            ],
            'era_id' => $modern->id,
            'year' => 1895,
            'order' => 1,
        ]);

        TimelineEvent::create([
            'slug' => 'law-103-modernization',
            'title' => ['ar' => 'قانون 103 لسنة 1961 لتطوير الأزهر', 'en' => 'Law 103 of 1961 Modernization'],
            'description' => [
                'ar' => 'صدر القانون رقم 103 لسنة 1961 الذي أعاد تنظيم الأزهر وحوله إلى جامعة حديثة شاملة. أنشئت كليات جديدة في الطب والهندسة والعلوم والتجارة إلى جانب الكليات الشرعية واللغوية التقليدية.',
                'en' => 'Law 103 of 1961 was issued, reorganizing Al-Azhar and transforming it into a comprehensive modern university. New faculties were established in medicine, engineering, science, and commerce alongside the traditional Islamic and linguistic faculties.',
            ],
            'era_id' => $modern->id,
            'year' => 1961,
            'order' => 2,
        ]);

        TimelineEvent::create([
            'slug' => 'modern-faculties',
            'title' => ['ar' => 'إضافة الكليات العملية الحديثة', 'en' => 'Addition of Modern Practical Faculties'],
            'description' => [
                'ar' => 'تمت إضافة كليات الطب والهندسة والعلوم والزراعة والتجارة إلى جامعة الأزهر، مما جعلها جامعة شاملة تجمع بين العلوم الشرعية والعلوم الحديثة. أصبح الأزهر نموذجاً فريداً يجمع بين الأصالة والمعاصرة.',
                'en' => 'Faculties of Medicine, Engineering, Science, Agriculture, and Commerce were added to Al-Azhar University, making it a comprehensive university combining Islamic sciences with modern disciplines. Al-Azhar became a unique model bridging tradition and modernity.',
            ],
            'era_id' => $modern->id,
            'year' => 1962,
            'order' => 3,
        ]);

        TimelineEvent::create([
            'slug' => 'full-modern-university',
            'title' => ['ar' => 'الأزهر جامعة حديثة متكاملة', 'en' => 'Al-Azhar Becomes a Full Modern University'],
            'description' => [
                'ar' => 'تطور الأزهر ليصبح جامعة حديثة متكاملة تضم أكثر من 80 كلية موزعة على مختلف محافظات مصر، ويدرس فيها مئات الآلاف من الطلاب من مصر ومن أكثر من 100 دولة حول العالم. يواصل الأزهر رسالته في نشر الوسطية والاعتدال.',
                'en' => 'Al-Azhar evolved into a comprehensive modern university with over 80 faculties distributed across Egypt\'s governorates, educating hundreds of thousands of students from Egypt and more than 100 countries worldwide. Al-Azhar continues its mission of promoting moderation and tolerance.',
            ],
            'era_id' => $modern->id,
            'year' => 2000,
            'order' => 4,
        ]);
    }
}
