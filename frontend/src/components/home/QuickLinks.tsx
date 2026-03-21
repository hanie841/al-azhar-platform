'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { BookOpen, GraduationCap, Newspaper, Globe, Clock, HeartHandshake } from 'lucide-react';

const links = [
  { href: '/about/history' as const, icon: Clock, key: 'history' },
  { href: '/library' as const, icon: BookOpen, key: 'library' },
  { href: '/faculties' as const, icon: GraduationCap, key: 'faculties' },
  { href: '/news' as const, icon: Newspaper, key: 'news' },
  { href: '/global' as const, icon: Globe, key: 'global' },
  { href: '/contact' as const, icon: HeartHandshake, key: 'services' },
];

export function QuickLinks() {
  const t = useTranslations('quickLinks');

  return (
    <section className="py-12 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-primary-900 mb-4"
        >
          {t('title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center text-sand-600 text-base sm:text-lg mb-8 sm:mb-14 max-w-2xl mx-auto"
        >
          {t('subtitle')}
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link, i) => {
            const Icon = link.icon;
            return (
              <motion.div
                key={link.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  href={link.href}
                  className="group block p-6 bg-sand-50 rounded-2xl border border-sand-200 hover:border-accent-400 hover:shadow-lg hover:shadow-accent-100 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 rounded-xl bg-accent-100 flex items-center justify-center mb-4 group-hover:bg-accent-200 transition-colors">
                    <Icon className="w-7 h-7 text-accent-600" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-primary-900 mb-2">
                    {t(`${link.key}Title`)}
                  </h3>
                  <p className="text-sand-600 text-sm leading-relaxed">
                    {t(`${link.key}Desc`)}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
