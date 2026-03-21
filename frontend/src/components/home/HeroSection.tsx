'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';

export function HeroSection() {
  const t = useTranslations('home');

  return (
    <section className="relative min-h-[70vh] sm:min-h-[85vh] flex items-center justify-center overflow-hidden bg-navy-900">
      {/* Background pattern */}
      <div className="absolute inset-0 islamic-pattern-bg opacity-10" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/50 via-transparent to-navy-900" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
        >
          {t('heroTitle')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed"
        >
          {t('heroSubtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
          <Link
            href="/about/history"
            className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg transition-all hover:shadow-lg hover:shadow-accent-500/25 hover:-translate-y-0.5"
          >
            {t('startJourney')}
          </Link>
        </motion.div>
      </div>

      {/* Bottom decorative arch */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full" preserveAspectRatio="none">
          <path
            d="M0,120 L0,60 Q720,0 1440,60 L1440,120 Z"
            fill="var(--color-sand-50)"
          />
        </svg>
      </div>
    </section>
  );
}
