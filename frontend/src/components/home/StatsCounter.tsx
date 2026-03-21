'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

function StatItem({ value, suffix, label, delay }: StatItemProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="text-3xl sm:text-5xl lg:text-6xl font-bold text-primary-700 mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sand-600 font-medium">{label}</div>
    </motion.div>
  );
}

export function StatsCounter() {
  const t = useTranslations('home');

  const stats = [
    { value: 107, suffix: '', label: t('faculties'), delay: 0 },
    { value: 500, suffix: 'K', label: t('students'), delay: 0.1 },
    { value: 17, suffix: 'K', label: t('professors'), delay: 0.2 },
    { value: 39, suffix: '', label: t('researchCenters'), delay: 0.3 },
    { value: 5, suffix: '', label: t('hospitals'), delay: 0.4 },
    { value: 18, suffix: 'K', label: t('staff'), delay: 0.5 },
    { value: 65, suffix: 'K', label: t('international'), delay: 0.6 },
    { value: 1, suffix: 'M+', label: t('alumni'), delay: 0.7 },
  ];

  return (
    <section className="py-12 sm:py-20 lg:py-28 bg-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-primary-900 mb-8 sm:mb-16"
        >
          {t('statsTitle')}
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </div>

      <div className="section-divider max-w-md mx-auto mt-16" />
    </section>
  );
}
