'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useCallback } from 'react';

// Cairo prayer times by month (approximate, hours in 24h format)
// Index 0 = January, 11 = December
const PRAYER_TIMES_BY_MONTH: Record<string, [number, number][]> = {
  fajr:    [[5,15],[5,5],[4,50],[4,30],[4,15],[4,10],[4,15],[4,25],[4,35],[4,50],[5,5],[5,15]],
  sunrise: [[6,35],[6,25],[6,5],[5,45],[5,30],[5,25],[5,30],[5,40],[5,50],[6,5],[6,20],[6,35]],
  dhuhr:   [[12,5],[12,10],[12,10],[12,5],[12,0],[12,0],[12,5],[12,5],[11,55],[11,50],[11,50],[12,0]],
  asr:     [[15,10],[15,25],[15,25],[15,20],[15,15],[15,20],[15,25],[15,20],[15,5],[14,50],[14,45],[15,0]],
  maghrib: [[17,20],[17,40],[17,55],[18,10],[18,25],[18,45],[18,45],[18,30],[18,5],[17,40],[17,15],[17,10]],
  isha:    [[18,45],[19,0],[19,15],[19,30],[19,50],[20,10],[20,10],[19,55],[19,25],[19,0],[18,35],[18,30]],
};

const PRAYER_NAMES = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'] as const;

type PrayerName = typeof PRAYER_NAMES[number];

function getPrayerTime(prayer: PrayerName, month: number): Date {
  const times = PRAYER_TIMES_BY_MONTH[prayer][month];
  const now = new Date();
  const date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), times[0], times[1], 0);
  return date;
}

function formatTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h = hours % 12 || 12;
  return `${h}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return '00:00:00';
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Mosque SVG icon
function MosqueIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C12 2 8 6 8 9c0 1.5.7 2.8 2 3.5V14H8v-1.5c0-1-.8-2-2-2.5C4.5 9.5 4 8.3 4 7V6l1-1v2c0 1 .5 2 1.5 2.5.5.3 1 .7 1.3 1.2V14H6v7h12v-7h-1.8v-3.8c.3-.5.8-.9 1.3-1.2C18.5 9 19 8 19 7V5l1 1v1c0 1.3-.5 2.5-1.5 3-.8.4-1.5 1-1.8 1.7L16.5 14H14v-1.5c1.3-.7 2-2 2-3.5 0-3-4-7-4-7z" />
      <line x1="12" y1="14" x2="12" y2="21" />
    </svg>
  );
}

interface PrayerTimesWidgetProps {
  compact?: boolean;
}

export function PrayerTimesWidget({ compact = false }: PrayerTimesWidgetProps) {
  const t = useTranslations('prayerTimes');
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const month = now.getMonth();

  const getCurrentAndNext = useCallback((): { current: PrayerName | null; next: PrayerName; nextTime: Date } => {
    const times = PRAYER_NAMES.map((name) => ({
      name,
      time: getPrayerTime(name, month),
    }));

    // Find next prayer
    for (let i = 0; i < times.length; i++) {
      if (now < times[i].time) {
        return {
          current: i > 0 ? times[i - 1].name : null,
          next: times[i].name,
          nextTime: times[i].time,
        };
      }
    }

    // After isha — next prayer is fajr tomorrow
    const tomorrowFajr = new Date(getPrayerTime('fajr', month));
    tomorrowFajr.setDate(tomorrowFajr.getDate() + 1);
    return {
      current: 'isha',
      next: 'fajr',
      nextTime: tomorrowFajr,
    };
  }, [month, now]);

  const { current, next, nextTime } = getCurrentAndNext();
  const countdown = nextTime.getTime() - now.getTime();

  const prayerIcons: Record<PrayerName, string> = {
    fajr: 'M12 3v1m0 16v1m-9-9H2m20 0h-1m-2.636-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707',
    sunrise: 'M12 2v2m0 16v2m-8-10H4m16 0h-2m-2.05-5.95l-1.414 1.414M7.464 16.536l-1.414 1.414m11.314 0l-1.414-1.414M7.464 7.464L6.05 6.05M12 8a4 4 0 100 8 4 4 0 000-8z',
    dhuhr: 'M12 2v2m0 16v2m-8-10H4m16 0h-2M6.343 6.343L7.757 7.757m8.486 8.486l1.414 1.414M6.343 17.657l1.414-1.414m8.486-8.486l1.414-1.414M12 8a4 4 0 100 8 4 4 0 000-8z',
    asr: 'M12 2v2m0 16v2m-8-10H4m16 0h-2m-2.05-5.95l-1.414 1.414M7.464 16.536l-1.414 1.414m11.314 0l-1.414-1.414M7.464 7.464L6.05 6.05M12 8a4 4 0 100 8 4 4 0 000-8z',
    maghrib: 'M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z',
    isha: 'M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z',
  };

  if (compact) {
    return (
      <div className="bg-white dark:bg-navy-800 rounded-xl p-4 shadow-sm border border-sand-200 dark:border-navy-700">
        <div className="flex items-center gap-2 mb-3">
          <MosqueIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <h3 className="font-semibold text-sm text-primary-900 dark:text-primary-100">{t('title')}</h3>
        </div>
        <div className="text-xs text-sand-500 dark:text-sand-400 mb-2">{t('cairo')}</div>
        <div className="space-y-1.5">
          {PRAYER_NAMES.map((prayer) => {
            const time = getPrayerTime(prayer, month);
            const isNext = prayer === next;
            const isCurrent = prayer === current;
            return (
              <div
                key={prayer}
                className={`flex items-center justify-between py-1 px-2 rounded-md text-xs ${
                  isNext
                    ? 'bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 font-semibold'
                    : isCurrent
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                    : 'text-sand-600 dark:text-sand-400'
                }`}
              >
                <span>{t(prayer)}</span>
                <span className="font-mono">{formatTime(time)}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-3 pt-3 border-t border-sand-200 dark:border-navy-700 text-center">
          <div className="text-[10px] text-sand-500 dark:text-sand-400 uppercase tracking-wider">{t('nextPrayer')}</div>
          <div className="text-sm font-bold text-accent-600 dark:text-accent-400">{t(next)}</div>
          <div className="text-lg font-mono font-bold text-primary-700 dark:text-primary-300">{formatCountdown(countdown)}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-navy-800 rounded-2xl shadow-lg border border-sand-200 dark:border-navy-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-900 dark:from-primary-800 dark:to-navy-900 p-6 text-center">
        <MosqueIcon className="w-10 h-10 text-white/80 mx-auto mb-2" />
        <h2 className="text-xl font-serif font-bold text-white">{t('title')}</h2>
        <p className="text-sm text-white/70 mt-1">{t('cairo')}</p>
      </div>

      {/* Prayer times list */}
      <div className="p-4 space-y-2">
        {PRAYER_NAMES.map((prayer) => {
          const time = getPrayerTime(prayer, month);
          const isNext = prayer === next;
          const isCurrent = prayer === current;
          return (
            <div
              key={prayer}
              className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                isNext
                  ? 'bg-accent-50 dark:bg-accent-900/30 ring-1 ring-accent-300 dark:ring-accent-700'
                  : isCurrent
                  ? 'bg-primary-50 dark:bg-primary-900/20'
                  : 'hover:bg-sand-50 dark:hover:bg-navy-700/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <svg
                  className={`w-5 h-5 ${
                    isNext
                      ? 'text-accent-600 dark:text-accent-400'
                      : isCurrent
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-sand-400 dark:text-sand-500'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={prayerIcons[prayer]} />
                </svg>
                <span
                  className={`font-medium ${
                    isNext
                      ? 'text-accent-700 dark:text-accent-300'
                      : isCurrent
                      ? 'text-primary-700 dark:text-primary-300'
                      : 'text-sand-700 dark:text-sand-300'
                  }`}
                >
                  {t(prayer)}
                </span>
                {isNext && (
                  <span className="text-[10px] uppercase tracking-wider font-bold text-accent-500 dark:text-accent-400 bg-accent-100 dark:bg-accent-900/50 px-2 py-0.5 rounded-full">
                    {t('nextPrayer')}
                  </span>
                )}
              </div>
              <span
                className={`font-mono text-sm ${
                  isNext
                    ? 'font-bold text-accent-700 dark:text-accent-300'
                    : isCurrent
                    ? 'font-semibold text-primary-700 dark:text-primary-300'
                    : 'text-sand-600 dark:text-sand-400'
                }`}
              >
                {formatTime(time)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Countdown */}
      <div className="bg-sand-50 dark:bg-navy-900/50 p-5 text-center border-t border-sand-200 dark:border-navy-700">
        <div className="text-xs text-sand-500 dark:text-sand-400 uppercase tracking-wider mb-1">{t('nextPrayer')}: {t(next)}</div>
        <div className="text-3xl font-mono font-bold text-primary-800 dark:text-primary-200 tracking-wider">
          {formatCountdown(countdown)}
        </div>
      </div>
    </div>
  );
}
