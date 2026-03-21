<?php

namespace Database\Seeders;

use App\Models\Faculty;
use App\Models\LibraryItem;
use Illuminate\Database\Seeder;

class LibrarySeeder extends Seeder
{
    public function run(): void
    {
        $shariaFaculty = Faculty::whereJsonContains('name->en', 'Faculty of Sharia and Law')->first();
        $theologyFaculty = Faculty::whereJsonContains('name->en', 'Faculty of Theology')->first();
        $arabicFaculty = Faculty::whereJsonContains('name->en', 'Faculty of Arabic Language')->first();
        $scienceFaculty = Faculty::whereJsonContains('name->en', 'Faculty of Science')->first();
        $islamicStudies = Faculty::whereJsonContains('name->en', 'Faculty of Islamic Studies')->first();
        $engineeringFaculty = Faculty::whereJsonContains('name->en', 'Faculty of Engineering')->first();
        $medicineFaculty = Faculty::whereJsonContains('name->en', 'Faculty of Medicine')->first();

        $items = [
            // Manuscripts (4)
            [
                'slug' => 'al-risala-al-shafii',
                'title' => ['ar' => 'مخطوط الرسالة للإمام الشافعي', 'en' => 'Al-Risala Manuscript by Imam Al-Shafi\'i'],
                'subtitle' => ['ar' => 'أول كتاب في أصول الفقه الإسلامي', 'en' => 'The First Book on Islamic Legal Theory'],
                'description' => [
                    'ar' => 'مخطوط نادر من كتاب "الرسالة" للإمام محمد بن إدريس الشافعي، وهو أول مؤلف في علم أصول الفقه الإسلامي. يضع الإمام الشافعي في هذا الكتاب القواعد والأصول التي يُبنى عليها الاستنباط الفقهي من القرآن والسنة والإجماع والقياس.',
                    'en' => 'A rare manuscript of "Al-Risala" by Imam Muhammad ibn Idris al-Shafi\'i, the first work on Islamic legal theory (usul al-fiqh). In this book, Imam al-Shafi\'i establishes the principles and foundations for deriving legal rulings from the Quran, Sunnah, consensus, and analogical reasoning.',
                ],
                'abstract' => [
                    'ar' => 'يتناول الكتاب أصول الاستنباط الفقهي ومنهجية فهم النصوص الشرعية وترتيب الأدلة والجمع بين المتعارض منها.',
                    'en' => 'The book addresses the foundations of legal derivation, methodology for understanding religious texts, ordering of evidence, and reconciliation of apparently conflicting texts.',
                ],
                'type' => 'manuscript',
                'authors' => ['الإمام محمد بن إدريس الشافعي'],
                'subjects' => ['أصول الفقه', 'الفقه الإسلامي', 'علم المنهج'],
                'language' => 'ar',
                'era' => 'fatimid',
                'page_count' => 320,
                'access_level' => 'registered',
                'is_published' => true,
                'published_at' => now()->subMonths(6),
                'faculty_id' => $shariaFaculty?->id,
            ],
            [
                'slug' => 'ihya-ulum-al-din',
                'title' => ['ar' => 'مخطوط إحياء علوم الدين', 'en' => 'Ihya Ulum al-Din Manuscript'],
                'subtitle' => ['ar' => 'موسوعة الإمام الغزالي في التزكية والأخلاق', 'en' => 'Imam Al-Ghazali\'s Encyclopedia of Purification and Ethics'],
                'description' => [
                    'ar' => 'مخطوط قديم من كتاب "إحياء علوم الدين" لحجة الإسلام الإمام أبي حامد الغزالي. يعد هذا الكتاب من أعظم المؤلفات في التراث الإسلامي، ويتناول العبادات والعادات والمهلكات والمنجيات، ويجمع بين الفقه والتصوف والأخلاق.',
                    'en' => 'An ancient manuscript of "The Revival of the Religious Sciences" by Hujjat al-Islam Imam Abu Hamid al-Ghazali. This book is considered one of the greatest works in Islamic heritage, covering worship, customs, destructive vices, and saving virtues, combining jurisprudence, Sufism, and ethics.',
                ],
                'abstract' => [
                    'ar' => 'موسوعة شاملة في أربعة أرباع: العبادات، العادات، المهلكات، المنجيات. يعالج الجانب الروحي والأخلاقي في الإسلام.',
                    'en' => 'A comprehensive encyclopedia in four quarters: worship, customs, destructive vices, and saving virtues. It addresses the spiritual and ethical dimensions of Islam.',
                ],
                'type' => 'manuscript',
                'authors' => ['الإمام أبو حامد الغزالي'],
                'subjects' => ['التصوف', 'الأخلاق الإسلامية', 'الفقه'],
                'language' => 'ar',
                'era' => 'mamluk',
                'page_count' => 1480,
                'access_level' => 'premium',
                'is_published' => true,
                'published_at' => now()->subMonths(8),
                'faculty_id' => $theologyFaculty?->id,
            ],
            [
                'slug' => 'muqaddimah-ibn-khaldun',
                'title' => ['ar' => 'مخطوط المقدمة لابن خلدون', 'en' => 'Muqaddimah Manuscript by Ibn Khaldun'],
                'subtitle' => ['ar' => 'مقدمة في علم العمران البشري', 'en' => 'Prolegomenon to the Science of Human Civilization'],
                'description' => [
                    'ar' => 'مخطوط نادر من "المقدمة" للعلامة عبد الرحمن بن خلدون، الذي يُعد أول مؤلف في علم الاجتماع والعمران البشري. يحلل ابن خلدون في هذا العمل طبيعة المجتمعات والدول وأسباب قيامها وسقوطها، ويضع نظريات في الاقتصاد والتعليم والسياسة.',
                    'en' => 'A rare manuscript of the "Muqaddimah" by the scholar Abd al-Rahman ibn Khaldun, considered the first work on sociology and human civilization. In this work, Ibn Khaldun analyzes the nature of societies and states, the causes of their rise and fall, and develops theories on economics, education, and politics.',
                ],
                'abstract' => [
                    'ar' => 'دراسة تحليلية في طبيعة العمران والدول ومراحل تطورها وأسباب انهيارها، مع نظريات في الاقتصاد والعصبية والتعليم.',
                    'en' => 'An analytical study of civilization, states, stages of development, and causes of decline, with theories on economics, social solidarity, and education.',
                ],
                'type' => 'manuscript',
                'authors' => ['عبد الرحمن بن محمد بن خلدون'],
                'subjects' => ['علم الاجتماع', 'التاريخ', 'الفلسفة', 'العمران'],
                'language' => 'ar',
                'era' => 'mamluk',
                'page_count' => 890,
                'access_level' => 'premium',
                'is_published' => true,
                'published_at' => now()->subMonths(10),
                'faculty_id' => $islamicStudies?->id,
            ],
            [
                'slug' => 'tafsir-al-tabari',
                'title' => ['ar' => 'مخطوط تفسير الطبري', 'en' => 'Tafsir al-Tabari Manuscript'],
                'subtitle' => ['ar' => 'جامع البيان عن تأويل آي القرآن', 'en' => 'The Collection of Statements on Interpretation of Quranic Verses'],
                'description' => [
                    'ar' => 'مخطوط قديم من تفسير الإمام محمد بن جرير الطبري، المعروف بـ"جامع البيان عن تأويل آي القرآن". يُعد هذا التفسير من أشهر التفاسير بالمأثور في التراث الإسلامي، ويعتمد على الروايات والآثار في تفسير القرآن الكريم.',
                    'en' => 'An ancient manuscript of the exegesis by Imam Muhammad ibn Jarir al-Tabari, known as "Jami\' al-Bayan." This is considered one of the most famous tradition-based commentaries (tafsir bil-ma\'thur) in Islamic heritage, relying on narrations and reports in interpreting the Holy Quran.',
                ],
                'abstract' => [
                    'ar' => 'تفسير شامل للقرآن الكريم يعتمد على الرواية والنقل عن الصحابة والتابعين مع ترجيح الأقوال واختيار الراجح منها.',
                    'en' => 'A comprehensive Quranic commentary relying on narrations from Companions and Successors, with evaluation and selection of the strongest opinions.',
                ],
                'type' => 'manuscript',
                'authors' => ['الإمام محمد بن جرير الطبري'],
                'subjects' => ['التفسير', 'علوم القرآن'],
                'language' => 'ar',
                'era' => 'fatimid',
                'page_count' => 2400,
                'access_level' => 'registered',
                'is_published' => true,
                'published_at' => now()->subMonths(12),
                'faculty_id' => $theologyFaculty?->id,
            ],

            // Books (5)
            [
                'slug' => 'islamic-jurisprudence-and-evidence',
                'title' => ['ar' => 'الفقه الإسلامي وأدلته', 'en' => 'Islamic Jurisprudence and Its Evidence'],
                'subtitle' => ['ar' => 'الشامل للأدلة الشرعية والمذاهب الفقهية', 'en' => 'Comprehensive Guide to Legal Evidence and Jurisprudential Schools'],
                'description' => [
                    'ar' => 'موسوعة فقهية شاملة للدكتور وهبة الزحيلي تتناول أحكام الفقه الإسلامي مع أدلتها من الكتاب والسنة والإجماع والقياس، مع عرض آراء المذاهب الفقهية الأربعة والترجيح بينها. يُعد من أهم المراجع الفقهية المعاصرة.',
                    'en' => 'A comprehensive jurisprudential encyclopedia by Dr. Wahba al-Zuhayli covering Islamic jurisprudence rulings with evidence from the Quran, Sunnah, consensus, and analogy, presenting the views of the four schools of jurisprudence with comparative analysis. It is among the most important contemporary jurisprudential references.',
                ],
                'abstract' => [
                    'ar' => 'دراسة مقارنة للفقه الإسلامي تشمل جميع أبواب الفقه مع الأدلة والترجيح بين المذاهب.',
                    'en' => 'A comparative study of Islamic jurisprudence covering all chapters with evidence and comparative analysis across schools.',
                ],
                'type' => 'book',
                'authors' => ['د. وهبة الزحيلي'],
                'subjects' => ['الفقه الإسلامي', 'الفقه المقارن'],
                'publisher' => 'دار الفكر',
                'publication_year' => 1985,
                'language' => 'ar',
                'page_count' => 3200,
                'access_level' => 'free',
                'is_published' => true,
                'published_at' => now()->subMonths(3),
                'faculty_id' => $shariaFaculty?->id,
            ],
            [
                'slug' => 'foundations-of-islamic-jurisprudence',
                'title' => ['ar' => 'أصول الفقه الإسلامي', 'en' => 'Foundations of Islamic Jurisprudence'],
                'subtitle' => ['ar' => 'دراسة في المنهج والتطبيق', 'en' => 'A Study in Methodology and Application'],
                'description' => [
                    'ar' => 'كتاب أكاديمي متخصص في أصول الفقه الإسلامي يتناول القواعد والأصول التي يستنبط منها الفقهاء الأحكام الشرعية. يشمل مباحث الحكم الشرعي ومصادر التشريع وطرق الاستنباط والتعارض والترجيح.',
                    'en' => 'A specialized academic book on the foundations of Islamic jurisprudence, covering the rules and principles from which jurists derive legal rulings. It includes topics on legal rulings, sources of legislation, methods of derivation, and conflict resolution.',
                ],
                'abstract' => [
                    'ar' => 'دراسة أكاديمية في أصول الفقه تشمل الأدلة الشرعية وطرق الاستنباط والقواعد الأصولية.',
                    'en' => 'An academic study of jurisprudential foundations including legal evidence, derivation methods, and foundational rules.',
                ],
                'type' => 'book',
                'authors' => ['د. محمد سلام مدكور'],
                'subjects' => ['أصول الفقه', 'المنهج الفقهي'],
                'publisher' => 'مطبعة جامعة الأزهر',
                'publication_year' => 1990,
                'language' => 'ar',
                'page_count' => 560,
                'access_level' => 'free',
                'is_published' => true,
                'published_at' => now()->subMonths(4),
                'faculty_id' => $shariaFaculty?->id,
            ],
            [
                'slug' => 'history-of-al-azhar-thousand-years',
                'title' => ['ar' => 'تاريخ الأزهر في ألف عام', 'en' => 'History of Al-Azhar in a Thousand Years'],
                'subtitle' => ['ar' => 'رحلة عبر القرون من 972 إلى اليوم', 'en' => 'A Journey Through Centuries from 972 to Today'],
                'description' => [
                    'ar' => 'كتاب توثيقي شامل يروي تاريخ الأزهر الشريف منذ تأسيسه عام 972م وحتى العصر الحديث. يتناول الكتاب المراحل التاريخية المختلفة التي مر بها الأزهر والتحولات الكبرى في بنيته التعليمية والإدارية ودوره في الحياة السياسية والاجتماعية والثقافية.',
                    'en' => 'A comprehensive documentary book narrating the history of Al-Azhar from its founding in 972 CE to the modern era. The book covers the various historical phases, major transformations in its educational and administrative structure, and its role in political, social, and cultural life.',
                ],
                'abstract' => [
                    'ar' => 'توثيق تاريخي شامل لمسيرة الأزهر عبر العصور الفاطمية والمملوكية والعثمانية والحديثة.',
                    'en' => 'Comprehensive historical documentation of Al-Azhar\'s journey through the Fatimid, Mamluk, Ottoman, and modern eras.',
                ],
                'type' => 'book',
                'authors' => ['د. عبد العظيم رمضان'],
                'subjects' => ['تاريخ الأزهر', 'تاريخ مصر', 'التعليم الإسلامي'],
                'publisher' => 'الهيئة المصرية العامة للكتاب',
                'publication_year' => 1994,
                'language' => 'ar',
                'page_count' => 720,
                'access_level' => 'free',
                'is_published' => true,
                'published_at' => now()->subMonths(2),
                'faculty_id' => null,
            ],
            [
                'slug' => 'al-nahw-al-wafi',
                'title' => ['ar' => 'النحو الوافي', 'en' => 'Comprehensive Arabic Grammar'],
                'subtitle' => ['ar' => 'مع ربطه بالأساليب الرفيعة والحياة اللغوية المتجددة', 'en' => 'Linked with Elevated Styles and Renewed Linguistic Life'],
                'description' => [
                    'ar' => 'موسوعة نحوية شاملة للدكتور عباس حسن تتناول قواعد النحو العربي بأسلوب واضح ومنهجي. يعد هذا الكتاب من أهم المراجع في النحو العربي ويُدرَّس في كليات اللغة العربية بالأزهر والجامعات العربية.',
                    'en' => 'A comprehensive grammar encyclopedia by Dr. Abbas Hasan covering Arabic grammar rules in a clear and systematic manner. This book is among the most important references in Arabic grammar and is taught at Arabic language faculties at Al-Azhar and Arab universities.',
                ],
                'abstract' => [
                    'ar' => 'دراسة شاملة لقواعد النحو العربي مع التطبيقات والشواهد من القرآن والشعر والنثر.',
                    'en' => 'A comprehensive study of Arabic grammar rules with applications and examples from the Quran, poetry, and prose.',
                ],
                'type' => 'book',
                'authors' => ['د. عباس حسن'],
                'subjects' => ['النحو العربي', 'اللغة العربية'],
                'publisher' => 'دار المعارف',
                'publication_year' => 1975,
                'language' => 'ar',
                'page_count' => 2200,
                'access_level' => 'free',
                'is_published' => true,
                'published_at' => now()->subMonths(5),
                'faculty_id' => $arabicFaculty?->id,
            ],
            [
                'slug' => 'principles-of-islamic-medicine',
                'title' => ['ar' => 'مبادئ الطب الإسلامي', 'en' => 'Principles of Islamic Medicine'],
                'subtitle' => ['ar' => 'التراث الطبي الإسلامي وتطبيقاته المعاصرة', 'en' => 'Islamic Medical Heritage and Its Contemporary Applications'],
                'description' => [
                    'ar' => 'كتاب يستعرض التراث الطبي الإسلامي وإسهامات العلماء المسلمين في تطوير الطب، مع ربط هذا التراث بالتطبيقات الطبية المعاصرة. يتناول الأخلاق الطبية في الإسلام والقضايا الطبية المعاصرة من منظور شرعي.',
                    'en' => 'A book surveying Islamic medical heritage and Muslim scholars\' contributions to medical development, linking this heritage with contemporary medical applications. It covers medical ethics in Islam and contemporary medical issues from a Sharia perspective.',
                ],
                'abstract' => [
                    'ar' => 'دراسة في التراث الطبي الإسلامي والأخلاق الطبية وتطبيقات الطب الحديث من منظور إسلامي.',
                    'en' => 'A study of Islamic medical heritage, medical ethics, and modern medical applications from an Islamic perspective.',
                ],
                'type' => 'book',
                'authors' => ['د. أحمد شوقي الفنجري'],
                'subjects' => ['الطب الإسلامي', 'تاريخ الطب', 'الأخلاق الطبية'],
                'publisher' => 'مطبعة جامعة الأزهر',
                'publication_year' => 2005,
                'language' => 'ar',
                'page_count' => 380,
                'access_level' => 'free',
                'is_published' => true,
                'published_at' => now()->subMonths(1),
                'faculty_id' => $medicineFaculty?->id,
            ],

            // Theses (4)
            [
                'slug' => 'maqasid-approach-islamic-jurisprudence',
                'title' => ['ar' => 'المنهج المقاصدي في الفقه الإسلامي: دراسة تأصيلية تطبيقية', 'en' => 'The Maqasid Approach in Islamic Jurisprudence: A Foundational Applied Study'],
                'subtitle' => ['ar' => 'رسالة دكتوراه', 'en' => 'PhD Dissertation'],
                'description' => [
                    'ar' => 'رسالة دكتوراه تتناول المنهج المقاصدي في الفقه الإسلامي وكيفية توظيف مقاصد الشريعة في استنباط الأحكام الفقهية المعاصرة. تقدم الرسالة إطاراً نظرياً وتطبيقياً لفهم العلاقة بين المقاصد والأحكام الجزئية.',
                    'en' => 'A PhD dissertation examining the maqasid approach in Islamic jurisprudence and how to employ the objectives of Sharia in deriving contemporary jurisprudential rulings. The dissertation provides a theoretical and applied framework for understanding the relationship between objectives and specific rulings.',
                ],
                'abstract' => [
                    'ar' => 'دراسة تأصيلية تطبيقية في المنهج المقاصدي تهدف إلى بناء منهج متكامل لتوظيف المقاصد في الاجتهاد الفقهي المعاصر.',
                    'en' => 'A foundational applied study of the maqasid approach aimed at building an integrated methodology for employing objectives in contemporary jurisprudential reasoning.',
                ],
                'type' => 'thesis',
                'authors' => ['د. عبد الرحمن محمد السيد'],
                'subjects' => ['مقاصد الشريعة', 'الفقه الإسلامي', 'الاجتهاد'],
                'publisher' => 'جامعة الأزهر',
                'publication_year' => 2022,
                'language' => 'ar',
                'page_count' => 450,
                'access_level' => 'registered',
                'is_published' => true,
                'published_at' => now()->subMonths(7),
                'faculty_id' => $shariaFaculty?->id,
            ],
            [
                'slug' => 'linguistic-phenomena-quran',
                'title' => ['ar' => 'الظواهر اللغوية في القرآن الكريم: دراسة تحليلية', 'en' => 'Linguistic Phenomena in the Holy Quran: An Analytical Study'],
                'subtitle' => ['ar' => 'رسالة ماجستير', 'en' => 'Master\'s Thesis'],
                'description' => [
                    'ar' => 'رسالة ماجستير تدرس الظواهر اللغوية الفريدة في القرآن الكريم من حيث التركيب والدلالة والبلاغة. تحلل الرسالة أساليب القرآن في التعبير وتكشف عن جوانب الإعجاز اللغوي.',
                    'en' => 'A Master\'s thesis studying unique linguistic phenomena in the Holy Quran in terms of syntax, semantics, and rhetoric. The thesis analyzes Quranic expression methods and reveals aspects of linguistic inimitability.',
                ],
                'abstract' => [
                    'ar' => 'دراسة تحليلية للظواهر اللغوية القرآنية تشمل التقديم والتأخير والحذف والذكر والتعريف والتنكير.',
                    'en' => 'An analytical study of Quranic linguistic phenomena including fronting, omission, mention, and use of definite and indefinite forms.',
                ],
                'type' => 'thesis',
                'authors' => ['أ. فاطمة أحمد حسين'],
                'subjects' => ['اللغة العربية', 'الإعجاز اللغوي', 'علوم القرآن'],
                'publisher' => 'جامعة الأزهر',
                'publication_year' => 2023,
                'language' => 'ar',
                'page_count' => 280,
                'access_level' => 'registered',
                'is_published' => true,
                'published_at' => now()->subMonths(9),
                'faculty_id' => $arabicFaculty?->id,
            ],
            [
                'slug' => 'interfaith-dialogue-contemporary-thought',
                'title' => ['ar' => 'الحوار بين الأديان في الفكر الإسلامي المعاصر', 'en' => 'Interfaith Dialogue in Contemporary Islamic Thought'],
                'subtitle' => ['ar' => 'رسالة دكتوراه', 'en' => 'PhD Dissertation'],
                'description' => [
                    'ar' => 'رسالة دكتوراه تبحث في أسس الحوار بين الأديان من منظور إسلامي، وتستعرض جهود العلماء المسلمين المعاصرين في هذا المجال. تتناول الرسالة التجربة الأزهرية في الحوار مع الفاتيكان والكنائس المسيحية.',
                    'en' => 'A PhD dissertation examining the foundations of interfaith dialogue from an Islamic perspective, reviewing the efforts of contemporary Muslim scholars in this field. The dissertation covers Al-Azhar\'s experience in dialogue with the Vatican and Christian churches.',
                ],
                'abstract' => [
                    'ar' => 'بحث في أسس الحوار بين الأديان إسلامياً مع دراسة تطبيقية لتجربة الأزهر في الحوار مع الآخر.',
                    'en' => 'Research on the foundations of interfaith dialogue from an Islamic perspective with an applied study of Al-Azhar\'s experience in dialogue with others.',
                ],
                'type' => 'thesis',
                'authors' => ['د. محمود عبد الله النجار'],
                'subjects' => ['حوار الأديان', 'الفكر الإسلامي', 'الدراسات المقارنة'],
                'publisher' => 'جامعة الأزهر',
                'publication_year' => 2021,
                'language' => 'ar',
                'page_count' => 520,
                'access_level' => 'free',
                'is_published' => true,
                'published_at' => now()->subMonths(11),
                'faculty_id' => $islamicStudies?->id,
            ],
            [
                'slug' => 'islamic-economics-sustainable-development',
                'title' => ['ar' => 'الاقتصاد الإسلامي ودوره في التنمية المستدامة', 'en' => 'Islamic Economics and Its Role in Sustainable Development'],
                'subtitle' => ['ar' => 'رسالة ماجستير', 'en' => 'Master\'s Thesis'],
                'description' => [
                    'ar' => 'رسالة ماجستير تتناول دور الاقتصاد الإسلامي في تحقيق التنمية المستدامة. تستعرض الرسالة مبادئ الاقتصاد الإسلامي وأدواته المالية وكيف يمكن توظيفها لتحقيق أهداف التنمية المستدامة للأمم المتحدة.',
                    'en' => 'A Master\'s thesis examining the role of Islamic economics in achieving sustainable development. The thesis reviews Islamic economic principles, financial instruments, and how they can be employed to achieve the UN Sustainable Development Goals.',
                ],
                'abstract' => [
                    'ar' => 'دراسة تحليلية لدور الاقتصاد الإسلامي وأدواته المالية في تحقيق أهداف التنمية المستدامة.',
                    'en' => 'An analytical study of the role of Islamic economics and its financial instruments in achieving sustainable development goals.',
                ],
                'type' => 'thesis',
                'authors' => ['أ. أحمد سعيد المصري'],
                'subjects' => ['الاقتصاد الإسلامي', 'التنمية المستدامة', 'التمويل الإسلامي'],
                'publisher' => 'جامعة الأزهر',
                'publication_year' => 2024,
                'language' => 'ar',
                'page_count' => 310,
                'access_level' => 'registered',
                'is_published' => true,
                'published_at' => now()->subMonths(4),
                'faculty_id' => null,
            ],

            // Research Papers (4)
            [
                'slug' => 'ai-in-islamic-education',
                'title' => ['ar' => 'الذكاء الاصطناعي في خدمة التعليم الإسلامي', 'en' => 'Artificial Intelligence in Service of Islamic Education'],
                'subtitle' => ['ar' => 'بحث علمي محكّم', 'en' => 'Peer-Reviewed Research Paper'],
                'description' => [
                    'ar' => 'بحث علمي يستكشف تطبيقات الذكاء الاصطناعي في مجال التعليم الإسلامي، بما في ذلك تحليل النصوص العربية القديمة وأتمتة استخراج الأحكام الفقهية والتعلم التكيفي للطلاب. يقترح البحث إطاراً عملياً لدمج تقنيات الذكاء الاصطناعي في المناهج الأزهرية.',
                    'en' => 'A research paper exploring AI applications in Islamic education, including analysis of classical Arabic texts, automation of jurisprudential ruling extraction, and adaptive learning for students. The paper proposes a practical framework for integrating AI technologies into Azhari curricula.',
                ],
                'abstract' => [
                    'ar' => 'يستكشف البحث إمكانية استخدام تقنيات الذكاء الاصطناعي في تطوير التعليم الأزهري وتحليل التراث الإسلامي.',
                    'en' => 'The research explores the potential of using AI technologies in developing Azhari education and analyzing Islamic heritage.',
                ],
                'type' => 'research',
                'authors' => ['د. خالد محمد العتيبي', 'د. سارة أحمد الحسيني'],
                'subjects' => ['الذكاء الاصطناعي', 'التعليم الإسلامي', 'التكنولوجيا'],
                'publication_year' => 2025,
                'language' => 'ar',
                'page_count' => 35,
                'access_level' => 'free',
                'is_published' => true,
                'published_at' => now()->subMonths(2),
                'faculty_id' => $engineeringFaculty?->id,
            ],
            [
                'slug' => 'contemporary-challenges-islamic-jurisprudence',
                'title' => ['ar' => 'التحديات المعاصرة في الفقه الإسلامي', 'en' => 'Contemporary Challenges in Islamic Jurisprudence'],
                'subtitle' => ['ar' => 'بحث علمي محكّم', 'en' => 'Peer-Reviewed Research Paper'],
                'description' => [
                    'ar' => 'بحث يتناول القضايا الفقهية المعاصرة مثل العملات الرقمية والتجارة الإلكترونية والهندسة الوراثية من منظور الفقه الإسلامي. يحلل البحث كيفية تطبيق المبادئ الفقهية التقليدية على المستجدات التقنية والعلمية المعاصرة.',
                    'en' => 'A research paper addressing contemporary jurisprudential issues such as digital currencies, e-commerce, and genetic engineering from an Islamic jurisprudence perspective. The paper analyzes how to apply traditional jurisprudential principles to contemporary technological and scientific developments.',
                ],
                'abstract' => [
                    'ar' => 'دراسة في التحديات الفقهية المعاصرة وكيفية تطبيق القواعد الفقهية التقليدية على المستجدات الحديثة.',
                    'en' => 'A study of contemporary jurisprudential challenges and how to apply traditional rules to modern developments.',
                ],
                'type' => 'research',
                'authors' => ['د. عبد الله حسن الشريف'],
                'subjects' => ['الفقه المعاصر', 'النوازل الفقهية', 'التكنولوجيا والشريعة'],
                'publication_year' => 2025,
                'language' => 'ar',
                'page_count' => 42,
                'access_level' => 'free',
                'is_published' => true,
                'published_at' => now()->subMonths(3),
                'faculty_id' => $shariaFaculty?->id,
            ],
            [
                'slug' => 'integrative-methodology-teaching-islamic-sciences',
                'title' => ['ar' => 'نحو منهج تكاملي لتدريس العلوم الشرعية', 'en' => 'Towards an Integrative Methodology for Teaching Islamic Sciences'],
                'subtitle' => ['ar' => 'بحث علمي محكّم', 'en' => 'Peer-Reviewed Research Paper'],
                'description' => [
                    'ar' => 'بحث تربوي يقترح منهجاً تكاملياً لتدريس العلوم الشرعية يجمع بين الأصالة والمعاصرة. يتناول البحث أساليب التدريس الحديثة وتوظيف التكنولوجيا في التعليم الشرعي مع الحفاظ على المنهج الأزهري التقليدي.',
                    'en' => 'An educational research paper proposing an integrative methodology for teaching Islamic sciences that combines authenticity and modernity. The paper covers modern teaching methods and technology integration in Islamic education while preserving the traditional Azhari methodology.',
                ],
                'abstract' => [
                    'ar' => 'اقتراح منهج تكاملي يجمع بين أساليب التدريس التقليدية والحديثة في العلوم الشرعية.',
                    'en' => 'A proposal for an integrative methodology combining traditional and modern teaching methods in Islamic sciences.',
                ],
                'type' => 'research',
                'authors' => ['د. نور الدين محمد عيسى'],
                'subjects' => ['التعليم الشرعي', 'المناهج التربوية', 'تطوير التعليم'],
                'publication_year' => 2024,
                'language' => 'ar',
                'page_count' => 28,
                'access_level' => 'free',
                'is_published' => true,
                'published_at' => now()->subMonths(6),
                'faculty_id' => $islamicStudies?->id,
            ],
            [
                'slug' => 'nanotechnology-water-treatment-desert',
                'title' => ['ar' => 'تطبيقات النانو تكنولوجي في معالجة المياه بالمناطق الصحراوية', 'en' => 'Nanotechnology Applications in Water Treatment for Desert Regions'],
                'subtitle' => ['ar' => 'بحث علمي محكّم', 'en' => 'Peer-Reviewed Research Paper'],
                'description' => [
                    'ar' => 'بحث علمي يستعرض تطبيقات تقنية النانو في معالجة وتنقية المياه في المناطق الصحراوية. يقدم البحث نتائج تجريبية واعدة لاستخدام جسيمات نانوية مبتكرة في إزالة الملوثات وتحلية المياه بتكلفة منخفضة.',
                    'en' => 'A research paper reviewing nanotechnology applications in water treatment and purification for desert regions. The paper presents promising experimental results for using innovative nanoparticles in pollutant removal and water desalination at low cost.',
                ],
                'abstract' => [
                    'ar' => 'دراسة تجريبية في استخدام تقنية النانو لمعالجة المياه في البيئات الصحراوية.',
                    'en' => 'An experimental study on using nanotechnology for water treatment in desert environments.',
                ],
                'type' => 'research',
                'authors' => ['د. مصطفى إبراهيم عبد الحميد', 'د. هالة محمد السيد'],
                'subjects' => ['النانو تكنولوجي', 'معالجة المياه', 'العلوم البيئية'],
                'publication_year' => 2025,
                'language' => 'ar',
                'page_count' => 22,
                'access_level' => 'free',
                'is_published' => true,
                'published_at' => now()->subMonths(1),
                'faculty_id' => $scienceFaculty?->id,
            ],

            // Journal Articles (3)
            [
                'slug' => 'moderation-in-azhari-thought',
                'title' => ['ar' => 'الوسطية في الفكر الأزهري: دراسة تاريخية تحليلية', 'en' => 'Moderation in Azhari Thought: A Historical Analytical Study'],
                'subtitle' => ['ar' => 'مجلة الأزهر العالمية - العدد 47', 'en' => 'Al-Azhar International Journal - Issue 47'],
                'description' => [
                    'ar' => 'مقال علمي منشور في مجلة الأزهر العالمية يتناول مفهوم الوسطية في الفكر الأزهري عبر التاريخ. يحلل المقال كيف حافظ الأزهر على نهج الوسطية والاعتدال في مواجهة التيارات المتطرفة على مر العصور.',
                    'en' => 'A scholarly article published in Al-Azhar International Journal examining the concept of moderation in Azhari thought throughout history. The article analyzes how Al-Azhar maintained its moderate approach in facing extremist currents across the ages.',
                ],
                'abstract' => [
                    'ar' => 'تحليل تاريخي لمنهج الوسطية في الفكر الأزهري ودوره في مواجهة التطرف.',
                    'en' => 'A historical analysis of the moderation approach in Azhari thought and its role in countering extremism.',
                ],
                'type' => 'journal_article',
                'authors' => ['د. حسن محمد الشافعي'],
                'subjects' => ['الوسطية', 'الفكر الأزهري', 'التاريخ الإسلامي'],
                'publisher' => 'مجلة الأزهر العالمية',
                'publication_year' => 2025,
                'issn' => '1110-6344',
                'language' => 'ar',
                'page_count' => 18,
                'access_level' => 'free',
                'is_published' => true,
                'published_at' => now()->subMonths(1),
                'faculty_id' => $theologyFaculty?->id,
            ],
            [
                'slug' => 'womens-role-azhari-education',
                'title' => ['ar' => 'دور المرأة في التعليم الأزهري: من التراث إلى الحاضر', 'en' => 'Women\'s Role in Azhari Education: From Heritage to Present'],
                'subtitle' => ['ar' => 'مجلة الأزهر العالمية - العدد 46', 'en' => 'Al-Azhar International Journal - Issue 46'],
                'description' => [
                    'ar' => 'مقال يرصد تطور دور المرأة في التعليم الأزهري منذ العصور القديمة وحتى اليوم. يستعرض المقال إسهامات العالمات المسلمات في العلوم الشرعية واللغوية وكيف فتح الأزهر أبوابه للمرأة في العصر الحديث.',
                    'en' => 'An article tracking the evolution of women\'s role in Azhari education from ancient times to today. The article reviews Muslim women scholars\' contributions to Islamic and linguistic sciences and how Al-Azhar opened its doors to women in the modern era.',
                ],
                'abstract' => [
                    'ar' => 'دراسة تاريخية وتحليلية لدور المرأة في التعليم الأزهري عبر العصور.',
                    'en' => 'A historical and analytical study of women\'s role in Azhari education across the ages.',
                ],
                'type' => 'journal_article',
                'authors' => ['د. آمنة محمد السيد'],
                'subjects' => ['المرأة والتعليم', 'تاريخ الأزهر', 'الدراسات الاجتماعية'],
                'publisher' => 'مجلة الأزهر العالمية',
                'publication_year' => 2024,
                'issn' => '1110-6344',
                'language' => 'ar',
                'page_count' => 24,
                'access_level' => 'free',
                'is_published' => true,
                'published_at' => now()->subMonths(5),
                'faculty_id' => $islamicStudies?->id,
            ],
            [
                'slug' => 'azhar-modern-technologies-future-vision',
                'title' => ['ar' => 'الأزهر والتقنيات الحديثة: رؤية مستقبلية', 'en' => 'Al-Azhar and Modern Technologies: A Future Vision'],
                'subtitle' => ['ar' => 'مجلة الأزهر العالمية - العدد 48', 'en' => 'Al-Azhar International Journal - Issue 48'],
                'description' => [
                    'ar' => 'مقال علمي يقدم رؤية مستقبلية لتوظيف التقنيات الحديثة في منظومة الأزهر التعليمية والبحثية. يتناول المقال الواقع الافتراضي والذكاء الاصطناعي وسلسلة الكتل وكيف يمكن استخدامها في حفظ التراث الإسلامي وتطوير التعليم.',
                    'en' => 'A scholarly article presenting a future vision for employing modern technologies in Al-Azhar\'s educational and research system. The article covers virtual reality, artificial intelligence, blockchain, and how they can be used in preserving Islamic heritage and developing education.',
                ],
                'abstract' => [
                    'ar' => 'رؤية مستقبلية لتوظيف التكنولوجيا الحديثة في خدمة التعليم والبحث العلمي بالأزهر.',
                    'en' => 'A future vision for employing modern technology in service of education and research at Al-Azhar.',
                ],
                'type' => 'journal_article',
                'authors' => ['د. أحمد علي المهدي'],
                'subjects' => ['التكنولوجيا', 'التعليم', 'الذكاء الاصطناعي'],
                'publisher' => 'مجلة الأزهر العالمية',
                'publication_year' => 2025,
                'issn' => '1110-6344',
                'language' => 'ar',
                'page_count' => 20,
                'access_level' => 'free',
                'is_published' => true,
                'published_at' => now()->subWeeks(2),
                'faculty_id' => $engineeringFaculty?->id,
            ],
        ];

        foreach ($items as $data) {
            $item = new LibraryItem();
            $item->slug = $data['slug'];
            $item->title = $data['title'];
            $item->subtitle = $data['subtitle'];
            $item->description = $data['description'];
            $item->abstract = $data['abstract'];
            $item->type = $data['type'];
            $item->authors = $data['authors'];
            $item->subjects = $data['subjects'];
            $item->publisher = $data['publisher'] ?? null;
            $item->publication_year = $data['publication_year'] ?? null;
            $item->isbn = $data['isbn'] ?? null;
            $item->issn = $data['issn'] ?? null;
            $item->language = $data['language'];
            $item->era = $data['era'] ?? null;
            $item->page_count = $data['page_count'] ?? null;
            $item->access_level = $data['access_level'];
            $item->is_published = $data['is_published'];
            $item->published_at = $data['published_at'];
            $item->faculty_id = $data['faculty_id'];
            $item->save();
        }
    }
}
