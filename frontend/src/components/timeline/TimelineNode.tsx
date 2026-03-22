'use client';

import { motion } from 'framer-motion';
import type { TimelineEvent } from '@/lib/types';

interface TimelineNodeProps {
  event: TimelineEvent;
  index: number;
  color: string;
}

export function TimelineNode({ event, index, color }: TimelineNodeProps) {
  const isEven = index % 2 === 0;

  return (
    <div className="relative flex items-center mb-12 last:mb-0">
      {/* Desktop: alternating layout */}
      <div className={`hidden lg:flex items-center w-full ${isEven ? '' : 'flex-row-reverse'}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="w-5/12"
        >
          <div
            className="bg-white dark:bg-navy-800 rounded-2xl p-6 shadow-sm dark:shadow-navy-900/50 border border-sand-100 dark:border-navy-800 hover:shadow-md transition-shadow"
            style={{ borderTopColor: color, borderTopWidth: '3px' }}
          >
            <div className="text-sm font-bold mb-1" style={{ color }}>
              {event.year}
            </div>
            <h3 className="font-serif text-lg font-bold text-primary-900 dark:text-primary-200 mb-2">
              {event.title}
            </h3>
            <p className="text-sm text-sand-600 dark:text-sand-400 leading-relaxed">
              {event.description}
            </p>
          </div>
        </motion.div>

        {/* Center dot */}
        <div className="w-2/12 flex justify-center">
          <div
            className="w-5 h-5 rounded-full border-4 border-white shadow-md z-10"
            style={{ backgroundColor: color }}
          />
        </div>

        <div className="w-5/12" />
      </div>

      {/* Mobile: single column */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className="lg:hidden flex items-start gap-4 w-full"
      >
        <div className="flex flex-col items-center flex-shrink-0">
          <div
            className="w-4 h-4 rounded-full border-4 border-white shadow-md z-10"
            style={{ backgroundColor: color }}
          />
          <div className="w-0.5 flex-1 bg-sand-200 dark:bg-navy-700 mt-1" />
        </div>
        <div
          className="flex-1 bg-white dark:bg-navy-800 rounded-2xl p-5 shadow-sm dark:shadow-navy-900/50 border border-sand-100 dark:border-navy-800"
          style={{ borderTopColor: color, borderTopWidth: '3px' }}
        >
          <div className="text-sm font-bold mb-1" style={{ color }}>
            {event.year}
          </div>
          <h3 className="font-serif text-base font-bold text-primary-900 dark:text-primary-200 mb-2">
            {event.title}
          </h3>
          <p className="text-sm text-sand-600 dark:text-sand-400 leading-relaxed">
            {event.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
