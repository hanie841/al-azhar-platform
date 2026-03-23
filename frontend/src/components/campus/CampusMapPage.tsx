'use client';

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  LayoutGrid,
  List,
  X,
  MapPin,
  Clock,
  Building2,
  Landmark,
} from 'lucide-react';
import { BuildingCard } from './BuildingCard';
import type { Building, BuildingCategory } from './types';

const BUILDINGS: Building[] = [
  {
    id: 'al-azhar-mosque',
    name: 'Al-Azhar Mosque',
    nameAr: 'الجامع الأزهر',
    description: 'The heart of Al-Azhar campus, founded in 970 CE. One of the oldest mosques in Cairo and a center of Islamic learning.',
    descriptionAr: 'قلب حرم الأزهر، تأسس عام 970 م. أحد أقدم المساجد في القاهرة ومركز للعلم الإسلامي.',
    category: 'religious',
    facilities: ['Prayer Halls', 'Quran Recitation Areas', 'Ablution Facilities', 'Library Corner'],
    facilitiesAr: ['قاعات الصلاة', 'مناطق تلاوة القرآن', 'مرافق الوضوء', 'ركن المكتبة'],
    hours: 'Open 24/7',
    hoursAr: 'مفتوح على مدار الساعة',
    location: 'Central Campus',
    locationAr: 'وسط الحرم الجامعي',
    founded: '970 CE',
  },
  {
    id: 'islamic-studies',
    name: 'Faculty of Islamic Studies',
    nameAr: 'كلية الدراسات الإسلامية',
    description: 'One of the most prestigious faculties offering comprehensive Islamic education including Quran, Hadith, and Fiqh.',
    descriptionAr: 'واحدة من أعرق الكليات تقدم تعليماً إسلامياً شاملاً يشمل القرآن والحديث والفقه.',
    category: 'academic',
    facilities: ['Lecture Halls', 'Seminar Rooms', 'Research Labs', 'Student Lounge'],
    facilitiesAr: ['قاعات محاضرات', 'غرف ندوات', 'معامل بحثية', 'صالة الطلاب'],
    hours: 'Sun-Thu: 8:00 AM - 4:00 PM',
    hoursAr: 'الأحد-الخميس: 8:00 ص - 4:00 م',
    location: 'East Wing',
    locationAr: 'الجناح الشرقي',
  },
  {
    id: 'arabic-language',
    name: 'Faculty of Arabic Language',
    nameAr: 'كلية اللغة العربية',
    description: 'A leading institution for Arabic language studies, grammar, literature, and linguistics.',
    descriptionAr: 'مؤسسة رائدة في دراسات اللغة العربية والنحو والأدب واللغويات.',
    category: 'academic',
    facilities: ['Language Labs', 'Lecture Theaters', 'Translation Center', 'Archive Room'],
    facilitiesAr: ['معامل لغوية', 'مسارح محاضرات', 'مركز ترجمة', 'غرفة الأرشيف'],
    hours: 'Sun-Thu: 8:00 AM - 4:00 PM',
    hoursAr: 'الأحد-الخميس: 8:00 ص - 4:00 م',
    location: 'East Wing',
    locationAr: 'الجناح الشرقي',
  },
  {
    id: 'sharia-law',
    name: 'Faculty of Sharia and Law',
    nameAr: 'كلية الشريعة والقانون',
    description: 'Combining Islamic jurisprudence with modern legal studies, producing scholars and legal experts.',
    descriptionAr: 'تجمع بين الفقه الإسلامي والدراسات القانونية الحديثة، وتخرج العلماء والخبراء القانونيين.',
    category: 'academic',
    facilities: ['Moot Court', 'Legal Library', 'Seminar Halls', 'Research Center'],
    facilitiesAr: ['محكمة صورية', 'مكتبة قانونية', 'قاعات ندوات', 'مركز أبحاث'],
    hours: 'Sun-Thu: 8:00 AM - 4:00 PM',
    hoursAr: 'الأحد-الخميس: 8:00 ص - 4:00 م',
    location: 'South Wing',
    locationAr: 'الجناح الجنوبي',
  },
  {
    id: 'medicine',
    name: 'Faculty of Medicine',
    nameAr: 'كلية الطب',
    description: 'Training future doctors with state-of-the-art medical education and clinical practice.',
    descriptionAr: 'تدريب أطباء المستقبل بأحدث أساليب التعليم الطبي والممارسة السريرية.',
    category: 'academic',
    facilities: ['Anatomy Labs', 'Simulation Center', 'Clinical Skills Lab', 'Auditorium'],
    facilitiesAr: ['معامل التشريح', 'مركز المحاكاة', 'معمل المهارات السريرية', 'قاعة كبرى'],
    hours: 'Sun-Thu: 7:00 AM - 5:00 PM',
    hoursAr: 'الأحد-الخميس: 7:00 ص - 5:00 م',
    location: 'Medical Complex, North',
    locationAr: 'المجمع الطبي، الشمال',
  },
  {
    id: 'engineering',
    name: 'Faculty of Engineering',
    nameAr: 'كلية الهندسة',
    description: 'Offering diverse engineering programs with modern laboratories and workshops.',
    descriptionAr: 'تقدم برامج هندسية متنوعة بمعامل وورش عمل حديثة.',
    category: 'academic',
    facilities: ['Engineering Labs', 'Computer Centers', 'Workshop Areas', 'Project Rooms'],
    facilitiesAr: ['معامل هندسية', 'مراكز حاسوب', 'مناطق ورش العمل', 'غرف المشاريع'],
    hours: 'Sun-Thu: 8:00 AM - 4:00 PM',
    hoursAr: 'الأحد-الخميس: 8:00 ص - 4:00 م',
    location: 'West Wing',
    locationAr: 'الجناح الغربي',
  },
  {
    id: 'science',
    name: 'Faculty of Science',
    nameAr: 'كلية العلوم',
    description: 'Advancing scientific research across physics, chemistry, biology, and mathematics.',
    descriptionAr: 'تطوير البحث العلمي في الفيزياء والكيمياء والأحياء والرياضيات.',
    category: 'academic',
    facilities: ['Science Labs', 'Research Facilities', 'Lecture Halls', 'Computer Lab'],
    facilitiesAr: ['معامل علمية', 'مرافق بحثية', 'قاعات محاضرات', 'معمل حاسوب'],
    hours: 'Sun-Thu: 8:00 AM - 4:00 PM',
    hoursAr: 'الأحد-الخميس: 8:00 ص - 4:00 م',
    location: 'West Wing',
    locationAr: 'الجناح الغربي',
  },
  {
    id: 'commerce',
    name: 'Faculty of Commerce',
    nameAr: 'كلية التجارة',
    description: 'Preparing business leaders with programs in accounting, economics, and management.',
    descriptionAr: 'إعداد قادة الأعمال ببرامج في المحاسبة والاقتصاد والإدارة.',
    category: 'academic',
    facilities: ['Smart Classrooms', 'Business Lab', 'Library', 'Meeting Rooms'],
    facilitiesAr: ['فصول ذكية', 'معمل أعمال', 'مكتبة', 'غرف اجتماعات'],
    hours: 'Sun-Thu: 8:00 AM - 4:00 PM',
    hoursAr: 'الأحد-الخميس: 8:00 ص - 4:00 م',
    location: 'South Wing',
    locationAr: 'الجناح الجنوبي',
  },
  {
    id: 'central-library',
    name: 'Central Library',
    nameAr: 'المكتبة المركزية',
    description: 'Housing millions of books, manuscripts, and digital resources spanning over a millennium of knowledge.',
    descriptionAr: 'تضم ملايين الكتب والمخطوطات والموارد الرقمية التي تمتد لأكثر من ألف عام من المعرفة.',
    category: 'cultural',
    facilities: ['Reading Halls', 'Digital Archive', 'Rare Books Section', 'Study Rooms'],
    facilitiesAr: ['قاعات قراءة', 'أرشيف رقمي', 'قسم الكتب النادرة', 'غرف دراسة'],
    hours: 'Sun-Thu: 8:00 AM - 8:00 PM',
    hoursAr: 'الأحد-الخميس: 8:00 ص - 8:00 م',
    location: 'Central Campus',
    locationAr: 'وسط الحرم الجامعي',
  },
  {
    id: 'manuscript-museum',
    name: 'Manuscript Museum',
    nameAr: 'متحف المخطوطات',
    description: 'Preserving rare Islamic manuscripts and historical documents from across the Muslim world.',
    descriptionAr: 'حفظ المخطوطات الإسلامية النادرة والوثائق التاريخية من مختلف أنحاء العالم الإسلامي.',
    category: 'cultural',
    facilities: ['Exhibition Halls', 'Conservation Lab', 'Digital Scanning Center', 'Gift Shop'],
    facilitiesAr: ['قاعات عرض', 'معمل ترميم', 'مركز مسح رقمي', 'متجر هدايا'],
    hours: 'Sun-Thu: 9:00 AM - 3:00 PM',
    hoursAr: 'الأحد-الخميس: 9:00 ص - 3:00 م',
    location: 'Near Central Library',
    locationAr: 'بجوار المكتبة المركزية',
  },
  {
    id: 'university-hospital',
    name: 'University Hospital',
    nameAr: 'المستشفى الجامعي',
    description: 'A major teaching hospital providing healthcare services and clinical training for medical students.',
    descriptionAr: 'مستشفى تعليمي رئيسي يقدم خدمات الرعاية الصحية والتدريب السريري لطلاب الطب.',
    category: 'medical',
    facilities: ['Emergency Department', 'Operating Theaters', 'Outpatient Clinics', 'Pharmacy'],
    facilitiesAr: ['قسم الطوارئ', 'غرف العمليات', 'العيادات الخارجية', 'الصيدلية'],
    hours: 'Open 24/7',
    hoursAr: 'مفتوح على مدار الساعة',
    location: 'Medical Complex, North',
    locationAr: 'المجمع الطبي، الشمال',
  },
  {
    id: 'student-affairs',
    name: 'Student Affairs Building',
    nameAr: 'شؤون الطلاب',
    description: 'Managing student services, scholarships, activities, and support programs.',
    descriptionAr: 'إدارة خدمات الطلاب والمنح الدراسية والأنشطة وبرامج الدعم.',
    category: 'administrative',
    facilities: ['Service Counters', 'Counseling Office', 'Activities Hall', 'Waiting Area'],
    facilitiesAr: ['كاونترات خدمة', 'مكتب إرشاد', 'قاعة أنشطة', 'منطقة انتظار'],
    hours: 'Sun-Thu: 9:00 AM - 3:00 PM',
    hoursAr: 'الأحد-الخميس: 9:00 ص - 3:00 م',
    location: 'Central Campus',
    locationAr: 'وسط الحرم الجامعي',
  },
  {
    id: 'administration',
    name: 'Administration Building',
    nameAr: 'مبنى الإدارة',
    description: 'The main administrative hub housing the university president\'s office and central administration.',
    descriptionAr: 'المقر الإداري الرئيسي الذي يضم مكتب رئيس الجامعة والإدارة المركزية.',
    category: 'administrative',
    facilities: ['President\'s Office', 'Board Room', 'HR Department', 'Finance Office'],
    facilitiesAr: ['مكتب الرئيس', 'قاعة مجلس الإدارة', 'إدارة الموارد البشرية', 'المكتب المالي'],
    hours: 'Sun-Thu: 8:00 AM - 3:00 PM',
    hoursAr: 'الأحد-الخميس: 8:00 ص - 3:00 م',
    location: 'Central Campus',
    locationAr: 'وسط الحرم الجامعي',
  },
  {
    id: 'sports-complex',
    name: 'Sports Complex',
    nameAr: 'المجمع الرياضي',
    description: 'Featuring indoor and outdoor sports facilities for students and staff wellness.',
    descriptionAr: 'يضم مرافق رياضية داخلية وخارجية لصحة الطلاب والموظفين.',
    category: 'services',
    facilities: ['Football Field', 'Basketball Court', 'Swimming Pool', 'Gymnasium'],
    facilitiesAr: ['ملعب كرة قدم', 'ملعب كرة سلة', 'حمام سباحة', 'صالة رياضية'],
    hours: 'Sun-Thu: 6:00 AM - 9:00 PM',
    hoursAr: 'الأحد-الخميس: 6:00 ص - 9:00 م',
    location: 'South Campus',
    locationAr: 'جنوب الحرم الجامعي',
  },
  {
    id: 'dormitories',
    name: 'Student Dormitories',
    nameAr: 'المدينة الجامعية',
    description: 'Residential facilities for students from across Egypt and international students.',
    descriptionAr: 'مرافق سكنية للطلاب من مختلف أنحاء مصر والطلاب الدوليين.',
    category: 'services',
    facilities: ['Single Rooms', 'Shared Rooms', 'Common Areas', 'Laundry Facilities'],
    facilitiesAr: ['غرف فردية', 'غرف مشتركة', 'مناطق عامة', 'مرافق غسيل'],
    hours: 'Open 24/7',
    hoursAr: 'مفتوح على مدار الساعة',
    location: 'South Campus',
    locationAr: 'جنوب الحرم الجامعي',
  },
  {
    id: 'conference-center',
    name: 'Conference Center',
    nameAr: 'مركز المؤتمرات',
    description: 'A modern venue for academic conferences, international symposiums, and university events.',
    descriptionAr: 'مكان حديث للمؤتمرات الأكاديمية والندوات الدولية وفعاليات الجامعة.',
    category: 'services',
    facilities: ['Main Auditorium', 'Meeting Rooms', 'Exhibition Area', 'AV Equipment'],
    facilitiesAr: ['القاعة الرئيسية', 'غرف اجتماعات', 'منطقة معارض', 'معدات سمعية بصرية'],
    hours: 'By Reservation',
    hoursAr: 'بالحجز المسبق',
    location: 'West Campus',
    locationAr: 'غرب الحرم الجامعي',
  },
  {
    id: 'it-center',
    name: 'IT Center',
    nameAr: 'مركز تكنولوجيا المعلومات',
    description: 'Providing technology infrastructure, e-learning support, and digital services.',
    descriptionAr: 'توفير البنية التحتية التكنولوجية ودعم التعلم الإلكتروني والخدمات الرقمية.',
    category: 'administrative',
    facilities: ['Server Room', 'Help Desk', 'Training Labs', 'Network Operations'],
    facilitiesAr: ['غرفة الخوادم', 'مكتب المساعدة', 'معامل تدريب', 'عمليات الشبكة'],
    hours: 'Sun-Thu: 8:00 AM - 5:00 PM',
    hoursAr: 'الأحد-الخميس: 8:00 ص - 5:00 م',
    location: 'West Wing',
    locationAr: 'الجناح الغربي',
  },
  {
    id: 'international-students',
    name: 'International Students Center',
    nameAr: 'مركز الطلاب الدوليين',
    description: 'Supporting international students with visa services, orientation, and cultural programs.',
    descriptionAr: 'دعم الطلاب الدوليين بخدمات التأشيرات والتوجيه والبرامج الثقافية.',
    category: 'administrative',
    facilities: ['Reception', 'Visa Office', 'Cultural Lounge', 'Language Support'],
    facilitiesAr: ['الاستقبال', 'مكتب التأشيرات', 'صالة ثقافية', 'دعم لغوي'],
    hours: 'Sun-Thu: 9:00 AM - 3:00 PM',
    hoursAr: 'الأحد-الخميس: 9:00 ص - 3:00 م',
    location: 'East Wing',
    locationAr: 'الجناح الشرقي',
  },
  {
    id: 'research-center',
    name: 'Research Center',
    nameAr: 'مركز الأبحاث',
    description: 'Facilitating advanced research across disciplines with modern equipment and funding support.',
    descriptionAr: 'تسهيل البحث المتقدم عبر التخصصات بمعدات حديثة ودعم تمويلي.',
    category: 'cultural',
    facilities: ['Research Labs', 'Data Center', 'Collaboration Spaces', 'Publication Office'],
    facilitiesAr: ['معامل بحثية', 'مركز بيانات', 'مساحات تعاون', 'مكتب نشر'],
    hours: 'Sun-Thu: 8:00 AM - 6:00 PM',
    hoursAr: 'الأحد-الخميس: 8:00 ص - 6:00 م',
    location: 'North Wing',
    locationAr: 'الجناح الشمالي',
  },
  {
    id: 'cafeteria',
    name: 'Cafeteria Complex',
    nameAr: 'مجمع الكافتيريا',
    description: 'Multiple dining options serving affordable meals for students and staff.',
    descriptionAr: 'خيارات طعام متعددة تقدم وجبات بأسعار معقولة للطلاب والموظفين.',
    category: 'services',
    facilities: ['Main Dining Hall', 'Coffee Shop', 'Outdoor Seating', 'Vending Machines'],
    facilitiesAr: ['قاعة الطعام الرئيسية', 'مقهى', 'جلسات خارجية', 'آلات بيع'],
    hours: 'Sun-Thu: 7:00 AM - 7:00 PM',
    hoursAr: 'الأحد-الخميس: 7:00 ص - 7:00 م',
    location: 'Central Campus',
    locationAr: 'وسط الحرم الجامعي',
  },
];

