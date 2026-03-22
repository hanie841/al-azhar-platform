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
            'title' => [
                'ar' => 'عن الجامعة',
                'en' => 'About the University',
                'fr' => 'A propos de l\'universite',
                'es' => 'Sobre la universidad',
                'zh' => '关于大学',
                'ru' => 'О университете',
                'ur' => 'جامعہ کے بارے میں',
            ],
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
<p>Al-Azhar University is the oldest continuously operating university in the world, founded in 970 CE (359 AH) by Commander Jawhar al-Siqilli under orders of Fatimid Caliph Al-Mu\'izz li-Din Allah. Located in the heart of historic Cairo, Al-Azhar has transformed over more than a thousand years from a congregational mosque into the most prestigious Islamic educational institution in the world.</p>

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
                'fr' => '<h2>Universite Al-Azhar - Phare du savoir et de la moderation</h2>
<p>L\'Universite Al-Azhar est la plus ancienne universite en activite continue dans le monde, fondee en 970 par le commandant Jawhar al-Siqilli sur ordre du calife fatimide Al-Mu\'izz li-Din Allah. Situee au coeur du Caire historique, Al-Azhar s\'est transformee en plus de mille ans d\'une mosquee en la plus prestigieuse institution educative islamique au monde.</p>

<h3>Notre mission</h3>
<p>L\'Universite Al-Azhar s\'engage a diffuser le savoir islamique authentique et les valeurs de moderation, tout en suivant les avancees scientifiques et technologiques contemporaines.</p>

<h3>Notre vision</h3>
<p>Etre l\'universite leader mondial presentant un modele integre combinant authenticite et modernite, et etre la reference premiere en sciences islamiques tout en excellant dans les sciences modernes et appliquees.</p>

<h3>Al-Azhar en chiffres</h3>
<ul>
<li>Plus de 1 050 ans de service continu</li>
<li>Plus de 80 facultes dans diverses disciplines</li>
<li>Plus de 500 000 etudiants</li>
<li>Etudiants internationaux de plus de 100 pays</li>
<li>Branches dans plus de 20 gouvernorats egyptiens</li>
</ul>',
                'es' => '<h2>Universidad Al-Azhar - Faro del conocimiento y la moderacion</h2>
<p>La Universidad Al-Azhar es la universidad en funcionamiento continuo mas antigua del mundo, fundada en 970 por el comandante Jawhar al-Siqilli por orden del califa fatimi Al-Mu\'izz li-Din Allah. Ubicada en el corazon del Cairo historico, Al-Azhar se ha transformado en mas de mil anos de una mezquita en la institucion educativa islamica mas prestigiosa del mundo.</p>

<h3>Nuestra mision</h3>
<p>La Universidad Al-Azhar esta comprometida con la difusion del conocimiento islamico autentico y los valores de moderacion, manteniendose al dia con los avances cientificos y tecnologicos contemporaneos.</p>

<h3>Nuestra vision</h3>
<p>Ser la universidad lider a nivel mundial presentando un modelo integrado que combine autenticidad y modernidad, y ser la referencia principal en ciencias islamicas mientras se sobresale en ciencias modernas y aplicadas.</p>

<h3>Al-Azhar en numeros</h3>
<ul>
<li>Mas de 1.050 anos de servicio continuo</li>
<li>Mas de 80 facultades en diversas disciplinas</li>
<li>Mas de 500.000 estudiantes</li>
<li>Estudiantes internacionales de mas de 100 paises</li>
<li>Sedes en mas de 20 gobernaciones egipcias</li>
</ul>',
                'zh' => '<h2>艾资哈尔大学——知识与中正的灯塔</h2>
<p>艾资哈尔大学是世界上持续运营最久的大学，于公元970年（伊斯兰历359年）由法蒂玛王朝将领焦哈尔·西基利奉哈里发穆伊兹之命创建。坐落在历史悠久的开罗中心，艾资哈尔在一千多年间从一座聚礼清真寺发展成为世界上最负盛名的伊斯兰教育机构。</p>

<h3>我们的使命</h3>
<p>艾资哈尔大学致力于传播正统的伊斯兰知识和中正价值观，同时紧跟当代科学技术的发展步伐。大学致力于培养兼具伊斯兰科学和现代科学的杰出人才，能够服务社会和人类。</p>

<h3>我们的愿景</h3>
<p>成为全球领先的大学，呈现融合传统与现代的综合模式，成为伊斯兰科学的首要参考，同时在现代和应用科学中追求卓越。</p>

<h3>艾资哈尔数字一览</h3>
<ul>
<li>超过1050年的持续服务</li>
<li>80多个不同学科的学院</li>
<li>超过50万名学生</li>
<li>来自100多个国家的国际学生</li>
<li>分布在20多个埃及省份的分校</li>
</ul>',
                'ru' => '<h2>Университет Аль-Азхар — маяк знаний и умеренности</h2>
