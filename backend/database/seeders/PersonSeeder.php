<?php

namespace Database\Seeders;

use App\Models\Person;
use Illuminate\Database\Seeder;

class PersonSeeder extends Seeder
{
    public function run(): void
    {
        $people = [
            // Historical figures
            [
                'slug' => 'muhammad-abduh',
                'name' => ['ar' => 'الإمام محمد عبده', 'en' => 'Imam Muhammad Abduh'],
                'title' => ['ar' => 'المفتي الأكبر ورائد الإصلاح', 'en' => 'Grand Mufti & Pioneer of Reform'],
                'bio' => [
                    'ar' => 'الإمام محمد عبده (1849-1905م) هو أحد أبرز رواد الإصلاح في العالم الإسلامي الحديث. وُلد في محافظة البحيرة بمصر وتعلم في الأزهر حيث تتلمذ على يد جمال الدين الأفغاني. تولى منصب مفتي الديار المصرية عام 1899م وقاد حركة إصلاحية شاملة في الأزهر شملت تطوير المناهج وإدخال العلوم الحديثة. دعا إلى الاجتهاد والتجديد في الفكر الإسلامي مع الحفاظ على الثوابت، وترك إرثاً فكرياً عظيماً أثّر في أجيال من العلماء والمفكرين.',
                    'en' => 'Imam Muhammad Abduh (1849-1905) was one of the most prominent reformers in the modern Islamic world. Born in Beheira, Egypt, he studied at Al-Azhar under Jamal al-Din al-Afghani. He became Grand Mufti of Egypt in 1899 and led a comprehensive reform movement at Al-Azhar, developing curricula and introducing modern sciences. He advocated for ijtihad and renewal in Islamic thought while preserving fundamentals, leaving a great intellectual legacy that influenced generations of scholars and thinkers.',
                ],
                'era' => 'modern',
                'is_historical' => true,
                'is_current_leadership' => false,
                'order' => 1,
            ],
            [
                'slug' => 'al-maraghi',
                'name' => ['ar' => 'الشيخ محمد مصطفى المراغي', 'en' => 'Sheikh Muhammad Mustafa Al-Maraghi'],
                'title' => ['ar' => 'شيخ الأزهر', 'en' => 'Sheikh of Al-Azhar'],
                'bio' => [
                    'ar' => 'الشيخ محمد مصطفى المراغي (1881-1945م) تولى مشيخة الأزهر مرتين، وكان من أبرز المجددين في تاريخ الأزهر الحديث. عمل على إصلاح نظام التعليم الأزهري وتطوير المناهج الدراسية وفتح باب الاجتهاد. كان يرى ضرورة مواكبة الأزهر للعصر مع الحفاظ على هويته الإسلامية الأصيلة.',
                    'en' => 'Sheikh Muhammad Mustafa Al-Maraghi (1881-1945) served as Sheikh of Al-Azhar twice and was among the most prominent reformers in modern Al-Azhar history. He worked to reform the Azhari educational system, develop curricula, and open the door to ijtihad. He believed Al-Azhar must keep pace with the times while preserving its authentic Islamic identity.',
                ],
                'era' => 'modern',
                'is_historical' => true,
                'is_current_leadership' => false,
                'order' => 2,
            ],
            [
                'slug' => 'ibn-khaldun',
                'name' => ['ar' => 'ابن خلدون', 'en' => 'Ibn Khaldun'],
                'title' => ['ar' => 'مؤسس علم الاجتماع', 'en' => 'Founder of Sociology'],
                'bio' => [
                    'ar' => 'عبد الرحمن بن محمد بن خلدون (1332-1406م) هو العالم والمؤرخ والفيلسوف العربي الشهير، مؤسس علم العمران البشري (الاجتماع). وُلد في تونس ورحل إلى مصر حيث عُيّن قاضياً للقضاة المالكية ودرّس في الجامع الأزهر. ألّف كتابه الشهير "المقدمة" الذي يُعد من أهم المؤلفات في تاريخ الفكر الإنساني. تأثر بالحياة العلمية في الأزهر وأثّر فيها بدروسه وأفكاره.',
                    'en' => 'Abd al-Rahman ibn Muhammad ibn Khaldun (1332-1406) was the renowned Arab scholar, historian, and philosopher, founder of the science of civilization (sociology). Born in Tunisia, he traveled to Egypt where he was appointed Maliki Chief Judge and taught at Al-Azhar. He authored the famous "Muqaddimah," considered one of the most important works in the history of human thought. He was influenced by and contributed to Al-Azhar\'s scholarly life through his lectures and ideas.',
                ],
                'era' => 'mamluk',
                'is_historical' => true,
                'is_current_leadership' => false,
                'order' => 3,
            ],
            [
                'slug' => 'imam-al-shafii',
                'name' => ['ar' => 'الإمام الشافعي', 'en' => 'Imam Al-Shafi\'i'],
                'title' => ['ar' => 'مؤسس المذهب الشافعي', 'en' => 'Founder of the Shafi\'i School'],
                'bio' => [
                    'ar' => 'الإمام أبو عبد الله محمد بن إدريس الشافعي (767-820م) هو مؤسس المذهب الشافعي ومؤسس علم أصول الفقه. وُلد في غزة ونشأ في مكة المكرمة ثم رحل إلى مصر حيث أسس مذهبه الجديد. يرتبط اسمه بالأزهر ارتباطاً وثيقاً حيث كان المذهب الشافعي من أكثر المذاهب دراسة في الأزهر عبر تاريخه. ألّف كتاب "الرسالة" في أصول الفقه وهو أول كتاب وُضع في هذا العلم.',
                    'en' => 'Imam Abu Abdullah Muhammad ibn Idris al-Shafi\'i (767-820 CE) was the founder of the Shafi\'i school of jurisprudence and the founder of the science of Islamic legal theory (usul al-fiqh). Born in Gaza and raised in Mecca, he traveled to Egypt where he established his new school. His name is closely linked to Al-Azhar, as the Shafi\'i school was among the most studied throughout Al-Azhar\'s history. He authored "Al-Risala" on legal theory, the first book written in this discipline.',
                ],
                'era' => 'fatimid',
                'is_historical' => true,
                'is_current_leadership' => false,
                'order' => 4,
            ],
            [
                'slug' => 'mahmoud-shaltout',
                'name' => ['ar' => 'الشيخ محمود شلتوت', 'en' => 'Sheikh Mahmoud Shaltout'],
                'title' => ['ar' => 'شيخ الأزهر', 'en' => 'Sheikh of Al-Azhar'],
                'bio' => [
                    'ar' => 'الشيخ محمود شلتوت (1893-1963م) شيخ الأزهر الذي قاد مرحلة التحول الكبرى. كان من أبرز علماء الأزهر في القرن العشرين وتولى المشيخة عام 1958م. عُرف بفكره المستنير ودعوته إلى التقريب بين المذاهب الإسلامية. أصدر فتواه الشهيرة بجواز التعبد بالمذهب الجعفري. ساهم في صياغة قانون 103 لسنة 1961 الذي حوّل الأزهر إلى جامعة حديثة شاملة.',
                    'en' => 'Sheikh Mahmoud Shaltout (1893-1963) was the Sheikh of Al-Azhar who led its major transformation. He was among the most prominent Al-Azhar scholars of the 20th century and assumed the position in 1958. Known for his enlightened thought and call for rapprochement between Islamic schools. He issued his famous fatwa permitting worship according to the Ja\'fari school. He contributed to drafting Law 103 of 1961 that transformed Al-Azhar into a comprehensive modern university.',
                ],
                'era' => 'modern',
                'is_historical' => true,
                'is_current_leadership' => false,
                'order' => 5,
            ],
            // Current leadership
            [
                'slug' => 'university-president',
                'name' => ['ar' => 'أ.د. محمد المحرصاوي', 'en' => 'Prof. Dr. Muhammad Al-Mahrasawi'],
                'title' => ['ar' => 'رئيس جامعة الأزهر', 'en' => 'President of Al-Azhar University'],
                'bio' => [
                    'ar' => 'يتولى سيادة الأستاذ الدكتور محمد المحرصاوي رئاسة جامعة الأزهر، ويعمل على تطوير المنظومة التعليمية والبحثية والتحول الرقمي في الجامعة. يسعى لتعزيز مكانة جامعة الأزهر محلياً ودولياً وتحقيق رؤية الجامعة في التميز والريادة.',
                    'en' => 'Prof. Dr. Muhammad Al-Mahrasawi serves as President of Al-Azhar University, working to develop the educational and research system and digital transformation. He strives to enhance Al-Azhar University\'s position locally and internationally and achieve the university\'s vision of excellence and leadership.',
                ],
                'era' => 'modern',
                'is_historical' => false,
                'is_current_leadership' => true,
                'order' => 6,
            ],
            [
                'slug' => 'vice-president-education',
                'name' => ['ar' => 'أ.د. نائب رئيس الجامعة لشؤون التعليم', 'en' => 'Vice President for Education Affairs'],
                'title' => ['ar' => 'نائب رئيس الجامعة لشؤون التعليم والطلاب', 'en' => 'Vice President for Education and Student Affairs'],
                'bio' => [
                    'ar' => 'يتولى نائب رئيس الجامعة لشؤون التعليم والطلاب الإشراف على العملية التعليمية وشؤون الطلاب في جميع كليات الجامعة. يعمل على تطوير المناهج الدراسية وتحسين البيئة التعليمية وضمان جودة التعليم.',
                    'en' => 'The Vice President for Education and Student Affairs oversees the educational process and student affairs across all university faculties. He works to develop curricula, improve the educational environment, and ensure quality education.',
                ],
                'era' => 'modern',
                'is_historical' => false,
                'is_current_leadership' => true,
                'order' => 7,
            ],
            [
                'slug' => 'dean-of-sharia',
                'name' => ['ar' => 'أ.د. عميد كلية الشريعة والقانون', 'en' => 'Dean of Sharia and Law Faculty'],
                'title' => ['ar' => 'عميد كلية الشريعة والقانون', 'en' => 'Dean of Faculty of Sharia and Law'],
                'bio' => [
                    'ar' => 'يقود عميد كلية الشريعة والقانون واحدة من أعرق كليات جامعة الأزهر. يشرف على البرامج الأكاديمية التي تجمع بين الفقه الإسلامي والقانون الوضعي، ويعمل على تطوير المناهج لمواكبة المستجدات القانونية والفقهية.',
                    'en' => 'The Dean of the Faculty of Sharia and Law leads one of Al-Azhar University\'s oldest faculties. He oversees academic programs combining Islamic jurisprudence and positive law, working to develop curricula to keep pace with legal and jurisprudential developments.',
                ],
                'era' => 'modern',
                'is_historical' => false,
                'is_current_leadership' => true,
                'order' => 8,
            ],
            [
                'slug' => 'dean-of-science',
                'name' => ['ar' => 'أ.د. عميد كلية العلوم', 'en' => 'Dean of Science Faculty'],
                'title' => ['ar' => 'عميد كلية العلوم', 'en' => 'Dean of Faculty of Science'],
                'bio' => [
                    'ar' => 'يتولى عميد كلية العلوم قيادة الكلية التي تأسست عام 1961م ضمن التحول الحديث لجامعة الأزهر. يشرف على أقسام الرياضيات والفيزياء والكيمياء والأحياء والجيولوجيا، ويعمل على تعزيز البحث العلمي وتطوير المختبرات.',
                    'en' => 'The Dean of the Faculty of Science leads the faculty established in 1961 as part of Al-Azhar University\'s modern transformation. He oversees the departments of Mathematics, Physics, Chemistry, Biology, and Geology, and works to enhance scientific research and develop laboratories.',
                ],
                'era' => 'modern',
                'is_historical' => false,
                'is_current_leadership' => true,
                'order' => 9,
            ],
            [
                'slug' => 'dean-of-islamic-studies',
                'name' => ['ar' => 'أ.د. عميد كلية الدراسات الإسلامية', 'en' => 'Dean of Islamic Studies Faculty'],
                'title' => ['ar' => 'عميد كلية الدراسات الإسلامية', 'en' => 'Dean of Faculty of Islamic Studies'],
                'bio' => [
                    'ar' => 'يشرف عميد كلية الدراسات الإسلامية على الكلية التي تقدم دراسات شاملة في العلوم الإسلامية. يعمل على تطوير المناهج الدراسية لتعكس الوسطية والاعتدال التي يتبناها الأزهر الشريف، ويسعى لتعزيز البحث العلمي في الدراسات الإسلامية.',
                    'en' => 'The Dean of the Faculty of Islamic Studies oversees the faculty that offers comprehensive studies in Islamic sciences. He works to develop curricula reflecting the moderation advocated by Al-Azhar and strives to enhance scientific research in Islamic studies.',
                ],
                'era' => 'modern',
                'is_historical' => false,
                'is_current_leadership' => true,
                'order' => 10,
            ],
        ];

        foreach ($people as $data) {
            Person::create($data);
        }
    }
}
