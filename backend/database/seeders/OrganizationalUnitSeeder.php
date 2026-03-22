<?php

namespace Database\Seeders;

use App\Models\OrganizationalUnit;
use Illuminate\Database\Seeder;

class OrganizationalUnitSeeder extends Seeder
{
    public function run(): void
    {
        // Top level: Grand Imam's Office
        $grandImam = OrganizationalUnit::create([
            'slug' => 'grand-imam-office',
            'type' => 'presidency',
            'name' => [
                'ar' => 'مكتب الإمام الأكبر شيخ الأزهر',
                'en' => 'Office of the Grand Imam of Al-Azhar',
                'fr' => 'Bureau du Grand Imam d\'Al-Azhar',
                'es' => 'Oficina del Gran Imam de Al-Azhar',
                'zh' => '艾资哈尔大伊玛目办公室',
                'ru' => 'Канцелярия Великого имама Аль-Азхара',
                'ur' => 'شیخ الازہر کا دفتر',
            ],
            'description' => [
                'ar' => 'مكتب الإمام الأكبر شيخ الأزهر الشريف هو أعلى سلطة في الأزهر الشريف. يُعيّن شيخ الأزهر بمرسوم رئاسي برتبة وزير وامتيازات مالية مماثلة لرئيس الوزراء. يشرف على جامعة الأزهر والمجلس الأعلى ومجمع البحوث الإسلامية والمعاهد الأزهرية.',
                'en' => 'The Office of the Grand Imam is the highest authority in Al-Azhar al-Sharif. The Grand Imam is appointed by presidential decree with ministerial rank and financial privileges equivalent to the Prime Minister. He oversees Al-Azhar University, the Supreme Council, the Islamic Research Academy, and Al-Azhar Institutes.',
                'fr' => 'Le Bureau du Grand Imam est la plus haute autorite d\'Al-Azhar, nomme par decret presidentiel.',
                'es' => 'La Oficina del Gran Imam es la autoridad suprema de Al-Azhar, nombrado por decreto presidencial.',
                'zh' => '大伊玛目办公室是艾资哈尔的最高权力机构，由总统令任命。',
                'ru' => 'Канцелярия Великого имама — высший орган власти Аль-Азхара, назначаемый президентским указом.',
                'ur' => 'شیخ الازہر کا دفتر الازہر الشریف کی اعلیٰ ترین اتھارٹی ہے۔ شیخ الازہر صدارتی فرمان سے مقرر ہوتے ہیں۔',
            ],
            'parent_id' => null,
            'is_published' => true,
            'order' => 1,
        ]);

        // Supreme Council
        OrganizationalUnit::create([
            'slug' => 'supreme-council',
            'type' => 'council',
            'name' => [
                'ar' => 'المجلس الأعلى للأزهر',
                'en' => 'Al-Azhar Supreme Council',
                'fr' => 'Conseil Supreme d\'Al-Azhar',
                'es' => 'Consejo Supremo de Al-Azhar',
                'zh' => '艾资哈尔最高委员会',
                'ru' => 'Верховный совет Аль-Азхара',
                'ur' => 'الازہر کی اعلیٰ مجلس',
            ],
            'description' => [
                'ar' => 'المجلس الأعلى للأزهر هو الهيئة الإدارية العليا التي تضع السياسات العامة للأزهر وتشرف على تنفيذها.',
                'en' => 'The Supreme Council is the highest administrative body that sets Al-Azhar\'s general policies and oversees their implementation.',
                'fr' => 'Le Conseil Supreme est l\'organe administratif supreme qui definit les politiques generales d\'Al-Azhar.',
                'es' => 'El Consejo Supremo es el organo administrativo supremo que define las politicas generales de Al-Azhar.',
                'zh' => '最高委员会是制定艾资哈尔总政策的最高行政机构。',
                'ru' => 'Верховный совет — высший административный орган, определяющий политику Аль-Азхара.',
                'ur' => 'اعلیٰ مجلس وہ اعلیٰ ترین انتظامی ادارہ ہے جو الازہر کی عمومی پالیسیاں تشکیل دیتا ہے۔',
            ],
            'parent_id' => $grandImam->id,
            'is_published' => true,
            'order' => 1,
        ]);

        // Islamic Research Academy
        $islamicResearchAcademy = OrganizationalUnit::create([
            'slug' => 'islamic-research-academy',
            'type' => 'council',
            'name' => [
                'ar' => 'مجمع البحوث الإسلامية',
                'en' => 'Islamic Research Academy',
                'fr' => 'Academie de Recherches Islamiques',
                'es' => 'Academia de Investigacion Islamica',
                'zh' => '伊斯兰研究院',
                'ru' => 'Академия исламских исследований',
                'ur' => 'مجمع البحوث الاسلامیہ',
            ],
            'description' => [
                'ar' => 'مجمع البحوث الإسلامية هو الهيئة العلمية العليا في الأزهر، يضم أعضاء من مختلف البلدان الإسلامية ويختص بالبحث في الدراسات الإسلامية وإصدار الفتاوى والبيانات العلمية.',
                'en' => 'The Islamic Research Academy is Al-Azhar\'s supreme scholarly body, with members from various Islamic countries, specializing in Islamic research and issuing fatwas and scholarly statements.',
                'fr' => 'L\'Academie est l\'organe savant supreme d\'Al-Azhar, avec des membres de divers pays islamiques.',
                'es' => 'La Academia es el organo academico supremo de Al-Azhar, con miembros de diversos paises islamicos.',
                'zh' => '伊斯兰研究院是艾资哈尔最高学术机构，成员来自各伊斯兰国家。',
                'ru' => 'Академия — высший учёный орган Аль-Азхара с членами из разных исламских стран.',
                'ur' => 'مجمع البحوث الاسلامیہ الازہر کا اعلیٰ ترین علمی ادارہ ہے جس کے ارکان مختلف اسلامی ممالک سے ہیں۔',
            ],
            'parent_id' => $grandImam->id,
            'is_published' => true,
            'order' => 2,
        ]);

        // University Presidency
        $presidency = OrganizationalUnit::create([
            'slug' => 'university-presidency',
            'type' => 'presidency',
            'name' => [
                'ar' => 'رئاسة جامعة الأزهر',
                'en' => 'Al-Azhar University Presidency',
                'fr' => 'Presidence de l\'Universite d\'Al-Azhar',
                'es' => 'Presidencia de la Universidad de Al-Azhar',
                'zh' => '艾资哈尔大学校长办公室',
                'ru' => 'Ректорат университета Аль-Азхар',
                'ur' => 'الازہر یونیورسٹی صدارت',
            ],
            'description' => [
                'ar' => 'رئاسة جامعة الأزهر هي الجهة المسؤولة عن إدارة شؤون الجامعة ورسم سياساتها الأكاديمية والإدارية. تشرف على أكثر من 80 كلية و9 معاهد و6 مستشفيات جامعية و27 وحدة إدارية عامة.',
                'en' => 'The University Presidency manages the university\'s affairs and academic policies. It oversees over 80 faculties, 9 institutes, 6 university hospitals, and 27 general administration units across Egypt.',
                'fr' => 'La Presidence gere les affaires de l\'universite et supervise plus de 80 facultes a travers l\'Egypte.',
                'es' => 'La Presidencia gestiona los asuntos de la universidad y supervisa mas de 80 facultades en todo Egipto.',
                'zh' => '大学校长办公室管理大学事务，监管遍布埃及的80多个学院。',
                'ru' => 'Ректорат управляет делами университета и курирует более 80 факультетов по всему Египту.',
                'ur' => 'صدارت یونیورسٹی کے معاملات کی انتظام کاری اور پورے مصر میں 80 سے زائد فیکلٹیوں کی نگرانی کرتی ہے۔',
            ],
            'parent_id' => $grandImam->id,
            'is_published' => true,
            'order' => 3,
        ]);

        // Vice Presidencies
        OrganizationalUnit::create([
            'slug' => 'vp-education-students',
            'type' => 'vice_presidency',
            'name' => [
                'ar' => 'نيابة رئيس الجامعة لشؤون التعليم والطلاب',
                'en' => 'Vice Presidency for Education & Student Affairs',
                'fr' => 'Vice-presidence pour l\'Education et les Affaires Etudiantes',
                'es' => 'Vicepresidencia de Educacion y Asuntos Estudiantiles',
                'zh' => '教育与学生事务副校长办公室',
                'ru' => 'Вице-президентство по образованию и делам студентов',
                'ur' => 'نائب صدارت برائے تعلیم و طلبہ امور',
            ],
            'description' => [
                'ar' => 'تختص بالإشراف على العملية التعليمية وشؤون الطلاب في جميع كليات الجامعة، بما في ذلك القبول والتسجيل والامتحانات والأنشطة الطلابية.',
                'en' => 'Oversees the educational process and student affairs across all faculties, including admissions, registration, examinations, and student activities.',
                'fr' => 'Supervise le processus educatif et les affaires etudiantes dans toutes les facultes.',
                'es' => 'Supervisa el proceso educativo y los asuntos estudiantiles en todas las facultades.',
                'zh' => '监管所有学院的教育过程和学生事务。',
                'ru' => 'Курирует образовательный процесс и студенческие дела во всех факультетах.',
                'ur' => 'تمام فیکلٹیوں میں تعلیمی عمل اور طلبہ امور کی نگرانی کرتی ہے۔',
            ],
            'parent_id' => $presidency->id,
            'is_published' => true,
            'order' => 1,
        ]);

        OrganizationalUnit::create([
            'slug' => 'vp-graduate-studies-research',
            'type' => 'vice_presidency',
            'name' => [
                'ar' => 'نيابة رئيس الجامعة للدراسات العليا والبحوث',
                'en' => 'Vice Presidency for Graduate Studies & Research',
                'fr' => 'Vice-presidence pour les Etudes Superieures et la Recherche',
                'es' => 'Vicepresidencia de Estudios de Posgrado e Investigacion',
                'zh' => '研究生与科研副校长办公室',
                'ru' => 'Вице-президентство по аспирантуре и исследованиям',
                'ur' => 'نائب صدارت برائے اعلیٰ تعلیم و تحقیق',
            ],
            'description' => [
                'ar' => 'تشرف على برامج الدراسات العليا (الماجستير والدكتوراه) والبحث العلمي في الجامعة وإقامة شراكات بحثية مع المؤسسات الدولية.',
                'en' => 'Oversees graduate programs (Master\'s and PhD) and scientific research, establishing research partnerships with international institutions.',
                'fr' => 'Supervise les programmes de master et doctorat et les partenariats de recherche internationaux.',
                'es' => 'Supervisa los programas de maestria y doctorado y las asociaciones de investigacion internacionales.',
                'zh' => '监管硕士和博士课程以及国际研究合作。',
                'ru' => 'Курирует магистерские и докторские программы и международные исследовательские партнёрства.',
                'ur' => 'ماسٹرز اور ڈاکٹریٹ پروگراموں اور بین الاقوامی تحقیقی شراکت داری کی نگرانی کرتی ہے۔',
            ],
            'parent_id' => $presidency->id,
            'is_published' => true,
            'order' => 2,
        ]);

        OrganizationalUnit::create([
            'slug' => 'vp-girls-branch',
            'type' => 'vice_presidency',
            'name' => [
                'ar' => 'نيابة رئيس الجامعة لفرع البنات',
                'en' => 'Vice Presidency for the Girls\' Branch',
                'fr' => 'Vice-presidence pour la Branche des Filles',
                'es' => 'Vicepresidencia de la Rama Femenina',
                'zh' => '女子分校副校长办公室',
                'ru' => 'Вице-президентство по женскому отделению',
                'ur' => 'نائب صدارت برائے بنات شعبہ',
            ],
            'description' => [
                'ar' => 'تشرف على أكثر من 30 كلية للبنات في مختلف المحافظات المصرية، وتعمل على تطوير التعليم والبحث العلمي في فرع البنات.',
                'en' => 'Oversees over 30 girls\' faculties across various Egyptian governorates, working to develop education and research in the girls\' branch.',
                'fr' => 'Supervise plus de 30 facultes pour filles dans differents gouvernorats egyptiens.',
                'es' => 'Supervisa mas de 30 facultades femeninas en diferentes gobernaciones egipcias.',
                'zh' => '监管遍布埃及各省的30多个女子学院。',
                'ru' => 'Курирует более 30 женских факультетов в различных губернаторствах Египта.',
                'ur' => 'مختلف مصری صوبوں میں 30 سے زائد بنات کی فیکلٹیوں کی نگرانی کرتی ہے۔',
            ],
            'parent_id' => $presidency->id,
            'is_published' => true,
            'order' => 3,
        ]);

        // Observatory and special centers under Grand Imam
        OrganizationalUnit::create([
            'slug' => 'observatory-combating-extremism',
            'type' => 'office',
            'name' => [
                'ar' => 'مرصد الأزهر لمكافحة التطرف',
                'en' => 'Al-Azhar Observatory for Combating Extremism',
                'fr' => 'Observatoire d\'Al-Azhar pour la Lutte contre l\'Extremisme',
                'es' => 'Observatorio de Al-Azhar para Combatir el Extremismo',
                'zh' => '艾资哈尔反极端主义观察站',
                'ru' => 'Обсерватория Аль-Азхара по борьбе с экстремизмом',
                'ur' => 'الازہر رصد گاہ برائے انتہا پسندی کا مقابلہ',
            ],
            'description' => [
                'ar' => 'مرصد الأزهر لمكافحة التطرف يعمل بـ12 لغة عالمية لرصد الخطاب المتطرف على الإنترنت والرد عليه بالحجة والدليل والمنطق.',
                'en' => 'The Al-Azhar Observatory operates in 12 world languages, monitoring extremist discourse online and countering it with evidence-based, rational responses.',
                'fr' => 'L\'Observatoire opere en 12 langues pour surveiller et contrer le discours extremiste en ligne.',
                'es' => 'El Observatorio opera en 12 idiomas para monitorear y contrarrestar el discurso extremista en linea.',
                'zh' => '观察站以12种世界语言运作，监控和反击网上极端主义言论。',
                'ru' => 'Обсерватория работает на 12 языках для мониторинга и противодействия экстремизму в сети.',
                'ur' => 'رصد گاہ 12 عالمی زبانوں میں آن لائن انتہا پسندی کی نگرانی اور مقابلے کا کام کرتی ہے۔',
            ],
            'parent_id' => $grandImam->id,
            'is_published' => true,
            'order' => 4,
        ]);

        OrganizationalUnit::create([
            'slug' => 'global-electronic-fatwa-center',
            'type' => 'office',
            'name' => [
                'ar' => 'المركز العالمي للفتوى الإلكترونية',
                'en' => 'Global Center for Electronic Fatwas',
                'fr' => 'Centre Mondial des Fatwas Electroniques',
                'es' => 'Centro Global de Fatwas Electronicas',
                'zh' => '全球电子教令中心',
                'ru' => 'Глобальный центр электронных фетв',
                'ur' => 'الیکٹرانک فتویٰ کا عالمی مرکز',
            ],
            'description' => [
                'ar' => 'المركز العالمي للفتوى الإلكترونية يقدم خدمات الفتوى والاستشارات الشرعية عبر الإنترنت بلغات متعددة لخدمة المسلمين حول العالم.',
                'en' => 'The Global Center for Electronic Fatwas provides fatwa and Islamic legal consultation services online in multiple languages to serve Muslims worldwide.',
                'fr' => 'Le Centre offre des services de fatwa et de consultation juridique islamique en ligne en plusieurs langues.',
                'es' => 'El Centro ofrece servicios de fatwa y consulta juridica islamica en linea en varios idiomas.',
                'zh' => '该中心以多种语言在线提供教令和伊斯兰法律咨询服务。',
                'ru' => 'Центр предоставляет онлайн-фетвы и исламские юридические консультации на нескольких языках.',
                'ur' => 'مرکز متعدد زبانوں میں آن لائن فتویٰ اور شرعی مشاورت کی خدمات فراہم کرتا ہے۔',
            ],
            'parent_id' => $grandImam->id,
            'is_published' => true,
            'order' => 5,
        ]);

        OrganizationalUnit::create([
            'slug' => 'world-organization-azhar-graduates',
            'type' => 'office',
            'name' => [
                'ar' => 'المنظمة العالمية لخريجي الأزهر',
                'en' => 'World Organization for Al-Azhar Graduates',
                'fr' => 'Organisation Mondiale des Diplomes d\'Al-Azhar',
                'es' => 'Organizacion Mundial de Graduados de Al-Azhar',
                'zh' => '艾资哈尔毕业生世界组织',
                'ru' => 'Всемирная организация выпускников Аль-Азхара',
                'ur' => 'الازہر فارغ التحصیل افراد کی عالمی تنظیم',
            ],
            'description' => [
                'ar' => 'المنظمة العالمية لخريجي الأزهر تضم 20 فرعاً دولياً و17 فرعاً مصرياً إقليمياً، وتعمل على ربط خريجي الأزهر حول العالم وتعزيز التواصل بينهم.',
                'en' => 'The World Organization for Al-Azhar Graduates has 20 international branches and 17 Egyptian provincial branches, connecting Al-Azhar alumni worldwide and strengthening their networks.',
                'fr' => 'L\'Organisation compte 20 branches internationales et 17 branches provinciales egyptiennes.',
                'es' => 'La Organizacion cuenta con 20 sucursales internacionales y 17 sucursales provinciales egipcias.',
                'zh' => '该组织拥有20个国际分部和17个埃及省级分部。',
                'ru' => 'Организация имеет 20 международных и 17 египетских провинциальных отделений.',
                'ur' => 'تنظیم کی 20 بین الاقوامی اور 17 مصری صوبائی شاخیں ہیں۔',
            ],
            'parent_id' => $grandImam->id,
            'is_published' => true,
            'order' => 6,
        ]);

        // Al-Azhar Translation Center
        OrganizationalUnit::create([
            'slug' => 'translation-center',
            'type' => 'center',
            'name' => [
                'ar' => 'مركز الأزهر للترجمة',
                'en' => 'Al-Azhar Translation Center',
                'fr' => 'Centre de Traduction d\'Al-Azhar',
                'es' => 'Centro de Traduccion de Al-Azhar',
                'zh' => '艾资哈尔翻译中心',
                'ru' => 'Центр перевода Аль-Азхара',
                'ur' => 'الازہر ترجمہ مرکز',
            ],
            'description' => [
                'ar' => 'مركز الأزهر للترجمة يتولى ترجمة إصدارات الأزهر ومنشوراته إلى 11 لغة عالمية لنشر رسالة الوسطية والاعتدال حول العالم.',
                'en' => 'The Al-Azhar Translation Center translates Al-Azhar publications into 11 languages to spread the message of moderation and tolerance worldwide.',
                'fr' => 'Le Centre de Traduction traduit les publications d\'Al-Azhar en 11 langues pour diffuser le message de moderation dans le monde.',
                'es' => 'El Centro de Traduccion traduce las publicaciones de Al-Azhar a 11 idiomas para difundir el mensaje de moderacion en todo el mundo.',
                'zh' => '艾资哈尔翻译中心将艾资哈尔出版物翻译成11种语言，向全球传播中正温和的理念。',
                'ru' => 'Центр перевода переводит публикации Аль-Азхара на 11 языков для распространения послания умеренности во всём мире.',
                'ur' => 'الازہر ترجمہ مرکز الازہر کی اشاعتوں کا 11 زبانوں میں ترجمہ کرتا ہے تاکہ اعتدال کا پیغام دنیا بھر میں پھیلایا جا سکے۔',
            ],
            'parent_id' => $grandImam->id,
            'is_published' => true,
            'order' => 7,
        ]);

        // Al-Azhar Academy for Imam Training
        OrganizationalUnit::create([
            'slug' => 'imam-training-academy',
            'type' => 'center',
            'name' => [
                'ar' => 'أكاديمية الأزهر لتدريب الأئمة والوعاظ',
                'en' => 'Al-Azhar Academy for Imam Training',
                'fr' => 'Academie d\'Al-Azhar pour la Formation des Imams',
                'es' => 'Academia de Al-Azhar para la Formacion de Imanes',
                'zh' => '艾资哈尔伊玛目培训学院',
                'ru' => 'Академия Аль-Азхара по подготовке имамов',
                'ur' => 'الازہر اکیڈمی برائے تربیت ائمہ و واعظین',
            ],
            'description' => [
                'ar' => 'أكاديمية الأزهر لتدريب الأئمة والوعاظ تقوم بتأهيل وتدريب الأئمة والوعاظ من مصر ومختلف دول العالم على فنون الدعوة والخطابة والإفتاء.',
                'en' => 'The Al-Azhar Academy for Imam Training trains imams and preachers from Egypt and worldwide in the arts of Islamic preaching, oratory, and issuing religious guidance.',
                'fr' => 'L\'Academie forme des imams et des predicateurs d\'Egypte et du monde entier aux arts de la predication islamique et de l\'orientation religieuse.',
                'es' => 'La Academia forma a imanes y predicadores de Egipto y de todo el mundo en las artes de la predicacion islamica y la orientacion religiosa.',
                'zh' => '艾资哈尔伊玛目培训学院培训来自埃及和世界各地的伊玛目和传教士，教授伊斯兰宣教和演讲艺术。',
                'ru' => 'Академия обучает имамов и проповедников из Египта и всего мира искусству исламской проповеди и религиозного наставничества.',
                'ur' => 'اکیڈمی مصر اور دنیا بھر سے ائمہ اور واعظین کو اسلامی دعوت، خطابت اور افتاء کے فنون کی تربیت دیتی ہے۔',
            ],
            'parent_id' => $grandImam->id,
            'is_published' => true,
            'order' => 8,
        ]);

        // Bayt al-Zakat wa al-Sadaqat
        OrganizationalUnit::create([
            'slug' => 'bayt-al-zakat',
            'type' => 'center',
            'name' => [
                'ar' => 'بيت الزكاة والصدقات المصري',
                'en' => 'Bayt al-Zakat wa al-Sadaqat',
                'fr' => 'Maison de la Zakat et des Aumones',
                'es' => 'Casa del Zakat y las Limosnas',
                'zh' => '埃及天课与施舍之家',
                'ru' => 'Дом закята и милостыни',
                'ur' => 'بیت الزکاۃ والصدقات مصری',
            ],
            'description' => [
                'ar' => 'بيت الزكاة والصدقات المصري هو مؤسسة خيرية تابعة للأزهر الشريف تتولى إدارة وتوزيع أموال الزكاة والصدقات على المستحقين في مصر.',
                'en' => 'Bayt al-Zakat wa al-Sadaqat is an Egyptian charity institution under Al-Azhar managing the collection and distribution of zakat funds to those in need across Egypt.',
                'fr' => 'Bayt al-Zakat est une institution caritative sous Al-Azhar qui gere la collecte et la distribution des fonds de zakat en Egypte.',
                'es' => 'Bayt al-Zakat es una institucion benefica bajo Al-Azhar que gestiona la recaudacion y distribucion de fondos de zakat en Egipto.',
                'zh' => '埃及天课与施舍之家是艾资哈尔旗下的慈善机构，负责管理和分配天课资金给埃及各地有需要的人。',
                'ru' => 'Байт аз-Закят — благотворительное учреждение при Аль-Азхаре, управляющее сбором и распределением закята в Египте.',
                'ur' => 'بیت الزکاۃ والصدقات الازہر الشریف کے تحت ایک خیراتی ادارہ ہے جو مصر بھر میں مستحقین کو زکاۃ کی رقوم تقسیم کرتا ہے۔',
            ],
            'parent_id' => $grandImam->id,
            'is_published' => true,
            'order' => 9,
        ]);

        // Center for Interreligious Dialogue
        OrganizationalUnit::create([
            'slug' => 'interreligious-dialogue-center',
            'type' => 'center',
            'name' => [
                'ar' => 'مركز الأزهر للحوار بين الأديان',
                'en' => 'Center for Interreligious Dialogue',
                'fr' => 'Centre pour le Dialogue Interreligieux',
                'es' => 'Centro para el Dialogo Interreligioso',
                'zh' => '艾资哈尔宗教间对话中心',
                'ru' => 'Центр межрелигиозного диалога Аль-Азхара',
                'ur' => 'الازہر بین المذاہب مکالمہ مرکز',
            ],
            'description' => [
                'ar' => 'مركز الأزهر للحوار بين الأديان يعمل على تعزيز التفاهم والحوار بين أتباع الأديان المختلفة ونشر ثقافة التسامح والتعايش السلمي.',
                'en' => 'The Center for Interreligious Dialogue promotes interfaith understanding and dialogue among followers of different religions, fostering a culture of tolerance and peaceful coexistence.',
                'fr' => 'Le Centre promeut la comprehension et le dialogue interreligieux entre les adeptes de differentes religions, favorisant la tolerance et la coexistence pacifique.',
                'es' => 'El Centro promueve la comprension y el dialogo interreligioso entre los seguidores de diferentes religiones, fomentando la tolerancia y la coexistencia pacifica.',
                'zh' => '宗教间对话中心促进不同宗教信众之间的理解与对话，培育包容与和平共处的文化。',
                'ru' => 'Центр содействует межрелигиозному взаимопониманию и диалогу между последователями разных религий, развивая культуру терпимости и мирного сосуществования.',
                'ur' => 'مرکز مختلف مذاہب کے پیروکاروں کے درمیان بین المذاہب تفاہم اور مکالمے کو فروغ دیتا ہے اور رواداری اور پرامن بقائے باہمی کی ثقافت کو پھیلاتا ہے۔',
            ],
            'parent_id' => $grandImam->id,
            'is_published' => true,
            'order' => 10,
        ]);

        // Center for International Students
        OrganizationalUnit::create([
            'slug' => 'international-students-center',
            'type' => 'center',
            'name' => [
                'ar' => 'مركز تطوير تعليم الطلاب الوافدين',
                'en' => 'Center for International Students',
                'fr' => 'Centre pour les Etudiants Internationaux',
                'es' => 'Centro para Estudiantes Internacionales',
                'zh' => '国际学生教育发展中心',
                'ru' => 'Центр развития образования иностранных студентов',
                'ur' => 'بین الاقوامی طلباء کی تعلیم کی ترقی کا مرکز',
            ],
            'description' => [
                'ar' => 'مركز تطوير تعليم الطلاب الوافدين يخدم أكثر من 40,000 طالب من أكثر من 110 دولة، ويوفر لهم الدعم الأكاديمي والإداري واللغوي.',
                'en' => 'The Center for International Students serves over 40,000 students from more than 110 countries, providing academic, administrative, and language support.',
                'fr' => 'Le Centre sert plus de 40 000 etudiants de plus de 110 pays, offrant un soutien academique, administratif et linguistique.',
                'es' => 'El Centro atiende a mas de 40.000 estudiantes de mas de 110 paises, ofreciendo apoyo academico, administrativo y linguistico.',
                'zh' => '国际学生教育发展中心服务来自110多个国家的4万多名学生，提供学术、行政和语言支持。',
                'ru' => 'Центр обслуживает более 40 000 студентов из более чем 110 стран, оказывая академическую, административную и языковую поддержку.',
                'ur' => 'مرکز 110 سے زائد ممالک کے 40,000 سے زائد طلباء کی خدمت کرتا ہے اور انہیں اکیڈمک، انتظامی اور لسانی مدد فراہم کرتا ہے۔',
            ],
            'parent_id' => $presidency->id,
            'is_published' => true,
            'order' => 4,
        ]);

        // Al-Azhar Institutes Sector
        OrganizationalUnit::create([
            'slug' => 'azhar-institutes-sector',
            'type' => 'sector',
            'name' => [
                'ar' => 'قطاع المعاهد الأزهرية',
                'en' => 'Al-Azhar Institutes Sector',
                'fr' => 'Secteur des Instituts d\'Al-Azhar',
                'es' => 'Sector de Institutos de Al-Azhar',
                'zh' => '艾资哈尔学院部门',
                'ru' => 'Сектор институтов Аль-Азхара',
                'ur' => 'الازہر معاہد کا شعبہ',
            ],
            'description' => [
                'ar' => 'قطاع المعاهد الأزهرية يشرف على التعليم الأزهري قبل الجامعي (المرحلة الابتدائية والإعدادية والثانوية) في المعاهد الأزهرية المنتشرة في جميع أنحاء مصر.',
                'en' => 'The Al-Azhar Institutes Sector oversees pre-university Islamic education (primary, preparatory, and secondary institutes) across Egypt.',
                'fr' => 'Le Secteur supervise l\'enseignement islamique pre-universitaire (primaire, preparatoire et secondaire) dans les instituts d\'Al-Azhar a travers l\'Egypte.',
                'es' => 'El Sector supervisa la educacion islamica preuniversitaria (institutos primarios, preparatorios y secundarios) en todo Egipto.',
                'zh' => '艾资哈尔学院部门监管遍布埃及的大学前伊斯兰教育（小学、预备和中学阶段的艾资哈尔学院）。',
                'ru' => 'Сектор курирует доуниверситетское исламское образование (начальные, подготовительные и средние институты) по всему Египту.',
                'ur' => 'شعبہ پورے مصر میں الازہر معاہد میں یونیورسٹی سے قبل کی اسلامی تعلیم (ابتدائی، اعدادی اور ثانوی) کی نگرانی کرتا ہے۔',
            ],
            'parent_id' => $grandImam->id,
            'is_published' => true,
            'order' => 11,
        ]);

        // Council of Senior Scholars
        OrganizationalUnit::create([
            'slug' => 'council-senior-scholars',
            'type' => 'council',
            'name' => [
                'ar' => 'هيئة كبار العلماء',
                'en' => 'Council of Senior Scholars',
                'fr' => 'Conseil des Grands Savants',
                'es' => 'Consejo de Grandes Eruditos',
                'zh' => '资深学者委员会',
                'ru' => 'Совет старших учёных',
                'ur' => 'ہیئت کبار العلماء',
            ],
            'description' => [
                'ar' => 'هيئة كبار العلماء تضم ما يصل إلى 40 عضواً من كبار علماء الأزهر، أُعيد تأسيسها في 17 يوليو 2012م، وتختص بتقديم المشورة في الشؤون الدينية والفقهية.',
                'en' => 'The Council of Senior Scholars comprises up to 40 members of Al-Azhar\'s most distinguished scholars. Re-established on July 17, 2012, it advises on religious and jurisprudential matters.',
                'fr' => 'Le Conseil comprend jusqu\'a 40 membres des plus eminents erudits d\'Al-Azhar, retabli le 17 juillet 2012, il conseille sur les affaires religieuses et juridiques.',
                'es' => 'El Consejo comprende hasta 40 miembros de los eruditos mas distinguidos de Al-Azhar, restablecido el 17 de julio de 2012, asesora en asuntos religiosos y jurisprudenciales.',
                'zh' => '资深学者委员会由多达40名艾资哈尔最杰出的学者组成，于2012年7月17日重新建立，就宗教和法学事务提供咨询。',
                'ru' => 'Совет насчитывает до 40 членов из числа самых выдающихся учёных Аль-Азхара. Воссоздан 17 июля 2012 года, консультирует по религиозным и правовым вопросам.',
                'ur' => 'ہیئت کبار العلماء الازہر کے 40 تک ممتاز ترین علماء پر مشتمل ہے، 17 جولائی 2012 کو دوبارہ قائم ہوئی، دینی اور فقہی معاملات پر مشاورت دیتی ہے۔',
            ],
            'parent_id' => $grandImam->id,
            'is_published' => true,
            'order' => 12,
        ]);

        // Sawt Al-Azhar Newspaper
        OrganizationalUnit::create([
            'slug' => 'sawt-al-azhar-newspaper',
            'type' => 'media',
            'name' => [
                'ar' => 'جريدة صوت الأزهر',
                'en' => 'Sawt Al-Azhar Newspaper',
                'fr' => 'Journal Sawt Al-Azhar',
                'es' => 'Periodico Sawt Al-Azhar',
                'zh' => '艾资哈尔之声报',
                'ru' => 'Газета «Саут Аль-Азхар»',
                'ur' => 'جریدہ صوت الازہر',
            ],
            'description' => [
                'ar' => 'جريدة صوت الأزهر هي الجريدة الرسمية للأزهر الشريف، تنقل أخبار الأزهر وأنشطته وبياناته إلى الجمهور.',
                'en' => 'Sawt Al-Azhar is the official Al-Azhar newspaper, conveying Al-Azhar\'s news, activities, and statements to the public.',
                'fr' => 'Sawt Al-Azhar est le journal officiel d\'Al-Azhar, transmettant les nouvelles, activites et declarations d\'Al-Azhar au public.',
                'es' => 'Sawt Al-Azhar es el periodico oficial de Al-Azhar, transmitiendo las noticias, actividades y declaraciones de Al-Azhar al publico.',
                'zh' => '艾资哈尔之声是艾资哈尔的官方报纸，向公众传递艾资哈尔的新闻、活动和声明。',
                'ru' => '«Саут Аль-Азхар» — официальная газета Аль-Азхара, доносящая новости, мероприятия и заявления до общественности.',
                'ur' => 'صوت الازہر الازہر الشریف کا سرکاری اخبار ہے جو الازہر کی خبریں، سرگرمیاں اور بیانات عوام تک پہنچاتا ہے۔',
            ],
            'parent_id' => $grandImam->id,
            'is_published' => true,
            'order' => 13,
        ]);

        // Al-Azhar Magazine
        OrganizationalUnit::create([
            'slug' => 'al-azhar-magazine',
            'type' => 'media',
            'name' => [
                'ar' => 'مجلة الأزهر',
                'en' => 'Al-Azhar Magazine',
                'fr' => 'Magazine d\'Al-Azhar',
                'es' => 'Revista de Al-Azhar',
                'zh' => '艾资哈尔杂志',
                'ru' => 'Журнал «Аль-Азхар»',
                'ur' => 'مجلہ الازہر',
            ],
            'description' => [
                'ar' => 'مجلة الأزهر هي مجلة علمية شهرية تصدر عن مجمع البحوث الإسلامية منذ عام 1930م، وتنشر أبحاثاً ومقالات في العلوم الإسلامية والعربية.',
                'en' => 'Al-Azhar Magazine is a monthly scholarly journal published by the Islamic Research Academy since 1930, featuring research and articles on Islamic and Arabic sciences.',
                'fr' => 'Le Magazine d\'Al-Azhar est une revue savante mensuelle publiee par l\'Academie de Recherches Islamiques depuis 1930.',
                'es' => 'La Revista de Al-Azhar es una publicacion academica mensual publicada por la Academia de Investigacion Islamica desde 1930.',
                'zh' => '艾资哈尔杂志是伊斯兰研究院自1930年以来出版的月刊学术期刊，刊载伊斯兰和阿拉伯科学的研究与文章。',
                'ru' => 'Журнал «Аль-Азхар» — ежемесячное научное издание Академии исламских исследований, выходящее с 1930 года.',
                'ur' => 'مجلہ الازہر مجمع البحوث الاسلامیہ کا 1930 سے شائع ہونے والا ماہانہ علمی جریدہ ہے جو اسلامی اور عربی علوم پر تحقیق اور مقالات شائع کرتا ہے۔',
            ],
            'parent_id' => $islamicResearchAcademy->id,
            'is_published' => true,
            'order' => 1,
        ]);
    }
}
