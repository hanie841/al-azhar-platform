'use client';

import { motion } from 'framer-motion';

export interface AlumniMember {
  id: number;
  name: string;
  name_ar: string;
  title: string;
  title_ar: string;
  bio: string;
  bio_ar: string;
  category: 'scholar' | 'politician' | 'writer' | 'religious_leader' | 'scientist';
  era: string;
  century: string;
  photo: string | null;
}

interface AlumniCardProps {
  alumni: AlumniMember;
  index?: number;
  isAr?: boolean;
  categoryLabel: string;
}

const categoryColors: Record<string, string> = {
  scholar: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  politician: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  writer: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  religious_leader: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  scientist: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
};

const categoryGradients: Record<string, string> = {
  scholar: 'from-blue-500 to-blue-600',
  politician: 'from-purple-500 to-purple-600',
  writer: 'from-emerald-500 to-emerald-600',
  religious_leader: 'from-amber-500 to-amber-600',
  scientist: 'from-cyan-500 to-cyan-600',
};

export function AlumniCard({ alumni, index = 0, isAr = false, categoryLabel }: AlumniCardProps) {
  const name = isAr ? alumni.name_ar : alumni.name;
  const title = isAr ? alumni.title_ar : alumni.title;
  const bio = isAr ? alumni.bio_ar : alumni.bio;
  const gradient = categoryGradients[alumni.category] || 'from-sand-500 to-sand-600';
  const colorClass = categoryColors[alumni.category] || 'bg-sand-100 text-sand-800 dark:bg-sand-900/30 dark:text-sand-300';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white dark:bg-navy-800 rounded-2xl p-6 shadow-sm dark:shadow-navy-900/50 border border-sand-100 dark:border-navy-700 text-center hover:shadow-lg transition-shadow cursor-pointer group"
    >
      {/* Photo / Initials */}
      <div
        className={`w-20 h-20 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center mx-auto mb-4 ring-4 ring-white dark:ring-navy-800 group-hover:ring-sand-100 dark:group-hover:ring-navy-700 transition-all`}
      >
        {alumni.photo ? (
          <img
            src={alumni.photo}
            alt={name}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span className="text-white font-serif text-2xl font-bold">
            {name.charAt(0)}
          </span>
        )}
      </div>

      {/* Name & Title */}
      <h3 className="font-serif text-lg font-bold text-primary-900 dark:text-primary-200 mb-1 line-clamp-1">
        {name}
      </h3>
      <p className="text-sm text-accent-600 dark:text-accent-400 font-medium mb-3 line-clamp-1">
        {title}
      </p>

      {/* Bio (2 lines) */}
      <p className="text-sm text-sand-600 dark:text-sand-400 line-clamp-2 leading-relaxed mb-4">
        {bio}
      </p>

      {/* Badges */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${colorClass}`}>
          {categoryLabel}
        </span>
        <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-sand-100 text-sand-700 dark:bg-navy-700 dark:text-sand-300">
          {alumni.era}
        </span>
      </div>
    </motion.div>
  );
}
