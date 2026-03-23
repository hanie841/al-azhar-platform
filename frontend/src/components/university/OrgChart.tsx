'use client';

import { useState, useRef, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  GraduationCap,
  BookOpen,
  Users,
  Building2,
  Shield,
  Landmark,
  MapPin,
  Heart,
  Briefcase,
  Scale,
  Monitor,
  Wrench,
  Megaphone,
  HardHat,
  BarChart3,
  Award,
  School,
  Crown,
  CircleDot,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface OrgNode {
  id: string;
  nameAr: string;
  nameEn: string;
  icon?: React.ElementType;
  color: string;
  children?: OrgNode[];
}

interface Branch {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: React.ElementType;
  color: string;
  borderColor: string;
  bgColor: string;
  bgColorDark: string;
  textColor: string;
  badgeBg: string;
  children: OrgNode[];
}

// ---------------------------------------------------------------------------
// Organisational Data
// ---------------------------------------------------------------------------

const branches: Branch[] = [
  // BRANCH 1 — VP Education & Students
  {
    id: 'vp-education',
    nameAr: 'نائب رئيس الجامعة لشؤون التعليم والطلاب',
    nameEn: 'Vice President for Education & Students',
    icon: GraduationCap,
    color: 'blue',
    borderColor: 'border-blue-600',
    bgColor: 'bg-blue-50',
    bgColorDark: 'dark:bg-blue-950/30',
    textColor: 'text-blue-700 dark:text-blue-300',
    badgeBg: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200',
    children: [
      {
        id: 'edu-affairs',
        nameAr: 'الإدارة العامة لشؤون التعليم',
        nameEn: 'General Administration for Education Affairs',
        color: 'blue',
        children: [
          { id: 'admission', nameAr: 'إدارة القبول والتسجيل', nameEn: 'Admission & Registration Department', color: 'blue' },
          { id: 'exams', nameAr: 'إدارة الامتحانات', nameEn: 'Examination Department', color: 'blue' },
          { id: 'records', nameAr: 'إدارة سجلات الطلاب', nameEn: 'Student Records Department', color: 'blue' },
          { id: 'certificates', nameAr: 'إدارة الشهادات', nameEn: 'Certificates Department', color: 'blue' },
          { id: 'intl-students', nameAr: 'إدارة شؤون الوافدين', nameEn: 'International Students Department', color: 'blue' },
        ],
      },
      {
        id: 'student-welfare',
        nameAr: 'الإدارة العامة لرعاية الشباب',
        nameEn: 'General Administration for Student Welfare',
        color: 'blue',
        children: [
          { id: 'student-activities', nameAr: 'إدارة الأنشطة الطلابية', nameEn: 'Student Activities Department', color: 'blue' },
          { id: 'sports', nameAr: 'إدارة الأنشطة الرياضية', nameEn: 'Sports Activities Department', color: 'blue' },
          { id: 'social-cultural', nameAr: 'إدارة الأنشطة الاجتماعية والثقافية', nameEn: 'Social & Cultural Activities Department', color: 'blue' },
          { id: 'dormitories-admin', nameAr: 'إدارة المدن الجامعية', nameEn: 'University Dormitories Administration', color: 'blue' },
          { id: 'student-families', nameAr: 'إدارة الأسر الطلابية', nameEn: 'Student Families Department', color: 'blue' },
        ],
      },
      {
        id: 'medical-admin',
        nameAr: 'الإدارة الطبية',
        nameEn: 'Medical Administration',
        color: 'blue',
        children: [
          { id: 'general-medical', nameAr: 'الإدارة الطبية العامة', nameEn: 'General Medical Administration', color: 'blue' },
          { id: 'dental', nameAr: 'إدارة طب الأسنان', nameEn: 'Dental Administration', color: 'blue' },
          { id: 'pharmacy', nameAr: 'إدارة الصيدلة', nameEn: 'Pharmacy Administration', color: 'blue' },
          { id: 'labs-medical', nameAr: 'إدارة المعامل', nameEn: 'Laboratories Administration', color: 'blue' },
          { id: 'hospitals', nameAr: 'إدارة المستشفيات', nameEn: 'Hospitals Administration', color: 'blue' },
        ],
      },
      {
        id: 'uni-cities',
        nameAr: 'المدن الجامعية',
        nameEn: 'University Cities / Dormitories',
        color: 'blue',
        children: [
          { id: 'male-dorms', nameAr: 'إسكان الطلاب', nameEn: 'Male Students Dormitories', color: 'blue' },
          { id: 'female-dorms', nameAr: 'إسكان الطالبات', nameEn: 'Female Students Dormitories', color: 'blue' },
          { id: 'nutrition', nameAr: 'إدارة التغذية', nameEn: 'Nutrition Department', color: 'blue' },
          { id: 'housing-supervision', nameAr: 'إدارة الإسكان والإشراف', nameEn: 'Housing & Supervision Department', color: 'blue' },
        ],
      },
      {
        id: 'special-units-edu',
        nameAr: 'وحدات خاصة',
        nameEn: 'Special Units',
        color: 'blue',
        children: [
          { id: 'student-hospital', nameAr: 'مستشفى الطلاب', nameEn: 'Students Hospital', color: 'blue' },
          { id: 'uni-restaurants', nameAr: 'المطاعم الجامعية', nameEn: 'University Restaurants', color: 'blue' },
          { id: 'external-nutrition', nameAr: 'خدمات التغذية الخارجية', nameEn: 'External Nutrition Services', color: 'blue' },
        ],
      },
    ],
  },

  // BRANCH 2 — VP Graduate Studies & Research
  {
    id: 'vp-graduate',
    nameAr: 'نائب رئيس الجامعة للدراسات العليا والبحوث',
    nameEn: 'Vice President for Postgraduate Studies & Research',
    icon: BookOpen,
    color: 'emerald',
    borderColor: 'border-emerald-600',
    bgColor: 'bg-emerald-50',
    bgColorDark: 'dark:bg-emerald-950/30',
    textColor: 'text-emerald-700 dark:text-emerald-300',
    badgeBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200',
    children: [
      {
        id: 'grad-studies-admin',
        nameAr: 'الإدارة العامة للدراسات العليا',
        nameEn: 'General Administration for Postgraduate Studies',
        color: 'emerald',
        children: [
          { id: 'grad-dept', nameAr: 'إدارة الدراسات العليا', nameEn: 'Graduate Studies Department', color: 'emerald' },
          { id: 'scientific-research', nameAr: 'إدارة البحث العلمي', nameEn: 'Scientific Research Department', color: 'emerald' },
        ],
      },
      {
        id: 'libraries-doc',
        nameAr: 'الإدارة العامة للمكتبات والتوثيق',
        nameEn: 'General Administration for Libraries & Documentation',
        color: 'emerald',
        children: [
          { id: 'uni-libraries', nameAr: 'المكتبات الجامعية', nameEn: 'University Libraries', color: 'emerald' },
          { id: 'documentation', nameAr: 'إدارة التوثيق', nameEn: 'Documentation Department', color: 'emerald' },
          { id: 'publishing', nameAr: 'إدارة النشر والطباعة', nameEn: 'Publishing & Printing Department', color: 'emerald' },
        ],
      },
      {
        id: 'scientific-cultural',
        nameAr: 'إدارة العلاقات العلمية والثقافية',
        nameEn: 'Scientific & Cultural Relations Administration',
        color: 'emerald',
        children: [
          { id: 'cultural-relations', nameAr: 'إدارة العلاقات الثقافية', nameEn: 'Cultural Relations Department', color: 'emerald' },
          { id: 'scientific-missions', nameAr: 'إدارة البعثات العلمية', nameEn: 'Scientific Missions Department', color: 'emerald' },
        ],
      },
    ],
  },

  // BRANCH 3 — VP Girls' Branch Cairo
  {
    id: 'vp-girls',
    nameAr: "نائب رئيس الجامعة لفرع البنات بالقاهرة",
    nameEn: "Vice President for Girls' Branch — Cairo",
    icon: Users,
    color: 'pink',
    borderColor: 'border-pink-600',
    bgColor: 'bg-pink-50',
    bgColorDark: 'dark:bg-pink-950/30',
    textColor: 'text-pink-700 dark:text-pink-300',
    badgeBg: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-200',
    children: [
      { id: 'girls-asst-sec', nameAr: 'أمين عام مساعد فرع البنات', nameEn: "Assistant Secretary General for Girls' Branch", color: 'pink' },
      { id: 'girls-security', nameAr: 'إدارة الأمن', nameEn: 'Security Administration', color: 'pink' },
      { id: 'girls-finance', nameAr: 'الشؤون المالية والإدارية', nameEn: 'Financial & Administrative Affairs', color: 'pink' },
      { id: 'girls-academic', nameAr: 'إدارة الشؤون الأكاديمية', nameEn: 'Academic Affairs Administration', color: 'pink' },
      { id: 'girls-student', nameAr: 'إدارة شؤون الطلاب', nameEn: 'Student Affairs Administration', color: 'pink' },
      { id: 'girls-library', nameAr: 'إدارة المكتبة', nameEn: 'Library Administration', color: 'pink' },
      { id: 'girls-labs', nameAr: 'إدارة المعامل', nameEn: 'Laboratories Administration', color: 'pink' },
    ],
  },

  // BRANCH 4 — VP Assiut Branch
  {
    id: 'vp-assiut',
    nameAr: 'نائب رئيس الجامعة لفرع أسيوط',
    nameEn: 'Vice President for Upper Egypt Branch — Assiut',
    icon: MapPin,
    color: 'amber',
    borderColor: 'border-amber-600',
    bgColor: 'bg-amber-50',
    bgColorDark: 'dark:bg-amber-950/30',
    textColor: 'text-amber-700 dark:text-amber-300',
    badgeBg: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200',
    children: [
      { id: 'assiut-asst-sec', nameAr: 'أمين عام مساعد فرع أسيوط', nameEn: 'Assistant Secretary General for Assiut Branch', color: 'amber' },
      { id: 'assiut-security', nameAr: 'إدارة الأمن', nameEn: 'Security Department', color: 'amber' },
      {
        id: 'assiut-medical',
        nameAr: 'الأقسام الطبية',
        nameEn: 'Medical Departments',
        color: 'amber',
        children: [
          { id: 'assiut-medicine', nameAr: 'الطب البشري', nameEn: 'Human Medicine', color: 'amber' },
          { id: 'assiut-dentistry', nameAr: 'طب الأسنان', nameEn: 'Dentistry', color: 'amber' },
          { id: 'assiut-pharmacy', nameAr: 'الصيدلة', nameEn: 'Pharmacy', color: 'amber' },
        ],
      },
      { id: 'assiut-admin', nameAr: 'الشؤون الإدارية', nameEn: 'Administrative Affairs', color: 'amber' },
      { id: 'assiut-financial', nameAr: 'الشؤون المالية', nameEn: 'Financial Affairs', color: 'amber' },
      { id: 'assiut-students', nameAr: 'شؤون الطلاب', nameEn: 'Student Affairs', color: 'amber' },
      { id: 'assiut-labs', nameAr: 'المعامل والمرافق', nameEn: 'Laboratories & Facilities', color: 'amber' },
    ],
  },

  // BRANCH 5 — Secretary General
  {
    id: 'secretary-general',
    nameAr: 'أمين عام الجامعة',
    nameEn: 'University Secretary General',
    icon: Briefcase,
    color: 'indigo',
    borderColor: 'border-indigo-600',
    bgColor: 'bg-indigo-50',
    bgColorDark: 'dark:bg-indigo-950/30',
    textColor: 'text-indigo-700 dark:text-indigo-300',
    badgeBg: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200',
    children: [
      {
        id: 'admin-affairs',
        nameAr: 'الإدارة العامة للشؤون الإدارية',
        nameEn: 'General Administration for Administrative Affairs',
        color: 'indigo',
        children: [
          { id: 'personnel', nameAr: 'إدارة شؤون الأفراد', nameEn: 'Personnel Affairs Department', color: 'indigo' },
          { id: 'workers', nameAr: 'إدارة شؤون العاملين', nameEn: 'Workers Affairs Department', color: 'indigo' },
          { id: 'services', nameAr: 'إدارة الخدمات', nameEn: 'Services Department', color: 'indigo' },
          { id: 'attendance', nameAr: 'إدارة الحضور والانصراف', nameEn: 'Attendance & Leave Department', color: 'indigo' },
        ],
      },
      {
        id: 'financial-affairs',
        nameAr: 'الإدارة العامة للشؤون المالية',
        nameEn: 'General Administration for Financial Affairs',
        color: 'indigo',
        children: [
          { id: 'budget', nameAr: 'إدارة الموازنة', nameEn: 'Budget Department', color: 'indigo' },
          { id: 'accounts', nameAr: 'إدارة الحسابات', nameEn: 'Accounts Department', color: 'indigo' },
          { id: 'treasury', nameAr: 'إدارة الخزينة', nameEn: 'Treasury Department', color: 'indigo' },
          { id: 'financial-control', nameAr: 'وحدات الرقابة المالية', nameEn: 'Financial Control Units', color: 'indigo' },
        ],
      },
      {
        id: 'procurement',
        nameAr: 'الإدارة العامة للمشتريات والمخازن',
        nameEn: 'General Administration for Procurement & Stores',
        color: 'indigo',
        children: [
          { id: 'procurement-dept', nameAr: 'إدارة المشتريات', nameEn: 'Procurement Department', color: 'indigo' },
          { id: 'contracts', nameAr: 'إدارة العقود', nameEn: 'Contracts Department', color: 'indigo' },
          { id: 'warehouses', nameAr: 'إدارة المخازن', nameEn: 'Warehouses Management', color: 'indigo' },
        ],
      },
      {
        id: 'engineering',
        nameAr: 'الإدارة العامة للشؤون الهندسية',
        nameEn: 'General Administration for Engineering Affairs',
        color: 'indigo',
        children: [
          { id: 'projects', nameAr: 'إدارة المشروعات', nameEn: 'Projects Department', color: 'indigo' },
          { id: 'maintenance', nameAr: 'إدارة الصيانة', nameEn: 'Maintenance Department', color: 'indigo' },
          { id: 'tech-office', nameAr: 'المكتب الفني', nameEn: 'Technical Office', color: 'indigo' },
          { id: 'design', nameAr: 'إدارة التصميمات', nameEn: 'Design Department', color: 'indigo' },
        ],
      },
      {
        id: 'security-general',
        nameAr: 'الإدارة العامة للأمن',
        nameEn: 'General Administration for Security',
        color: 'indigo',
        children: [
          { id: 'general-security', nameAr: 'إدارة الأمن العام', nameEn: 'General Security Administration', color: 'indigo' },
          { id: 'asst-security', nameAr: 'مكاتب الأمن المساعدة', nameEn: 'Assistant Security Offices', color: 'indigo' },
        ],
      },
      {
        id: 'legal-affairs',
        nameAr: 'الإدارة العامة للشؤون القانونية',
        nameEn: 'General Administration for Legal Affairs',
        color: 'indigo',
        children: [
          { id: 'investigations', nameAr: 'إدارة التحقيقات', nameEn: 'Investigations Department', color: 'indigo' },
          { id: 'contracts-legal', nameAr: 'إدارة العقود والشؤون القانونية', nameEn: 'Contracts & Legal Affairs', color: 'indigo' },
        ],
      },
      {
        id: 'info-systems',
        nameAr: 'الإدارة العامة لنظم المعلومات والتحول الرقمي',
        nameEn: 'General Administration for Information Systems & Digital Transformation',
        color: 'indigo',
        children: [
          { id: 'info-sys-dept', nameAr: 'إدارة نظم المعلومات', nameEn: 'Information Systems Department', color: 'indigo' },
          { id: 'digital-transform', nameAr: 'إدارة التحول الرقمي', nameEn: 'Digital Transformation Department', color: 'indigo' },
          { id: 'tech-support', nameAr: 'إدارة الدعم الفني', nameEn: 'Technical Support Department', color: 'indigo' },
        ],
      },
    ],
  },

  // BRANCH 6 — Audit & Governance
  {
    id: 'audit',
    nameAr: 'الرقابة الداخلية والحوكمة',
    nameEn: 'Internal Audit & Governance',
    icon: Shield,
    color: 'rose',
    borderColor: 'border-rose-600',
    bgColor: 'bg-rose-50',
    bgColorDark: 'dark:bg-rose-950/30',
    textColor: 'text-rose-700 dark:text-rose-300',
    badgeBg: 'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-200',
    children: [],
  },
];

const additionalUnits: Branch[] = [
  {
    id: 'hr-center',
    nameAr: 'مركز تنمية الموارد البشرية',
    nameEn: 'Human Resources Development Center',
    icon: Award,
    color: 'teal',
    borderColor: 'border-teal-600',
    bgColor: 'bg-teal-50',
    bgColorDark: 'dark:bg-teal-950/30',
    textColor: 'text-teal-700 dark:text-teal-300',
    badgeBg: 'bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-200',
    children: [
      { id: 'training-planning', nameAr: 'تخطيط البرامج التدريبية', nameEn: 'Training Programs Planning', color: 'teal' },
      { id: 'training-impl', nameAr: 'تنفيذ التدريب', nameEn: 'Training Implementation', color: 'teal' },
      { id: 'perf-eval', nameAr: 'تقييم الأداء', nameEn: 'Performance Evaluation', color: 'teal' },
      { id: 'capacity', nameAr: 'بناء القدرات', nameEn: 'Capacity Building', color: 'teal' },
    ],
  },
  {
    id: 'public-relations',
    nameAr: 'العلاقات العامة والإعلام',
    nameEn: 'Public Relations & Media',
    icon: Megaphone,
    color: 'teal',
    borderColor: 'border-teal-600',
    bgColor: 'bg-teal-50',
    bgColorDark: 'dark:bg-teal-950/30',
    textColor: 'text-teal-700 dark:text-teal-300',
    badgeBg: 'bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-200',
    children: [
      { id: 'pr-dept', nameAr: 'إدارة العلاقات العامة', nameEn: 'Public Relations Department', color: 'teal' },
      { id: 'media-translation', nameAr: 'إدارة الإعلام والترجمة', nameEn: 'Media & Translation Department', color: 'teal' },
      { id: 'citizens-service', nameAr: 'مكتب خدمة المواطنين', nameEn: 'Citizens Service Office', color: 'teal' },
    ],
  },
  {
    id: 'safety-health',
    nameAr: 'السلامة والصحة المهنية',
    nameEn: 'Occupational Safety & Health',
    icon: HardHat,
    color: 'teal',
    borderColor: 'border-teal-600',
    bgColor: 'bg-teal-50',
    bgColorDark: 'dark:bg-teal-950/30',
    textColor: 'text-teal-700 dark:text-teal-300',
    badgeBg: 'bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-200',
    children: [
      { id: 'safety-dept', nameAr: 'إدارة السلامة', nameEn: 'Safety Department', color: 'teal' },
      { id: 'work-env', nameAr: 'مراقبة بيئة العمل', nameEn: 'Work Environment Monitoring', color: 'teal' },
    ],
  },
  {
    id: 'special-admin-units',
    nameAr: 'وحدات إدارية خاصة',
    nameEn: 'Special Administrative Units',
    icon: BarChart3,
    color: 'teal',
    borderColor: 'border-teal-600',
    bgColor: 'bg-teal-50',
    bgColorDark: 'dark:bg-teal-950/30',
    textColor: 'text-teal-700 dark:text-teal-300',
    badgeBg: 'bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-200',
    children: [
      { id: 'quality-assurance', nameAr: 'وحدات ضمان الجودة', nameEn: 'Quality Assurance Units', color: 'teal' },
      { id: 'strategic-planning', nameAr: 'إدارة التخطيط الاستراتيجي', nameEn: 'Strategic Planning Department', color: 'teal' },
      { id: 'risk-crisis', nameAr: 'إدارة المخاطر والأزمات', nameEn: 'Risk & Crisis Management', color: 'teal' },
      { id: 'statistics', nameAr: 'الإحصاء وتحليل البيانات', nameEn: 'Statistics & Data Analysis', color: 'teal' },
    ],
  },
];

const collegeStructure: OrgNode[] = [
  { id: 'col-dean', nameAr: 'عميد الكلية', nameEn: 'Dean of the College', color: 'purple' },
  { id: 'col-council', nameAr: 'مجلس الكلية', nameEn: 'College Council', color: 'purple' },
  { id: 'col-vp-edu', nameAr: 'وكيل الكلية لشؤون التعليم والطلاب', nameEn: 'Vice Dean for Education & Students', color: 'purple' },
  { id: 'col-vp-grad', nameAr: 'وكيل الكلية للدراسات العليا والبحوث', nameEn: 'Vice Dean for Postgraduate Studies', color: 'purple' },
  { id: 'col-vp-community', nameAr: 'وكيل الكلية لشؤون خدمة المجتمع', nameEn: 'Vice Dean for Community Service', color: 'purple' },
  {
    id: 'col-admin-units',
    nameAr: 'الوحدات الإدارية',
    nameEn: 'Administrative Units',
    color: 'purple',
    children: [
      { id: 'col-student-affairs', nameAr: 'شؤون الطلاب', nameEn: 'Student Affairs', color: 'purple' },
      { id: 'col-edu-affairs', nameAr: 'شؤون التعليم', nameEn: 'Education Affairs', color: 'purple' },
      { id: 'col-grad-studies', nameAr: 'الدراسات العليا', nameEn: 'Graduate Studies', color: 'purple' },
      { id: 'col-library', nameAr: 'المكتبة', nameEn: 'Library', color: 'purple' },
      { id: 'col-labs', nameAr: 'المعامل', nameEn: 'Laboratories', color: 'purple' },
      { id: 'col-it', nameAr: 'وحدة تكنولوجيا المعلومات', nameEn: 'IT Unit', color: 'purple' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Helper: count all leaf-level items in a branch
// ---------------------------------------------------------------------------
function countItems(nodes: OrgNode[]): number {
  let count = 0;
  for (const n of nodes) {
    if (n.children && n.children.length > 0) {
      count += countItems(n.children);
    } else {
      count += 1;
    }
  }
  return count;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SubAdminAccordion({
  node,
  isAr,
}: {
  node: OrgNode;
  isAr: boolean;
}) {
  const [open, setOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  const name = isAr ? node.nameAr : node.nameEn;

  if (!hasChildren) {
    return (
      <div className="flex items-center gap-2 py-2 px-3">
        <CircleDot className="w-3.5 h-3.5 shrink-0 text-gray-400 dark:text-gray-500" />
        <span className="text-sm text-gray-700 dark:text-gray-300">{name}</span>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 py-2.5 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors text-start"
      >
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 shrink-0 text-gray-500 dark:text-gray-400" />
        </motion.div>
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{name}</span>
        <span className="ms-auto text-xs text-gray-400 dark:text-gray-500">
          {node.children!.length}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div
              className={`${isAr ? 'border-r-2 mr-5' : 'border-l-2 ml-5'} border-gray-200 dark:border-gray-700 py-1`}
            >
              {node.children!.map((child) => (
                <SubAdminAccordion key={child.id} node={child} isAr={isAr} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BranchCard({
  branch,
  isAr,
  isExpanded,
  onToggle,
}: {
  branch: Branch;
  isAr: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const Icon = branch.icon;
  const name = isAr ? branch.nameAr : branch.nameEn;
  const total = branch.children.length > 0 ? countItems(branch.children) : 0;
  const expandRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(() => {
    onToggle();
    if (!isExpanded && expandRef.current) {
      setTimeout(() => {
        expandRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  }, [isExpanded, onToggle]);

  const isStandalone = branch.children.length === 0;

  return (
    <div ref={expandRef} className="flex flex-col">
      <button
        onClick={handleClick}
        className={`
          relative group w-full rounded-xl p-5 text-start transition-all duration-200
          bg-white dark:bg-gray-900 shadow-sm hover:shadow-md
          border-2 ${isExpanded ? branch.borderColor : 'border-gray-200 dark:border-gray-700'}
          ${isAr ? `border-r-4 ${isExpanded ? branch.borderColor : ''}` : `border-l-4 ${isExpanded ? branch.borderColor : ''}`}
        `}
      >
        <div className="flex items-start gap-4">
          <div
            className={`
              shrink-0 w-11 h-11 rounded-lg flex items-center justify-center
              ${branch.bgColor} ${branch.bgColorDark}
            `}
          >
            <Icon className={`w-5 h-5 ${branch.textColor}`} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-serif font-bold text-gray-900 dark:text-white text-sm leading-snug">
              {name}
            </h3>
            {total > 0 && (
              <span className={`inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full ${branch.badgeBg}`}>
                {isAr ? `${total} وحدة` : `${total} units`}
              </span>
            )}
            {isStandalone && (
              <span className="inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                {isAr ? 'وحدة مستقلة' : 'Standalone unit'}
              </span>
            )}
          </div>
          {!isStandalone && (
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="shrink-0 mt-1"
            >
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </motion.div>
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && branch.children.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div
              className={`
                mt-2 rounded-xl p-4
                ${branch.bgColor} ${branch.bgColorDark}
                ${isAr ? 'border-r-4' : 'border-l-4'} ${branch.borderColor}
              `}
            >
              <div className="space-y-1">
                {branch.children.map((child) => (
                  <SubAdminAccordion key={child.id} node={child} isAr={isAr} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export function OrgChart() {
  const t = useTranslations('structure');
  const locale = useLocale();
  const isAr = locale === 'ar' || locale === 'ur';
  const [expandedBranch, setExpandedBranch] = useState<string | null>(null);
  const [expandedAdditional, setExpandedAdditional] = useState<string | null>(null);
  const [showCollege, setShowCollege] = useState(false);

  const toggleBranch = useCallback(
    (id: string) => setExpandedBranch((prev) => (prev === id ? null : id)),
    [],
  );
  const toggleAdditional = useCallback(
    (id: string) => setExpandedAdditional((prev) => (prev === id ? null : id)),
    [],
  );

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-navy-900">
      {/* ============ HERO ============ */}
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* ============ PRESIDENT SECTION ============ */}
        <section className="space-y-6">
          {/* University Council badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-100 dark:bg-amber-900/40 border border-amber-300 dark:border-amber-700">
              <Landmark className="w-4 h-4 text-amber-700 dark:text-amber-300" />
              <span className="text-sm font-semibold text-amber-800 dark:text-amber-200">
                {isAr ? 'مجلس الجامعة' : 'University Council'}
              </span>
            </div>
          </motion.div>

          {/* Vertical connector */}
          <div className="flex justify-center">
            <div className="w-0.5 h-6 bg-amber-300 dark:bg-amber-700" />
          </div>

          {/* President card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="max-w-md mx-auto"
          >
            <div className="relative rounded-2xl p-6 text-center bg-gradient-to-br from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 shadow-lg shadow-amber-200/50 dark:shadow-amber-900/30">
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-white/20 flex items-center justify-center">
                <Crown className="w-7 h-7 text-white" />
              </div>
              <h2 className="font-serif text-xl font-bold text-white">
                {isAr ? 'رئيس الجامعة' : 'University President'}
              </h2>
              <p className="text-amber-100 text-sm mt-1">
                {isAr ? 'القيادة العليا للجامعة' : 'Senior University Leadership'}
              </p>
            </div>
          </motion.div>

          {/* Vertical connector */}
          <div className="flex justify-center">
            <div className="w-0.5 h-8 bg-gray-300 dark:bg-gray-600" />
          </div>
        </section>

        {/* ============ MAIN BRANCHES ============ */}
        <section>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-6 text-center"
          >
            {isAr ? 'الفروع الرئيسية' : 'Main Branches'}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {branches.map((branch, i) => (
              <motion.div
                key={branch.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={branch.children.length > 0 && expandedBranch === branch.id ? 'md:col-span-2 lg:col-span-3' : ''}
              >
                <BranchCard
                  branch={branch}
                  isAr={isAr}
                  isExpanded={expandedBranch === branch.id}
                  onToggle={() => toggleBranch(branch.id)}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============ ADDITIONAL UNITS ============ */}
        <section>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-6 text-center"
          >
            {isAr ? 'الوحدات الإضافية' : 'Additional Units'}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {additionalUnits.map((unit, i) => (
              <motion.div
                key={unit.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={expandedAdditional === unit.id ? 'md:col-span-2' : ''}
              >
                <BranchCard
                  branch={unit}
                  isAr={isAr}
                  isExpanded={expandedAdditional === unit.id}
                  onToggle={() => toggleAdditional(unit.id)}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============ COLLEGE-LEVEL STRUCTURE ============ */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setShowCollege(!showCollege)}
              className={`
                w-full rounded-2xl p-6 text-start transition-all duration-200
                bg-white dark:bg-gray-900 shadow-sm hover:shadow-md
                border-2 ${showCollege ? 'border-purple-500' : 'border-gray-200 dark:border-gray-700'}
              `}
            >
              <div className="flex items-center gap-4">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/30 flex items-center justify-center">
                  <School className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif font-bold text-gray-900 dark:text-white text-base">
                    {isAr ? 'الهيكل الداخلي للكلية (نموذج عام)' : 'College-Level Structure (Generic Model)'}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    {isAr
                      ? 'الهيكل التنظيمي المعتمد لجميع كليات الجامعة'
                      : 'The standard organizational model applied to all university colleges'}
                  </p>
                </div>
                <motion.div
                  animate={{ rotate: showCollege ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </motion.div>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {showCollege && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div
                    className={`
                      mt-2 rounded-xl p-4
                      bg-purple-50 dark:bg-purple-950/30
                      ${isAr ? 'border-r-4' : 'border-l-4'} border-purple-500
                    `}
                  >
                    <div className="space-y-1">
                      {collegeStructure.map((node) => (
                        <SubAdminAccordion key={node.id} node={node} isAr={isAr} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
