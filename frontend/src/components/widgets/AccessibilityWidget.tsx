'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { isRtl, type Locale } from '@/i18n/config';
import {
  Accessibility,
  Type,
  Contrast,
  Eye,
  MousePointer,
  Plus,
  Minus,
  RotateCcw,
  X,
} from 'lucide-react';

const STORAGE_KEY = 'azhar-a11y-settings';

interface A11ySettings {
  fontSize: number; // percentage offset: -2, -1, 0, 1, 2, 3
  highContrast: boolean;
  reducedMotion: boolean;
  readingGuide: boolean;
  focusHighlight: boolean;
}

const defaultSettings: A11ySettings = {
  fontSize: 0,
  highContrast: false,
  reducedMotion: false,
  readingGuide: false,
  focusHighlight: false,
};

function loadSettings(): A11ySettings {
  if (typeof window === 'undefined') return defaultSettings;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...defaultSettings, ...JSON.parse(stored) };
  } catch {
    // ignore
  }
  return defaultSettings;
}

function saveSettings(settings: A11ySettings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // ignore
  }
}

export function AccessibilityWidget() {
  const locale = useLocale();
  const t = useTranslations('accessibility');
  const rtl = isRtl(locale as Locale);
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<A11ySettings>(defaultSettings);
  const [guideY, setGuideY] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Load settings on mount
  useEffect(() => {
    setSettings(loadSettings());
    setMounted(true);
  }, []);

  // Apply font size to body
  useEffect(() => {
    if (!mounted) return;
    const base = 100 + settings.fontSize * 12.5; // each step is 12.5%
    document.body.style.fontSize = `${base}%`;
  }, [settings.fontSize, mounted]);

  // Apply high contrast class
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle('high-contrast', settings.highContrast);
  }, [settings.highContrast, mounted]);

  // Apply reduced motion
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle('reduce-motion', settings.reducedMotion);
  }, [settings.reducedMotion, mounted]);

  // Apply focus highlight
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle('focus-highlight', settings.focusHighlight);
  }, [settings.focusHighlight, mounted]);

  // Reading guide mouse tracking
  useEffect(() => {
    if (!settings.readingGuide) return;
    const handler = (e: MouseEvent) => setGuideY(e.clientY);
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [settings.readingGuide]);

  // Persist on change
  useEffect(() => {
    if (mounted) saveSettings(settings);
  }, [settings, mounted]);

  const update = useCallback(
    (patch: Partial<A11ySettings>) => {
      setSettings((prev) => ({ ...prev, ...patch }));
    },
    []
  );

  const fontIncrease = () => update({ fontSize: Math.min(settings.fontSize + 1, 3) });
  const fontDecrease = () => update({ fontSize: Math.max(settings.fontSize - 1, -2) });
  const fontReset = () => update({ fontSize: 0 });

  if (!mounted) return null;

  return (
    <>
      {/* Reading Guide Overlay */}
      {settings.readingGuide && (
        <div
          className="fixed inset-x-0 z-[9998] pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="absolute left-0 right-0 h-[3px] bg-primary-500/60 dark:bg-primary-400/60 shadow-sm"
            style={{ top: `${guideY}px` }}
          />
        </div>
      )}

      {/* Widget Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-label={t('accessibilityOptions')}
          aria-modal="false"
          className={`fixed top-1/2 -translate-y-1/2 z-[9997] w-72 rounded-2xl shadow-2xl border border-sand-200 dark:border-navy-700 bg-white dark:bg-navy-800 p-4 ${
            rtl ? 'right-16' : 'left-16'
          }`}
          dir={rtl ? 'rtl' : 'ltr'}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-base text-gray-900 dark:text-sand-100">
              {t('title')}
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-7 h-7 rounded-full hover:bg-sand-100 dark:hover:bg-navy-700 transition-colors text-gray-500 dark:text-sand-400"
              aria-label={t('title')}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Font Size */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Type className="w-4 h-4 text-gray-600 dark:text-sand-300" aria-hidden="true" />
                <span className="text-sm font-medium text-gray-700 dark:text-sand-200">
                  {t('fontSize')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={fontDecrease}
                  disabled={settings.fontSize <= -2}
                  className="flex items-center justify-center w-8 h-8 rounded-lg border border-sand-200 dark:border-navy-600 bg-sand-50 dark:bg-navy-900 text-gray-700 dark:text-sand-200 hover:bg-sand-100 dark:hover:bg-navy-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label={t('decrease')}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  onClick={fontReset}
                  className="flex items-center justify-center h-8 px-3 rounded-lg border border-sand-200 dark:border-navy-600 bg-sand-50 dark:bg-navy-900 text-xs font-medium text-gray-700 dark:text-sand-200 hover:bg-sand-100 dark:hover:bg-navy-700 transition-colors"
                  aria-label={t('reset')}
                >
                  <RotateCcw className="w-3 h-3 me-1" />
                  {t('reset')}
                </button>
                <button
                  onClick={fontIncrease}
                  disabled={settings.fontSize >= 3}
                  className="flex items-center justify-center w-8 h-8 rounded-lg border border-sand-200 dark:border-navy-600 bg-sand-50 dark:bg-navy-900 text-gray-700 dark:text-sand-200 hover:bg-sand-100 dark:hover:bg-navy-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label={t('increase')}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Toggle Options */}
            <ToggleOption
              icon={<Contrast className="w-4 h-4" />}
              label={t('highContrast')}
              checked={settings.highContrast}
              onChange={(v) => update({ highContrast: v })}
            />
            <ToggleOption
              icon={<Eye className="w-4 h-4" />}
              label={t('reducedMotion')}
              checked={settings.reducedMotion}
              onChange={(v) => update({ reducedMotion: v })}
            />
            <ToggleOption
              icon={<MousePointer className="w-4 h-4" />}
              label={t('readingGuide')}
              checked={settings.readingGuide}
              onChange={(v) => update({ readingGuide: v })}
            />
            <ToggleOption
              icon={<Accessibility className="w-4 h-4" />}
              label={t('focusHighlight')}
              checked={settings.focusHighlight}
              onChange={(v) => update({ focusHighlight: v })}
            />
          </div>
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`fixed top-1/2 -translate-y-1/2 z-[9997] flex items-center justify-center w-11 h-11 rounded-full bg-primary-700 dark:bg-primary-600 text-white shadow-lg hover:bg-primary-800 dark:hover:bg-primary-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 ${
          rtl ? 'right-2' : 'left-2'
        }`}
        aria-label={t('accessibilityOptions')}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Accessibility className="w-5 h-5" />
        )}
      </button>
    </>
  );
}

function ToggleOption({
  icon,
  label,
  checked,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  const id = `a11y-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-gray-600 dark:text-sand-300" aria-hidden="true">
          {icon}
        </span>
        <label htmlFor={id} className="text-sm text-gray-700 dark:text-sand-200 cursor-pointer">
          {label}
        </label>
      </div>
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-1 ${
          checked
            ? 'bg-primary-600 dark:bg-primary-500'
            : 'bg-sand-300 dark:bg-navy-600'
        }`}
      >
        <span
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
}