type CategoryFilter = 'all' | BuildingCategory;

export function CampusMapPage() {
  const t = useTranslations('campus');
  const locale = useLocale();
  const isAr = locale === 'ar' || locale === 'ur';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories: { key: CategoryFilter; label: string }[] = [
    { key: 'all', label: t('all') },
    { key: 'academic', label: t('academic') },
    { key: 'religious', label: t('religious') },
    { key: 'administrative', label: t('administrative') },
    { key: 'medical', label: t('medical') },
    { key: 'cultural', label: t('cultural') },
    { key: 'services', label: t('services') },
  ];

  const categoryLabelMap = useMemo(() => {
    const map: Record<string, string> = {};
    categories.forEach((c) => {
      map[c.key] = c.label;
    });
    return map;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  const filteredBuildings = useMemo(() => {
    let result = BUILDINGS;

    if (selectedCategory !== 'all') {
      result = result.filter((b) => b.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.nameAr.includes(q) ||
          b.description.toLowerCase().includes(q) ||
          b.descriptionAr.includes(q)
      );
    }

    return result;
  }, [selectedCategory, searchQuery]);

  const getBuildingName = (b: Building) => (isAr ? b.nameAr : b.name);
  const getBuildingDesc = (b: Building) => (isAr ? b.descriptionAr : b.description);
  const getBuildingHours = (b: Building) => (isAr ? b.hoursAr : b.hours);
  const getBuildingLocation = (b: Building) => (isAr ? b.locationAr : b.location);
  const getBuildingFacilities = (b: Building) => (isAr ? b.facilitiesAr : b.facilities);

  const localizedBuildings = useMemo(
    () =>
      filteredBuildings.map((b) => ({
        ...b,
        name: getBuildingName(b),
        description: getBuildingDesc(b),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filteredBuildings, locale]
  );

  return (
    <section className="min-h-screen bg-sand-50 dark:bg-navy-900">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-emerald-700 to-primary-800 dark:from-navy-800 dark:via-navy-900 dark:to-navy-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Landmark className="w-5 h-5 text-amber-300" />
              <span className="text-sm font-medium text-amber-200">
                {isAr ? 'جامعة الأزهر - القاهرة، مصر' : 'Al-Azhar University - Cairo, Egypt'}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {t('title')}
            </h1>
            <p className="text-lg sm:text-xl text-teal-100 dark:text-sand-300 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="bg-white dark:bg-navy-800 rounded-2xl shadow-lg border border-sand-200 dark:border-navy-700 p-4 sm:p-6"
        >
          {/* Search + View Toggle */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-5 h-5 text-sand-400 dark:text-sand-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full ps-10 pe-4 py-2.5 bg-sand-50 dark:bg-navy-900 border border-sand-200 dark:border-navy-700 rounded-xl text-navy-900 dark:text-sand-100 placeholder-sand-400 dark:placeholder-sand-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
              />
            </div>
            <div className="flex items-center gap-1 bg-sand-100 dark:bg-navy-900 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-navy-700 text-teal-700 dark:text-teal-300 shadow-sm'
                    : 'text-sand-500 dark:text-sand-400 hover:text-navy-700 dark:hover:text-sand-200'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">{t('gridView')}</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-navy-700 text-teal-700 dark:text-teal-300 shadow-sm'
                    : 'text-sand-500 dark:text-sand-400 hover:text-navy-700 dark:hover:text-sand-200'
                }`}
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline">{t('listView')}</span>
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === cat.key
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'bg-sand-100 dark:bg-navy-900 text-navy-600 dark:text-sand-300 hover:bg-sand-200 dark:hover:bg-navy-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-navy-600 dark:text-sand-400">
            {localizedBuildings.length} {t('buildings')}
          </p>
        </div>

        <div className="flex gap-6">
          {/* Building Grid/List */}
          <div className={`flex-1 ${selectedBuilding ? 'lg:w-2/3' : 'w-full'}`}>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {localizedBuildings.map((building, i) => (
                  <BuildingCard
                    key={building.id}
                    building={building}
                    index={i}
                    isSelected={selectedBuilding?.id === building.id}
                    onClick={() => setSelectedBuilding(
                      selectedBuilding?.id === building.id ? null : BUILDINGS.find((b) => b.id === building.id)!
                    )}
                    categoryLabel={categoryLabelMap[building.category] || building.category}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {localizedBuildings.map((building, i) => (
                  <BuildingCard
                    key={building.id}
                    building={building}
                    index={i}
                    isSelected={selectedBuilding?.id === building.id}
                    onClick={() => setSelectedBuilding(
                      selectedBuilding?.id === building.id ? null : BUILDINGS.find((b) => b.id === building.id)!
                    )}
                    categoryLabel={categoryLabelMap[building.category] || building.category}
                    listView
                  />
                ))}
              </div>
            )}

            {localizedBuildings.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <Building2 className="w-16 h-16 mx-auto mb-4 text-sand-300 dark:text-navy-600" />
                <p className="text-navy-500 dark:text-sand-400 text-lg">
                  {t('selectBuilding')}
                </p>
              </motion.div>
            )}
          </div>

          {/* Detail Panel (Desktop) */}
          <AnimatePresence>
            {selectedBuilding && (
              <motion.div
                initial={{ opacity: 0, x: isAr ? -40 : 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isAr ? -40 : 40 }}
                transition={{ duration: 0.3 }}
                className="hidden lg:block w-96 flex-shrink-0"
              >
                <div className="sticky top-24 bg-white dark:bg-navy-800 rounded-2xl border border-sand-200 dark:border-navy-700 shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-br from-teal-600 to-emerald-600 dark:from-teal-800 dark:to-emerald-900 p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-white mb-1">
                          {getBuildingName(selectedBuilding)}
                        </h2>
                        {selectedBuilding.founded && (
                          <span className="text-sm text-teal-200">
                            {isAr ? `تأسس: ${selectedBuilding.founded}` : `Founded: ${selectedBuilding.founded}`}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => setSelectedBuilding(null)}
                        className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>

                  <div className="p-6 space-y-5">
                    <p className="text-navy-700 dark:text-sand-300 text-sm leading-relaxed">
                      {getBuildingDesc(selectedBuilding)}
                    </p>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        <h3 className="font-semibold text-navy-900 dark:text-sand-100 text-sm">
                          {t('location')}
                        </h3>
                      </div>
                      <p className="text-sm text-navy-600 dark:text-sand-400 ps-6">
                        {getBuildingLocation(selectedBuilding)}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        <h3 className="font-semibold text-navy-900 dark:text-sand-100 text-sm">
                          {t('hours')}
                        </h3>
                      </div>
                      <p className="text-sm text-navy-600 dark:text-sand-400 ps-6">
                        {getBuildingHours(selectedBuilding)}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Building2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        <h3 className="font-semibold text-navy-900 dark:text-sand-100 text-sm">
                          {t('facilities')}
                        </h3>
                      </div>
                      <div className="ps-6 flex flex-wrap gap-2">
                        {getBuildingFacilities(selectedBuilding).map((facility, i) => (
                          <span
                            key={i}
                            className="text-xs px-2.5 py-1 rounded-full bg-sand-100 dark:bg-navy-700 text-navy-600 dark:text-sand-300"
                          >
                            {facility}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Detail Panel (Bottom Sheet) */}
        <AnimatePresence>
          {selectedBuilding && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed inset-x-0 bottom-0 z-50"
            >
              <div
                className="fixed inset-0 bg-black/30 dark:bg-black/50"
                onClick={() => setSelectedBuilding(null)}
              />
              <div className="relative bg-white dark:bg-navy-800 rounded-t-3xl border-t border-sand-200 dark:border-navy-700 shadow-2xl max-h-[70vh] overflow-y-auto">
                <div className="sticky top-0 bg-white dark:bg-navy-800 px-6 pt-4 pb-2 z-10">
                  <div className="w-12 h-1.5 bg-sand-300 dark:bg-navy-600 rounded-full mx-auto mb-4" />
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-navy-900 dark:text-sand-100">
                        {getBuildingName(selectedBuilding)}
                      </h2>
                      {selectedBuilding.founded && (
                        <span className="text-sm text-teal-600 dark:text-teal-400">
                          {isAr ? `تأسس: ${selectedBuilding.founded}` : `Founded: ${selectedBuilding.founded}`}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => setSelectedBuilding(null)}
                      className="p-1.5 hover:bg-sand-100 dark:hover:bg-navy-700 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-navy-500 dark:text-sand-400" />
                    </button>
                  </div>
                </div>

                <div className="px-6 pb-8 space-y-4">
                  <p className="text-navy-700 dark:text-sand-300 text-sm leading-relaxed">
                    {getBuildingDesc(selectedBuilding)}
                  </p>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                    <span className="text-sm text-navy-600 dark:text-sand-400">
                      {getBuildingLocation(selectedBuilding)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                    <span className="text-sm text-navy-600 dark:text-sand-400">
                      {getBuildingHours(selectedBuilding)}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-semibold text-navy-900 dark:text-sand-100 text-sm mb-2">
                      {t('facilities')}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {getBuildingFacilities(selectedBuilding).map((facility, i) => (
                        <span
                          key={i}
                          className="text-xs px-2.5 py-1 rounded-full bg-sand-100 dark:bg-navy-700 text-navy-600 dark:text-sand-300"
                        >
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
