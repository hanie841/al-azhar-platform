'use client';

import { motion } from 'framer-motion';
import { TimelineNode } from './TimelineNode';
import type { TimelineEra } from '@/lib/types';

type EraWithColor = TimelineEra & { color?: string };

export function EraSection({ era }: { era: EraWithColor }) {
  const color = era.color ?? '#1a6b6b';

  return (
    <section className="mb-20" id={era.slug}>
      {/* Era header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div
          className="inline-block text-sm font-bold px-4 py-1.5 rounded-full mb-4 text-white"
          style={{ backgroundColor: color }}
        >
          {era.start_year} - {era.end_year}
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-900 mb-4">
          {era.name}
        </h2>
        <p className="text-sand-600 max-w-2xl mx-auto leading-relaxed">
          {era.description}
        </p>
      </motion.div>

      {/* Timeline line (desktop) */}
      <div className="relative">
        <div className="hidden lg:block absolute start-1/2 top-0 bottom-0 w-0.5 bg-sand-200 -translate-x-1/2" />

        {era.events.map((event, i) => (
          <TimelineNode key={event.id} event={event} index={i} color={color} />
        ))}
      </div>
    </section>
  );
}
