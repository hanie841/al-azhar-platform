'use client';

import { motion } from 'framer-motion';

interface Person {
  id: number;
  name: string;
  title: string;
  bio: string | null;
  photo: string | null;
  is_current_leadership: boolean;
  is_historical: boolean;
}

export function PersonCard({ person, index = 0 }: { person: Person; index?: number }) {
  const gradient = person.is_current_leadership
    ? 'from-accent-500 to-accent-600'
    : 'from-sand-500 to-sand-600';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-sand-100 text-center hover:shadow-md transition-shadow"
    >
      <div
        className={`w-20 h-20 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center mx-auto mb-4`}
      >
        <span className="text-white font-serif text-2xl font-bold">
          {person.name.charAt(0)}
        </span>
      </div>
      <h3 className="font-serif text-lg font-bold text-primary-900 mb-1">
        {person.name}
      </h3>
      <p className="text-sm text-accent-600 font-medium mb-3">
        {person.title}
      </p>
      <p className="text-sm text-sand-600 line-clamp-3 leading-relaxed">
        {person.bio}
      </p>
    </motion.div>
  );
}
