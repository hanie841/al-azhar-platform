import { setRequestLocale } from 'next-intl/server';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsCounter } from '@/components/home/StatsCounter';
import { QuickLinks } from '@/components/home/QuickLinks';
import { TimelinePreview } from '@/components/home/TimelinePreview';
import { LibraryPreview } from '@/components/home/LibraryPreview';
import { FeaturedNews } from '@/components/home/FeaturedNews';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <StatsCounter />
      <QuickLinks />
      <TimelinePreview />
      <LibraryPreview />
      <FeaturedNews />
    </>
  );
}
