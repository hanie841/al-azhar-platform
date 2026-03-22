<?php

namespace Database\Seeders;

use App\Models\LibraryCollection;
use App\Models\LibraryItem;
use Illuminate\Database\Seeder;

class LibraryCollectionSeeder extends Seeder
{
    public function run(): void
    {
        // Collection 1: Manuscript Treasures
        $manuscripts = new LibraryCollection();
        $manuscripts->slug = 'manuscript-treasures';
        $manuscripts->name = [
            'ar' => 'كنوز المخطوطات',
            'en' => 'Manuscript Treasures',
            'fr' => 'Tresors de manuscrits',
            'es' => 'Tesoros de manuscritos',
            'zh' => '手稿珍品',
            'ru' => 'Сокровища рукописей',
            'ur' => 'مخطوطات کے خزانے',
        ];
        $manuscripts->description = [
            'ar' => 'مجموعة نادرة من المخطوطات الإسلامية القديمة التي تحتفظ بها مكتبة جامعة الأزهر. تضم مخطوطات في التفسير والفقه والطب والتاريخ والفلسفة تعود إلى قرون من الزمن، بما في ذلك مصاحف كوفية ونسخ من المقدمة لابن خلدون والقانون في الطب لابن سينا.',
            'en' => 'A rare collection of ancient Islamic manuscripts preserved at Al-Azhar University Library. This collection includes manuscripts on exegesis, jurisprudence, medicine, history, and philosophy dating back centuries, including Kufic Quran codices, copies of Ibn Khaldun\'s Muqaddimah, and Avicenna\'s Canon of Medicine.',
            'fr' => 'Une rare collection de manuscrits islamiques anciens conserves a la bibliotheque de l\'Universite Al-Azhar. Cette collection comprend des manuscrits sur l\'exegese, la jurisprudence, la medecine, l\'histoire et la philosophie remontant a des siecles.',
            'es' => 'Una rara coleccion de manuscritos islamicos antiguos conservados en la biblioteca de la Universidad Al-Azhar. Esta coleccion incluye manuscritos sobre exegesis, jurisprudencia, medicina, historia y filosofia de siglos de antiguedad.',
            'zh' => '艾资哈尔大学图书馆保存的珍贵古代伊斯兰手稿集。收藏包括古兰经注释、教法学、医学、历史和哲学等领域的手稿，可追溯到数个世纪前，包括库法体古兰经抄本、伊本·赫勒敦的《绪论》和伊本·西那的《医典》。',
            'ru' => 'Редкая коллекция древних исламских рукописей, хранящихся в библиотеке Университета Аль-Азхар. Коллекция включает рукописи по тафсиру, юриспруденции, медицине, истории и философии, датируемые многовековой давностью.',
            'ur' => 'الازہر یونیورسٹی لائبریری میں محفوظ قدیم اسلامی مخطوطات کا نادر ذخیرہ۔ اس مجموعے میں تفسیر، فقہ، طب، تاریخ اور فلسفے پر صدیوں پرانے مخطوطات شامل ہیں، بشمول کوفی قرآنی نسخے، ابن خلدون کی مقدمہ اور ابن سینا کی القانون فی الطب۔',
        ];
        $manuscripts->is_published = true;
        $manuscripts->save();

        // Collection 2: Pillars of Islamic Jurisprudence
        $fiqh = new LibraryCollection();
        $fiqh->slug = 'pillars-of-islamic-jurisprudence';
        $fiqh->name = [
            'ar' => 'أعمدة الفقه الإسلامي',
            'en' => 'Pillars of Islamic Jurisprudence',
            'fr' => 'Piliers de la jurisprudence islamique',
            'es' => 'Pilares de la jurisprudencia islamica',
            'zh' => '伊斯兰教法学支柱',
            'ru' => 'Столпы исламской юриспруденции',
            'ur' => 'فقہ اسلامی کے ستون',
        ];
        $fiqh->description = [
            'ar' => 'مجموعة من أهم المراجع والمؤلفات في الفقه الإسلامي وأصوله، تشمل الموسوعات الفقهية والدراسات المقارنة بين المذاهب والبحوث المعاصرة في النوازل الفقهية.',
            'en' => 'A collection of the most important references and works in Islamic jurisprudence and its foundations, including jurisprudential encyclopedias, comparative studies across schools, and contemporary research on emerging legal issues.',
            'fr' => 'Une collection des references et ouvrages les plus importants en jurisprudence islamique et ses fondements, comprenant des encyclopedies juridiques, des etudes comparatives entre les ecoles et des recherches contemporaines.',
            'es' => 'Una coleccion de las referencias y obras mas importantes en la jurisprudencia islamica y sus fundamentos, incluyendo enciclopedias juridicas, estudios comparativos entre escuelas e investigaciones contemporaneas.',
            'zh' => '伊斯兰教法学及其基础领域最重要的参考文献和著作集，包括教法学百科全书、各学派比较研究和当代新兴法律问题研究。',
            'ru' => 'Коллекция важнейших справочников и трудов по исламской юриспруденции и её основам, включая юридические энциклопедии, сравнительные исследования школ и современные исследования.',
            'ur' => 'فقہ اسلامی اور اس کے اصول میں اہم ترین مراجع اور تصانیف کا مجموعہ، بشمول فقہی دائرۃ المعارف، مذاہب کے درمیان تقابلی مطالعات اور عصری نوازل پر تحقیقات۔',
        ];
        $fiqh->is_published = true;
        $fiqh->save();

        // Collection 3: Contemporary Azhari Studies
        $contemporary = new LibraryCollection();
        $contemporary->slug = 'contemporary-azhari-studies';
        $contemporary->name = [
            'ar' => 'دراسات أزهرية معاصرة',
            'en' => 'Contemporary Azhari Studies',
            'fr' => 'Etudes azharies contemporaines',
            'es' => 'Estudios azhari contemporaneos',
            'zh' => '当代艾资哈尔研究',
            'ru' => 'Современные азхарские исследования',
            'ur' => 'عصری ازہری مطالعات',
        ];
        $contemporary->description = [
            'ar' => 'مجموعة من الأبحاث والدراسات والرسائل العلمية الحديثة التي أنتجها باحثو وأساتذة جامعة الأزهر في مختلف التخصصات الشرعية واللغوية والعلمية.',
            'en' => 'A collection of recent research, studies, and theses produced by Al-Azhar University researchers and professors across various Islamic, linguistic, and scientific disciplines.',
            'fr' => 'Une collection de recherches, etudes et theses recentes produites par les chercheurs et professeurs de l\'Universite Al-Azhar dans diverses disciplines islamiques, linguistiques et scientifiques.',
            'es' => 'Una coleccion de investigaciones, estudios y tesis recientes producidos por investigadores y profesores de la Universidad Al-Azhar en diversas disciplinas islamicas, linguisticas y cientificas.',
            'zh' => '艾资哈尔大学研究人员和教授在各伊斯兰、语言和科学学科领域最近产出的研究、论文和学位论文集。',
            'ru' => 'Коллекция недавних исследований, работ и диссертаций, подготовленных исследователями и преподавателями Университета Аль-Азхар в различных исламских, языковых и научных дисциплинах.',
            'ur' => 'الازہر یونیورسٹی کے محققین اور اساتذہ کی مختلف شرعی، لسانی اور سائنسی تخصصات میں تیار کردہ حالیہ تحقیقات، مطالعات اور علمی مقالات کا مجموعہ۔',
        ];
        $contemporary->is_published = true;
        $contemporary->save();

        // Collection 4: Science & Innovation
        $science = new LibraryCollection();
        $science->slug = 'science-and-innovation';
        $science->name = [
            'ar' => 'العلوم والابتكار',
            'en' => 'Science and Innovation',
            'fr' => 'Science et innovation',
            'es' => 'Ciencia e innovacion',
            'zh' => '科学与创新',
            'ru' => 'Наука и инновации',
            'ur' => 'سائنس اور جدت',
        ];
        $science->description = [
            'ar' => 'مجموعة من الأبحاث والدراسات المتعلقة بتطبيقات الذكاء الاصطناعي والتكنولوجيا الحديثة والعلوم التطبيقية، تعكس مساهمات الأزهر في مجالات العلوم والتقنية.',
            'en' => 'A collection of research and studies related to artificial intelligence applications, modern technology, and applied sciences, reflecting Al-Azhar\'s contributions to science and technology fields.',
            'fr' => 'Une collection de recherches et d\'etudes liees aux applications de l\'intelligence artificielle, aux technologies modernes et aux sciences appliquees, refletant les contributions d\'Al-Azhar aux domaines de la science et de la technologie.',
            'es' => 'Una coleccion de investigaciones y estudios relacionados con aplicaciones de inteligencia artificial, tecnologia moderna y ciencias aplicadas, que refleja las contribuciones de Al-Azhar a los campos de la ciencia y la tecnologia.',
            'zh' => '与人工智能应用、现代技术和应用科学相关的研究和论文集，反映了艾资哈尔对科学和技术领域的贡献。',
            'ru' => 'Коллекция исследований и работ, связанных с применением искусственного интеллекта, современными технологиями и прикладными науками, отражающая вклад Аль-Азхара в науку и технологии.',
            'ur' => 'مصنوعی ذہانت کے اطلاقات، جدید ٹیکنالوجی اور اطلاقی سائنسز سے متعلق تحقیقات اور مطالعات کا مجموعہ، جو سائنس اور ٹیکنالوجی کے شعبوں میں الازہر کی شراکت کی عکاسی کرتا ہے۔',
        ];
        $science->is_published = true;
        $science->save();

        // Attach items to collections
        $manuscriptItems = LibraryItem::where('type', 'manuscript')->get();
        foreach ($manuscriptItems as $index => $item) {
            $manuscripts->items()->attach($item->id, ['order' => $index + 1]);
        }

        // Pillars of Islamic Jurisprudence: fiqh-related books and theses
        $fiqhItems = LibraryItem::where(function ($q) {
            $q->where('subjects', 'like', '%الفقه%')
              ->orWhere('subjects', 'like', '%أصول الفقه%')
              ->orWhere('subjects', 'like', '%مقاصد الشريعة%');
        })->get();
        foreach ($fiqhItems as $index => $item) {
            $fiqh->items()->attach($item->id, ['order' => $index + 1]);
        }

        // Contemporary Azhari Studies: theses and journal articles
        $contemporaryItems = LibraryItem::whereIn('type', ['thesis', 'journal_article'])->get();
        foreach ($contemporaryItems as $index => $item) {
            $contemporary->items()->attach($item->id, ['order' => $index + 1]);
        }

        // Science & Innovation
        $scienceItems = LibraryItem::where(function ($q) {
            $q->where('subjects', 'like', '%الذكاء الاصطناعي%')
              ->orWhere('subjects', 'like', '%التكنولوجيا%')
              ->orWhere('subjects', 'like', '%النانو%')
              ->orWhere('type', 'research');
        })->get();
        foreach ($scienceItems as $index => $item) {
            $science->items()->attach($item->id, ['order' => $index + 1]);
        }
    }
}
