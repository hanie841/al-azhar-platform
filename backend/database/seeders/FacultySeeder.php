<?php

namespace Database\Seeders;

use App\Models\Faculty;
use Illuminate\Database\Seeder;

class FacultySeeder extends Seeder
{
    public function run(): void
    {
        $faculties = [
            [
                'slug' => 'faculty-of-theology',
                'name' => ['ar' => 'كلية أصول الدين', 'en' => 'Faculty of Theology'],
                'type' => 'faculty',
                'established_year' => 1930,
                'description' => [
                    'ar' => 'تعد كلية أصول الدين من أعرق كليات جامعة الأزهر، تأسست عام 1930م وتختص بدراسة العقيدة الإسلامية والفلسفة الإسلامية والتفسير والحديث والدعوة. تهدف الكلية إلى إعداد علماء متخصصين في أصول الدين قادرين على الدفاع عن العقيدة الإسلامية بالحجة والبرهان.',
                    'en' => 'The Faculty of Theology is one of the oldest faculties at Al-Azhar University, established in 1930. It specializes in Islamic creed, Islamic philosophy, Quranic exegesis, Hadith, and Da\'wa. The faculty aims to prepare specialized scholars in theology capable of defending Islamic creed through rational evidence.',
                ],
                'dean_message' => [
                    'ar' => 'نسعى في كلية أصول الدين إلى تخريج علماء يحملون رسالة الوسطية والاعتدال، ويدافعون عن صحيح الإسلام بالعلم والمعرفة.',
                    'en' => 'At the Faculty of Theology, we strive to graduate scholars who carry the message of moderation and defend authentic Islam through knowledge and scholarship.',
                ],
                'is_published' => true,
                'order' => 1,
            ],
            [
                'slug' => 'faculty-of-sharia-and-law',
                'name' => ['ar' => 'كلية الشريعة والقانون', 'en' => 'Faculty of Sharia and Law'],
                'type' => 'faculty',
                'established_year' => 1930,
                'description' => [
                    'ar' => 'كلية الشريعة والقانون من الكليات المؤسسة لجامعة الأزهر، تأسست عام 1930م وتجمع بين دراسة الفقه الإسلامي بمذاهبه المختلفة والقانون الوضعي المعاصر. تخرج الكلية قضاة ومحامين ومفتين قادرين على الربط بين الشريعة الإسلامية والأنظمة القانونية الحديثة.',
                    'en' => 'The Faculty of Sharia and Law is one of Al-Azhar University\'s founding faculties, established in 1930. It combines the study of Islamic jurisprudence across various schools of thought with contemporary law. The faculty graduates judges, lawyers, and muftis capable of bridging Islamic Sharia and modern legal systems.',
                ],
                'dean_message' => [
                    'ar' => 'نحرص في كلية الشريعة والقانون على تأهيل خريجين يجمعون بين الفقه الإسلامي العميق والمعرفة القانونية المعاصرة لخدمة المجتمع.',
                    'en' => 'At the Faculty of Sharia and Law, we are dedicated to qualifying graduates who combine deep Islamic jurisprudence with contemporary legal knowledge to serve society.',
                ],
                'is_published' => true,
                'order' => 2,
            ],
            [
                'slug' => 'faculty-of-arabic-language',
                'name' => ['ar' => 'كلية اللغة العربية', 'en' => 'Faculty of Arabic Language'],
                'type' => 'faculty',
                'established_year' => 1930,
                'description' => [
                    'ar' => 'كلية اللغة العربية من الكليات الثلاث المؤسسة لجامعة الأزهر عام 1930م. تختص بدراسة النحو والصرف والبلاغة والأدب العربي والنقد الأدبي. تعد الكلية المرجع الأول في العالم الإسلامي للحفاظ على اللغة العربية وعلومها.',
                    'en' => 'The Faculty of Arabic Language is one of the three founding faculties of Al-Azhar University in 1930. It specializes in grammar, morphology, rhetoric, Arabic literature, and literary criticism. The faculty is the foremost reference in the Islamic world for preserving Arabic language and its sciences.',
                ],
                'dean_message' => [
                    'ar' => 'اللغة العربية هي لغة القرآن الكريم، ونحن في هذه الكلية العريقة نعمل على الحفاظ عليها وتطوير مناهج تعليمها لتواكب العصر.',
                    'en' => 'Arabic is the language of the Holy Quran, and at this prestigious faculty we work to preserve it and develop its teaching methodologies to keep pace with the times.',
                ],
                'is_published' => true,
                'order' => 3,
            ],
            [
                'slug' => 'faculty-of-medicine',
                'name' => ['ar' => 'كلية الطب', 'en' => 'Faculty of Medicine'],
                'type' => 'faculty',
                'established_year' => 1961,
                'description' => [
                    'ar' => 'أنشئت كلية الطب بجامعة الأزهر عام 1961م ضمن قانون تطوير الأزهر. تقدم الكلية برنامجاً طبياً متكاملاً يجمع بين العلوم الطبية الحديثة والقيم الإسلامية والأخلاق الطبية. تضم الكلية مستشفيات جامعية تخدم ملايين المرضى سنوياً.',
                    'en' => 'The Faculty of Medicine was established at Al-Azhar University in 1961 as part of the Azhar modernization law. The faculty offers a comprehensive medical program combining modern medical sciences with Islamic values and medical ethics. It includes university hospitals serving millions of patients annually.',
                ],
                'dean_message' => [
                    'ar' => 'نسعى لتخريج أطباء يجمعون بين التميز العلمي والالتزام بالأخلاق الطبية الإسلامية لخدمة المجتمع والإنسانية.',
                    'en' => 'We strive to graduate physicians who combine scientific excellence with commitment to Islamic medical ethics to serve society and humanity.',
                ],
                'is_published' => true,
                'order' => 4,
            ],
            [
                'slug' => 'faculty-of-engineering',
                'name' => ['ar' => 'كلية الهندسة', 'en' => 'Faculty of Engineering'],
                'type' => 'faculty',
                'established_year' => 1961,
                'description' => [
                    'ar' => 'تأسست كلية الهندسة بجامعة الأزهر عام 1961م وتضم أقساماً متعددة تشمل الهندسة المدنية والمعمارية والكهربائية والميكانيكية وهندسة الحاسبات. تهدف الكلية إلى إعداد مهندسين أكفاء يساهمون في التنمية المستدامة.',
                    'en' => 'The Faculty of Engineering was established at Al-Azhar University in 1961 and includes multiple departments covering civil, architectural, electrical, mechanical, and computer engineering. The faculty aims to prepare competent engineers who contribute to sustainable development.',
                ],
                'dean_message' => [
                    'ar' => 'نعمل على تأهيل مهندسين قادرين على مواجهة تحديات العصر التقنية مع التمسك بالقيم الأخلاقية والمهنية.',
                    'en' => 'We work to qualify engineers capable of facing modern technological challenges while upholding ethical and professional values.',
                ],
                'is_published' => true,
                'order' => 5,
            ],
            [
                'slug' => 'faculty-of-science',
                'name' => ['ar' => 'كلية العلوم', 'en' => 'Faculty of Science'],
                'type' => 'faculty',
                'established_year' => 1961,
                'description' => [
                    'ar' => 'كلية العلوم بجامعة الأزهر تأسست عام 1961م وتشمل أقسام الرياضيات والفيزياء والكيمياء والأحياء والجيولوجيا. تسهم الكلية في البحث العلمي والابتكار وتخريج باحثين متميزين في العلوم الأساسية والتطبيقية.',
                    'en' => 'The Faculty of Science at Al-Azhar University was established in 1961 and includes departments of Mathematics, Physics, Chemistry, Biology, and Geology. The faculty contributes to scientific research and innovation, graduating distinguished researchers in basic and applied sciences.',
                ],
                'dean_message' => [
                    'ar' => 'نؤمن بأن العلم الحقيقي يقود إلى معرفة الله، ونسعى لتحقيق التميز في البحث العلمي وخدمة المجتمع.',
                    'en' => 'We believe that true science leads to knowing God, and we strive to achieve excellence in scientific research and community service.',
                ],
                'is_published' => true,
                'order' => 6,
            ],
            [
                'slug' => 'faculty-of-commerce',
                'name' => ['ar' => 'كلية التجارة', 'en' => 'Faculty of Commerce'],
                'type' => 'faculty',
                'established_year' => 1961,
                'description' => [
                    'ar' => 'تأسست كلية التجارة بجامعة الأزهر عام 1961م وتقدم برامج في المحاسبة وإدارة الأعمال والاقتصاد والإحصاء. تتميز الكلية بدمج مبادئ الاقتصاد الإسلامي والمعاملات المالية الإسلامية في مناهجها الدراسية.',
                    'en' => 'The Faculty of Commerce was established at Al-Azhar University in 1961, offering programs in accounting, business administration, economics, and statistics. The faculty is distinguished by integrating Islamic economics principles and Islamic financial transactions into its curricula.',
                ],
                'dean_message' => [
                    'ar' => 'نعد خريجين متميزين في مجالات المال والأعمال يجمعون بين الكفاءة المهنية والالتزام بأحكام المعاملات الإسلامية.',
                    'en' => 'We prepare distinguished graduates in finance and business who combine professional competence with adherence to Islamic transaction principles.',
                ],
                'is_published' => true,
                'order' => 7,
            ],
            [
                'slug' => 'faculty-of-islamic-studies',
                'name' => ['ar' => 'كلية الدراسات الإسلامية', 'en' => 'Faculty of Islamic Studies'],
                'type' => 'faculty',
                'established_year' => 1961,
                'description' => [
                    'ar' => 'كلية الدراسات الإسلامية من الكليات الشرعية المتميزة في جامعة الأزهر، تأسست عام 1961م. تقدم دراسات شاملة في العلوم الإسلامية تشمل الفقه وأصوله والتفسير والحديث والعقيدة والدعوة والثقافة الإسلامية.',
                    'en' => 'The Faculty of Islamic Studies is a distinguished Islamic faculty at Al-Azhar University, established in 1961. It offers comprehensive studies in Islamic sciences including jurisprudence and its principles, exegesis, hadith, creed, da\'wa, and Islamic culture.',
                ],
                'dean_message' => [
                    'ar' => 'نسعى لتقديم رؤية إسلامية شاملة ومعتدلة تجمع بين التراث العلمي الأصيل ومتطلبات العصر الحديث.',
                    'en' => 'We strive to present a comprehensive and moderate Islamic vision that bridges authentic scholarly heritage with the demands of the modern era.',
                ],
                'is_published' => true,
                'order' => 8,
            ],
            [
                'slug' => 'faculty-of-islamic-dawa',
                'name' => ['ar' => 'كلية الدعوة الإسلامية', 'en' => 'Faculty of Islamic Da\'wa'],
                'type' => 'faculty',
                'established_year' => 1978,
                'description' => [
                    'ar' => 'تأسست كلية الدعوة الإسلامية عام 1978م لإعداد دعاة متميزين قادرين على نشر رسالة الإسلام الصحيحة بأساليب عصرية. تدرس الكلية فنون الخطابة والإعلام الإسلامي وعلم النفس الدعوي والأديان المقارنة.',
                    'en' => 'The Faculty of Islamic Da\'wa was established in 1978 to prepare distinguished preachers capable of spreading the true message of Islam through modern methods. The faculty teaches rhetoric, Islamic media, psychology of preaching, and comparative religion.',
                ],
                'dean_message' => [
                    'ar' => 'نعد دعاة يحملون رسالة الإسلام الوسطي إلى العالم بلغة العصر وأساليبه الحديثة.',
                    'en' => 'We prepare preachers who carry the message of moderate Islam to the world using contemporary language and modern methods.',
                ],
                'is_published' => true,
                'order' => 9,
            ],
            [
                'slug' => 'faculty-of-education',
                'name' => ['ar' => 'كلية التربية', 'en' => 'Faculty of Education'],
                'type' => 'faculty',
                'established_year' => 1961,
                'description' => [
                    'ar' => 'تأسست كلية التربية بجامعة الأزهر عام 1961م لإعداد معلمين ومربين مؤهلين تأهيلاً عالياً. تجمع الكلية بين العلوم التربوية الحديثة والقيم الإسلامية في إعداد المعلم الأزهري المتميز.',
                    'en' => 'The Faculty of Education was established at Al-Azhar University in 1961 to prepare highly qualified teachers and educators. The faculty combines modern educational sciences with Islamic values in preparing the distinguished Azhari teacher.',
                ],
                'dean_message' => [
                    'ar' => 'التعليم رسالة سامية، ونحن نعد معلمين يجمعون بين الكفاءة التربوية والقدوة الحسنة.',
                    'en' => 'Education is a noble mission, and we prepare teachers who combine educational competence with being role models.',
                ],
                'is_published' => true,
                'order' => 10,
            ],
            [
                'slug' => 'faculty-of-pharmacy',
                'name' => ['ar' => 'كلية الصيدلة', 'en' => 'Faculty of Pharmacy'],
                'type' => 'faculty',
                'established_year' => 1974,
                'description' => [
                    'ar' => 'تأسست كلية الصيدلة بجامعة الأزهر عام 1974م وتقدم برنامجاً أكاديمياً متكاملاً في العلوم الصيدلانية. تشمل الدراسة الكيمياء الصيدلية والصيدلانيات والعقاقير والأدوية والسموم.',
                    'en' => 'The Faculty of Pharmacy was established at Al-Azhar University in 1974, offering a comprehensive academic program in pharmaceutical sciences including pharmaceutical chemistry, pharmaceutics, pharmacognosy, and pharmacology.',
                ],
                'dean_message' => [
                    'ar' => 'نلتزم بتخريج صيادلة أكفاء يساهمون في تطوير الصناعة الدوائية وتحسين الرعاية الصحية.',
                    'en' => 'We are committed to graduating competent pharmacists who contribute to pharmaceutical industry development and healthcare improvement.',
                ],
                'is_published' => true,
                'order' => 11,
            ],
            [
                'slug' => 'faculty-of-dentistry',
                'name' => ['ar' => 'كلية طب الأسنان', 'en' => 'Faculty of Dentistry'],
                'type' => 'faculty',
                'established_year' => 1974,
                'description' => [
                    'ar' => 'كلية طب الأسنان بجامعة الأزهر تأسست عام 1974م وتقدم برنامجاً متكاملاً في طب وجراحة الفم والأسنان. تضم الكلية عيادات ومختبرات حديثة لتدريب الطلاب على أحدث التقنيات العلاجية.',
                    'en' => 'The Faculty of Dentistry at Al-Azhar University was established in 1974, offering a comprehensive program in oral medicine and dental surgery. The faculty includes modern clinics and laboratories for training students on the latest therapeutic techniques.',
                ],
                'dean_message' => [
                    'ar' => 'نسعى لتخريج أطباء أسنان متميزين يقدمون أفضل الخدمات العلاجية للمجتمع.',
                    'en' => 'We strive to graduate distinguished dentists who provide the best therapeutic services to the community.',
                ],
                'is_published' => true,
                'order' => 12,
            ],
            [
                'slug' => 'faculty-of-mass-communication',
                'name' => ['ar' => 'كلية الإعلام', 'en' => 'Faculty of Mass Communication'],
                'type' => 'institute',
                'established_year' => 2003,
                'description' => [
                    'ar' => 'كلية الإعلام بجامعة الأزهر تأسست عام 2003م لمواكبة التطور في مجال الإعلام والاتصال. تقدم الكلية برامج في الصحافة والإذاعة والتلفزيون والعلاقات العامة والإعلان، مع التركيز على الإعلام الإسلامي المسؤول.',
                    'en' => 'The Faculty of Mass Communication at Al-Azhar University was established in 2003 to keep pace with developments in media and communication. It offers programs in journalism, broadcasting, public relations, and advertising, with a focus on responsible Islamic media.',
                ],
                'dean_message' => [
                    'ar' => 'نعد إعلاميين يحملون رسالة الأزهر الوسطية ويواجهون التحديات الإعلامية المعاصرة بمهنية وأخلاق.',
                    'en' => 'We prepare media professionals who carry Al-Azhar\'s moderate message and face contemporary media challenges with professionalism and ethics.',
                ],
                'is_published' => true,
                'order' => 13,
            ],
            [
                'slug' => 'al-zahraa-university-hospital',
                'name' => ['ar' => 'مستشفى الزهراء الجامعي', 'en' => 'Al-Zahraa University Hospital'],
                'type' => 'hospital',
                'established_year' => null,
                'description' => [
                    'ar' => 'مستشفى الزهراء الجامعي هو المستشفى الرئيسي التابع لجامعة الأزهر، يقدم خدمات طبية متكاملة في جميع التخصصات. يعد المستشفى مركزاً للتدريب السريري لطلاب كليات الطب والصيدلة وطب الأسنان، ويخدم ملايين المرضى سنوياً.',
                    'en' => 'Al-Zahraa University Hospital is the main hospital affiliated with Al-Azhar University, providing comprehensive medical services across all specialties. The hospital serves as a clinical training center for students of medicine, pharmacy, and dentistry faculties, serving millions of patients annually.',
                ],
                'dean_message' => [
                    'ar' => 'نلتزم بتقديم أعلى مستويات الرعاية الصحية وتدريب الكوادر الطبية المتميزة لخدمة المجتمع.',
                    'en' => 'We are committed to providing the highest levels of healthcare and training distinguished medical professionals to serve the community.',
                ],
                'is_published' => true,
                'order' => 14,
            ],
            [
                'slug' => 'saleh-kamel-center',
                'name' => ['ar' => 'مركز صالح كامل للاقتصاد الإسلامي', 'en' => 'Saleh Kamel Center for Islamic Economics'],
                'type' => 'center',
                'established_year' => null,
                'description' => [
                    'ar' => 'مركز صالح كامل للاقتصاد الإسلامي هو مركز بحثي متخصص في دراسة الاقتصاد الإسلامي والمصرفية الإسلامية والتمويل الإسلامي. ينظم المركز مؤتمرات وندوات دولية ويصدر أبحاثاً ودراسات متخصصة في مجال الاقتصاد الإسلامي.',
                    'en' => 'The Saleh Kamel Center for Islamic Economics is a specialized research center studying Islamic economics, Islamic banking, and Islamic finance. The center organizes international conferences and seminars and publishes specialized research and studies in Islamic economics.',
                ],
                'dean_message' => [
                    'ar' => 'نعمل على تطوير البحث العلمي في مجال الاقتصاد الإسلامي وتقديم حلول اقتصادية تتوافق مع الشريعة الإسلامية.',
                    'en' => 'We work to advance scientific research in Islamic economics and provide economic solutions compliant with Islamic Sharia.',
                ],
                'is_published' => true,
                'order' => 15,
            ],
        ];

        foreach ($faculties as $data) {
            $faculty = new Faculty();
            $faculty->slug = $data['slug'];
            $faculty->name = $data['name'];
            $faculty->description = $data['description'];
            $faculty->dean_message = $data['dean_message'];
            $faculty->type = $data['type'];
            $faculty->established_year = $data['established_year'];
            $faculty->is_published = $data['is_published'];
            $faculty->order = $data['order'];
            $faculty->save();
        }
    }
}
