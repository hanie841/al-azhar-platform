'use client';

import { motion } from 'framer-motion';
import {
  BookOpen,
  Landmark,
  Building2,
  Heart,
  Library,
  UtensilsCrossed,
  GraduationCap,
  Scale,
  Stethoscope,
  Cog,
  FlaskConical,
  ShoppingBag,
  ScrollText,
  Dumbbell,
  Home,
  Presentation,
  Monitor,
  Globe,
  Microscope,
  Coffee,
} from 'lucide-react';
import type { Building, BuildingCategory } from './types';

const categoryConfig: Record<
  BuildingCategory,
  { color: string; bg: string; border: string; darkBg: string; darkBorder: string; darkText: string }
> = {
  academic: {
    color: 'text-teal-700 dark:text-teal-300',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    darkBg: 'dark:bg-teal-950/40',
    darkBorder: 'dark:border-teal-800',
    darkText: 'dark:text-teal-300',
  },
  religious: {
    color: 'text-emerald-700 dark:text-emerald-300',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    darkBg: 'dark:bg-emerald-950/40',
    darkBorder: 'dark:border-emerald-800',
    darkText: 'dark:text-emerald-300',
  },
  administrative: {
    color: 'text-purple-700 dark:text-purple-300',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    darkBg: 'dark:bg-purple-950/40',
    darkBorder: 'dark:border-purple-800',
    darkText: 'dark:text-purple-300',
  },
  medical: {
    color: 'text-red-700 dark:text-red-300',
    bg: 'bg-red-50',
    border: 'border-red-200',
    darkBg: 'dark:bg-red-950/40',
    darkBorder: 'dark:border-red-800',
    darkText: 'dark:text-red-300',
  },
  cultural: {
    color: 'text-amber-700 dark:text-amber-300',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    darkBg: 'dark:bg-amber-950/40',
    darkBorder: 'dark:border-amber-800',
    darkText: 'dark:text-amber-300',
  },
  services: {
    color: 'text-slate-700 dark:text-slate-300',
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    darkBg: 'dark:bg-slate-800/40',
    darkBorder: 'dark:border-slate-700',
    darkText: 'dark:text-slate-300',
  },
};

const buildingIcons: Record<string, React.ReactNode> = {
  'al-azhar-mosque': <Landmark className="w-6 h-6" />,
  'islamic-studies': <BookOpen className="w-6 h-6" />,
  'arabic-language': <ScrollText className="w-6 h-6" />,
  'sharia-law': <Scale className="w-6 h-6" />,
  medicine: <Stethoscope className="w-6 h-6" />,
  engineering: <Cog className="w-6 h-6" />,
  science: <FlaskConical className="w-6 h-6" />,
  commerce: <ShoppingBag className="w-6 h-6" />,
  'central-library': <Library className="w-6 h-6" />,
  'manuscript-museum': <ScrollText className="w-6 h-6" />,
  'university-hospital': <Heart className="w-6 h-6" />,
  'student-affairs': <GraduationCap className="w-6 h-6" />,
  administration: <Building2 className="w-6 h-6" />,
  'sports-complex': <Dumbbell className="w-6 h-6" />,
  dormitories: <Home className="w-6 h-6" />,
  'conference-center': <Presentation className="w-6 h-6" />,
  'it-center': <Monitor className="w-6 h-6" />,
  'international-students': <Globe className="w-6 h-6" />,
  'research-center': <Microscope className="w-6 h-6" />,
  cafeteria: <Coffee className="w-6 h-6" />,
};

function getCategoryIcon(category: BuildingCategory): React.ReactNode {
  const icons: Record<BuildingCategory, React.ReactNode> = {
    academic: <GraduationCap className="w-6 h-6" />,
    religious: <Landmark className="w-6 h-6" />,
    administrative: <Building2 className="w-6 h-6" />,
    medical: <Heart className="w-6 h-6" />,
    cultural: <Library className="w-6 h-6" />,
    services: <UtensilsCrossed className="w-6 h-6" />,
  };
  return icons[category];
}

interface BuildingCardProps {
  building: Building;
  index: number;
  isSelected: boolean;
  onClick: () => void;
  categoryLabel: string;
  listView?: boolean;
}

export function BuildingCard({
  building,
  index,
  isSelected,
  onClick,
  categoryLabel,
  listView = false,
}: BuildingCardProps) {
  const config = categoryConfig[building.category];
  const icon = buildingIcons[building.id] || getCategoryIcon(building.category);

  if (listView) {
    return (
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.03, duration: 0.3 }}
        onClick={onClick}
        className={`w-full flex items-center gap-4 p-4 rounded-xl border text-start transition-all duration-200
          ${isSelected
            ? `${config.bg} ${config.darkBg} ${config.border} ${config.darkBorder} ring-2 ring-offset-1 ring-teal-500/30 dark:ring-teal-400/30`
            : 'bg-white dark:bg-navy-800 border-sand-200 dark:border-navy-700 hover:shadow-md hover:-translate-y-0.5'
          }`}
      >
        <div className={`flex-shrink-0 w-12 h-12 rounded-lg ${config.bg} ${config.darkBg} flex items-center justify-center ${config.color}`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-navy-900 dark:text-sand-100 truncate">
            {building.name}
          </h3>
          <p className="text-sm text-navy-600 dark:text-sand-400 truncate">
            {building.description}
          </p>
        </div>
        <span className={`flex-shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${config.bg} ${config.darkBg} ${config.color}`}>
          {categoryLabel}
        </span>
      </motion.button>
    );
  }

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={onClick}
      className={`group relative flex flex-col items-center text-center p-5 rounded-2xl border transition-all duration-200
        ${isSelected
          ? `${config.bg} ${config.darkBg} ${config.border} ${config.darkBorder} ring-2 ring-offset-1 ring-teal-500/30 dark:ring-teal-400/30 shadow-lg`
          : 'bg-white dark:bg-navy-800 border-sand-200 dark:border-navy-700 hover:shadow-lg'
        }`}
    >
      <div className={`w-14 h-14 rounded-xl ${config.bg} ${config.darkBg} flex items-center justify-center ${config.color} mb-3 transition-transform duration-200 group-hover:scale-110`}>
        {icon}
      </div>
      <h3 className="font-semibold text-navy-900 dark:text-sand-100 text-sm leading-snug mb-1.5 line-clamp-2">
        {building.name}
      </h3>
      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${config.bg} ${config.darkBg} ${config.color}`}>
        {categoryLabel}
      </span>
    </motion.button>
  );
}
