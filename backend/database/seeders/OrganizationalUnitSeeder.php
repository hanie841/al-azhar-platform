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
        OrganizationalUnit::create([
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
    }
}
