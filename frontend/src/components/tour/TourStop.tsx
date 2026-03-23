'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Lightbulb, Calendar } from 'lucide-react';

export interface TourStopData {
  id: number;
  nameKey: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  funFactEn: string;
  funFactAr: string;
  year?: string;
  gradient: string;
  icon: React.ReactNode;
}

interface TourStopProps {
  stop: TourStopData;
  totalStops: number;
  direction: number;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export function TourStop({ stop, totalStops, direction }: TourStopProps) {
  const t = useTranslations('tour');
  const locale = useLocale();
  const isAr = locale === 'ar' || locale === 'ur';

  const name = isAr ? stop.nameAr : stop.nameKey;
  const description = isAr ? stop.descriptionAr : stop.descriptionEn;
  const funFact = isAr ? stop.funFactAr : stop.funFactEn;

  return (
    <motion.div
      key={stop.id}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="w-full"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Visual Area */}
        <div className="relative">
          <div
            className={`aspect-[16/10] rounded-2xl bg-gradient-to-br ${stop.gradient} relative overflow-hidden flex items-center justify-center shadow-xl`}
          >
            <div className="absolute inset-0 islamic-pattern-bg opacity-10" />
            <div className="relative z-10 text-white/80">{stop.icon}</div>

            {/* Stop number badge */}
            <div className="absolute top-4 start-4 z-20">
              <div className="bg-white/20 backdrop-blur-sm text-white text-sm font-bold px-3 py-1.5 rounded-xl">
                {t('stop')} {stop.id} {t('of')} {totalStops}
              </div>
            </div>

            {/* Year badge */}
            {stop.year && (
              <div className="absolute bottom-4 end-4 z-20">
                <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm text-white text-sm font-medium px-3 py-1.5 rounded-xl">
                  <Calendar className="w-3.5 h-3.5" />
                  {t('founded')} {stop.year}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Area */}
        <div className="flex flex-col gap-6">
          {/* Title */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-bold text-lg">
                {stop.id}
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy-900 dark:text-sand-100">
                {name}
              </h2>
            </div>
            {isAr && stop.nameKey !== stop.nameAr && (
              <p className="text-sand-500 dark:text-sand-400 text-sm font-medium mb-2">
                {stop.nameKey}
              </p>
            )}
            {!isAr && (
              <p className="text-sand-500 dark:text-sand-400 text-sm font-medium mb-2">
                {stop.nameAr}
              </p>
            )}
          </div>

          {/* Description */}
          <p className="text-navy-700 dark:text-sand-300 text-lg leading-relaxed">
            {description}
          </p>

          {/* Fun Fact Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-800/30 rounded-xl p-5"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-100 dark:bg-accent-800/30 flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-accent-600 dark:text-accent-400" />
              </div>
              <div>
                <h3 className="font-bold text-accent-800 dark:text-accent-300 text-sm mb-1">
                  {t('funFact')}
                </h3>
                <p className="text-accent-700 dark:text-accent-400 text-sm leading-relaxed">
                  {funFact}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
