'use client';

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { AlumniCard, type AlumniMember } from './AlumniCard';

const MOCK_ALUMNI: AlumniMember[] = [
  {
    id: 1,
    name: 'Ibn Khaldun',
    name_ar: 'ابن خلدون',
    title: 'Historian & Sociologist',
    title_ar: 'مؤرخ وعالم اجتماع',
    bio: 'Pioneer of historiography and sociology, author of the Muqaddimah, one of the most influential works in the history of social sciences.',
    bio_ar: 'رائد علم التاريخ وعلم الاجتماع، مؤلف المقدمة، أحد أكثر الأعمال تأثيراً في تاريخ العلوم الاجتماعية.',
    category: 'scholar',
    era: '1332-1406',
    century: '14th',
    photo: null,
  },
  {
    id: 2,
    name: 'Muhammad Abduh',
    name_ar: 'محمد عبده',
    title: 'Islamic Reformer & Grand Mufti',
    title_ar: 'مصلح إسلامي ومفتي الديار المصرية',
    bio: 'Leading figure of Islamic modernism who reformed Al-Azhar education and advocated for reconciling Islamic tradition with modern thought.',
    bio_ar: 'شخصية رائدة في الحداثة الإسلامية، أصلح التعليم الأزهري ودعا إلى التوفيق بين التراث الإسلامي والفكر الحديث.',
    category: 'religious_leader',
    era: '1849-1905',
    century: '19th',
    photo: null,
  },
  {
    id: 3,
    name: 'Taha Hussein',
    name_ar: 'طه حسين',
    title: 'Writer & Literary Critic',
    title_ar: 'أديب وناقد أدبي',
    bio: 'Known as the "Dean of Arabic Literature," he was a pioneering Egyptian writer, intellectual, and the first Egyptian to receive a doctorate from the Sorbonne.',
    bio_ar: 'يُعرف بـ"عميد الأدب العربي"، كان أديباً ومفكراً مصرياً رائداً وأول مصري يحصل على الدكتوراه من السوربون.',
    category: 'writer',
    era: '1889-1973',
    century: '20th',
    photo: null,
  },
  {
    id: 4,
    name: 'Sheikh Mahmoud Shaltout',
    name_ar: 'الشيخ محمود شلتوت',
    title: 'Grand Imam of Al-Azhar',
    title_ar: 'شيخ الأزهر الشريف',
    bio: 'Grand Imam of Al-Azhar who championed interfaith dialogue and issued the historic fatwa recognizing Shia jurisprudence as a valid school of Islamic law.',
    bio_ar: 'شيخ الأزهر الذي دافع عن الحوار بين الأديان وأصدر فتوى تاريخية باعتبار الفقه الشيعي مذهباً إسلامياً معتبراً.',
    category: 'religious_leader',
    era: '1893-1963',
    century: '20th',
    photo: null,
  },
  {
    id: 5,
    name: 'Rifa\'a al-Tahtawi',
    name_ar: 'رفاعة الطهطاوي',
    title: 'Writer & Translator',
    title_ar: 'كاتب ومترجم',
    bio: 'A pioneer of the Egyptian renaissance, he translated numerous Western works into Arabic and established Egypt\'s first school of languages.',
    bio_ar: 'رائد النهضة المصرية، ترجم العديد من الأعمال الغربية إلى العربية وأسس أول مدرسة للألسن في مصر.',
    category: 'writer',
    era: '1801-1873',
    century: '19th',
    photo: null,
  },
  {
    id: 6,
    name: 'Hassan al-Banna',
    name_ar: 'حسن البنا',
    title: 'Teacher & Community Leader',
    title_ar: 'معلم وقائد مجتمعي',
    bio: 'An Al-Azhar-educated teacher who became one of the most influential figures in 20th-century Islamic activism and social reform.',
    bio_ar: 'معلم تخرج من الأزهر أصبح من أكثر الشخصيات تأثيراً في الحراك الإسلامي والإصلاح الاجتماعي في القرن العشرين.',
    category: 'politician',
    era: '1906-1949',
    century: '20th',
    photo: null,
  },
  {
    id: 7,
    name: 'Al-Suyuti',
    name_ar: 'جلال الدين السيوطي',
    title: 'Polymath & Islamic Scholar',
    title_ar: 'عالم موسوعي وفقيه إسلامي',
    bio: 'One of the most prolific scholars in Islamic history, authoring over 500 works on Quran, hadith, jurisprudence, history, and linguistics.',
    bio_ar: 'أحد أغزر العلماء إنتاجاً في التاريخ الإسلامي، ألّف أكثر من 500 كتاب في القرآن والحديث والفقه والتاريخ واللغة.',
    category: 'scholar',
    era: '1445-1505',
    century: '15th',
    photo: null,
  },
  {
    id: 8,
    name: 'Ahmed al-Tayeb',
    name_ar: 'أحمد الطيب',
    title: 'Current Grand Imam of Al-Azhar',
    title_ar: 'شيخ الأزهر الشريف الحالي',
    bio: 'The current Grand Imam of Al-Azhar, a renowned scholar who promotes moderation, interfaith dialogue, and peaceful coexistence globally.',
    bio_ar: 'شيخ الأزهر الشريف الحالي، عالم مشهور يعزز الوسطية والحوار بين الأديان والتعايش السلمي عالمياً.',
    category: 'religious_leader',
    era: '1946-present',
    century: '21st',
    photo: null,
  },
  {
    id: 9,
    name: 'Ali Gomaa',
    name_ar: 'علي جمعة',
    title: 'Former Grand Mufti of Egypt',
    title_ar: 'مفتي الديار المصرية السابق',
    bio: 'A distinguished Al-Azhar scholar who served as Grand Mufti of Egypt, known for his progressive interpretations and scholarly contributions.',
    bio_ar: 'عالم أزهري بارز شغل منصب مفتي الديار المصرية، معروف بتفسيراته المستنيرة وإسهاماته العلمية.',
    category: 'religious_leader',
    era: '1952-present',
    century: '21st',
    photo: null,
  },
  {
    id: 10,
    name: 'Muhammad al-Ghazali',
    name_ar: 'محمد الغزالي',
    title: 'Islamic Scholar & Author',
    title_ar: 'عالم إسلامي ومؤلف',
    bio: 'One of the most influential Islamic scholars of the 20th century, authored over 60 books on Islamic thought and social reform.',
    bio_ar: 'أحد أكثر العلماء المسلمين تأثيراً في القرن العشرين، ألّف أكثر من 60 كتاباً في الفكر الإسلامي والإصلاح الاجتماعي.',
    category: 'scholar',
    era: '1917-1996',
    century: '20th',
    photo: null,
  },
  {
    id: 11,
    name: 'Abd al-Halim Mahmoud',
    name_ar: 'عبد الحليم محمود',
    title: 'Grand Imam & Sufi Scholar',
    title_ar: 'شيخ الأزهر وعالم صوفي',
    bio: 'Grand Imam of Al-Azhar known for his deep knowledge of Sufism, philosophy, and his efforts to reform religious education.',
    bio_ar: 'شيخ الأزهر المعروف بعلمه العميق في التصوف والفلسفة وجهوده في إصلاح التعليم الديني.',
    category: 'religious_leader',
    era: '1910-1978',
    century: '20th',
    photo: null,
  },
  {
    id: 12,
    name: 'Mustafa al-Maraghi',
    name_ar: 'مصطفى المراغي',
    title: 'Grand Imam & Reformer',
    title_ar: 'شيخ الأزهر ومصلح',
    bio: 'A reformist Grand Imam who modernized Al-Azhar curriculum and strengthened its role as the foremost center of Islamic learning.',
    bio_ar: 'شيخ أزهر إصلاحي حدّث مناهج الأزهر وعزّز دوره كأهم مركز للتعليم الإسلامي.',
    category: 'religious_leader',
    era: '1881-1945',
    century: '20th',
    photo: null,
  },
  {
    id: 13,
    name: 'Abbas al-Aqqad',
    name_ar: 'عباس محمود العقاد',
    title: 'Writer & Intellectual',
    title_ar: 'أديب ومفكر',
    bio: 'A towering figure in modern Arabic literature, known for his biographical works, literary criticism, and philosophical essays.',
    bio_ar: 'شخصية عملاقة في الأدب العربي الحديث، معروف بأعماله السيرية والنقد الأدبي والمقالات الفلسفية.',
    category: 'writer',
    era: '1889-1964',
    century: '20th',
    photo: null,
  },
  {
    id: 14,
    name: 'Ibn al-Haytham',
    name_ar: 'ابن الهيثم',
    title: 'Father of Modern Optics',
    title_ar: 'أبو البصريات الحديثة',
    bio: 'A pioneering physicist and mathematician whose Book of Optics laid the foundation for modern optics and the scientific method.',
    bio_ar: 'عالم فيزياء ورياضيات رائد، وضع كتابه "المناظر" أساس علم البصريات الحديث والمنهج العلمي.',
    category: 'scientist',
    era: '965-1040',
    century: '11th',
    photo: null,
  },
  {
    id: 15,
    name: 'Yusuf al-Qaradawi',
    name_ar: 'يوسف القرضاوي',
    title: 'Islamic Scholar & Theologian',
    title_ar: 'عالم إسلامي وفقيه',
    bio: 'One of the most influential contemporary Islamic scholars, authored over 120 books covering various aspects of Islamic jurisprudence.',
    bio_ar: 'أحد أكثر العلماء المسلمين المعاصرين تأثيراً، ألّف أكثر من 120 كتاباً في مختلف جوانب الفقه الإسلامي.',
    category: 'scholar',
    era: '1926-2022',
    century: '21st',
    photo: null,
  },
  {
    id: 16,
    name: 'Saad Zaghloul',
    name_ar: 'سعد زغلول',
    title: 'Leader of Egyptian Independence',
    title_ar: 'زعيم الاستقلال المصري',
    bio: 'An Al-Azhar-educated political leader who spearheaded the Egyptian revolution of 1919 and served as Prime Minister of Egypt.',
    bio_ar: 'قائد سياسي تعلم في الأزهر قاد ثورة 1919 المصرية وشغل منصب رئيس وزراء مصر.',
    category: 'politician',
    era: '1859-1927',
    century: '20th',
    photo: null,
  },
];

