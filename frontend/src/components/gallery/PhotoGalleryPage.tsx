'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Image as ImageIcon,
  Building2,
  GraduationCap,
  Users,
  TreePine,
  Landmark,
  BookOpen,
} from 'lucide-react';

type CategoryType = 'all' | 'campus' | 'events' | 'architecture' | 'students' | 'history' | 'nature';

type AspectRatio = 'portrait' | 'landscape' | 'square';

interface GalleryPhoto {
  id: number;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  date: string;
  category: Exclude<CategoryType, 'all'>;
  gradient: string;
  icon: React.ReactNode;
  aspect: AspectRatio;
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.04, duration: 0.35 },
  }),
};

const PHOTOS: GalleryPhoto[] = [
  {
    id: 1,
    titleAr: 'الجامع الأزهر الشريف',
    titleEn: 'Al-Azhar Mosque',
    descAr: 'واجهة الجامع الأزهر الشريف عند الغروب، أحد أقدم المساجد في مصر',
    descEn: 'The facade of Al-Azhar Mosque at sunset, one of the oldest mosques in Egypt',
    date: '2026-03-15',
    category: 'architecture',
    gradient: 'from-primary-600 to-primary-800',
    icon: <Landmark className="w-10 h-10" />,
    aspect: 'landscape',
  },
  {
    id: 2,
    titleAr: 'مآذن الجامع الأزهر',
    titleEn: 'Al-Azhar Minarets',
    descAr: 'المآذن التاريخية للجامع الأزهر التي تمثل عدة عصور معمارية مختلفة',
    descEn: 'The historic minarets of Al-Azhar representing several different architectural eras',
    date: '2026-03-12',
    category: 'architecture',
    gradient: 'from-amber-600 to-amber-800',
    icon: <Building2 className="w-10 h-10" />,
    aspect: 'portrait',
  },
  {
    id: 3,
    titleAr: 'مكتبة الأزهر من الداخل',
    titleEn: 'Al-Azhar Library Interior',
    descAr: 'قاعة المطالعة الرئيسية في مكتبة الأزهر التي تضم ملايين الكتب والمخطوطات',
    descEn: 'The main reading hall of Al-Azhar Library housing millions of books and manuscripts',
    date: '2026-03-10',
    category: 'campus',
    gradient: 'from-indigo-500 to-indigo-700',
    icon: <BookOpen className="w-10 h-10" />,
    aspect: 'landscape',
  },
  {
    id: 4,
    titleAr: 'حفل التخرج 2026',
    titleEn: 'Graduation Ceremony 2026',
    descAr: 'لحظات من حفل تخريج الدفعة الجديدة من طلاب جامعة الأزهر',
    descEn: 'Moments from the graduation ceremony of the new class of Al-Azhar University',
    date: '2026-03-08',
    category: 'events',
    gradient: 'from-emerald-500 to-emerald-700',
    icon: <GraduationCap className="w-10 h-10" />,
    aspect: 'square',
  },
  {
    id: 5,
    titleAr: 'قاعات المحاضرات',
    titleEn: 'Lecture Halls',
    descAr: 'قاعات المحاضرات الحديثة المجهزة بأحدث التقنيات التعليمية',
    descEn: 'Modern lecture halls equipped with the latest educational technology',
    date: '2026-03-06',
    category: 'campus',
    gradient: 'from-cyan-500 to-cyan-700',
    icon: <Building2 className="w-10 h-10" />,
    aspect: 'landscape',
  },
  {
    id: 6,
    titleAr: 'حدائق الحرم الجامعي',
    titleEn: 'Campus Gardens',
    descAr: 'الحدائق الخضراء الجميلة التي تزين الحرم الجامعي وتوفر بيئة مريحة للطلاب',
    descEn: 'The beautiful green gardens adorning the campus, providing a relaxing environment for students',
    date: '2026-03-04',
    category: 'nature',
    gradient: 'from-green-500 to-green-700',
    icon: <TreePine className="w-10 h-10" />,
    aspect: 'portrait',
  },
  {
    id: 7,
    titleAr: 'أنشطة طلابية',
    titleEn: 'Student Activities',
    descAr: 'طلاب من مختلف البلدان يشاركون في أنشطة ثقافية وعلمية متنوعة',
    descEn: 'Students from various countries participating in diverse cultural and scientific activities',
    date: '2026-03-02',
    category: 'students',
    gradient: 'from-violet-500 to-violet-700',
    icon: <Users className="w-10 h-10" />,
    aspect: 'square',
  },
  {
    id: 8,
    titleAr: 'مجموعة المخطوطات',
    titleEn: 'Manuscript Collection',
    descAr: 'مخطوطات نادرة يعود تاريخها لعدة قرون محفوظة في خزائن مكتبة الأزهر',
    descEn: 'Rare manuscripts dating back several centuries preserved in Al-Azhar Library vaults',
    date: '2026-02-28',
    category: 'history',
    gradient: 'from-amber-700 to-amber-900',
    icon: <BookOpen className="w-10 h-10" />,
    aspect: 'landscape',
  },
  {
    id: 9,
    titleAr: 'قاعة الصلاة الرئيسية',
    titleEn: 'Main Prayer Hall',
    descAr: 'قاعة الصلاة الرئيسية في الجامع الأزهر بأعمدتها وأقواسها التاريخية',
    descEn: 'The main prayer hall of Al-Azhar Mosque with its historic columns and arches',
    date: '2026-02-25',
    category: 'architecture',
    gradient: 'from-primary-700 to-primary-900',
    icon: <Landmark className="w-10 h-10" />,
    aspect: 'portrait',
  },
  {
    id: 10,
    titleAr: 'التفاصيل المعمارية',
    titleEn: 'Architectural Details',
    descAr: 'زخارف ونقوش إسلامية دقيقة تزين جدران وأسقف الجامع الأزهر',
    descEn: 'Intricate Islamic ornaments and carvings adorning the walls and ceilings of Al-Azhar',
    date: '2026-02-22',
    category: 'architecture',
    gradient: 'from-rose-600 to-rose-800',
    icon: <Building2 className="w-10 h-10" />,
    aspect: 'square',
  },
  {
    id: 11,
    titleAr: 'مؤتمر دولي',
    titleEn: 'International Conference',
    descAr: 'مؤتمر دولي يجمع علماء ومفكرين من مختلف أنحاء العالم في رحاب الأزهر',
    descEn: 'An international conference gathering scholars and thinkers from around the world at Al-Azhar',
    date: '2026-02-20',
    category: 'events',
    gradient: 'from-blue-600 to-blue-800',
    icon: <Users className="w-10 h-10" />,
    aspect: 'landscape',
  },
  {
    id: 12,
    titleAr: 'طلاب في المكتبة',
    titleEn: 'Students in the Library',
    descAr: 'طلاب من جنسيات مختلفة يدرسون ويبحثون في مكتبة الأزهر',
    descEn: 'Students of different nationalities studying and researching in Al-Azhar Library',
    date: '2026-02-18',
    category: 'students',
    gradient: 'from-teal-500 to-teal-700',
    icon: <Users className="w-10 h-10" />,
    aspect: 'portrait',
  },
  {
    id: 13,
    titleAr: 'الفناء الداخلي',
    titleEn: 'Inner Courtyard',
    descAr: 'الفناء الداخلي للجامع الأزهر حيث كان يُعقد حلقات العلم منذ ألف عام',
    descEn: 'The inner courtyard of Al-Azhar Mosque where knowledge circles were held for a thousand years',
    date: '2026-02-15',
    category: 'history',
    gradient: 'from-stone-600 to-stone-800',
    icon: <Landmark className="w-10 h-10" />,
    aspect: 'landscape',
  },
  {
    id: 14,
    titleAr: 'أشجار النخيل في الحرم',
    titleEn: 'Palm Trees on Campus',
    descAr: 'أشجار النخيل الشاهقة التي تصطف على جانبي الممرات الرئيسية في الحرم الجامعي',
    descEn: 'Towering palm trees lining the main walkways of the university campus',
    date: '2026-02-12',
    category: 'nature',
    gradient: 'from-lime-600 to-lime-800',
    icon: <TreePine className="w-10 h-10" />,
    aspect: 'square',
  },
  {
    id: 15,
    titleAr: 'احتفال ثقافي',
    titleEn: 'Cultural Celebration',
    descAr: 'احتفالية ثقافية يشارك فيها طلاب من أكثر من خمسين دولة',
    descEn: 'A cultural celebration with participation from students of over fifty countries',
    date: '2026-02-10',
    category: 'events',
    gradient: 'from-fuchsia-500 to-fuchsia-700',
    icon: <GraduationCap className="w-10 h-10" />,
    aspect: 'landscape',
  },
  {
    id: 16,
    titleAr: 'مبنى كلية الشريعة',
    titleEn: 'Faculty of Sharia Building',
    descAr: 'مبنى كلية الشريعة والقانون أحد أعرق كليات جامعة الأزهر',
    descEn: 'The Faculty of Sharia and Law building, one of the oldest faculties at Al-Azhar',
    date: '2026-02-08',
    category: 'campus',
    gradient: 'from-sky-600 to-sky-800',
    icon: <Building2 className="w-10 h-10" />,
    aspect: 'portrait',
  },
];

