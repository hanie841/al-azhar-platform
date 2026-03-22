'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Maximize2, Minimize2, X, Loader2 } from 'lucide-react';

interface PdfViewerProps {
  url: string;
  title?: string;
  onClose?: () => void;
}

export function PdfViewer({ url, title, onClose }: PdfViewerProps) {
  const t = useTranslations('library');
  const locale = useLocale();
  const isAr = locale === 'ar';

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={
        isFullscreen
          ? 'fixed inset-0 z-50 bg-black/90 flex flex-col'
          : 'relative w-full rounded-2xl overflow-hidden border border-sand-200 bg-white'
      }
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between bg-navy-900 text-white px-4 py-3">
        <h3 className="font-medium text-sm truncate flex-1">
          {title || (isAr ? 'عرض المستند' : 'Document Viewer')}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* PDF iframe */}
      <div className={isFullscreen ? 'flex-1 relative' : 'relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4]'}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-sand-50">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
              <p className="text-sm text-sand-500">
                {isAr ? 'جاري تحميل المستند...' : 'Loading document...'}
              </p>
            </div>
          </div>
        )}
        <iframe
          src={url}
          className="w-full h-full border-0"
          title={title || 'PDF Viewer'}
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
}
