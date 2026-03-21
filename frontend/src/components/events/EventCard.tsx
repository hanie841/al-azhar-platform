'use client';

import { useLocale } from 'next-intl';
import { MapPin, Calendar } from 'lucide-react';
import type { Event } from '@/lib/types';

const categoryColors: Record<string, string> = {
  academic: 'bg-primary-100 text-primary-700',
  cultural: 'bg-accent-100 text-accent-700',
  community: 'bg-rose-100 text-rose-600',
};

export function EventCard({ event, category, status }: { event: Event; category?: string; status?: string }) {
  const locale = useLocale();
  const isAr = locale === 'ar';
  const eventDate = new Date(event.starts_at);
  const catKey = category ?? 'academic';
  const eventStatus = status ?? (new Date(event.starts_at) > new Date() ? 'upcoming' : 'past');

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-sand-100 hover:shadow-md transition-shadow">
      <div className="flex">
        {/* Date badge */}
        <div className="w-24 flex-shrink-0 bg-primary-700 text-white flex flex-col items-center justify-center p-4">
          <span className="text-3xl font-bold">{eventDate.getDate()}</span>
          <span className="text-xs uppercase">
            {eventDate.toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { month: 'short' })}
          </span>
          <span className="text-xs opacity-75">{eventDate.getFullYear()}</span>
        </div>

        {/* Content */}
        <div className="flex-1 p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${categoryColors[catKey] || categoryColors.academic}`}>
              {catKey}
            </span>
            {eventStatus === 'past' && (
              <span className="text-xs text-sand-400 font-medium">
                {isAr ? 'انتهت' : 'Past'}
              </span>
            )}
          </div>
          <h3 className="font-serif text-lg font-bold text-primary-900 mb-2">
            {event.title}
          </h3>
          <p className="text-sm text-sand-600 line-clamp-2 mb-3">
            {event.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-sand-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {eventDate.toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
                month: 'short',
                day: 'numeric',
              })}
              {event.ends_at && event.ends_at !== event.starts_at && (
                <>
                  {' - '}
                  {new Date(event.ends_at).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </>
              )}
            </span>
            {event.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {event.location}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