const aspectClasses: Record<AspectRatio, string> = {
  portrait: 'row-span-2',
  landscape: 'col-span-1',
  square: 'col-span-1',
};

const aspectRatioClasses: Record<AspectRatio, string> = {
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  square: 'aspect-square',
};

export function PhotoGalleryPage() {
  const t = useTranslations('gallery');
  const locale = useLocale();
  const isAr = locale === 'ar';

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const categories: { key: CategoryType; label: string }[] = [
    { key: 'all', label: t('all') },
    { key: 'campus', label: t('campus') },
    { key: 'events', label: t('events') },
    { key: 'architecture', label: t('architecture') },
    { key: 'students', label: t('students') },
    { key: 'history', label: t('history') },
    { key: 'nature', label: t('nature') },
  ];

  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'all') return PHOTOS;
    return PHOTOS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const currentIndex = useMemo(() => {
    if (!selectedPhoto) return -1;
    return filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
  }, [selectedPhoto, filteredPhotos]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setSelectedPhoto(filteredPhotos[currentIndex - 1]);
    }
  }, [currentIndex, filteredPhotos]);

  const goToNext = useCallback(() => {
    if (currentIndex < filteredPhotos.length - 1) {
      setSelectedPhoto(filteredPhotos[currentIndex + 1]);
    }
  }, [currentIndex, filteredPhotos]);

  const closeLightbox = useCallback(() => {
    setSelectedPhoto(null);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!selectedPhoto) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          if (isAr) goToNext();
          else goToPrevious();
          break;
        case 'ArrowRight':
          if (isAr) goToPrevious();
          else goToNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedPhoto, closeLightbox, goToPrevious, goToNext, isAr]);

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-navy-900">
      {/* Hero Section */}
      <div className="bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern-bg opacity-5" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 rounded-full bg-primary-600/20 flex items-center justify-center mx-auto mb-6"
          >
            <Camera className="w-10 h-10 text-primary-400" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-serif font-bold text-white mb-4"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-sand-300 mb-4 max-w-2xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === cat.key
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-600/20'
                  : 'bg-white dark:bg-navy-800 text-navy-700 dark:text-sand-300 border border-sand-200 dark:border-navy-700 hover:border-primary-300 dark:hover:border-primary-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
          <span className="flex items-center text-sm text-sand-500 dark:text-sand-400 ms-2">
            {filteredPhotos.length} {t('photos')}
          </span>
        </motion.div>

        {/* Masonry-style Photo Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {filteredPhotos.map((photo, i) => (
            <motion.div
              key={photo.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className={`break-inside-avoid bg-white dark:bg-navy-800 rounded-2xl overflow-hidden shadow-md border border-sand-200 dark:border-navy-700 hover:shadow-lg transition-shadow group cursor-pointer ${aspectClasses[photo.aspect]}`}
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className={`${aspectRatioClasses[photo.aspect]} bg-gradient-to-br ${photo.gradient} relative flex items-center justify-center`}>
                <div className="absolute inset-0 islamic-pattern-bg opacity-10" />
                <div className="relative z-10 text-white/60 group-hover:text-white/80 transition-colors">
                  {photo.icon}
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/0 group-hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100">
                    <ImageIcon className="w-6 h-6 text-white" />
                  </div>
                </div>
                {/* Category label */}
                <div className="absolute top-2 start-2 bg-white/20 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-lg font-medium">
                  {t(photo.category)}
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-navy-900 dark:text-sand-100 text-sm line-clamp-1">
                  {isAr ? photo.titleAr : photo.titleEn}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 end-4 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label={t('close')}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Previous Button */}
            {currentIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute start-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label={t('previous')}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Next Button */}
            {currentIndex < filteredPhotos.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute end-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label={t('next')}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Photo Content */}
            <motion.div
              key={selectedPhoto.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`aspect-video bg-gradient-to-br ${selectedPhoto.gradient} rounded-2xl relative flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 islamic-pattern-bg opacity-10" />
                <div className="relative z-10 text-white/70">
                  <div className="w-20 h-20">
                    {selectedPhoto.icon}
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl font-serif font-bold text-white mb-2">
                  {isAr ? selectedPhoto.titleAr : selectedPhoto.titleEn}
                </h3>
                <p className="text-sand-300 mb-3 max-w-2xl mx-auto text-sm">
                  {isAr ? selectedPhoto.descAr : selectedPhoto.descEn}
                </p>
                <div className="flex items-center justify-center gap-1.5 text-sand-400 text-xs">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(selectedPhoto.date).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
                <div className="mt-3 text-sand-500 text-xs">
                  {currentIndex + 1} / {filteredPhotos.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
