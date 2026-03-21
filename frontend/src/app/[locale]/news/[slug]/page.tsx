import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { NewsArticleDetail } from '@/components/news/NewsArticleDetail';
import { fetchNewsArticle } from '@/lib/api-fetchers';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  try {
    const article = await fetchNewsArticle(locale, slug);
    return {
      title: article.title,
      description: article.excerpt
        ? article.excerpt.slice(0, 160)
        : locale === 'ar'
          ? `${article.title} - أخبار جامعة الأزهر`
          : `${article.title} - Al-Azhar University News`,
      openGraph: {
        title: article.title,
        description: article.excerpt?.slice(0, 160) ?? undefined,
        type: 'article',
        ...(article.published_at ? { publishedTime: article.published_at } : {}),
        ...(article.featured_image ? { images: [{ url: article.featured_image }] } : {}),
      },
    };
  } catch {
    return {
      title: locale === 'ar' ? 'أخبار' : 'News',
    };
  }
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  let article;
  try {
    article = await fetchNewsArticle(locale, slug);
  } catch {
    notFound();
  }

  if (!article) notFound();

  return <NewsArticleDetail article={article} />;
}
