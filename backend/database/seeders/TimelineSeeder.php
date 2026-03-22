<?php

namespace Database\Seeders;

use App\Models\TimelineEra;
use App\Models\TimelineEvent;
use Illuminate\Database\Seeder;

class TimelineSeeder extends Seeder
{
    public function run(): void
    {
        // Era 1: Fatimid Era (970-1171)
        $fatimid = TimelineEra::create([
            'slug' => 'the-fatimid-era',
            'name' => [
                'ar' => 'العصر الفاطمي',
                'en' => 'The Fatimid Era',
                'fr' => 'L\'ere fatimide',
                'es' => 'La era fatimi',
                'zh' => '法蒂玛时代',
                'ru' => 'Фатимидская эпоха',
                'ur' => 'فاطمی دور',
            ],
            'description' => [
                'ar' => 'بدأ العصر الفاطمي بتأسيس الجامع الأزهر عام 970م على يد القائد جوهر الصقلي بأمر من الخليفة المعز لدين الله الفاطمي. سُمي بالأزهر نسبة إلى السيدة فاطمة الزهراء. شهد هذا العصر تحول الأزهر من مسجد إلى مركز تعليمي رائد يدرس العلوم الشرعية واللغوية والفلسفية.',
                'en' => 'The Fatimid era began with the founding of Al-Azhar Mosque in 970 CE by Commander Jawhar al-Siqilli under orders of Caliph Al-Mu\'izz li-Din Allah. Named after Fatimah al-Zahra, daughter of Prophet Muhammad. This era witnessed Al-Azhar\'s transformation from a mosque into a leading educational center.',
                'fr' => 'L\'ere fatimide a commence avec la fondation de la mosquee Al-Azhar en 970 par le commandant Jawhar al-Siqilli. Cette ere a vu la transformation d\'Al-Azhar en un centre educatif de premier plan.',
                'es' => 'La era fatimi comenzo con la fundacion de la mezquita de Al-Azhar en 970 por el comandante Jawhar al-Siqilli. Esta era presencio la transformacion de Al-Azhar en un centro educativo lider.',
                'zh' => '法蒂玛时代始于970年，由乔哈尔·西基利将军奉哈里发穆伊兹之命建立艾资哈尔清真寺。以先知穆罕默德之女法蒂玛·扎赫拉命名。',
                'ru' => 'Фатимидская эпоха началась с основания мечети Аль-Азхар в 970 году командующим Джаухаром ас-Сикилли по приказу халифа аль-Муизза.',
                'ur' => 'فاطمی دور 970 عیسوی میں جوہر الصقلی کے ہاتھوں مسجد الازہر کی بنیاد رکھنے سے شروع ہوا۔ خلیفہ المعز لدین اللہ کے حکم پر تعمیر ہوئی۔',
            ],
            'start_year' => 970,
            'end_year' => 1171,
            'order' => 1,
        ]);

        TimelineEvent::create([
            'slug' => 'construction-begins',
            'title' => [
                'ar' => 'بدء بناء الجامع الأزهر',
                'en' => 'Construction of Al-Azhar Begins',
                'fr' => 'Debut de la construction d\'Al-Azhar',
                'es' => 'Inicio de la construccion de Al-Azhar',
                'zh' => '艾资哈尔清真寺开始建造',
                'ru' => 'Начало строительства Аль-Азхара',
                'ur' => 'جامع الازہر کی تعمیر کا آغاز',
            ],
            'description' => [
                'ar' => 'أمر الخليفة المعز لدين الله الفاطمي قائده جوهر الصقلي ببناء الجامع الأزهر عند تأسيس مدينة القاهرة. بدأ البناء في 24 جمادى الأولى 359هـ الموافق 970م.',
                'en' => 'Fatimid Caliph Al-Mu\'izz li-Din Allah ordered his commander Jawhar al-Siqilli to build Al-Azhar Mosque as he founded the city of Cairo. Construction began in 970 CE (359 AH).',
                'fr' => 'Le calife fatimide al-Mu\'izz ordonna la construction de la mosquee Al-Azhar lors de la fondation du Caire en 970.',
                'es' => 'El califa fatimi al-Mu\'izz ordeno la construccion de la mezquita de Al-Azhar al fundar El Cairo en 970.',
                'zh' => '法蒂玛哈里发穆伊兹在建立开罗城时，命令将领乔哈尔建造艾资哈尔清真寺。970年开工。',
                'ru' => 'Фатимидский халиф аль-Муизз приказал построить мечеть Аль-Азхар при основании Каира в 970 году.',
                'ur' => 'فاطمی خلیفہ المعز نے قاہرہ شہر کی بنیاد رکھتے ہوئے جوہر الصقلی کو مسجد الازہر تعمیر کرنے کا حکم دیا۔ تعمیر 970 عیسوی میں شروع ہوئی۔',
            ],
            'era_id' => $fatimid->id,
            'year' => 970,
            'order' => 1,
        ]);

        TimelineEvent::create([
            'slug' => 'first-prayers-at-al-azhar',
            'title' => [
                'ar' => 'افتتاح الجامع الأزهر للصلاة',
                'en' => 'Al-Azhar Opens for First Prayers',
                'fr' => 'Ouverture d\'Al-Azhar pour les premieres prieres',
                'es' => 'Al-Azhar abre para las primeras oraciones',
                'zh' => '艾资哈尔清真寺首次举行礼拜',
                'ru' => 'Аль-Азхар открывается для первых молитв',
                'ur' => 'جامع الازہر نماز کے لیے کھولا گیا',
            ],
            'description' => [
                'ar' => 'افتُتح الجامع الأزهر للصلاة في 7 رمضان 361هـ الموافق 22 يونيو 972م. سُمي بالأزهر نسبة إلى السيدة فاطمة الزهراء بنت النبي محمد صلى الله عليه وسلم.',
                'en' => 'Al-Azhar Mosque opened for its first prayers on 7 Ramadan 361 AH (June 22, 972 CE). It was named Al-Azhar ("The Radiant") in honor of Fatimah al-Zahra, daughter of Prophet Muhammad (PBUH).',
                'fr' => 'La mosquee Al-Azhar a ouvert ses portes le 22 juin 972, nommee en l\'honneur de Fatimah al-Zahra.',
                'es' => 'La mezquita de Al-Azhar abrio sus puertas el 22 de junio de 972, nombrada en honor a Fatimah al-Zahra.',
                'zh' => '艾资哈尔清真寺于972年6月22日（伊历361年斋月7日）首次开放礼拜。以先知之女法蒂玛·扎赫拉命名。',
                'ru' => 'Мечеть Аль-Азхар открылась для молитв 22 июня 972 года, названа в честь Фатимы аз-Захры.',
                'ur' => 'جامع الازہر 7 رمضان 361 ہجری (22 جون 972 عیسوی) کو نماز کے لیے کھولا گیا۔ سیدہ فاطمہ الزہراء کے نام پر رکھا گیا۔',
            ],
            'era_id' => $fatimid->id,
            'year' => 972,
            'order' => 2,
        ]);

        TimelineEvent::create([
            'slug' => 'first-study-circles',
            'title' => [
                'ar' => 'بداية حلقات العلم',
                'en' => 'First Study Circles Begin',
                'fr' => 'Debut des cercles d\'etude',
                'es' => 'Inicio de los circulos de estudio',
                'zh' => '首批学习圈开始',
                'ru' => 'Начало учебных кружков',
                'ur' => 'درس کے حلقوں کا آغاز',
            ],
            'description' => [
                'ar' => 'بدأت حلقات العلم في الجامع الأزهر حيث جلس العلماء لتدريس الفقه والحديث والتفسير واللغة العربية. كانت هذه الحلقات نواة أقدم جامعة لا تزال تعمل في العالم.',
                'en' => 'The first study circles (halaqat) began at Al-Azhar where scholars taught jurisprudence, hadith, Quranic exegesis, and Arabic. These circles formed the nucleus of the oldest continuously operating university in the world.',
                'fr' => 'Les premiers cercles d\'etude ont commence a Al-Azhar, formant le noyau de la plus ancienne universite en activite au monde.',
                'es' => 'Los primeros circulos de estudio comenzaron en Al-Azhar, formando el nucleo de la universidad mas antigua en funcionamiento del mundo.',
                'zh' => '艾资哈尔开始了最早的学习圈，学者们教授教法、圣训、经注和阿拉伯语。这些学习圈构成了世界上最古老的持续运营大学的核心。',
                'ru' => 'В Аль-Азхаре начались первые учебные кружки, ставшие основой старейшего действующего университета мира.',
                'ur' => 'جامع الازہر میں علم کے حلقے شروع ہوئے جو دنیا کی قدیم ترین فعال یونیورسٹی کی بنیاد بنے۔',
            ],
            'era_id' => $fatimid->id,
            'year' => 975,
            'order' => 3,
        ]);

        TimelineEvent::create([
            'slug' => 'formal-educational-institution',
            'title' => [
                'ar' => 'تنظيم الأزهر كمؤسسة تعليمية رسمية',
                'en' => 'Al-Azhar Formally Organized as Educational Institution',
                'fr' => 'Organisation formelle d\'Al-Azhar comme institution educative',
                'es' => 'Organizacion formal de Al-Azhar como institucion educativa',
                'zh' => '艾资哈尔正式组织为教育机构',
                'ru' => 'Аль-Азхар формально организован как учебное заведение',
                'ur' => 'الازہر کو باضابطہ تعلیمی ادارے کے طور پر منظم کیا گیا',
            ],
            'description' => [
                'ar' => 'تم تنظيم الأزهر رسمياً كمركز تعليمي إسماعيلي، وعُيّن 35 عالماً للتدريس فيه مما رسّخ مكانته كمؤسسة تعليمية رائدة في العالم الإسلامي.',
                'en' => 'Al-Azhar was formally organized as an Ismaili center of learning with 35 scholars hired, establishing it firmly as a leading educational institution in the Islamic world.',
                'fr' => 'Al-Azhar a ete formellement organise comme centre d\'apprentissage avec 35 erudits, s\'etablissant comme institution educative de premier plan.',
                'es' => 'Al-Azhar fue formalmente organizado como centro de aprendizaje con 35 eruditos, estableciendose como institucion educativa lider.',
                'zh' => '艾资哈尔正式组织为伊斯玛仪派学习中心，聘请35名学者，确立其作为伊斯兰世界领先教育机构的地位。',
                'ru' => 'Аль-Азхар был официально организован как учебный центр с 35 учёными.',
                'ur' => 'الازہر کو 35 علماء کی تقرری کے ساتھ باضابطہ تعلیمی مرکز کے طور پر منظم کیا گیا۔',
            ],
            'era_id' => $fatimid->id,
            'year' => 989,
            'order' => 4,
        ]);

        TimelineEvent::create([
            'slug' => 'first-library-established',
            'title' => [
                'ar' => 'إنشاء أول مكتبة في الأزهر',
                'en' => 'First Library Established at Al-Azhar',
                'fr' => 'Premiere bibliotheque etablie a Al-Azhar',
                'es' => 'Primera biblioteca establecida en Al-Azhar',
                'zh' => '艾资哈尔第一座图书馆建立',
                'ru' => 'Первая библиотека основана в Аль-Азхаре',
                'ur' => 'الازہر میں پہلی لائبریری قائم',
            ],
            'description' => [
                'ar' => 'أنشئت غرفة صغيرة للمخطوطات داخل مجمع المسجد، وهي أقدم شكل لمكتبة الأزهر الشريف التي أصبحت فيما بعد من أعظم مكتبات العالم الإسلامي.',
                'en' => 'A small chamber of scrolls was established within the mosque complex -- the earliest form of the Al-Azhar Library that would later become one of the greatest libraries in the Islamic world.',
                'fr' => 'Une petite salle de manuscrits a ete etablie, premiere forme de la bibliotheque d\'Al-Azhar.',
                'es' => 'Se establecio una pequena sala de manuscritos, primera forma de la biblioteca de Al-Azhar.',
                'zh' => '清真寺内建立了一间小型手稿室，这是艾资哈尔图书馆的最早形式。',
                'ru' => 'В мечети была создана небольшая комната свитков — первая форма библиотеки Аль-Азхара.',
                'ur' => 'مسجد کے اندر مخطوطات کا ایک چھوٹا کمرہ قائم کیا گیا جو الازہر لائبریری کی ابتدائی شکل تھی۔',
            ],
            'era_id' => $fatimid->id,
            'year' => 1005,
            'order' => 5,
        ]);

        TimelineEvent::create([
            'slug' => 'al-hakim-expansion',
            'title' => [
                'ar' => 'الخليفة الحاكم بأمر الله يوسع المبنى',
                'en' => 'Caliph al-Hakim bi-Amr Allah Expands the Premises',
                'fr' => 'Le calife al-Hakim bi-Amr Allah agrandit les locaux',
                'es' => 'El califa al-Hakim bi-Amr Allah amplia las instalaciones',
                'zh' => '哈基姆哈里发扩建艾资哈尔',
                'ru' => 'Халиф аль-Хаким расширяет здание',
                'ur' => 'خلیفہ الحاکم بامر اللہ نے عمارت کی توسیع کی',
            ],
            'description' => [
                'ar' => 'أمر الخليفة الحاكم بأمر الله الفاطمي بتوسعة مباني الجامع الأزهر وإضافة أبنية جديدة، مما زاد من مساحته وقدرته على استيعاب الطلاب والعلماء.',
                'en' => 'Fatimid Caliph al-Hakim bi-Amr Allah ordered the expansion of Al-Azhar Mosque premises, adding new buildings to increase its capacity for students and scholars.',
                'fr' => 'Le calife fatimide al-Hakim bi-Amr Allah a ordonne l\'agrandissement de la mosquee Al-Azhar avec de nouveaux batiments.',
                'es' => 'El califa fatimi al-Hakim bi-Amr Allah ordeno la ampliacion de la mezquita de Al-Azhar con nuevos edificios.',
                'zh' => '法蒂玛哈里发哈基姆下令扩建艾资哈尔清真寺，增加新建筑以容纳更多学者和学生。',
                'ru' => 'Фатимидский халиф аль-Хаким приказал расширить мечеть Аль-Азхар, добавив новые здания.',
                'ur' => 'فاطمی خلیفہ الحاکم بامر اللہ نے جامع الازہر کی عمارات کی توسیع کا حکم دیا اور نئی عمارتیں شامل کیں۔',
            ],
            'era_id' => $fatimid->id,
            'year' => 1009,
            'order' => 6,
        ]);

        TimelineEvent::create([
            'slug' => 'al-hafiz-refurbishment',
            'title' => [
                'ar' => 'الخليفة الحافظ يجري ترميماً كبيراً',
                'en' => 'Caliph al-Hafiz Undertakes Major Refurbishment',
                'fr' => 'Le calife al-Hafiz entreprend une renovation majeure',
                'es' => 'El califa al-Hafiz emprende una renovacion mayor',
                'zh' => '哈菲兹哈里发进行大规模翻修',
                'ru' => 'Халиф аль-Хафиз проводит крупную реставрацию',
                'ur' => 'خلیفہ الحافظ نے بڑے پیمانے پر تزئین نو کی',
            ],
            'description' => [
                'ar' => 'قام الخليفة الحافظ لدين الله بترميم كبير للجامع الأزهر شمل إضافة أقواس على شكل حافة السفينة وزخارف جصية منحوتة، مما أضاف طابعاً معمارياً فريداً.',
                'en' => 'Caliph al-Hafiz undertook a major refurbishment of Al-Azhar, adding distinctive keel-shaped arches and carved stucco decorations, giving the mosque a unique architectural character.',
                'fr' => 'Le calife al-Hafiz a entrepris une renovation majeure d\'Al-Azhar avec des arcs en forme de carene et du stuc sculpte.',
                'es' => 'El califa al-Hafiz emprendi una renovacion mayor de Al-Azhar con arcos en forma de quilla y estuco tallado.',
                'zh' => '哈菲兹哈里发对艾资哈尔进行大规模翻修，增添了独特的龙骨形拱门和雕刻灰泥装饰。',
                'ru' => 'Халиф аль-Хафиз провёл крупную реставрацию Аль-Азхара с килевидными арками и резной штукатуркой.',
                'ur' => 'خلیفہ الحافظ نے جامع الازہر کی بڑی تزئین نو کی جس میں کشتی نما محرابیں اور منقش گچ کاری شامل تھی۔',
            ],
            'era_id' => $fatimid->id,
            'year' => 1138,
            'order' => 7,
        ]);

        // Era 2: Ayyubid Era (1171-1250)
        $ayyubid = TimelineEra::create([
            'slug' => 'the-ayyubid-era',
            'name' => [
                'ar' => 'العصر الأيوبي',
                'en' => 'The Ayyubid Era',
                'fr' => 'L\'ere ayyoubide',
                'es' => 'La era ayubi',
                'zh' => '阿尤布时代',
                'ru' => 'Айюбидская эпоха',
                'ur' => 'ایوبی دور',
            ],
            'description' => [
                'ar' => 'بعد سقوط الدولة الفاطمية على يد صلاح الدين الأيوبي عام 1171م، تم إيقاف التعليم الشيعي في الأزهر وعُلّقت صلاة الجمعة والدروس لنحو قرن. مر الأزهر بفترة إهمال لأن صلاح الدين لم يثق بالأزهر لتاريخه الشيعي وركز على مدارس أخرى.',
                'en' => 'After Saladin overthrew the Fatimid dynasty in 1171, Shia teachings at Al-Azhar were suppressed and Friday prayers and classes were suspended for nearly a century. Al-Azhar experienced a period of neglect as Saladin distrusted it for its Shia history.',
                'fr' => 'Apres la chute de la dynastie fatimide en 1171, les enseignements chiites a Al-Azhar ont ete supprimes pendant pres d\'un siecle.',
                'es' => 'Despues de la caida de la dinastia fatimi en 1171, las ensenanzas chiitas fueron suprimidas durante casi un siglo.',
                'zh' => '1171年萨拉丁推翻法蒂玛王朝后，艾资哈尔的什叶派教学被压制，主麻拜和课程被暂停近一个世纪。',
                'ru' => 'После свержения Фатимидов Саладином в 1171 году шиитские учения в Аль-Азхаре были подавлены почти на столетие.',
                'ur' => '1171 میں صلاح الدین نے فاطمی سلطنت کا خاتمہ کیا اور الازہر میں شیعہ تعلیمات بند کر دی گئیں اور نماز جمعہ تقریباً ایک صدی کے لیے معطل رہی۔',
            ],
            'start_year' => 1171,
            'end_year' => 1250,
            'order' => 2,
        ]);

        TimelineEvent::create([
            'slug' => 'saladin-overthrows-fatimids',
            'title' => [
                'ar' => 'صلاح الدين يسقط الدولة الفاطمية',
                'en' => 'Saladin Overthrows the Fatimid Dynasty',
                'fr' => 'Saladin renverse la dynastie fatimide',
                'es' => 'Saladino derroca la dinastia fatimi',
                'zh' => '萨拉丁推翻法蒂玛王朝',
                'ru' => 'Саладин свергает Фатимидов',
                'ur' => 'صلاح الدین نے فاطمی سلطنت کا خاتمہ کیا',
            ],
            'description' => [
                'ar' => 'أسقط صلاح الدين الأيوبي الدولة الفاطمية وأوقف التعليم الشيعي في الأزهر. عُلّقت صلاة الجمعة والدروس، ومر الأزهر بفترة تراجع لنحو قرن من الزمان.',
                'en' => 'Saladin (Salah al-Din al-Ayyubi) overthrew the Fatimid dynasty and suppressed Shia teachings at Al-Azhar. Friday prayers and classes were suspended, and Al-Azhar declined for nearly a century.',
                'fr' => 'Saladin a renverse les Fatimides et supprime les enseignements chiites. Al-Azhar a connu un declin pendant pres d\'un siecle.',
                'es' => 'Saladino derroco a los fatimies y suprimio las ensenanzas chiitas. Al-Azhar declino durante casi un siglo.',
                'zh' => '萨拉丁推翻法蒂玛王朝，压制艾资哈尔的什叶派教学。艾资哈尔衰落了近一个世纪。',
                'ru' => 'Саладин сверг Фатимидов и подавил шиитские учения. Аль-Азхар пришёл в упадок почти на столетие.',
                'ur' => 'صلاح الدین نے فاطمی سلطنت ختم کی اور شیعہ تعلیمات بند کر دیں۔ الازہر تقریباً ایک صدی تک زوال پذیر رہا۔',
            ],
            'era_id' => $ayyubid->id,
            'year' => 1171,
            'order' => 1,
        ]);

        // Era 3: Mamluk Era (1250-1517)
        $mamluk = TimelineEra::create([
            'slug' => 'the-mamluk-era',
            'name' => [
                'ar' => 'العصر المملوكي',
                'en' => 'The Mamluk Era',
                'fr' => 'L\'ere mamelouke',
                'es' => 'La era mameluca',
                'zh' => '马穆鲁克时代',
                'ru' => 'Мамлюкская эпоха',
                'ur' => 'مملوک دور',
            ],
            'description' => [
                'ar' => 'شهد العصر المملوكي نهضة علمية كبرى في الأزهر حيث أصبح المركز الأول للعلوم الإسلامية السنية. أعاد السلطان بيبرس صلاة الجمعة عام 1266م. برز علماء عظام مثل ابن حجر العسقلاني والسيوطي والمقريزي وابن خلدون. توسع الأزهر بإضافة مآذن ومدارس جديدة.',
                'en' => 'The Mamluk era witnessed a major scholarly renaissance at Al-Azhar as it became the foremost center for Sunni Islamic sciences. Sultan Baibars restored Friday prayers in 1266. Great scholars like Ibn Hajar al-Asqalani, al-Suyuti, al-Maqrizi, and Ibn Khaldun flourished. The mosque was expanded with new minarets and madrasas.',
                'fr' => 'L\'ere mamelouke a vu une grande renaissance savante a Al-Azhar, devenu le premier centre des sciences sunnites. De grands savants comme Ibn Khaldoun y ont enseigne.',
                'es' => 'La era mameluca presencio un gran renacimiento academico en Al-Azhar. Grandes eruditos como Ibn Jaldun ensenaron alli.',
                'zh' => '马穆鲁克时代，艾资哈尔经历了学术复兴，成为逊尼派伊斯兰科学的首要中心。伊本·赫勒敦等伟大学者在此教学。',
                'ru' => 'Мамлюкская эпоха стала временем великого учёного возрождения Аль-Азхара. Великие учёные, такие как Ибн Хальдун, преподавали здесь.',
                'ur' => 'مملوک دور میں الازہر میں علمی نشاۃ ثانیہ آئی اور یہ سنی اسلامی علوم کا اولین مرکز بن گیا۔ ابن خلدون جیسے عظیم علماء نے یہاں تدریس کی۔',
            ],
            'start_year' => 1250,
            'end_year' => 1517,
            'order' => 3,
        ]);

        TimelineEvent::create([
            'slug' => 'baibars-restores-friday-prayers',
            'title' => [
                'ar' => 'السلطان بيبرس يعيد صلاة الجمعة',
                'en' => 'Sultan Baibars Restores Friday Prayers',
                'fr' => 'Le sultan Baibars retablit la priere du vendredi',
                'es' => 'El sultan Baibars restaura la oracion del viernes',
                'zh' => '拜巴尔斯苏丹恢复主麻拜',
                'ru' => 'Султан Бейбарс восстанавливает пятничную молитву',
                'ur' => 'سلطان بیبرس نے نماز جمعہ بحال کی',
            ],
            'description' => [
                'ar' => 'أعاد السلطان الظاهر بيبرس صلاة الجمعة في الجامع الأزهر بعد انقطاع دام نحو قرن. استأنفت الرواتب للعلماء والطلاب وبدأت إصلاحات كبيرة للمسجد.',
                'en' => 'Sultan Baibars restored congregational Friday prayers at Al-Azhar after nearly a century of suspension. Stipends for scholars and students resumed, and major mosque repairs began.',
                'fr' => 'Le sultan Baibars a retabli la priere du vendredi a Al-Azhar apres pres d\'un siecle de suspension.',
                'es' => 'El sultan Baibars restauro la oracion del viernes en Al-Azhar tras casi un siglo de suspension.',
                'zh' => '拜巴尔斯苏丹在中断近一个世纪后恢复了艾资哈尔的主麻拜。',
                'ru' => 'Султан Бейбарс восстановил пятничные молитвы в Аль-Азхаре после почти столетнего перерыва.',
                'ur' => 'سلطان بیبرس نے تقریباً ایک صدی کی معطلی کے بعد الازہر میں نماز جمعہ بحال کی۔',
            ],
            'era_id' => $mamluk->id,
            'year' => 1266,
            'order' => 1,
        ]);

        TimelineEvent::create([
            'slug' => 'madrasa-al-taybarsiyya',
            'title' => [
                'ar' => 'بناء المدرسة الطيبرسية بجوار المسجد',
                'en' => 'Madrasa al-Taybarsiyya Built Adjacent to the Mosque',
                'fr' => 'Construction de la madrasa al-Taybarsiyya adjacente a la mosquee',
                'es' => 'Construccion de la madrasa al-Taybarsiyya junto a la mezquita',
                'zh' => '泰巴尔西耶学院建于清真寺旁',
                'ru' => 'Медресе ат-Тайбарсийя построено рядом с мечетью',
                'ur' => 'مدرسہ الطیبرسیہ مسجد کے ساتھ تعمیر ہوا',
            ],
            'description' => [
                'ar' => 'بُنيت المدرسة الطيبرسية بجوار الجامع الأزهر على يد الأمير علاء الدين طيبرس، وأصبحت من أهم المدارس الملحقة بالأزهر لتعليم العلوم الشرعية.',
                'en' => 'Madrasa al-Taybarsiyya was built adjacent to Al-Azhar Mosque by Amir Ala al-Din Taybars, becoming one of the most important schools attached to Al-Azhar for teaching Islamic sciences.',
                'fr' => 'La madrasa al-Taybarsiyya a ete construite a cote de la mosquee Al-Azhar par l\'emir Ala al-Din Taybars.',
                'es' => 'La madrasa al-Taybarsiyya fue construida junto a la mezquita de Al-Azhar por el emir Ala al-Din Taybars.',
                'zh' => '泰巴尔西耶学院由埃米尔阿拉丁·泰巴尔斯建于艾资哈尔清真寺旁，成为教授伊斯兰科学的重要附属学校之一。',
                'ru' => 'Медресе ат-Тайбарсийя было построено эмиром Ала ад-Дином Тайбарсом рядом с мечетью Аль-Азхар.',
                'ur' => 'امیر علاء الدین طیبرس نے جامع الازہر کے ساتھ مدرسہ الطیبرسیہ تعمیر کرایا جو علوم شرعیہ کی تعلیم کا اہم مرکز بنا۔',
            ],
            'era_id' => $mamluk->id,
            'year' => 1309,
            'order' => 2,
        ]);

        TimelineEvent::create([
            'slug' => 'premier-center-sunni-scholarship',
            'title' => [
                'ar' => 'الأزهر يصبح أهم مركز للعلوم السنية',
                'en' => 'Al-Azhar Becomes Premier Center of Sunni Scholarship',
                'fr' => 'Al-Azhar devient le premier centre d\'erudition sunnite',
                'es' => 'Al-Azhar se convierte en el principal centro de erudicion suni',
                'zh' => '艾资哈尔成为逊尼派学术的首要中心',
                'ru' => 'Аль-Азхар становится главным центром суннитской учёности',
                'ur' => 'الازہر سنی علوم کا سب سے اہم مرکز بن گیا',
            ],
            'description' => [
                'ar' => 'أصبح الأزهر المركز الأول للعلوم الإسلامية السنية في العالم. برز فيه علماء عظام مثل ابن حجر العسقلاني والسيوطي والمقريزي وابن خلدون الذين تركوا إرثاً علمياً ضخماً.',
                'en' => 'Al-Azhar became the premier center of Sunni scholarship worldwide. Prominent scholars including Ibn Hajar al-Asqalani, al-Suyuti, al-Maqrizi, and Ibn Khaldun left an enormous scholarly legacy.',
                'fr' => 'Al-Azhar est devenu le premier centre mondial d\'erudition sunnite, accueillant des savants eminents.',
                'es' => 'Al-Azhar se convirtio en el principal centro mundial de erudicion suni, albergando a eruditos eminentes.',
                'zh' => '艾资哈尔成为全球逊尼派学术的首要中心，杰出学者如伊本·哈杰尔、苏尤提、马格里齐和伊本·赫勒敦留下了巨大的学术遗产。',
                'ru' => 'Аль-Азхар стал главным мировым центром суннитской учёности с выдающимися учёными.',
                'ur' => 'الازہر دنیا بھر میں سنی علوم کا اولین مرکز بن گیا۔ ابن حجر العسقلانی، السیوطی اور ابن خلدون جیسے عظیم علماء نے عظیم علمی ورثہ چھوڑا۔',
            ],
            'era_id' => $mamluk->id,
            'year' => 1400,
            'order' => 2,
        ]);

        TimelineEvent::create([
            'slug' => 'ibn-khaldun-teaches-at-azhar',
            'title' => [
                'ar' => 'ابن خلدون يدرّس في الأزهر',
                'en' => 'Ibn Khaldun Teaches at Al-Azhar',
                'fr' => 'Ibn Khaldoun enseigne a Al-Azhar',
                'es' => 'Ibn Jaldun ensena en Al-Azhar',
                'zh' => '伊本·赫勒敦在艾资哈尔教学',
                'ru' => 'Ибн Хальдун преподаёт в Аль-Азхаре',
                'ur' => 'ابن خلدون الازہر میں تدریس کرتے ہیں',
            ],
            'description' => [
                'ar' => 'قدم العلامة عبد الرحمن بن خلدون إلى مصر عام 1382م حيث عُيّن قاضياً للقضاة المالكية ودرّس في الجامع الأزهر. ألقى دروساً في الفقه المالكي والتاريخ والعمران، تاركاً أثراً كبيراً في الحياة العلمية بالأزهر.',
                'en' => 'The great scholar Ibn Khaldun arrived in Egypt in 1382 CE, was appointed Maliki Chief Judge, and taught at Al-Azhar. He delivered lectures on Maliki jurisprudence, history, and civilization, leaving a significant impact on scholarly life.',
                'fr' => 'Ibn Khaldoun est arrive en Egypte en 1382, nomme juge en chef malekite, et a enseigne a Al-Azhar.',
                'es' => 'Ibn Jaldun llego a Egipto en 1382, fue nombrado juez supremo maliki y enseno en Al-Azhar.',
                'zh' => '伟大学者伊本·赫勒敦于1382年抵达埃及，被任命为马利基首席法官并在艾资哈尔教学。',
                'ru' => 'Великий учёный Ибн Хальдун прибыл в Египет в 1382 году и преподавал в Аль-Азхаре.',
                'ur' => 'عظیم عالم ابن خلدون 1382 میں مصر آئے، مالکی قاضی القضاۃ مقرر ہوئے اور الازہر میں تدریس کی۔',
            ],
            'era_id' => $mamluk->id,
            'year' => 1382,
            'order' => 3,
        ]);

        TimelineEvent::create([
            'slug' => 'qaytbay-minaret',
            'title' => [
                'ar' => 'السلطان قايتباي يبني مئذنة جديدة',
                'en' => 'Sultan Qaytbay Builds a New Minaret',
                'fr' => 'Le sultan Qaytbay construit un nouveau minaret',
                'es' => 'El sultan Qaytbay construye un nuevo minarete',
                'zh' => '盖特贝苏丹建造新宣礼塔',
                'ru' => 'Султан Кайтбай строит новый минарет',
                'ur' => 'سلطان قائتبائے نے نئی مینار تعمیر کی',
            ],
            'description' => [
                'ar' => 'أمر السلطان قايتباي ببناء مئذنة جديدة للجامع الأزهر، وهي من أجمل المآذن المملوكية التي لا تزال قائمة حتى اليوم.',
                'en' => 'Sultan Qaytbay ordered the construction of a new minaret at Al-Azhar Mosque, one of the most beautiful Mamluk minarets still standing today.',
                'fr' => 'Le sultan Qaytbay a ordonne la construction d\'un nouveau minaret, l\'un des plus beaux minarets mamelouks.',
                'es' => 'El sultan Qaytbay ordeno la construccion de un nuevo minarete, uno de los mas bellos minaretes mamelucos.',
                'zh' => '盖特贝苏丹下令在艾资哈尔清真寺建造新宣礼塔，是至今仍存的最美马穆鲁克宣礼塔之一。',
                'ru' => 'Султан Кайтбай приказал построить новый минарет — один из красивейших мамлюкских минаретов.',
                'ur' => 'سلطان قائتبائے نے الازہر میں نئی مینار تعمیر کرائی جو آج بھی سب سے خوبصورت مملوک میناروں میں سے ایک ہے۔',
            ],
            'era_id' => $mamluk->id,
            'year' => 1469,
            'order' => 4,
        ]);

        TimelineEvent::create([
            'slug' => 'al-ghuri-minaret',
            'title' => [
                'ar' => 'السلطان الغوري يضيف مئذنة',
                'en' => 'Sultan al-Ghuri Adds the Final Historic Minaret',
                'fr' => 'Le sultan al-Ghuri ajoute le dernier minaret historique',
                'es' => 'El sultan al-Ghuri anade el ultimo minarete historico',
                'zh' => '古里苏丹增建最后一座历史宣礼塔',
                'ru' => 'Султан аль-Гури добавляет последний исторический минарет',
                'ur' => 'سلطان الغوری نے آخری تاریخی مینار شامل کی',
            ],
            'description' => [
                'ar' => 'أضاف السلطان قنصوه الغوري مئذنة جديدة للجامع الأزهر، وهي آخر المآذن التاريخية التي بُنيت في العصر المملوكي، وتتميز بطرازها المعماري الفريد ذي الرأس المزدوج.',
                'en' => 'Sultan Qansuh al-Ghuri added a new minaret to Al-Azhar Mosque, the last of the historic minarets built during the Mamluk era, distinguished by its unique double-headed architectural style.',
                'fr' => 'Le sultan al-Ghuri a ajoute un nouveau minaret a Al-Azhar, le dernier des minarets historiques de l\'ere mamelouke, au style architectural unique a double tete.',
                'es' => 'El sultan al-Ghuri anadio un nuevo minarete a Al-Azhar, el ultimo de los minaretes historicos de la era mameluca, con un estilo arquitectonico unico de doble cabeza.',
                'zh' => '古里苏丹为艾资哈尔清真寺增建了一座新宣礼塔，这是马穆鲁克时代最后一座历史宣礼塔，以其独特的双头建筑风格著称。',
                'ru' => 'Султан аль-Гури добавил новый минарет к Аль-Азхару — последний из исторических минаретов мамлюкской эпохи с уникальным двуглавым стилем.',
                'ur' => 'سلطان قنصوہ الغوری نے جامع الازہر میں نئی مینار شامل کی جو مملوک دور کی آخری تاریخی مینار ہے اور اپنے دوہرے سر والے منفرد طرز تعمیر سے ممتاز ہے۔',
            ],
            'era_id' => $mamluk->id,
            'year' => 1510,
            'order' => 5,
        ]);

        // Era 4: Ottoman Era (1517-1798)
        $ottoman = TimelineEra::create([
            'slug' => 'the-ottoman-era',
            'name' => [
                'ar' => 'العصر العثماني',
                'en' => 'The Ottoman Era',
                'fr' => 'L\'ere ottomane',
                'es' => 'La era otomana',
                'zh' => '奥斯曼时代',
                'ru' => 'Османская эпоха',
                'ur' => 'عثمانی دور',
            ],
            'description' => [
                'ar' => 'خلال العصر العثماني حافظ الأزهر على مكانته كأهم مؤسسة دينية وعلمية في مصر. شهدت هذه الفترة تعيين أول شيخ رسمي للأزهر (محمد الخراشي عام 1690م تقريباً) وتوسعات معمارية كبيرة. لعب علماء الأزهر دوراً في المقاومة ضد الحملة الفرنسية عام 1798م.',
                'en' => 'During the Ottoman era, Al-Azhar maintained its position as Egypt\'s most important religious and scholarly institution. This period saw the appointment of the first official Grand Imam (Muhammad al-Kharashi, c. 1690), major architectural expansions, and Al-Azhar scholars\' role in resisting the French invasion of 1798.',
                'fr' => 'Durant l\'ere ottomane, Al-Azhar a maintenu sa position d\'institution savante la plus importante d\'Egypte, avec la nomination du premier Grand Imam officiel.',
                'es' => 'Durante la era otomana, Al-Azhar mantuvo su posicion como la institucion academica mas importante de Egipto, con el nombramiento del primer Gran Imam oficial.',
                'zh' => '奥斯曼时代，艾资哈尔保持了其作为埃及最重要宗教和学术机构的地位。首位正式大伊玛目于约1690年被任命。',
                'ru' => 'В османскую эпоху Аль-Азхар сохранил своё положение важнейшего учебного заведения Египта. Был назначен первый официальный Великий имам.',
                'ur' => 'عثمانی دور میں الازہر مصر کے سب سے اہم دینی اور علمی ادارے کی حیثیت برقرار رکھے رہا۔ پہلے باضابطہ شیخ الازہر (محمد الخراشی) تقریباً 1690 میں مقرر ہوئے۔',
            ],
            'start_year' => 1517,
            'end_year' => 1798,
            'order' => 4,
        ]);

        TimelineEvent::create([
            'slug' => 'ottoman-conquest-selim',
            'title' => [
                'ar' => 'السلطان سليم الأول يصلي الجمعة في الأزهر',
                'en' => 'Sultan Selim I Prays Friday at Al-Azhar',
                'fr' => 'Le sultan Selim Ier prie le vendredi a Al-Azhar',
                'es' => 'El sultan Selim I reza el viernes en Al-Azhar',
                'zh' => '苏丹塞利姆一世在艾资哈尔做主麻拜',
                'ru' => 'Султан Селим I молится в Аль-Азхаре',
                'ur' => 'سلطان سلیم اول نے الازہر میں نماز جمعہ ادا کی',
            ],
            'description' => [
                'ar' => 'بعد فتح السلطان العثماني سليم الأول لمصر، حضر إلى الجامع الأزهر وصلى فيه الجمعة، مؤكداً على هيبة الأزهر ومكانته.',
                'en' => 'After Ottoman Sultan Selim I conquered Egypt, he attended Friday prayer at Al-Azhar Mosque, affirming its prestige and importance.',
                'fr' => 'Apres la conquete de l\'Egypte, le sultan Selim Ier a assiste a la priere du vendredi a Al-Azhar.',
                'es' => 'Tras la conquista de Egipto, el sultan Selim I asistio a la oracion del viernes en Al-Azhar.',
                'zh' => '奥斯曼苏丹塞利姆一世征服埃及后，在艾资哈尔清真寺参加主麻拜，确认了其声望。',
                'ru' => 'После завоевания Египта султан Селим I посетил пятничную молитву в Аль-Азхаре.',
                'ur' => 'سلطان سلیم اول نے مصر فتح کرنے کے بعد الازہر میں نماز جمعہ ادا کی اور اس کی عظمت کی تصدیق کی۔',
            ],
            'era_id' => $ottoman->id,
            'year' => 1517,
            'order' => 1,
        ]);

        TimelineEvent::create([
            'slug' => 'first-grand-imam-appointed',
            'title' => [
                'ar' => 'تعيين أول شيخ رسمي للأزهر',
                'en' => 'First Official Grand Imam Appointed',
                'fr' => 'Nomination du premier Grand Imam officiel',
                'es' => 'Nombramiento del primer Gran Imam oficial',
                'zh' => '任命首位正式大伊玛目',
                'ru' => 'Назначен первый официальный Великий имам',
                'ur' => 'پہلے باضابطہ شیخ الازہر کی تقرری',
            ],
            'description' => [
                'ar' => 'عُيّن الشيخ محمد الخراشي أول شيخ رسمي للأزهر (شيخ الأزهر) حوالي عام 1690م، وكان على المذهب المالكي. بدأ بذلك نظام المشيخة الرسمي الذي استمر حتى اليوم.',
                'en' => 'Sheikh Muhammad al-Kharashi was appointed as the first official Grand Imam (Sheikh al-Azhar) around 1690 CE, following the Maliki school. This established the formal office of Grand Imam that continues to this day.',
                'fr' => 'Le cheikh Muhammad al-Kharashi a ete nomme premier Grand Imam officiel vers 1690, etablissant cette fonction.',
                'es' => 'El jeque Muhammad al-Kharashi fue nombrado primer Gran Imam oficial alrededor de 1690, estableciendo esta funcion.',
                'zh' => '谢赫穆罕默德·哈拉希约于1690年被任命为首位正式大伊玛目，确立了延续至今的大伊玛目制度。',
                'ru' => 'Шейх Мухаммад аль-Хараши был назначен первым официальным Великим имамом около 1690 года.',
                'ur' => 'شیخ محمد الخراشی تقریباً 1690 میں پہلے باضابطہ شیخ الازہر مقرر ہوئے جس سے باضابطہ مشیخت کا نظام شروع ہوا۔',
            ],
            'era_id' => $ottoman->id,
            'year' => 1690,
            'order' => 2,
        ]);

        TimelineEvent::create([
            'slug' => 'katkhuda-expansion',
            'title' => [
                'ar' => 'توسعة عبد الرحمن كتخدا الكبرى',
                'en' => 'Abd al-Rahman Katkhuda\'s Major Expansion',
                'fr' => 'Grande expansion d\'Abd al-Rahman Katkhuda',
                'es' => 'Gran expansion de Abd al-Rahman Katkhuda',
                'zh' => '阿卜杜勒·拉赫曼·卡特胡达的重大扩建',
                'ru' => 'Крупное расширение Абд ар-Рахмана Катхуды',
                'ur' => 'عبدالرحمٰن کتخدا کی بڑی توسیع',
            ],
            'description' => [
                'ar' => 'قام عبد الرحمن كتخدا بتوسعة كبيرة للجامع الأزهر شملت ثلاث بوابات جديدة (باب المزينين وباب الصعايدة وباب الشربة) ومدخلاً جديداً وتوسعة خلف المحراب الفاطمي.',
                'en' => 'Abd al-Rahman Katkhuda undertook a major expansion of Al-Azhar, adding three new gates (Bab al-Muzayin, Bab al-Sa\'ida, Sheroubeh Gate), a new portal, and expanding behind the Fatimid mihrab.',
                'fr' => 'Abd al-Rahman Katkhuda a entrepris une expansion majeure avec trois nouvelles portes et un nouveau portail.',
                'es' => 'Abd al-Rahman Katkhuda realizo una gran expansion con tres nuevas puertas y un nuevo portal.',
                'zh' => '阿卜杜勒·拉赫曼·卡特胡达对艾资哈尔进行了重大扩建，增加了三个新大门和新入口。',
                'ru' => 'Абд ар-Рахман Катхуда провёл крупное расширение Аль-Азхара с тремя новыми воротами.',
                'ur' => 'عبدالرحمٰن کتخدا نے الازہر کی بڑی توسیع کی جس میں تین نئے دروازے شامل تھے۔',
            ],
            'era_id' => $ottoman->id,
            'year' => 1753,
            'order' => 3,
        ]);

        TimelineEvent::create([
            'slug' => 'french-invasion-resistance',
            'title' => [
                'ar' => 'الحملة الفرنسية وقصف الأزهر',
                'en' => 'French Invasion and Bombardment of Al-Azhar',
                'fr' => 'Invasion francaise et bombardement d\'Al-Azhar',
                'es' => 'Invasion francesa y bombardeo de Al-Azhar',
                'zh' => '法国入侵和炮轰艾资哈尔',
                'ru' => 'Французское вторжение и бомбардировка Аль-Азхара',
                'ur' => 'فرانسیسی حملہ اور الازہر پر بمباری',
            ],
            'description' => [
                'ar' => 'غزت القوات الفرنسية بقيادة نابليون مصر عام 1798م. شارك طلاب الأزهر وعلماؤه في ثورة القاهرة ضد الاحتلال الفرنسي، مما أدى إلى قصف الفرنسيين لمجمع الأزهر. واغتال طالب الأزهر سليمان الحلبي القائد الفرنسي كليبر عام 1800م.',
                'en' => 'Napoleon\'s French forces invaded Egypt in 1798. Al-Azhar students and scholars participated in the Cairo uprising against French occupation, leading to the French bombardment of Al-Azhar. In 1800, Al-Azhar student Suleiman al-Halabi assassinated French commander Kleber.',
                'fr' => 'Les forces de Napoleon ont envahi l\'Egypte en 1798. Les etudiants et erudits d\'Al-Azhar ont participe au soulevement du Caire.',
                'es' => 'Las fuerzas de Napoleon invadieron Egipto en 1798. Estudiantes y eruditos de Al-Azhar participaron en el levantamiento de El Cairo.',
                'zh' => '1798年拿破仑的法国军队入侵埃及。艾资哈尔的学生和学者参加了反法起义，导致法军炮轰艾资哈尔。',
                'ru' => 'Войска Наполеона вторглись в Египет в 1798 году. Студенты Аль-Азхара участвовали в Каирском восстании.',
                'ur' => 'نپولین کی فرانسیسی فوجوں نے 1798 میں مصر پر حملہ کیا۔ الازہر کے طلباء اور علماء نے قاہرہ بغاوت میں حصہ لیا۔',
            ],
            'era_id' => $ottoman->id,
            'year' => 1798,
            'order' => 4,
        ]);

        TimelineEvent::create([
            'slug' => 'suleiman-al-halabi-assassinates-kleber',
            'title' => [
                'ar' => 'سليمان الحلبي طالب الأزهر يغتال الجنرال كليبر',
                'en' => 'Al-Azhar Student Suleiman al-Halabi Assassinates General Kleber',
                'fr' => 'L\'etudiant d\'Al-Azhar Suleiman al-Halabi assassine le general Kleber',
                'es' => 'El estudiante de Al-Azhar Suleiman al-Halabi asesina al general Kleber',
                'zh' => '艾资哈尔学生苏莱曼·哈拉比刺杀克莱贝尔将军',
                'ru' => 'Студент Аль-Азхара Сулейман аль-Халаби убивает генерала Клебера',
                'ur' => 'الازہر کے طالب علم سلیمان الحلبی نے جنرل کلیبر کو قتل کیا',
            ],
            'description' => [
                'ar' => 'اغتال سليمان الحلبي، وهو طالب سوري في الأزهر، القائد الفرنسي الجنرال كليبر في القاهرة عام 1800م، في عمل مقاومة ضد الاحتلال الفرنسي لمصر.',
                'en' => 'Suleiman al-Halabi, a Syrian student at Al-Azhar, assassinated French commander General Kleber in Cairo in 1800, in an act of resistance against the French occupation of Egypt.',
                'fr' => 'Suleiman al-Halabi, etudiant syrien a Al-Azhar, a assassine le general Kleber au Caire en 1800, un acte de resistance contre l\'occupation francaise.',
                'es' => 'Suleiman al-Halabi, estudiante sirio de Al-Azhar, asesino al general Kleber en El Cairo en 1800, en un acto de resistencia contra la ocupacion francesa.',
                'zh' => '叙利亚籍艾资哈尔学生苏莱曼·哈拉比于1800年在开罗刺杀了法国指挥官克莱贝尔将军，以抵抗法国对埃及的占领。',
                'ru' => 'Сулейман аль-Халаби, сирийский студент Аль-Азхара, убил французского генерала Клебера в Каире в 1800 году в знак сопротивления французской оккупации.',
                'ur' => 'سلیمان الحلبی، الازہر کے شامی طالب علم، نے 1800 میں قاہرہ میں فرانسیسی کمانڈر جنرل کلیبر کو قتل کیا، جو فرانسیسی قبضے کے خلاف مزاحمت کا عمل تھا۔',
            ],
            'era_id' => $ottoman->id,
            'year' => 1800,
            'order' => 5,
        ]);

        // Era 5: Modern Era (1798-1952)
        $modern = TimelineEra::create([
            'slug' => 'the-modern-era',
            'name' => [
                'ar' => 'العصر الحديث',
                'en' => 'The Modern Era',
                'fr' => 'L\'ere moderne',
                'es' => 'La era moderna',
                'zh' => '近代',
                'ru' => 'Современная эпоха',
                'ur' => 'جدید دور',
            ],
            'description' => [
                'ar' => 'شهد هذا العصر إصلاحات جذرية في الأزهر بقيادة مصلحين مثل جمال الدين الأفغاني ومحمد عبده. صدر أول إطار تنظيمي عام 1872م. دعم علماء الأزهر الثورة العرابية. وفي عام 1911م صدر قانون رقم 10 لإعادة هيكلة النظام التعليمي.',
                'en' => 'This era witnessed radical reforms at Al-Azhar led by reformers like Jamal al-Din al-Afghani and Muhammad Abduh. The first regulatory framework came in 1872. Al-Azhar scholars supported the Urabi revolution. In 1911, Law No. 10 restructured the educational system.',
                'fr' => 'Cette ere a vu des reformes radicales menees par des reformateurs comme Muhammad Abduh. La loi n°10 de 1911 a restructure le systeme educatif.',
                'es' => 'Esta era presencio reformas radicales lideradas por reformadores como Muhammad Abduh. La Ley n°10 de 1911 reestructuro el sistema educativo.',
                'zh' => '这个时代见证了由阿富汗尼和穆罕默德·阿卜杜赫等改革家领导的根本性改革。1911年第10号法令重组了教育体系。',
                'ru' => 'Эта эпоха стала временем радикальных реформ во главе с Мухаммадом Абдухом. Закон № 10 1911 года реструктурировал систему образования.',
                'ur' => 'اس دور میں جمال الدین افغانی اور محمد عبدہ جیسے مصلحین کی قیادت میں بنیادی اصلاحات ہوئیں۔ 1911 کے قانون نمبر 10 نے تعلیمی نظام کی تنظیم نو کی۔',
            ],
            'start_year' => 1798,
            'end_year' => 1952,
            'order' => 5,
        ]);

        TimelineEvent::create([
            'slug' => 'first-regulatory-framework',
            'title' => [
                'ar' => 'أول إطار تنظيمي لمنصب شيخ الأزهر',
                'en' => 'First Regulatory Framework for Grand Imam',
                'fr' => 'Premier cadre reglementaire pour le Grand Imam',
                'es' => 'Primer marco regulatorio para el Gran Imam',
                'zh' => '大伊玛目职位的首个监管框架',
                'ru' => 'Первая нормативная база для Великого имама',
                'ur' => 'شیخ الازہر کے عہدے کا پہلا ضابطہ',
            ],
            'description' => [
                'ar' => 'صدر أول إطار تنظيمي يشترط حصول المرشح لمنصب شيخ الأزهر على شهادة العالمية، مما وضع أسس مؤسسية لاختيار شيخ الأزهر.',
                'en' => 'The first regulatory framework was established, mandating that Grand Imam candidates must possess the Alimiyya certificate, laying institutional foundations for selecting the Grand Imam.',
                'fr' => 'Le premier cadre reglementaire a ete etabli pour les candidats au poste de Grand Imam.',
                'es' => 'Se establecio el primer marco regulatorio para los candidatos al puesto de Gran Imam.',
                'zh' => '制定了首个监管框架，规定大伊玛目候选人必须持有学位证书。',
                'ru' => 'Установлена первая нормативная база для кандидатов на пост Великого имама.',
                'ur' => 'پہلا ضابطہ جاری ہوا جس میں شیخ الازہر کے امیدوار کے لیے شہادۃ العالمیۃ لازمی قرار دی گئی۔',
            ],
            'era_id' => $modern->id,
            'year' => 1872,
            'order' => 1,
        ]);

        TimelineEvent::create([
            'slug' => 'muhammad-abduh-reforms',
            'title' => [
                'ar' => 'إصلاحات الإمام محمد عبده',
                'en' => 'Imam Muhammad Abduh\'s Reforms',
                'fr' => 'Reformes de l\'imam Muhammad Abduh',
                'es' => 'Reformas del imam Muhammad Abduh',
                'zh' => '伊玛目穆罕默德·阿卜杜赫的改革',
                'ru' => 'Реформы имама Мухаммада Абдуха',
                'ur' => 'امام محمد عبدہ کی اصلاحات',
            ],
            'description' => [
                'ar' => 'قاد الإمام محمد عبده وجمال الدين الأفغاني حركة إصلاحية شاملة في الأزهر شملت إدخال العلوم الحديثة وتطوير المناهج وتنظيم الإجراءات التعليمية. دعا إلى الاجتهاد والتجديد في الفكر الإسلامي.',
                'en' => 'Imam Muhammad Abduh and Jamal al-Din al-Afghani led comprehensive reforms at Al-Azhar, introducing modern subjects, formalizing educational procedures, and advocating for ijtihad and renewal in Islamic thought.',
                'fr' => 'Muhammad Abduh et al-Afghani ont mene des reformes completes a Al-Azhar, introduisant des matieres modernes.',
                'es' => 'Muhammad Abduh y al-Afghani lideraron reformas integrales en Al-Azhar, introduciendo materias modernas.',
                'zh' => '穆罕默德·阿卜杜赫和阿富汗尼领导了全面改革，引入现代科目并倡导伊智提哈德。',
                'ru' => 'Мухаммад Абдух и аль-Афгани провели комплексные реформы, введя современные предметы.',
                'ur' => 'محمد عبدہ اور جمال الدین افغانی نے الازہر میں جامع اصلاحات کی قیادت کی، جدید مضامین متعارف کرائے۔',
            ],
            'era_id' => $modern->id,
            'year' => 1899,
            'order' => 2,
        ]);

        TimelineEvent::create([
            'slug' => 'law-10-restructuring',
            'title' => [
                'ar' => 'قانون رقم 10 لتنظيم الأزهر',
                'en' => 'Law No. 10 Restructures Al-Azhar',
                'fr' => 'Loi n°10 restructurant Al-Azhar',
                'es' => 'Ley n°10 reestructura Al-Azhar',
                'zh' => '第10号法令重组艾资哈尔',
                'ru' => 'Закон № 10 реструктурирует Аль-Азхар',
                'ur' => 'قانون نمبر 10 الازہر کی تنظیم نو',
            ],
            'description' => [
                'ar' => 'صدر القانون رقم 10 في عهد الشيخ سليم البشري الذي أعاد هيكلة النظام التعليمي في الأزهر وأسس هيئة كبار العلماء.',
                'en' => 'Under Sheikh Salim al-Bishri, Law No. 10 restructured Al-Azhar\'s educational system and established the Senior Scholars Council (Hay\'at Kibar al-Ulama).',
                'fr' => 'La loi n°10 a restructure le systeme educatif et etabli le Conseil des grands erudits.',
                'es' => 'La Ley n°10 reestructuro el sistema educativo y establecio el Consejo de Grandes Eruditos.',
                'zh' => '第10号法令重组了教育体系并设立了高级学者委员会。',
                'ru' => 'Закон № 10 реструктурировал систему образования и учредил Совет старших учёных.',
                'ur' => 'قانون نمبر 10 نے تعلیمی نظام کی تنظیم نو کی اور ہیئت کبار العلماء قائم کی۔',
            ],
            'era_id' => $modern->id,
            'year' => 1911,
            'order' => 3,
        ]);

        // Era 6: Contemporary Era (1952-present)
        $contemporary = TimelineEra::create([
            'slug' => 'the-contemporary-era',
            'name' => [
                'ar' => 'العصر المعاصر',
                'en' => 'The Contemporary Era',
                'fr' => 'L\'ere contemporaine',
                'es' => 'La era contemporanea',
                'zh' => '当代',
                'ru' => 'Современная эра',
                'ur' => 'معاصر دور',
            ],
            'description' => [
                'ar' => 'شهد العصر المعاصر تحول الأزهر إلى جامعة حديثة شاملة بموجب القانون 103 لسنة 1961م. أُنشئت كليات حديثة في الطب والهندسة والعلوم. قُبلت المرأة لأول مرة عام 1962م. تولى الإمام أحمد الطيب المشيخة عام 2010م وأطلق مبادرات عالمية للحوار والتسامح.',
                'en' => 'The contemporary era saw Al-Azhar\'s transformation into a comprehensive modern university under Law 103 of 1961. Modern faculties in medicine, engineering, and science were established. Women were first admitted in 1962. Grand Imam Ahmed el-Tayeb assumed office in 2010 and launched global initiatives for dialogue and tolerance.',
                'fr' => 'L\'ere contemporaine a vu la transformation d\'Al-Azhar en universite moderne par la loi 103 de 1961. Les femmes ont ete admises en 1962. Le Grand Imam Ahmed el-Tayeb a lance des initiatives mondiales de dialogue.',
                'es' => 'La era contemporanea vio la transformacion de Al-Azhar en una universidad moderna por la Ley 103 de 1961. Las mujeres fueron admitidas en 1962. El Gran Imam Ahmed el-Tayeb lanzo iniciativas globales de dialogo.',
                'zh' => '当代见证了1961年第103号法令将艾资哈尔改造为综合性现代大学。1962年首次招收女生。2010年大伊玛目艾哈迈德·泰耶布就任并发起全球对话倡议。',
                'ru' => 'Современная эра ознаменовалась превращением Аль-Азхара в комплексный современный университет по Закону 103. Женщины были приняты в 1962 году.',
                'ur' => 'معاصر دور میں 1961 کے قانون 103 کے تحت الازہر جدید جامع یونیورسٹی بن گیا۔ 1962 میں پہلی بار خواتین کو داخلہ ملا۔ 2010 میں امام احمد الطیب شیخ الازہر بنے۔',
            ],
            'start_year' => 1952,
            'end_year' => null,
            'order' => 6,
        ]);

        TimelineEvent::create([
            'slug' => 'law-103-modernization',
            'title' => [
                'ar' => 'القانون 103 لتطوير الأزهر',
                'en' => 'Law 103 Modernizes Al-Azhar University',
                'fr' => 'La loi 103 modernise l\'Universite d\'Al-Azhar',
                'es' => 'La Ley 103 moderniza la Universidad de Al-Azhar',
                'zh' => '第103号法令使艾资哈尔大学现代化',
                'ru' => 'Закон 103 модернизирует университет Аль-Азхар',
                'ur' => 'قانون 103 نے الازہر یونیورسٹی کو جدید بنایا',
            ],
            'description' => [
                'ar' => 'صدر القانون رقم 103 في عهد الرئيس جمال عبد الناصر الذي حوّل الأزهر إلى جامعة حديثة شاملة. أُنشئت كليات الطب والهندسة والعلوم والزراعة والتجارة إلى جانب الكليات الشرعية. أصبح شيخ الأزهر يُعيّن بمرسوم رئاسي برتبة وزير.',
                'en' => 'Law No. 103 under President Nasser transformed Al-Azhar into a comprehensive modern university. Secular faculties in medicine, engineering, science, agriculture, and commerce were established alongside Islamic faculties. The Grand Imam is now appointed by presidential decree with ministerial rank.',
                'fr' => 'La loi 103 a transforme Al-Azhar en universite moderne avec des facultes de medecine, ingenierie et sciences.',
                'es' => 'La Ley 103 transformo Al-Azhar en una universidad moderna con facultades de medicina, ingenieria y ciencias.',
                'zh' => '纳赛尔总统时期的第103号法令将艾资哈尔改造为综合性现代大学，建立了医学、工程和科学学院。',
                'ru' => 'Закон 103 превратил Аль-Азхар в современный университет с факультетами медицины, инженерии и наук.',
                'ur' => 'صدر ناصر کے دور میں قانون 103 نے الازہر کو جدید جامع یونیورسٹی میں بدل دیا۔ طب، انجینئرنگ اور سائنس کی فیکلٹیاں قائم ہوئیں۔',
            ],
            'era_id' => $contemporary->id,
            'year' => 1961,
            'order' => 1,
        ]);

        TimelineEvent::create([
            'slug' => 'women-first-admitted',
            'title' => [
                'ar' => 'قبول المرأة في جامعة الأزهر لأول مرة',
                'en' => 'Women First Admitted to Al-Azhar University',
                'fr' => 'Premiere admission des femmes a l\'Universite d\'Al-Azhar',
                'es' => 'Primera admision de mujeres en la Universidad de Al-Azhar',
                'zh' => '女性首次被艾资哈尔大学录取',
                'ru' => 'Женщины впервые приняты в университет Аль-Азхар',
                'ur' => 'الازہر یونیورسٹی میں پہلی بار خواتین کا داخلہ',
            ],
            'description' => [
                'ar' => 'قُبلت المرأة في جامعة الأزهر لأول مرة عام 1962م، وأنشئت فروع خاصة للبنات شملت كليات متعددة. أصبح الأزهر يضم أكثر من 30 كلية للبنات في مختلف المحافظات.',
                'en' => 'Women were first admitted to Al-Azhar University in 1962, with dedicated girls\' branch campuses established. Al-Azhar now includes over 30 girls\' faculties across various governorates.',
                'fr' => 'Les femmes ont ete admises pour la premiere fois en 1962, avec des campus dedies aux filles.',
                'es' => 'Las mujeres fueron admitidas por primera vez en 1962, con campus dedicados para chicas.',
                'zh' => '1962年女性首次被录取，设立了专门的女子分校。',
                'ru' => 'Женщины впервые были приняты в 1962 году с созданием специальных женских кампусов.',
                'ur' => '1962 میں پہلی بار خواتین کو الازہر یونیورسٹی میں داخلہ دیا گیا اور بنات کے الگ شعبے قائم ہوئے۔',
            ],
            'era_id' => $contemporary->id,
            'year' => 1962,
            'order' => 2,
        ]);

        TimelineEvent::create([
            'slug' => 'ahmed-el-tayeb-grand-imam',
            'title' => [
                'ar' => 'تعيين الإمام أحمد الطيب شيخاً للأزهر',
                'en' => 'Ahmed el-Tayeb Appointed Grand Imam',
                'fr' => 'Ahmed el-Tayeb nomme Grand Imam',
                'es' => 'Ahmed el-Tayeb nombrado Gran Imam',
                'zh' => '艾哈迈德·泰耶布被任命为大伊玛目',
                'ru' => 'Ахмед ат-Тайиб назначен Великим имамом',
                'ur' => 'احمد الطیب شیخ الازہر مقرر',
            ],
            'description' => [
                'ar' => 'عُيّن الإمام الأكبر أحمد محمد أحمد الطيب شيخاً للأزهر الشريف في 19 مارس 2010م. أطلق مبادرات دولية للحوار بين الأديان وأسس مجلس حكماء المسلمين عام 2014م.',
                'en' => 'Grand Imam Ahmed Mohamed Ahmed el-Tayeb was appointed as Sheikh of Al-Azhar on March 19, 2010. He launched international interfaith dialogue initiatives and established the Muslim Council of Elders in 2014.',
                'fr' => 'Ahmed el-Tayeb a ete nomme Grand Imam le 19 mars 2010 et a lance des initiatives de dialogue interreligieux.',
                'es' => 'Ahmed el-Tayeb fue nombrado Gran Imam el 19 de marzo de 2010 y lanzo iniciativas de dialogo interreligioso.',
                'zh' => '2010年3月19日，艾哈迈德·泰耶布被任命为大伊玛目。他发起了宗教间对话倡议并于2014年创立穆斯林长老委员会。',
                'ru' => 'Ахмед ат-Тайиб был назначен Великим имамом 19 марта 2010 года и запустил инициативы межрелигиозного диалога.',
                'ur' => '19 مارچ 2010 کو احمد الطیب شیخ الازہر مقرر ہوئے۔ انہوں نے بین المذاہب مکالمے کے بین الاقوامی اقدامات شروع کیے۔',
            ],
            'era_id' => $contemporary->id,
            'year' => 2010,
            'order' => 3,
        ]);

        TimelineEvent::create([
            'slug' => 'document-human-fraternity',
            'title' => [
                'ar' => 'توقيع وثيقة الأخوة الإنسانية',
                'en' => 'Signing of the Document on Human Fraternity',
                'fr' => 'Signature du Document sur la Fraternite Humaine',
                'es' => 'Firma del Documento sobre la Fraternidad Humana',
                'zh' => '签署《人类博爱文件》',
                'ru' => 'Подписание Документа о человеческом братстве',
                'ur' => 'انسانی اخوت کی دستاویز پر دستخط',
            ],
            'description' => [
                'ar' => 'وقّع الإمام الأكبر أحمد الطيب والبابا فرنسيس وثيقة الأخوة الإنسانية في أبوظبي، وهي وثيقة تاريخية تدعو إلى السلام والتعايش. أعلنت الأمم المتحدة 4 فبراير يوماً دولياً للأخوة الإنسانية عام 2020م.',
                'en' => 'Grand Imam el-Tayeb and Pope Francis signed the Document on Human Fraternity in Abu Dhabi, a historic declaration calling for peace and coexistence. The UN declared February 4 as International Day of Human Fraternity in 2020.',
                'fr' => 'Le Grand Imam et le pape Francois ont signe le Document sur la Fraternite Humaine a Abu Dhabi. L\'ONU a declare le 4 fevrier Journee internationale.',
                'es' => 'El Gran Imam y el papa Francisco firmaron el Documento sobre la Fraternidad Humana en Abu Dabi. La ONU declaro el 4 de febrero como Dia Internacional.',
                'zh' => '大伊玛目与教皇方济各在阿布扎比签署了《人类博爱文件》。联合国将2月4日定为国际人类博爱日。',
                'ru' => 'Великий имам и Папа Франциск подписали Документ о человеческом братстве в Абу-Даби. ООН объявила 4 февраля Международным днём.',
                'ur' => 'شیخ الازہر اور پوپ فرانسس نے ابوظبی میں انسانی اخوت کی دستاویز پر دستخط کیے۔ اقوام متحدہ نے 4 فروری کو بین الاقوامی دن قرار دیا۔',
            ],
            'era_id' => $contemporary->id,
            'year' => 2019,
            'order' => 4,
        ]);

        TimelineEvent::create([
            'slug' => 'manuscript-digitization-project',
            'title' => [
                'ar' => 'إطلاق مشروع رقمنة مخطوطات الأزهر',
                'en' => 'Launch of Al-Azhar Manuscript Digitization Project',
                'fr' => 'Lancement du projet de numerisation des manuscrits d\'Al-Azhar',
                'es' => 'Lanzamiento del proyecto de digitalizacion de manuscritos de Al-Azhar',
                'zh' => '启动艾资哈尔手稿数字化项目',
                'ru' => 'Запуск проекта оцифровки рукописей Аль-Азхара',
                'ur' => 'الازہر مخطوطات کی ڈیجیٹائزیشن منصوبے کا آغاز',
            ],
            'description' => [
                'ar' => 'أُطلق مشروع محمد بن راشد آل مكتوم لرقمنة مخطوطات الأزهر الشريف، بهدف حفظ وإتاحة آلاف المخطوطات النادرة رقمياً للباحثين حول العالم.',
                'en' => 'The Mohammed bin Rashid Al Maktoum project was launched to digitize Al-Azhar manuscripts, aiming to preserve and make available thousands of rare manuscripts digitally for researchers worldwide.',
                'fr' => 'Le projet Mohammed bin Rashid Al Maktoum a ete lance pour numeriser les manuscrits d\'Al-Azhar, afin de preserver et rendre accessibles des milliers de manuscrits rares.',
                'es' => 'Se lanzo el proyecto Mohammed bin Rashid Al Maktoum para digitalizar los manuscritos de Al-Azhar, con el objetivo de preservar y poner a disposicion miles de manuscritos raros.',
                'zh' => '穆罕默德·本·拉希德·阿勒·马克图姆项目启动，旨在将艾资哈尔手稿数字化，为全球研究人员保存和提供数千份珍贵手稿。',
                'ru' => 'Запущен проект Мохаммеда бин Рашида Аль Мактума по оцифровке рукописей Аль-Азхара для сохранения и обеспечения доступа к тысячам редких рукописей.',
                'ur' => 'محمد بن راشد آل مکتوم منصوبہ شروع کیا گیا تاکہ الازہر کے ہزاروں نادر مخطوطات کو ڈیجیٹل طور پر محفوظ اور دنیا بھر کے محققین کے لیے دستیاب کیا جا سکے۔',
            ],
            'era_id' => $contemporary->id,
            'year' => 2005,
            'order' => 5,
        ]);

        TimelineEvent::create([
            'slug' => 'muslim-council-of-elders',
            'title' => [
                'ar' => 'تأسيس مجلس حكماء المسلمين',
                'en' => 'Muslim Council of Elders Established',
                'fr' => 'Creation du Conseil des sages musulmans',
                'es' => 'Establecimiento del Consejo de Sabios Musulmanes',
                'zh' => '穆斯林长老委员会成立',
                'ru' => 'Учреждён Мусульманский совет старейшин',
                'ur' => 'مجلس حکماء المسلمین کا قیام',
            ],
            'description' => [
                'ar' => 'أُسس مجلس حكماء المسلمين برئاسة الإمام الأكبر أحمد الطيب في أبوظبي، وهو هيئة دولية مستقلة تهدف إلى تعزيز السلام والحوار بين المسلمين وبين أتباع الأديان.',
                'en' => 'The Muslim Council of Elders was established in Abu Dhabi, chaired by Grand Imam Ahmed el-Tayeb. It is an independent international body aimed at promoting peace and dialogue among Muslims and between followers of different faiths.',
                'fr' => 'Le Conseil des sages musulmans a ete cree a Abu Dhabi, preside par le Grand Imam Ahmed el-Tayeb, pour promouvoir la paix et le dialogue.',
                'es' => 'El Consejo de Sabios Musulmanes se establecio en Abu Dabi, presidido por el Gran Imam Ahmed el-Tayeb, para promover la paz y el dialogo.',
                'zh' => '穆斯林长老委员会在阿布扎比成立，由大伊玛目艾哈迈德·泰耶布担任主席，旨在促进穆斯林之间及不同信仰间的和平与对话。',
                'ru' => 'В Абу-Даби учреждён Мусульманский совет старейшин под председательством Великого имама Ахмеда ат-Тайиба для содействия миру и диалогу.',
                'ur' => 'ابوظبی میں شیخ الازہر احمد الطیب کی صدارت میں مجلس حکماء المسلمین قائم کیا گیا جو مسلمانوں اور بین المذاہب امن و مکالمے کو فروغ دیتا ہے۔',
            ],
            'era_id' => $contemporary->id,
            'year' => 2014,
            'order' => 6,
        ]);

        TimelineEvent::create([
            'slug' => 'international-day-human-fraternity',
            'title' => [
                'ar' => 'إعلان يوم الأخوة الإنسانية العالمي',
                'en' => 'UN Declares International Day of Human Fraternity',
                'fr' => 'L\'ONU declare la Journee internationale de la fraternite humaine',
                'es' => 'La ONU declara el Dia Internacional de la Fraternidad Humana',
                'zh' => '联合国宣布国际人类博爱日',
                'ru' => 'ООН объявляет Международный день человеческого братства',
                'ur' => 'اقوام متحدہ نے انسانی اخوت کا عالمی دن قرار دیا',
            ],
            'description' => [
                'ar' => 'أعلنت الجمعية العامة للأمم المتحدة يوم 4 فبراير يوماً دولياً للأخوة الإنسانية، تقديراً لوثيقة الأخوة الإنسانية التي وقعها الإمام الأكبر والبابا فرنسيس.',
                'en' => 'The United Nations General Assembly declared February 4 as International Day of Human Fraternity, in recognition of the Document on Human Fraternity signed by the Grand Imam and Pope Francis.',
                'fr' => 'L\'Assemblee generale des Nations Unies a declare le 4 fevrier Journee internationale de la fraternite humaine, en reconnaissance du Document signe par le Grand Imam et le pape Francois.',
                'es' => 'La Asamblea General de la ONU declaro el 4 de febrero como Dia Internacional de la Fraternidad Humana, en reconocimiento al Documento firmado por el Gran Imam y el papa Francisco.',
                'zh' => '联合国大会宣布2月4日为国际人类博爱日，以表彰大伊玛目与教皇方济各签署的《人类博爱文件》。',
                'ru' => 'Генеральная Ассамблея ООН объявила 4 февраля Международным днём человеческого братства в знак признания Документа, подписанного Великим имамом и Папой Франциском.',
                'ur' => 'اقوام متحدہ کی جنرل اسمبلی نے 4 فروری کو انسانی اخوت کا عالمی دن قرار دیا، شیخ الازہر اور پوپ فرانسس کی دستاویز کے اعتراف میں۔',
            ],
            'era_id' => $contemporary->id,
            'year' => 2020,
            'order' => 7,
        ]);

        TimelineEvent::create([
            'slug' => 'new-faculties-expansion-2025',
            'title' => [
                'ar' => 'إنشاء 10 كليات جديدة ليصل العدد إلى 92 كلية',
                'en' => '10 New Faculties Established, University Reaches 92 Faculties',
                'fr' => '10 nouvelles facultes creees, l\'universite atteint 92 facultes',
                'es' => '10 nuevas facultades establecidas, la universidad alcanza 92 facultades',
                'zh' => '新设10个学院，大学共达92个学院',
                'ru' => 'Создано 10 новых факультетов, университет насчитывает 92 факультета',
                'ur' => '10 نئی فیکلٹیاں قائم، یونیورسٹی میں کل 92 فیکلٹیاں',
            ],
            'description' => [
                'ar' => 'أنشأت جامعة الأزهر 10 كليات جديدة ليصل إجمالي عدد كلياتها إلى 92 كلية تغطي مختلف التخصصات الشرعية والعلمية والإنسانية، مما يؤكد استمرار توسع الجامعة وتطورها.',
                'en' => 'Al-Azhar University established 10 new faculties, bringing the total to 92 faculties covering diverse Islamic, scientific, and humanities disciplines, reflecting the university\'s continued expansion and development.',
                'fr' => 'L\'Universite d\'Al-Azhar a cree 10 nouvelles facultes, portant le total a 92 couvrant diverses disciplines islamiques, scientifiques et humaines.',
                'es' => 'La Universidad de Al-Azhar establecio 10 nuevas facultades, alcanzando un total de 92 que cubren diversas disciplinas islamicas, cientificas y humanisticas.',
                'zh' => '艾资哈尔大学新设10个学院，使学院总数达到92个，涵盖伊斯兰、科学和人文等多种学科。',
                'ru' => 'Университет Аль-Азхар создал 10 новых факультетов, доведя их общее число до 92, охватывающих исламские, научные и гуманитарные дисциплины.',
                'ur' => 'جامعہ الازہر نے 10 نئی فیکلٹیاں قائم کیں اور کل تعداد 92 ہو گئی جو مختلف شرعی، سائنسی اور انسانی علوم کا احاطہ کرتی ہیں۔',
            ],
            'era_id' => $contemporary->id,
            'year' => 2025,
            'order' => 8,
        ]);
    }
}
