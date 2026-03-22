'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { GraduationCap, Building, HeartPulse, Landmark } from 'lucide-react';

interface Faculty {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  departments_count: number;
  type?: string;
  established_year?: number;
}

const typeConfig: Record<string, { icon: any; color: string; bg: string; labelAr: string; labelEn: string }> = {
  faculty: { icon: GraduationCap, color: 'text-primary-700', bg: 'bg-primary-100', labelAr: 'كلية', labelEn: 'Faculty' },
  institute: { icon: Landmark, color: 'text-accent-700', bg: 'bg-accent-100', labelAr: 'معهد', labelEn: 'Institute' },
  center: { icon: Building, color: 'text-blue-700', bg: 'bg-blue-100', labelAr: 'مركز', labelEn: 'Center' },
  hospital: { icon: HeartPulse, color: 'text-rose-600', bg: 'bg-rose-100', labelAr: 'مستشفى', labelEn: 'Hospital' },
};

export function FacultyCard({ faculty }: { faculty: Faculty }) {
  const locale = useLocale();
  const isAr = locale === 'ar';
  const config = typeConfig[faculty.type ?? 'faculty'] || typeConfig.faculty;
  const Icon = config.icon;
  const isHospital = faculty.type === 'hospital';

  const content = (
    <div className="flex items-start gap-4">
      <div className={`w-12 h-12 rounded-xl ${config.bg} flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-6 h-6 ${config.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${config.bg} ${config.color}`}>
            {isAr ? config.labelAr : config.labelEn}
          </span>
          {faculty.established_year && (
            <span className="text-xs text-sand-400">{faculty.established_year}</span>
          )}
        </div>
        <h3 className="font-serif text-lg font-bold text-primary-900 mb-2 group-hover:text-primary-700 transition-colors">
          {faculty.name}
        </h3>
        <p className="text-sm text-sand-600 line-clamp-2 mb-3">
          {faculty.description}
        </p>
        {!isHospital && (
          <div className="text-xs text-sand-400">
            {faculty.departments_count} {isAr ? 'أقسام' : 'Departments'}
          </div>
        )}
      </div>
    </div>
  );

  if (isHospital) {
    return (
      <Link
        href={`/hospitals/${faculty.slug}` as any}
        className="group block bg-white rounded-2xl p-6 border border-sand-100 hover:shadow-lg hover:border-rose-200 transition-all duration-300 hover:-translate-y-1"
      >
        {content}
      </Link>
    );
  }

  return (
    <Link
      href={`/faculties/${faculty.slug}` as any}
      className="group block bg-white rounded-2xl p-6 border border-sand-100 hover:shadow-lg hover:border-primary-200 transition-all duration-300 hover:-translate-y-1"
    >
      {content}
    </Link>
  );
}
