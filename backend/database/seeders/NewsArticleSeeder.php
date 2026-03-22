<?php

namespace Database\Seeders;

use App\Models\NewsArticle;
use App\Models\NewsCategory;
use Illuminate\Database\Seeder;

class NewsArticleSeeder extends Seeder
{
    public function run(): void
    {
        $academic = NewsCategory::where('slug', 'academic')->first();
        $international = NewsCategory::where('slug', 'international')->first();
        $events = NewsCategory::where('slug', 'events')->first();
        $research = NewsCategory::where('slug', 'research')->first();

        $articles = [
            [
                'slug' => 'azhar-the-world-rankings-2025',
                'title' => [
                    'ar' => 'جامعة الأزهر تدخل تصنيفات THE العالمية 2025',
                    'en' => 'Al-Azhar University Enters THE World Rankings 2025',
                    'fr' => 'L\'Universite d\'Al-Azhar entre dans le classement mondial THE 2025',
                    'es' => 'La Universidad de Al-Azhar entra en las clasificaciones mundiales THE 2025',
                    'zh' => '艾资哈尔大学进入2025年THE世界大学排名',
                    'ru' => 'Университет Аль-Азхар входит в мировой рейтинг THE 2025',
                    'ur' => 'الازہر یونیورسٹی THE عالمی درجہ بندی 2025 میں شامل',
                ],
                'excerpt' => [
                    'ar' => 'حققت جامعة الأزهر تصنيفات متقدمة في تصنيفات تايمز للتعليم العالي 2025: الهندسة (501-600)، علوم الحياة (401-500)، العلوم الطبية (501-600).',
                    'en' => 'Al-Azhar University achieved notable rankings in THE World University Rankings 2025: Engineering (501-600), Life Sciences (401-500), Medical & Health Sciences (501-600).',
                    'fr' => 'Al-Azhar a obtenu des classements notables dans THE 2025: Ingenierie (501-600), Sciences de la vie (401-500).',
                    'es' => 'Al-Azhar logro clasificaciones notables en THE 2025: Ingenieria (501-600), Ciencias de la vida (401-500).',
                    'zh' => '艾资哈尔在THE 2025排名中取得显著成绩：工程(501-600)，生命科学(401-500)。',
                    'ru' => 'Аль-Азхар достиг заметных рейтингов в THE 2025: Инженерия (501-600), Науки о жизни (401-500).',
                    'ur' => 'الازہر نے THE 2025 میں قابل ذکر درجہ بندی حاصل کی: انجینئرنگ (501-600)، لائف سائنسز (401-500)۔',
                ],
                'content' => [
                    'ar' => 'حققت جامعة الأزهر إنجازاً أكاديمياً بارزاً بدخولها تصنيفات تايمز للتعليم العالي العالمية 2025 في عدة تخصصات. جاءت الجامعة في المرتبة 501-600 في الهندسة، و401-500 في علوم الحياة، و501-600 في العلوم الطبية والصحية، و601-800 في علوم الحاسب. كما أُدرجت ضمن أفضل 1000 جامعة عالمياً في تصنيف شنغهاي العالمي وتصنيف CWUR لعام 2024. يعكس هذا الإنجاز جهود الجامعة المتواصلة في تطوير البحث العلمي والارتقاء بالمستوى الأكاديمي.',
                    'en' => 'Al-Azhar University achieved a notable academic milestone by entering the Times Higher Education World Rankings 2025 in multiple disciplines. The university ranked 501-600 in Engineering, 401-500 in Life Sciences, 501-600 in Medical & Health Sciences, and 601-800 in Computer Science. It was also listed among the top 1,000 universities globally in the Shanghai Global Ranking and CWUR 2024 rankings. This reflects the university\'s continuous efforts in advancing scientific research and academic excellence.',
                    'fr' => 'L\'Universite d\'Al-Azhar a atteint une etape academique notable en entrant dans les classements mondiaux THE 2025 dans plusieurs disciplines.',
                    'es' => 'La Universidad de Al-Azhar alcanzo un hito academico notable al entrar en las clasificaciones mundiales THE 2025 en multiples disciplinas.',
                    'zh' => '艾资哈尔大学在THE 2025世界大学排名中取得了显著的学术里程碑。',
                    'ru' => 'Университет Аль-Азхар достиг заметного академического рубежа, войдя в мировой рейтинг THE 2025 по нескольким дисциплинам.',
                    'ur' => 'الازہر یونیورسٹی نے متعدد شعبوں میں THE عالمی درجہ بندی 2025 میں داخل ہو کر قابل ذکر اکیڈمک سنگ میل حاصل کیا۔',
                ],
                'category_id' => $academic?->id,
                'is_published' => true,
                'published_at' => '2025-01-15 10:00:00',
            ],
            [
                'slug' => 'muhammadiyah-cooperation-renewed',
                'title' => [
                    'ar' => 'تجديد اتفاقية التعاون مع المحمدية الإندونيسية',
                    'en' => 'Cooperation Agreement Renewed with Indonesian Muhammadiyah',
                    'fr' => 'Renouvellement de l\'accord de cooperation avec la Muhammadiyah indonesienne',
                    'es' => 'Renovacion del acuerdo de cooperacion con Muhammadiyah de Indonesia',
                    'zh' => '与印尼穆罕默迪亚续签合作协议',
                    'ru' => 'Обновление соглашения о сотрудничестве с индонезийской Мухаммадией',
                    'ur' => 'انڈونیشیائی محمدیہ کے ساتھ تعاون کے معاہدے کی تجدید',
                ],
                'excerpt' => [
                    'ar' => 'جددت جامعة الأزهر اتفاقية التعاون مع منظمة المحمدية، إحدى أكبر المنظمات الإسلامية في إندونيسيا.',
                    'en' => 'Al-Azhar University renewed its cooperation agreement with Muhammadiyah, one of Indonesia\'s largest Islamic organizations.',
                    'fr' => 'Al-Azhar a renouvele son accord avec la Muhammadiyah, l\'une des plus grandes organisations islamiques d\'Indonesie.',
                    'es' => 'Al-Azhar renovo su acuerdo con Muhammadiyah, una de las mayores organizaciones islamicas de Indonesia.',
                    'zh' => '艾资哈尔与印尼最大的伊斯兰组织之一穆罕默迪亚续签了合作协议。',
                    'ru' => 'Аль-Азхар обновил соглашение с Мухаммадией, одной из крупнейших исламских организаций Индонезии.',
                    'ur' => 'الازہر نے انڈونیشیا کی سب سے بڑی اسلامی تنظیموں میں سے ایک محمدیہ کے ساتھ معاہدے کی تجدید کی۔',
                ],
                'content' => [
                    'ar' => 'في إطار تعزيز العلاقات الأكاديمية الدولية، جددت جامعة الأزهر اتفاقية التعاون مع منظمة المحمدية الإندونيسية عام 2025م. تشمل الاتفاقية تبادل الطلاب والأساتذة والبرامج البحثية المشتركة وتطوير مناهج الدراسات الإسلامية. تُعد المحمدية من أكبر المنظمات الإسلامية في إندونيسيا ولها جامعات ومدارس في مختلف أنحاء البلاد.',
                    'en' => 'As part of strengthening international academic relations, Al-Azhar University renewed its cooperation agreement with Indonesia\'s Muhammadiyah organization in 2025. The agreement includes student and faculty exchange, joint research programs, and Islamic studies curriculum development. Muhammadiyah is one of Indonesia\'s largest Islamic organizations with universities and schools across the country.',
                    'fr' => 'L\'Universite d\'Al-Azhar a renouvele son accord de cooperation avec la Muhammadiyah indonesienne en 2025.',
                    'es' => 'La Universidad de Al-Azhar renovo su acuerdo de cooperacion con la Muhammadiyah indonesiana en 2025.',
                    'zh' => '作为加强国际学术关系的一部分，艾资哈尔大学于2025年与印尼穆罕默迪亚组织续签了合作协议。',
                    'ru' => 'В рамках укрепления международных академических связей Аль-Азхар обновил соглашение с Мухаммадией в 2025 году.',
                    'ur' => 'بین الاقوامی اکیڈمک تعلقات کو مضبوط بنانے کے تحت الازہر نے 2025 میں محمدیہ کے ساتھ معاہدے کی تجدید کی۔',
                ],
                'category_id' => $international?->id,
                'is_published' => true,
                'published_at' => '2025-02-20 09:00:00',
            ],
            [
                'slug' => 'english-resource-centre-upper-egypt',
                'title' => [
                    'ar' => 'افتتاح مركز موارد اللغة الإنجليزية لصعيد مصر',
                    'en' => 'English Language Resource Centre Inaugurated for Upper Egypt',
                    'fr' => 'Inauguration du Centre de Ressources en Anglais pour la Haute-Egypte',
                    'es' => 'Inauguracion del Centro de Recursos de Ingles para el Alto Egipto',
                    'zh' => '上埃及英语语言资源中心揭幕',
                    'ru' => 'Открыт Центр ресурсов английского языка для Верхнего Египта',
                    'ur' => 'بالائی مصر کے لیے انگریزی زبان ریسورس سینٹر کا افتتاح',
                ],
                'excerpt' => [
                    'ar' => 'افتتحت السفارة الأمريكية وجامعة الأزهر والجامعة الأمريكية بالقاهرة مركز موارد اللغة الإنجليزية لخدمة طلاب صعيد مصر.',
                    'en' => 'The U.S. Embassy, Al-Azhar University, and the American University in Cairo inaugurated an English Language Resource Centre Hub for Upper Egypt students.',
                    'fr' => 'L\'ambassade des Etats-Unis, Al-Azhar et l\'AUC ont inaugure un centre de ressources en anglais pour les etudiants de Haute-Egypte.',
                    'es' => 'La Embajada de EE.UU., Al-Azhar y la AUC inauguraron un centro de recursos de ingles para estudiantes del Alto Egipto.',
                    'zh' => '美国大使馆、艾资哈尔大学和开罗美国大学联合为上埃及学生开设了英语语言资源中心。',
                    'ru' => 'Посольство США, Аль-Азхар и АУК открыли Центр ресурсов английского языка для студентов Верхнего Египта.',
                    'ur' => 'امریکی سفارتخانے، الازہر اور AUC نے بالائی مصر کے طلباء کے لیے انگریزی زبان ریسورس سینٹر کا افتتاح کیا۔',
                ],
                'content' => [
                    'ar' => 'في مبادرة مشتركة، افتتحت السفارة الأمريكية بالقاهرة وجامعة الأزهر والجامعة الأمريكية بالقاهرة مركز موارد اللغة الإنجليزية لخدمة طلاب صعيد مصر عام 2025م. يهدف المركز إلى تعزيز قدرات الطلاب في اللغة الإنجليزية وتوفير موارد تعليمية حديثة وبرامج تدريبية متخصصة. يأتي هذا في إطار التعاون الدولي لتطوير التعليم في المناطق النائية.',
                    'en' => 'In a joint initiative, the U.S. Embassy in Cairo, Al-Azhar University, and the American University in Cairo inaugurated an English Language Resource Centre Hub for Upper Egypt in 2025. The centre aims to enhance students\' English language capabilities and provide modern educational resources and specialized training programs as part of international cooperation to develop education in remote areas.',
                    'fr' => 'Dans une initiative conjointe, le centre a ete inaugure pour ameliorer les capacites en anglais des etudiants de Haute-Egypte.',
                    'es' => 'En una iniciativa conjunta, se inauguro el centro para mejorar las capacidades en ingles de los estudiantes del Alto Egipto.',
                    'zh' => '作为联合倡议，该中心旨在增强上埃及学生的英语能力并提供现代教育资源。',
                    'ru' => 'В рамках совместной инициативы центр был открыт для повышения уровня английского языка студентов Верхнего Египта.',
                    'ur' => 'مشترکہ اقدام کے تحت بالائی مصر کے طلباء کی انگریزی صلاحیتوں کو بڑھانے کے لیے مرکز کا افتتاح کیا گیا۔',
                ],
                'category_id' => $international?->id,
                'is_published' => true,
                'published_at' => '2025-03-05 11:00:00',
            ],
            [
                'slug' => 'humanitarian-convoys-gaza',
                'title' => [
                    'ar' => 'الأزهر يرسل قوافل إنسانية لدعم أهل غزة',
                    'en' => 'Al-Azhar Sends Humanitarian Convoys to Support Gaza',
                    'fr' => 'Al-Azhar envoie des convois humanitaires pour soutenir Gaza',
                    'es' => 'Al-Azhar envia convoys humanitarios para apoyar a Gaza',
                    'zh' => '艾资哈尔向加沙派出人道主义车队',
                    'ru' => 'Аль-Азхар направляет гуманитарные конвои в поддержку Газы',
                    'ur' => 'الازہر نے غزہ کی حمایت میں انسانی امدادی قافلے بھیجے',
                ],
                'excerpt' => [
                    'ar' => 'أطلقت جامعة الأزهر قوافل إنسانية لدعم الشعب الفلسطيني في غزة، تتضمن مساعدات طبية وغذائية.',
                    'en' => 'Al-Azhar University launched humanitarian relief convoys to support the Palestinian people in Gaza, including medical and food aid.',
                    'fr' => 'L\'Universite d\'Al-Azhar a envoye des convois humanitaires pour soutenir le peuple palestinien a Gaza.',
                    'es' => 'La Universidad de Al-Azhar envio convoys humanitarios para apoyar al pueblo palestino en Gaza.',
                    'zh' => '艾资哈尔大学向加沙巴勒斯坦人民派出了人道主义救援车队。',
                    'ru' => 'Аль-Азхар направил гуманитарные конвои в поддержку палестинского народа в Газе.',
                    'ur' => 'الازہر نے غزہ میں فلسطینی عوام کی حمایت میں انسانی امدادی قافلے بھیجے۔',
                ],
                'content' => [
                    'ar' => 'أطلقت جامعة الأزهر قوافل إنسانية لدعم أهل غزة بفلسطين، شملت مستلزمات طبية وأدوية ومواد غذائية. أعلن الإمام الأكبر أحمد الطيب عن دعمه الكامل للشعب الفلسطيني ودعا المجتمع الدولي إلى وقف المعاناة الإنسانية. شارك طلاب وأساتذة الجامعة من مختلف الكليات في حملات التبرع والدعم.',
                    'en' => 'Al-Azhar University launched humanitarian convoys to support the people of Gaza, Palestine, including medical supplies, medicines, and food. Grand Imam Ahmed el-Tayeb declared full support for the Palestinian people and called on the international community to end the humanitarian suffering. Students and faculty from various colleges participated in donation and support campaigns.',
                    'fr' => 'L\'Universite d\'Al-Azhar a lance des convois humanitaires incluant fournitures medicales et nourriture pour Gaza.',
                    'es' => 'La Universidad de Al-Azhar lanzo convoys humanitarios incluyendo suministros medicos y alimentos para Gaza.',
                    'zh' => '艾资哈尔大学向加沙发送了包括医疗用品和食品在内的人道主义车队。',
                    'ru' => 'Аль-Азхар направил гуманитарные конвои с медикаментами и продовольствием для Газы.',
                    'ur' => 'الازہر نے غزہ کے لیے طبی سامان اور خوراک سمیت انسانی امدادی قافلے بھیجے۔',
                ],
                'category_id' => $events?->id,
                'is_published' => true,
                'published_at' => '2024-11-10 08:00:00',
            ],
            [
                'slug' => 'azhar-gaza-thesis-defense',
                'title' => [
                    'ar' => 'جامعة الأزهر بغزة تعقد أول مناقشة ماجستير',
                    'en' => 'Al-Azhar University-Gaza Holds First Master\'s Thesis Defense',
                    'fr' => 'L\'Universite Al-Azhar de Gaza tient sa premiere soutenance de master',
                    'es' => 'La Universidad Al-Azhar de Gaza celebra su primera defensa de tesis de maestria',
                    'zh' => '加沙艾资哈尔大学举行首次硕士论文答辩',
                    'ru' => 'Университет Аль-Азхар в Газе проводит первую защиту магистерской диссертации',
                    'ur' => 'الازہر یونیورسٹی غزہ نے پہلے ماسٹرز مقالے کا دفاع منعقد کیا',
                ],
                'excerpt' => [
                    'ar' => 'في إنجاز أكاديمي رغم الظروف الصعبة، عقدت جامعة الأزهر بغزة أول مناقشة رسالة ماجستير منذ بداية الحرب.',
                    'en' => 'In a remarkable academic achievement despite difficult circumstances, Al-Azhar University-Gaza held its first master\'s thesis defense since the onset of the regional war.',
                    'fr' => 'L\'universite a tenu sa premiere soutenance de master malgre les circonstances difficiles.',
                    'es' => 'La universidad celebro su primera defensa de tesis de maestria a pesar de las circunstancias dificiles.',
                    'zh' => '尽管困难重重，加沙艾资哈尔大学还是举行了战争以来首次硕士论文答辩。',
                    'ru' => 'Несмотря на трудные обстоятельства, университет провёл первую защиту магистерской диссертации с начала войны.',
                    'ur' => 'مشکل حالات کے باوجود جنگ شروع ہونے کے بعد پہلی بار ماسٹرز مقالے کا دفاع منعقد ہوا۔',
                ],
                'content' => [
                    'ar' => 'حققت جامعة الأزهر بغزة إنجازاً أكاديمياً استثنائياً بعقدها أول مناقشة رسالة ماجستير منذ اندلاع الحرب الإقليمية عام 2025م. يمثل هذا الحدث استمرارية أكاديمية ملهمة رغم الظروف القاسية، ويؤكد إصرار الطلاب والأساتذة على مواصلة مسيرتهم العلمية. أشاد المجتمع الأكاديمي الدولي بهذا الإنجاز.',
                    'en' => 'Al-Azhar University-Gaza achieved an exceptional academic milestone by holding its first master\'s thesis defense since the onset of the regional war in 2025, marking inspiring academic continuity despite harsh conditions and demonstrating students\' and faculty\'s determination to continue their scholarly journey. The international academic community praised this achievement.',
                    'fr' => 'L\'Universite d\'Al-Azhar de Gaza a realise un jalon academique exceptionnel malgre les conditions difficiles.',
                    'es' => 'La Universidad de Al-Azhar de Gaza logro un hito academico excepcional a pesar de las condiciones dificiles.',
                    'zh' => '加沙艾资哈尔大学在艰难条件下取得了杰出的学术里程碑。',
                    'ru' => 'Аль-Азхар в Газе достиг исключительного академического рубежа, несмотря на тяжёлые условия.',
                    'ur' => 'الازہر یونیورسٹی غزہ نے مشکل حالات کے باوجود غیر معمولی اکیڈمک سنگ میل حاصل کیا۔',
                ],
                'category_id' => $academic?->id,
                'is_published' => true,
                'published_at' => '2025-02-01 14:00:00',
            ],
            [
                'slug' => 'al-azhar-scholarship-program-2025',
                'title' => [
                    'ar' => 'برنامج المنح الدراسية للطلاب الدوليين 2024/2025',
                    'en' => 'Al-Azhar Scholarship Program for International Students 2024/2025',
                    'fr' => 'Programme de bourses Al-Azhar pour etudiants internationaux 2024/2025',
                    'es' => 'Programa de becas de Al-Azhar para estudiantes internacionales 2024/2025',
                    'zh' => '艾资哈尔2024/2025国际学生奖学金计划',
                    'ru' => 'Программа стипендий Аль-Азхара для иностранных студентов 2024/2025',
                    'ur' => 'الازہر بین الاقوامی طلباء کے لیے وظائف کا پروگرام 2024/2025',
                ],
                'excerpt' => [
                    'ar' => 'أعلنت جامعة الأزهر عن برنامج المنح الدراسية للطلاب الدوليين للعام الأكاديمي 2024/2025 بالتعاون مع حكومات عدة دول.',
                    'en' => 'Al-Azhar University announced its scholarship program for international students for the 2024/2025 academic year in partnership with several governments.',
                    'fr' => 'Al-Azhar a annonce son programme de bourses pour les etudiants internationaux en partenariat avec plusieurs gouvernements.',
                    'es' => 'Al-Azhar anuncio su programa de becas para estudiantes internacionales en asociacion con varios gobiernos.',
                    'zh' => '艾资哈尔大学宣布2024/2025学年国际学生奖学金计划。',
                    'ru' => 'Аль-Азхар объявил программу стипендий для иностранных студентов на 2024/2025 учебный год.',
                    'ur' => 'الازہر نے 2024/2025 کے لیے بین الاقوامی طلباء کے وظائف کے پروگرام کا اعلان کیا۔',
                ],
                'content' => [
                    'ar' => 'أعلنت جامعة الأزهر عن فتح باب التقديم لبرنامج المنح الدراسية للطلاب الدوليين للعام الأكاديمي 2024/2025. يستقبل الأزهر طلاباً من أكثر من 110 دولة حول العالم ويقدم لهم منحاً دراسية تشمل الرسوم الدراسية والسكن والإعاشة. تم التعاون مع حكومات عدة دول منها المالديف لتوفير المنح الحكومية. يخدم مركز تطوير تعليم الطلاب الوافدين أكثر من 40,000 طالب دولي.',
                    'en' => 'Al-Azhar University opened applications for its international student scholarship program for 2024/2025. Al-Azhar welcomes students from over 110 countries and provides scholarships covering tuition, housing, and living expenses. Government partnerships include countries like the Maldives. The Center for Development of International Students\' Education serves over 40,000 international students.',
                    'fr' => 'Al-Azhar accueille des etudiants de plus de 110 pays et offre des bourses couvrant frais de scolarite et hebergement.',
                    'es' => 'Al-Azhar acoge estudiantes de mas de 110 paises y ofrece becas que cubren matricula y alojamiento.',
                    'zh' => '艾资哈尔接纳来自110多个国家的学生，提供涵盖学费和住宿的奖学金。',
                    'ru' => 'Аль-Азхар принимает студентов из более чем 110 стран и предоставляет стипендии.',
                    'ur' => 'الازہر 110 سے زائد ممالک کے طلباء کا خیرمقدم کرتا ہے اور فیس اور رہائش کی اسکالرشپ فراہم کرتا ہے۔',
                ],
                'category_id' => $academic?->id,
                'is_published' => true,
                'published_at' => '2024-09-01 10:00:00',
            ],
            [
                'slug' => 'extremism-observatory-12-languages',
                'title' => [
                    'ar' => 'مرصد الأزهر يواصل مكافحة التطرف بـ12 لغة',
                    'en' => 'Al-Azhar Observatory Continues Combating Extremism in 12 Languages',
                    'fr' => 'L\'Observatoire d\'Al-Azhar poursuit la lutte contre l\'extremisme en 12 langues',
                    'es' => 'El Observatorio de Al-Azhar continua combatiendo el extremismo en 12 idiomas',
                    'zh' => '艾资哈尔观察站继续以12种语言打击极端主义',
                    'ru' => 'Обсерватория Аль-Азхара продолжает борьбу с экстремизмом на 12 языках',
                    'ur' => 'الازہر رصد گاہ 12 زبانوں میں انتہا پسندی کے خلاف جنگ جاری رکھے ہوئے ہے',
                ],
                'excerpt' => [
                    'ar' => 'يواصل مرصد الأزهر لمكافحة التطرف عمله بـ12 لغة لرصد الخطاب المتطرف والرد عليه بالحجة والدليل.',
                    'en' => 'The Al-Azhar Observatory for Combating Extremism continues its operations in 12 languages, monitoring and countering extremist discourse with evidence-based responses.',
                    'fr' => 'L\'Observatoire poursuit ses operations en 12 langues pour surveiller et contrer le discours extremiste.',
                    'es' => 'El Observatorio continua sus operaciones en 12 idiomas para monitorear y contrarrestar el discurso extremista.',
                    'zh' => '观察站继续以12种语言运作，监控和反击极端主义言论。',
                    'ru' => 'Обсерватория продолжает работу на 12 языках для мониторинга и противодействия экстремизму.',
                    'ur' => 'رصد گاہ 12 زبانوں میں انتہا پسندی کی نگرانی اور مقابلے کا کام جاری رکھے ہوئے ہے۔',
                ],
                'content' => [
                    'ar' => 'يواصل مرصد الأزهر لمكافحة التطرف عمله الدؤوب في رصد الخطاب المتطرف والرد عليه بـ12 لغة عالمية. أُنشئ المرصد بتوجيهات الإمام الأكبر أحمد الطيب ليكون أداة فاعلة في مواجهة الأفكار المتطرفة بالحجة والمنطق والدليل الشرعي. يصدر المرصد تقارير دورية وبيانات توضيحية ويتابع المحتوى على وسائل التواصل الاجتماعي.',
                    'en' => 'The Al-Azhar Observatory for Combating Extremism continues its work monitoring and countering extremist discourse in 12 world languages. Established under the directives of Grand Imam Ahmed el-Tayeb, it serves as an effective tool in confronting extremist ideas with rational argument and scriptural evidence. The observatory issues periodic reports and monitors social media content.',
                    'fr' => 'L\'Observatoire poursuit son travail en 12 langues mondiales pour combattre l\'extremisme avec des arguments rationnels.',
                    'es' => 'El Observatorio continua su trabajo en 12 idiomas mundiales para combatir el extremismo con argumentos racionales.',
                    'zh' => '观察站继续以12种世界语言监控和反击极端主义言论。',
                    'ru' => 'Обсерватория продолжает работу на 12 мировых языках для борьбы с экстремизмом.',
                    'ur' => 'رصد گاہ 12 عالمی زبانوں میں انتہا پسندی کی نگرانی اور عقلی دلائل سے مقابلے کا کام جاری رکھے ہوئے ہے۔',
                ],
                'category_id' => $research?->id,
                'is_published' => true,
                'published_at' => '2024-12-15 09:30:00',
            ],
            [
                'slug' => 'orthopedic-surgery-election',
                'title' => [
                    'ar' => 'انتخاب أساتذة الأزهر في مناصب دولية بجراحة العظام',
                    'en' => 'Al-Azhar Professors Elected to International Orthopedic Surgery Positions',
                    'fr' => 'Professeurs d\'Al-Azhar elus a des postes internationaux en chirurgie orthopedique',
                    'es' => 'Profesores de Al-Azhar elegidos para puestos internacionales en cirugia ortopedica',
                    'zh' => '艾资哈尔教授当选国际骨科手术职位',
                    'ru' => 'Профессора Аль-Азхара избраны на международные должности по ортопедической хирургии',
                    'ur' => 'الازہر کے پروفیسرز بین الاقوامی آرتھوپیڈک سرجری عہدوں پر منتخب',
                ],
                'excerpt' => [
                    'ar' => 'انتُخب الدكتور عبد الحكيم عبد الله رئيساً للجمعية المصرية لجراحة العظام والدكتور ياسر البطراوي رئيساً لمجموعة إدارة الكوارث.',
                    'en' => 'Dr. Abdel Hakim Abdullah was elected President of the Egyptian Society of Orthopedic Surgery, and Dr. Yasser El-Batrawy was elected Chair of the Disaster Management Group at the International Society of Orthopedic Surgery.',
                    'fr' => 'Le Dr Abdel Hakim Abdullah a ete elu president de la Societe egyptienne de chirurgie orthopedique.',
                    'es' => 'El Dr. Abdel Hakim Abdullah fue elegido presidente de la Sociedad Egipcia de Cirugia Ortopedica.',
                    'zh' => '阿卜杜勒·哈基姆博士当选埃及骨科外科学会主席。',
                    'ru' => 'Д-р Абдель Хаким Абдулла избран президентом Египетского общества ортопедической хирургии.',
                    'ur' => 'ڈاکٹر عبدالحکیم عبداللہ مصری آرتھوپیڈک سرجری سوسائٹی کے صدر منتخب ہوئے۔',
                ],
                'content' => [
                    'ar' => 'في إنجاز يعكس تميز خريجي جامعة الأزهر، انتُخب الدكتور عبد الحكيم عبد الله رئيساً للجمعية المصرية لجراحة العظام، كما انتُخب الدكتور ياسر البطراوي رئيساً لمجموعة إدارة الكوارث بالجمعية الدولية لجراحة العظام والكسور. يؤكد هذا الإنجاز مكانة جامعة الأزهر في المجالات الطبية الدولية.',
                    'en' => 'Reflecting Al-Azhar graduates\' distinction, Dr. Abdel Hakim Abdullah was elected President of the Egyptian Society of Orthopedic Surgery, while Dr. Yasser El-Batrawy was elected Chair of the Disaster Management Group at the International Society of Orthopedic Surgery and Traumatology. This achievement confirms Al-Azhar University\'s standing in international medical fields.',
                    'fr' => 'Cet accomplissement confirme la position d\'Al-Azhar dans les domaines medicaux internationaux.',
                    'es' => 'Este logro confirma la posicion de Al-Azhar en los campos medicos internacionales.',
                    'zh' => '这一成就证实了艾资哈尔大学在国际医学领域的地位。',
                    'ru' => 'Это достижение подтверждает позицию Аль-Азхара в международных медицинских областях.',
                    'ur' => 'یہ کامیابی بین الاقوامی طبی شعبوں میں الازہر کے مقام کی تصدیق کرتی ہے۔',
                ],
                'category_id' => $academic?->id,
                'is_published' => true,
                'published_at' => '2025-01-20 12:00:00',
            ],
        ];

        foreach ($articles as $data) {
            NewsArticle::create($data);
        }
    }
}