<p>Университет Аль-Азхар — старейший непрерывно действующий университет в мире, основанный в 970 году командующим Джаухаром ас-Сикилли по приказу фатимидского халифа Аль-Муизза ли-Дин Аллаха. Расположенный в сердце исторического Каира, Аль-Азхар за более чем тысячу лет превратился из соборной мечети в самое престижное исламское образовательное учреждение в мире.</p>

<h3>Наша миссия</h3>
<p>Университет Аль-Азхар стремится распространять подлинные исламские знания и ценности умеренности, идя в ногу с современными научными и технологическими достижениями.</p>

<h3>Наше видение</h3>
<p>Быть ведущим мировым университетом, представляющим интегрированную модель, сочетающую подлинность и современность, и быть главным ориентиром в исламских науках, превосходя в современных и прикладных науках.</p>

<h3>Аль-Азхар в цифрах</h3>
<ul>
<li>Более 1050 лет непрерывного служения</li>
<li>Более 80 факультетов различных направлений</li>
<li>Более 500 000 студентов</li>
<li>Иностранные студенты из более чем 100 стран</li>
<li>Филиалы в более чем 20 египетских провинциях</li>
</ul>',
                'ur' => '<h2>جامعۃ الازہر — علم اور اعتدال کا مینار</h2>
<p>جامعۃ الازہر دنیا کی سب سے قدیم مسلسل کام کرنے والی جامعہ ہے، جسے 970ء (359ھ) میں فاطمی خلیفہ المعز لدین اللہ کے حکم سے سپہ سالار جوہر صقلی نے قائم کیا۔ تاریخی قاہرہ کے قلب میں واقع، الازہر ایک ہزار سال سے زیادہ عرصے میں ایک جامع مسجد سے دنیا کے سب سے معزز اسلامی تعلیمی ادارے میں تبدیل ہو گیا۔</p>

<h3>ہمارا مشن</h3>
<p>جامعۃ الازہر صحیح اسلامی علم اور اعتدال و وسطیت کی اقدار کی اشاعت کے لیے پرعزم ہے، جبکہ عصری سائنسی و تکنیکی ترقی کے ساتھ ہم قدم رہتی ہے۔</p>

<h3>ہمارا وژن</h3>
<p>عالمی سطح پر پیش رو جامعہ بنانا جو اصالت اور عصریت کو ملا کر ایک مکمل نمونہ پیش کرے، اور اسلامی علوم میں اولین مرجع ہونے کے ساتھ جدید اور اطلاقی علوم میں ممتاز مقام حاصل کرے۔</p>