type Category = 'all' | 'scholar' | 'politician' | 'writer' | 'religious_leader' | 'scientist';

export function AlumniPage() {
  const t = useTranslations('alumni');
  const locale = useLocale();
  const isAr = locale === 'ar' || locale === 'ur';

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const categories: { key: Category; label: string }[] = [
    { key: 'all', label: t('all') },
    { key: 'scholar', label: t('scholars') },
    { key: 'politician', label: t('politicians') },
    { key: 'writer', label: t('writers') },
    { key: 'religious_leader', label: t('religiousLeaders') },
    { key: 'scientist', label: t('scientists') },
  ];

  const categoryLabelMap: Record<string, string> = {
    scholar: t('scholars'),
    politician: t('politicians'),
    writer: t('writers'),
    religious_leader: t('religiousLeaders'),
    scientist: t('scientists'),
  };

  const filteredAlumni = useMemo(() => {
    return MOCK_ALUMNI.filter((alumni) => {
      const matchesCategory = activeCategory === 'all' || alumni.category === activeCategory;
      const name = isAr ? alumni.name_ar : alumni.name;
      const title = isAr ? alumni.title_ar : alumni.title;
      const matchesSearch =
        !searchQuery ||
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, isAr]);

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-navy-900">
      {/* Hero Section */}
      <div className="bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-3 gap-4 sm:gap-6"
        >
          {[
            { value: '500+', label: t('notableAlumni') },
            { value: '100+', label: t('countriesRepresented') },
            { value: '10+', label: t('centuriesOfGraduates') },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white dark:bg-navy-800 rounded-2xl p-4 sm:p-6 shadow-sm dark:shadow-navy-900/50 border border-sand-100 dark:border-navy-700 text-center"
            >
              <p className="font-serif text-2xl sm:text-3xl font-bold text-accent-600 dark:text-accent-400">
                {stat.value}
              </p>
              <p className="text-sm text-sand-600 dark:text-sand-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Search & Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-xl mx-auto mb-8"
        >
          <div className="relative">
            <svg
              className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-sand-400 dark:text-sand-500 ${isAr ? 'right-4' : 'left-4'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className={`w-full py-3 ${isAr ? 'pr-12 pl-4' : 'pl-12 pr-4'} bg-white dark:bg-navy-800 border border-sand-200 dark:border-navy-700 rounded-xl text-primary-900 dark:text-sand-100 placeholder-sand-400 dark:placeholder-sand-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors`}
              dir={isAr ? 'rtl' : 'ltr'}
            />
          </div>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.key
                  ? 'bg-accent-600 text-white shadow-md'
                  : 'bg-white dark:bg-navy-800 text-sand-600 dark:text-sand-400 border border-sand-200 dark:border-navy-700 hover:bg-sand-50 dark:hover:bg-navy-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Alumni Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAlumni.map((alumni, i) => (
            <AlumniCard
              key={alumni.id}
              alumni={alumni}
              index={i}
              isAr={isAr}
              categoryLabel={categoryLabelMap[alumni.category]}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredAlumni.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-sand-500 dark:text-sand-400 text-lg">
              {isAr ? 'لم يتم العثور على نتائج' : 'No results found'}
            </p>
          </motion.div>
        )}
      </div>

      {/* Register as Alumni CTA */}
      <div className="bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4"
          >
            {t('registerTitle')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-gray-400 text-lg mb-8 max-w-xl mx-auto"
          >
            {t('registerSubtitle')}
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-accent-600 hover:bg-accent-700 text-white font-medium px-8 py-3 rounded-xl transition-colors shadow-lg"
          >
            {t('registerButton')}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