<h3>الازہر اعداد و شمار میں</h3>
<ul>
<li>1050 سال سے زیادہ مسلسل خدمت</li>
<li>مختلف تخصصات میں 80 سے زیادہ کلیات</li>
<li>5 لاکھ سے زیادہ طلبہ</li>
<li>100 سے زیادہ ممالک سے بین الاقوامی طلبہ</li>
<li>20 سے زیادہ مصری صوبوں میں شاخیں</li>
</ul>',
            ],
            'meta_title' => [
                'ar' => 'عن جامعة الأزهر',
                'en' => 'About Al-Azhar University',
                'fr' => 'A propos de l\'Universite Al-Azhar',
                'es' => 'Sobre la Universidad Al-Azhar',
                'zh' => '关于艾资哈尔大学',
                'ru' => 'О Университете Аль-Азхар',
                'ur' => 'جامعۃ الازہر کے بارے میں',
            ],
            'meta_description' => [
                'ar' => 'تعرف على جامعة الأزهر، أقدم جامعة في العالم، تاريخها العريق ورسالتها في نشر العلم والوسطية.',
                'en' => 'Learn about Al-Azhar University, the oldest university in the world, its rich history and mission of spreading knowledge and moderation.',
                'fr' => 'Decouvrez l\'Universite Al-Azhar, la plus ancienne universite du monde, son histoire riche et sa mission de diffusion du savoir et de la moderation.',
                'es' => 'Conozca la Universidad Al-Azhar, la universidad mas antigua del mundo, su rica historia y su mision de difundir el conocimiento y la moderacion.',
                'zh' => '了解世界上最古老的大学——艾资哈尔大学，其丰富的历史和传播知识与中正的使命。',
                'ru' => 'Узнайте о Университете Аль-Азхар, старейшем университете мира, его богатой истории и миссии распространения знаний и умеренности.',
                'ur' => 'دنیا کی سب سے قدیم جامعہ، جامعۃ الازہر کے بارے میں جانیں، اس کی عظیم تاریخ اور علم و اعتدال کی اشاعت کا مشن۔',
            ],
            'order' => 1,
            'is_published' => true,
        ]);

        // History Page
        Page::create([
            'slug' => 'history',
            'title' => [
                'ar' => 'تاريخ الأزهر',
                'en' => 'History of Al-Azhar',
                'fr' => 'Histoire d\'Al-Azhar',
                'es' => 'Historia de Al-Azhar',
                'zh' => '艾资哈尔的历史',
                'ru' => 'История Аль-Азхара',
                'ur' => 'الازہر کی تاریخ',
            ],
            'content' => [
                'ar' => '<h2>تاريخ الأزهر عبر العصور</h2>

<h3>العصر الفاطمي (970-1171م)</h3>
<p>بدأ بناء الجامع الأزهر عام 970م بأمر الخليفة المعز لدين الله الفاطمي، وافتُتح للصلاة في 7 رمضان 361هـ (22 يونيو 972م). سُمي بالأزهر نسبة إلى فاطمة الزهراء بنت النبي محمد ﷺ. بدأت حلقات العلم عام 975م، وتحول رسمياً إلى مركز تعليمي عام 988-989م حين عُيّن 35 عالماً. أُنشئت أول مكتبة حوالي عام 1005م.</p>

<h3>العصر الأيوبي (1171-1250م)</h3>
<p>أوقف صلاح الدين الأيوبي التعليم الشيعي في الأزهر بعد سقوط الدولة الفاطمية عام 1171م، ومر الأزهر بفترة إهمال نسبي.</p>

<h3>العصر المملوكي (1250-1517م)</h3>
<p>أعاد السلطان بيبرس إحياء الأزهر عام 1266م كمركز للتعليم السني. شهد الأزهر في هذا العصر ازدهاراً كبيراً وأصبح أهم مؤسسة تعليمية في العالم الإسلامي. أضاف السلطان قايتباي مئذنة وتوسعات عام 1468م، وأضاف السلطان الغوري مئذنة أخرى عام 1510م.</p>

<h3>العصر العثماني (1517-1798م)</h3>
<p>حافظ الأزهر على مكانته كأهم مركز تعليمي في مصر خلال الحكم العثماني. لعب علماء الأزهر دوراً محورياً في الحياة السياسية والاجتماعية.</p>

<h3>العصر الحديث (1798-1952م)</h3>
<p>خلال الحملة الفرنسية (1798-1801م) قاد علماء الأزهر المقاومة في ثورتي القاهرة. قاد الإمام محمد عبده (شيخ الأزهر 1899-1905م) حركة إصلاح كبرى شملت تحديث المناهج. صدر قانون تطوير الأزهر رقم 103 عام 1961م في عهد الرئيس جمال عبد الناصر، وتحول إلى جامعة حديثة تضم كليات علمية وطبية وهندسية.</p>

<h3>العصر المعاصر (1952-حتى الآن)</h3>
<p>تضم جامعة الأزهر اليوم أكثر من 80 كلية في مختلف التخصصات، وتستقبل طلاباً من أكثر من 100 دولة. يقود الإمام الأكبر أحمد الطيب (منذ 2010م) جهود تعزيز الحوار بين الأديان ومكافحة التطرف، بما في ذلك وثيقة الأخوة الإنسانية مع البابا فرنسيس عام 2019م.</p>',
                'en' => '<h2>History of Al-Azhar Through the Ages</h2>

<h3>Fatimid Era (970-1171 CE)</h3>
<p>Construction of Al-Azhar Mosque began in 970 CE by order of Fatimid Caliph Al-Mu\'izz li-Din Allah, opening for its first prayers on 7 Ramadan 361 AH (June 22, 972 CE). Named after Fatimah al-Zahra, daughter of Prophet Muhammad (PBUH). Study circles began in 975 CE, and it was formally organized as an educational institution in 988-989 CE when 35 scholars were appointed. The first library was established around 1005 CE.</p>

<h3>Ayyubid Era (1171-1250 CE)</h3>
<p>Saladin suppressed Shia teachings at Al-Azhar after overthrowing the Fatimid dynasty in 1171 CE. Al-Azhar entered a period of relative neglect.</p>

<h3>Mamluk Era (1250-1517 CE)</h3>
<p>Sultan Baybars revived Al-Azhar as a center for Sunni learning in 1266 CE. This era saw great prosperity, and Al-Azhar became the most important educational institution in the Islamic world. Sultan Qaytbay added a minaret and expansions in 1468 CE, and Sultan al-Ghuri added another minaret in 1510 CE.</p>

<h3>Ottoman Era (1517-1798 CE)</h3>
<p>Al-Azhar maintained its status as the most important educational center in Egypt during Ottoman rule. Al-Azhar scholars played a pivotal role in political and social life.</p>

<h3>Modern Era (1798-1952 CE)</h3>
<p>During the French Campaign (1798-1801), Al-Azhar scholars led resistance in the two Cairo revolts. Imam Muhammad Abduh (Grand Sheikh 1899-1905) led major reforms including curriculum modernization. Law 103 of 1961 under President Nasser transformed Al-Azhar into a modern university with science, medical, and engineering faculties.</p>

<h3>Contemporary Era (1952-Present)</h3>
<p>Al-Azhar University today has over 80 faculties across various disciplines, welcoming students from more than 100 countries. Grand Imam Ahmed el-Tayeb (since 2010) leads efforts in interfaith dialogue and countering extremism, including the Document on Human Fraternity with Pope Francis in 2019.</p>',
                'fr' => '<h2>Histoire d\'Al-Azhar a travers les ages</h2>

<h3>Ere fatimide (970-1171)</h3>
<p>La construction de la mosquee Al-Azhar a commence en 970 par ordre du calife fatimide Al-Mu\'izz li-Din Allah, ouvrant pour ses premieres prieres le 7 Ramadan 361 AH (22 juin 972). Nommee d\'apres Fatimah al-Zahra, fille du Prophete Muhammad. Les cercles d\'etude ont commence en 975, et l\'institution a ete formellement organisee en 988-989 avec la nomination de 35 savants.</p>

<h3>Ere ayyoubide (1171-1250)</h3>
<p>Saladin a supprime l\'enseignement chiite a Al-Azhar apres le renversement de la dynastie fatimide en 1171.</p>

<h3>Ere mamelouke (1250-1517)</h3>
<p>Le sultan Baybars a relance Al-Azhar comme centre d\'enseignement sunnite en 1266. Cette ere a vu une grande prosperite.</p>

<h3>Ere contemporaine (1952-present)</h3>
<p>L\'Universite Al-Azhar compte aujourd\'hui plus de 80 facultes, accueillant des etudiants de plus de 100 pays. Le Grand Imam Ahmed el-Tayeb dirige les efforts de dialogue interreligieux, y compris le Document sur la fraternite humaine avec le Pape Francois en 2019.</p>',
                'es' => '<h2>Historia de Al-Azhar a traves de los siglos</h2>

<h3>Era fatimi (970-1171)</h3>
<p>La construccion de la mezquita Al-Azhar comenzo en 970 por orden del califa fatimi Al-Mu\'izz li-Din Allah, abriendo para sus primeras oraciones el 7 de Ramadan de 361 AH (22 de junio de 972). Nombrada en honor a Fatimah al-Zahra, hija del Profeta Muhammad. Los circulos de estudio comenzaron en 975, y se organizo formalmente como institucion educativa en 988-989.</p>

<h3>Era ayubi (1171-1250)</h3>
<p>Saladino suprimio las ensenanzas chiitas en Al-Azhar tras derrocar la dinastia fatimi en 1171.</p>

<h3>Era mameluca (1250-1517)</h3>
<p>El sultan Baybars revivio Al-Azhar como centro de ensenanza sunita en 1266. Esta era vio gran prosperidad.</p>

<h3>Era contemporanea (1952-presente)</h3>
<p>La Universidad Al-Azhar cuenta hoy con mas de 80 facultades, acogiendo estudiantes de mas de 100 paises. El Gran Iman Ahmed el-Tayeb lidera los esfuerzos de dialogo interreligioso, incluyendo el Documento sobre la Fraternidad Humana con el Papa Francisco en 2019.</p>',
                'zh' => '<h2>艾资哈尔的历史沿革</h2>

<h3>法蒂玛时期（970-1171年）</h3>
<p>艾资哈尔清真寺于970年奉法蒂玛王朝哈里发穆伊兹之命开始建造，于伊斯兰历361年斋月7日（972年6月22日）首次举行礼拜。以先知穆罕默德之女法蒂玛·扎赫拉命名。975年开始学术研讨圈，988-989年正式成为教育机构，任命35名学者。约1005年建立了第一个图书馆。</p>

<h3>阿尤布时期（1171-1250年）</h3>
<p>1171年萨拉丁推翻法蒂玛王朝后，停止了艾资哈尔的什叶派教学。</p>

<h3>马穆鲁克时期（1250-1517年）</h3>
<p>1266年苏丹拜巴尔斯恢复艾资哈尔作为逊尼派学术中心。这一时期见证了巨大繁荣。</p>

<h3>当代（1952年至今）</h3>
<p>艾资哈尔大学今天拥有80多个学院，接收来自100多个国家的学生。大伊玛目艾哈迈德·塔伊卜领导宗教间对话工作，包括2019年与教皇方济各签署的《人类兄弟情谊文件》。</p>',
                'ru' => '<h2>История Аль-Азхара сквозь века</h2>

<h3>Фатимидская эпоха (970-1171)</h3>
<p>Строительство мечети Аль-Азхар началось в 970 году по приказу фатимидского халифа Аль-Муизза ли-Дин Аллаха. Мечеть была открыта для молитв 7 Рамадана 361 года хиджры (22 июня 972 года). Названа в честь Фатимы аз-Захры, дочери Пророка Мухаммада. Учебные кружки начались в 975 году, а в 988-989 годах учреждение было формально организовано с назначением 35 учёных.</p>

<h3>Айюбидская эпоха (1171-1250)</h3>
<p>Салах ад-Дин прекратил шиитское преподавание в Аль-Азхаре после свержения династии Фатимидов в 1171 году.</p>

<h3>Мамлюкская эпоха (1250-1517)</h3>
<p>Султан Бейбарс возродил Аль-Азхар как центр суннитского образования в 1266 году. Эта эпоха принесла великий расцвет.</p>

<h3>Современная эпоха (1952-настоящее время)</h3>
<p>Университет Аль-Азхар сегодня насчитывает более 80 факультетов, принимая студентов из более чем 100 стран. Великий имам Ахмад ат-Тайеб возглавляет усилия по межрелигиозному диалогу, включая Документ о человеческом братстве с Папой Франциском в 2019 году.</p>',
                'ur' => '<h2>الازہر کی تاریخ ادوار کے آئینے میں</h2>

<h3>فاطمی دور (970-1171ء)</h3>
<p>مسجد الازہر کی تعمیر 970ء میں فاطمی خلیفہ المعز لدین اللہ کے حکم سے شروع ہوئی اور 7 رمضان 361ھ (22 جون 972ء) کو پہلی نماز ادا کی گئی۔ نبی کریم ﷺ کی صاحبزادی فاطمۃ الزہراؓ کے نام پر رکھا گیا۔ 975ء میں علمی حلقات شروع ہوئیں اور 988-989ء میں 35 علماء کی تقرری سے باقاعدہ تعلیمی ادارے کی حیثیت اختیار کی۔ تقریباً 1005ء میں پہلی لائبریری قائم ہوئی۔</p>

<h3>ایوبی دور (1171-1250ء)</h3>
<p>1171ء میں فاطمی خلافت کے خاتمے کے بعد صلاح الدین ایوبی نے الازہر میں شیعہ تعلیمات بند کر دیں۔</p>

<h3>مملوک دور (1250-1517ء)</h3>
<p>سلطان بیبرس نے 1266ء میں الازہر کو سنی تعلیم کے مرکز کے طور پر بحال کیا۔ اس دور میں بڑی خوشحالی دیکھنے میں آئی۔</p>

<h3>عصر حاضر (1952ء سے اب تک)</h3>
<p>جامعۃ الازہر آج 80 سے زیادہ کلیات پر مشتمل ہے اور 100 سے زیادہ ممالک سے طلبہ کا استقبال کرتی ہے۔ امام اکبر احمد الطیب بین المذاہب مکالمے کی کاوشوں کی قیادت کرتے ہیں، بشمول 2019ء میں پوپ فرانسس کے ساتھ وثیقۃ الاخوۃ الانسانیہ۔</p>',
            ],
            'meta_title' => [
                'ar' => 'تاريخ جامعة الأزهر',
                'en' => 'History of Al-Azhar University',
                'fr' => 'Histoire de l\'Universite Al-Azhar',
                'es' => 'Historia de la Universidad Al-Azhar',
                'zh' => '艾资哈尔大学的历史',
                'ru' => 'История Университета Аль-Азхар',
                'ur' => 'جامعۃ الازہر کی تاریخ',
            ],
            'meta_description' => [
                'ar' => 'تاريخ جامعة الأزهر من التأسيس عام 972م حتى العصر الحديث، عبر العصور الفاطمية والمملوكية والعثمانية.',
                'en' => 'The history of Al-Azhar University from its founding in 972 CE to the modern era, through the Fatimid, Mamluk, and Ottoman periods.',
                'fr' => 'L\'histoire de l\'Universite Al-Azhar depuis sa fondation en 972 jusqu\'a l\'ere moderne, a travers les periodes fatimide, mamelouke et ottomane.',
                'es' => 'La historia de la Universidad Al-Azhar desde su fundacion en 972 hasta la era moderna, a traves de los periodos fatimi, mameluco y otomano.',
                'zh' => '艾资哈尔大学从972年建立到现代的历史，跨越法蒂玛、马穆鲁克和奥斯曼时期。',
                'ru' => 'История Университета Аль-Азхар от основания в 972 году до современности, через фатимидский, мамлюкский и османский периоды.',
                'ur' => '972ء میں بنیاد سے لے کر جدید دور تک جامعۃ الازہر کی تاریخ، فاطمی، مملوک اور عثمانی ادوار سے گزرتے ہوئے۔',
            ],
            'order' => 2,
            'is_published' => true,
        ]);

        // Contact Page
        Page::create([
            'slug' => 'contact',
            'title' => [
                'ar' => 'اتصل بنا',
                'en' => 'Contact Us',
                'fr' => 'Contactez-nous',
                'es' => 'Contactenos',
                'zh' => '联系我们',
                'ru' => 'Свяжитесь с нами',
                'ur' => 'ہم سے رابطہ کریں',
            ],
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
الجمعة والسبت: عطلة رسمية</p>',
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
Friday and Saturday: Official Holidays</p>',
                'fr' => '<h2>Contactez-nous</h2>
<p>Nous vous accueillons via les canaux suivants :</p>

<h3>Adresse principale</h3>
<p>Universite Al-Azhar - Nasr City<br>
Rue Al-Azhar, Le Caire, Republique arabe d\'Egypte<br>
Code postal : 11751</p>

<h3>Numeros de telephone</h3>
<ul>
<li>Ligne directe : 16111</li>
<li>Standard principal : 02-2623-2138</li>
<li>Bureau du president : 02-2623-2150</li>
</ul>

<h3>Email</h3>
<ul>
<li>Renseignements generaux : info@azhar.edu.eg</li>
<li>Admissions : admission@azhar.edu.eg</li>
<li>Cooperation internationale : international@azhar.edu.eg</li>
</ul>

<h3>Heures d\'ouverture</h3>
<p>Dimanche - Jeudi : 8h00 - 15h00<br>
Vendredi et Samedi : Jours feries</p>',
                'es' => '<h2>Pongase en contacto</h2>
<p>Le damos la bienvenida a comunicarse a traves de los siguientes canales:</p>

<h3>Direccion principal</h3>
<p>Universidad Al-Azhar - Ciudad Nasr<br>
Calle Al-Azhar, El Cairo, Republica Arabe de Egipto<br>
Codigo postal: 11751</p>

<h3>Numeros de telefono</h3>
<ul>
<li>Linea directa: 16111</li>
<li>Centralita principal: 02-2623-2138</li>
<li>Oficina del presidente: 02-2623-2150</li>
</ul>

<h3>Correo electronico</h3>
<ul>
<li>Consultas generales: info@azhar.edu.eg</li>
<li>Admisiones: admission@azhar.edu.eg</li>
<li>Cooperacion internacional: international@azhar.edu.eg</li>
</ul>

<h3>Horario de trabajo</h3>
<p>Domingo - Jueves: 8:00 AM - 3:00 PM<br>
Viernes y Sabado: Dias festivos oficiales</p>',
                'zh' => '<h2>联系我们</h2>
<p>欢迎通过以下渠道与我们联系：</p>

<h3>主要地址</h3>
<p>艾资哈尔大学 - 纳赛尔城<br>
艾资哈尔街，开罗，阿拉伯埃及共和国<br>
邮政编码：11751</p>

<h3>电话号码</h3>
<ul>
<li>热线：16111</li>
<li>主交换台：02-2623-2138</li>
<li>校长办公室：02-2623-2150</li>
</ul>

<h3>电子邮件</h3>
<ul>
<li>一般咨询：info@azhar.edu.eg</li>
<li>招生：admission@azhar.edu.eg</li>
<li>国际合作：international@azhar.edu.eg</li>
</ul>

<h3>工作时间</h3>
<p>周日至周四：上午8:00 - 下午3:00<br>
周五和周六：公休日</p>',
                'ru' => '<h2>Свяжитесь с нами</h2>
<p>Мы приветствуем ваше обращение через следующие каналы:</p>

<h3>Основной адрес</h3>
<p>Университет Аль-Азхар - Наср-Сити<br>
Улица Аль-Азхар, Каир, Арабская Республика Египет<br>
Почтовый индекс: 11751</p>

<h3>Телефоны</h3>
<ul>
<li>Горячая линия: 16111</li>
<li>Главный коммутатор: 02-2623-2138</li>
<li>Кабинет ректора: 02-2623-2150</li>
</ul>

<h3>Электронная почта</h3>
<ul>
<li>Общие вопросы: info@azhar.edu.eg</li>
<li>Приёмная комиссия: admission@azhar.edu.eg</li>
<li>Международное сотрудничество: international@azhar.edu.eg</li>
</ul>

<h3>Рабочие часы</h3>
<p>Воскресенье - Четверг: 8:00 - 15:00<br>
Пятница и Суббота: Выходные дни</p>',
                'ur' => '<h2>ہم سے رابطہ کریں</h2>
<p>درج ذیل ذرائع سے ہم سے رابطہ کریں:</p>

<h3>مرکزی پتہ</h3>
<p>جامعۃ الازہر - مدینۃ نصر<br>
شارع الازہر، قاہرہ، عرب جمہوریہ مصر<br>
پوسٹل کوڈ: 11751</p>

<h3>فون نمبرز</h3>
<ul>
<li>ہاٹ لائن: 16111</li>
<li>مرکزی سوئچ بورڈ: 02-2623-2138</li>
<li>صدر جامعہ کا دفتر: 02-2623-2150</li>
</ul>

<h3>ای میل</h3>
<ul>
<li>عمومی استفسارات: info@azhar.edu.eg</li>
<li>داخلے: admission@azhar.edu.eg</li>
<li>بین الاقوامی تعاون: international@azhar.edu.eg</li>
</ul>

<h3>اوقات کار</h3>
<p>اتوار - جمعرات: صبح 8:00 - دوپہر 3:00<br>
جمعہ اور ہفتہ: سرکاری تعطیل</p>',
            ],
            'meta_title' => [
                'ar' => 'اتصل بجامعة الأزهر',
                'en' => 'Contact Al-Azhar University',
                'fr' => 'Contactez l\'Universite Al-Azhar',
                'es' => 'Contacte la Universidad Al-Azhar',
                'zh' => '联系艾资哈尔大学',
                'ru' => 'Контакты Университета Аль-Азхар',
                'ur' => 'جامعۃ الازہر سے رابطہ کریں',
            ],
            'meta_description' => [
                'ar' => 'تواصل مع جامعة الأزهر - العنوان وأرقام الهاتف والبريد الإلكتروني وساعات العمل.',
                'en' => 'Contact Al-Azhar University - address, phone numbers, email, and working hours.',
                'fr' => 'Contactez l\'Universite Al-Azhar - adresse, numeros de telephone, email et heures d\'ouverture.',
                'es' => 'Contacte la Universidad Al-Azhar - direccion, numeros de telefono, correo electronico y horario de trabajo.',
                'zh' => '联系艾资哈尔大学——地址、电话号码、电子邮件和工作时间。',
                'ru' => 'Свяжитесь с Университетом Аль-Азхар — адрес, телефоны, электронная почта и рабочие часы.',
                'ur' => 'جامعۃ الازہر سے رابطہ کریں — پتہ، فون نمبرز، ای میل اور اوقات کار۔',
            ],
            'order' => 3,
            'is_published' => true,
        ]);

        // Services Page
        Page::create([
            'slug' => 'services',
            'title' => [
                'ar' => 'الخدمات',
                'en' => 'Services',
                'fr' => 'Services',
                'es' => 'Servicios',
                'zh' => '服务',
                'ru' => 'Услуги',
                'ur' => 'خدمات',
            ],
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
<li><strong>الرعاية الصحية:</strong> مستشفيات جامعية تقدم خدمات طبية شاملة</li>
<li><strong>الأنشطة الطلابية:</strong> أندية ثقافية ورياضية وفنية وعلمية</li>
<li><strong>الإرشاد الأكاديمي:</strong> خدمات التوجيه والإرشاد للطلاب</li>
</ul>

<h3>خدمات المجتمع</h3>
<ul>
<li><strong>القوافل الطبية:</strong> قوافل طبية مجانية للمناطق المحرومة</li>
<li><strong>الدورات التدريبية:</strong> برامج تدريبية في مختلف المجالات</li>
<li><strong>الاستشارات:</strong> خدمات استشارية في المجالات الشرعية والقانونية والاقتصادية</li>
<li><strong>الفتوى:</strong> خدمة الإجابة على الاستفسارات الشرعية عبر المركز الإلكتروني للفتوى</li>
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
<li><strong>Fatwa Service:</strong> Answering Islamic legal inquiries through the Electronic Fatwa Center</li>
</ul>',
                'fr' => '<h2>Services de l\'Universite Al-Azhar</h2>
<p>L\'Universite Al-Azhar offre une gamme complete de services academiques, administratifs et communautaires :</p>

<h3>Services academiques</h3>
<ul>
<li><strong>Admissions :</strong> Services de candidature et d\'admission pour les programmes de licence et de master</li>
<li><strong>Bibliotheque numerique :</strong> Acces electronique a des milliers de livres, manuscrits et articles de recherche</li>
<li><strong>E-learning :</strong> Plateforme complete d\'apprentissage a distance et de ressources educatives numeriques</li>
</ul>

<h3>Services aux etudiants</h3>
<ul>
<li><strong>Logement etudiant :</strong> Residences entierement equipees</li>
<li><strong>Soins de sante :</strong> Hopitaux universitaires offrant des services medicaux complets</li>
<li><strong>Activites etudiantes :</strong> Clubs culturels, sportifs, artistiques et scientifiques</li>
</ul>

<h3>Services communautaires</h3>
<ul>
<li><strong>Convois medicaux :</strong> Convois medicaux gratuits vers les zones defavorisees</li>
<li><strong>Service de fatwa :</strong> Reponse aux questions juridiques islamiques via le Centre electronique de fatwa</li>
</ul>',
                'es' => '<h2>Servicios de la Universidad Al-Azhar</h2>
<p>La Universidad Al-Azhar ofrece una gama completa de servicios academicos, administrativos y comunitarios:</p>

<h3>Servicios academicos</h3>
<ul>
<li><strong>Admisiones:</strong> Servicios de solicitud y admision para programas de grado y posgrado</li>
<li><strong>Biblioteca digital:</strong> Acceso electronico a miles de libros, manuscritos y articulos de investigacion</li>
<li><strong>E-learning:</strong> Plataforma completa de aprendizaje a distancia y recursos educativos digitales</li>
</ul>

<h3>Servicios estudiantiles</h3>
<ul>
<li><strong>Alojamiento estudiantil:</strong> Residencias completamente equipadas</li>
<li><strong>Atencion medica:</strong> Hospitales universitarios que ofrecen servicios medicos integrales</li>
<li><strong>Actividades estudiantiles:</strong> Clubes culturales, deportivos, artisticos y cientificos</li>
</ul>

<h3>Servicios comunitarios</h3>
<ul>
<li><strong>Convoyes medicos:</strong> Convoyes medicos gratuitos a areas desfavorecidas</li>
<li><strong>Servicio de fatua:</strong> Respuesta a consultas juridicas islamicas a traves del Centro Electronico de Fatua</li>
</ul>',
                'zh' => '<h2>艾资哈尔大学服务</h2>
<p>艾资哈尔大学提供全面的学术、行政和社区服务：</p>

<h3>学术服务</h3>
<ul>
<li><strong>招生：</strong>本科和研究生项目的申请和录取服务</li>
<li><strong>数字图书馆：</strong>电子访问数千本书籍、手稿和研究论文</li>
<li><strong>在线学习：</strong>远程学习和数字教育资源的综合平台</li>
</ul>

<h3>学生服务</h3>
<ul>
<li><strong>学生宿舍：</strong>设施齐全的男女生宿舍</li>
<li><strong>医疗保健：</strong>大学医院提供全面的医疗服务</li>
<li><strong>学生活动：</strong>文化、体育、艺术和科学社团</li>
</ul>

<h3>社区服务</h3>
<ul>
<li><strong>医疗车队：</strong>前往欠发达地区的免费医疗车队</li>
<li><strong>法特瓦服务：</strong>通过电子法特瓦中心回答伊斯兰法律咨询</li>
</ul>',
                'ru' => '<h2>Услуги Университета Аль-Азхар</h2>
<p>Университет Аль-Азхар предлагает широкий спектр академических, административных и общественных услуг:</p>

<h3>Академические услуги</h3>
<ul>
<li><strong>Приём:</strong> Услуги подачи заявок и зачисления на программы бакалавриата и магистратуры</li>
<li><strong>Цифровая библиотека:</strong> Электронный доступ к тысячам книг, рукописей и научных статей</li>
<li><strong>Дистанционное обучение:</strong> Комплексная платформа для дистанционного обучения и цифровых образовательных ресурсов</li>
</ul>

<h3>Студенческие услуги</h3>
<ul>
<li><strong>Студенческое жильё:</strong> Полностью оборудованные общежития</li>
<li><strong>Здравоохранение:</strong> Университетские больницы, предоставляющие комплексные медицинские услуги</li>
<li><strong>Студенческие мероприятия:</strong> Культурные, спортивные, художественные и научные клубы</li>
</ul>

<h3>Общественные услуги</h3>
<ul>
<li><strong>Медицинские караваны:</strong> Бесплатные медицинские караваны в отдалённые районы</li>
<li><strong>Служба фетвы:</strong> Ответы на исламские правовые вопросы через Электронный центр фетвы</li>
</ul>',
                'ur' => '<h2>جامعۃ الازہر کی خدمات</h2>
<p>جامعۃ الازہر تعلیمی، انتظامی اور معاشرتی خدمات کی ایک جامع رینج فراہم کرتی ہے:</p>

<h3>تعلیمی خدمات</h3>
<ul>
<li><strong>داخلے:</strong> انڈرگریجویٹ اور پوسٹ گریجویٹ پروگراموں کے لیے درخواست اور داخلے کی خدمات</li>
<li><strong>ڈیجیٹل لائبریری:</strong> ہزاروں کتابوں، مخطوطات اور تحقیقی مقالات تک الیکٹرانک رسائی</li>
<li><strong>ای لرننگ:</strong> بُعدی تعلیم اور ڈیجیٹل تعلیمی وسائل کا جامع پلیٹ فارم</li>
</ul>

<h3>طلبہ کی خدمات</h3>
<ul>
<li><strong>طلبہ رہائش:</strong> طلبہ و طالبات کے لیے مکمل سہولیات سے لیس ہاسٹلز</li>
<li><strong>صحت کی دیکھ بھال:</strong> جامعہ ہسپتال جامع طبی خدمات فراہم کرتے ہیں</li>
<li><strong>طلبہ سرگرمیاں:</strong> ثقافتی، کھیل، فنون اور سائنسی کلبز</li>
</ul>

<h3>معاشرتی خدمات</h3>
<ul>
<li><strong>طبی قافلے:</strong> پسماندہ علاقوں میں مفت طبی قافلے</li>
<li><strong>فتویٰ سروس:</strong> الیکٹرانک فتویٰ سینٹر کے ذریعے اسلامی قانونی استفسارات کے جوابات</li>
</ul>',
            ],
            'meta_title' => [
                'ar' => 'خدمات جامعة الأزهر',
                'en' => 'Al-Azhar University Services',
                'fr' => 'Services de l\'Universite Al-Azhar',
                'es' => 'Servicios de la Universidad Al-Azhar',
                'zh' => '艾资哈尔大学服务',
                'ru' => 'Услуги Университета Аль-Азхар',
                'ur' => 'جامعۃ الازہر کی خدمات',
            ],
            'meta_description' => [
                'ar' => 'تعرف على الخدمات الأكاديمية والطلابية والمجتمعية التي تقدمها جامعة الأزهر.',
                'en' => 'Explore the academic, student, and community services offered by Al-Azhar University.',
                'fr' => 'Decouvrez les services academiques, etudiants et communautaires offerts par l\'Universite Al-Azhar.',
                'es' => 'Explore los servicios academicos, estudiantiles y comunitarios ofrecidos por la Universidad Al-Azhar.',
                'zh' => '探索艾资哈尔大学提供的学术、学生和社区服务。',
                'ru' => 'Узнайте об академических, студенческих и общественных услугах Университета Аль-Азхар.',
                'ur' => 'جامعۃ الازہر کی تعلیمی، طلبہ اور معاشرتی خدمات کے بارے میں جانیں۔',
            ],
            'order' => 4,
            'is_published' => true,
        ]);
    }
}
