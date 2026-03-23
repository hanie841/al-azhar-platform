'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  Heart,
  Share2,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';

export type PlatformType = 'twitter' | 'facebook' | 'instagram' | 'youtube' | 'linkedin';

export interface SocialPost {
  id: number;
  platform: PlatformType;
  content: string;
  hasImage: boolean;
  date: string;
  likes: number;
  shares: number;
  comments: number;
  url: string;
}

const platformConfig: Record<PlatformType, {
  name: string;
  color: string;
  bgLight: string;
  bgDark: string;
  borderLight: string;
  borderDark: string;
  icon: string;
}> = {
  twitter: {
    name: 'X / Twitter',
    color: 'text-black dark:text-white',
    bgLight: 'bg-gray-100',
    bgDark: 'dark:bg-gray-800',
    borderLight: 'border-gray-300',
    borderDark: 'dark:border-gray-600',
    icon: '𝕏',
  },
  facebook: {
    name: 'Facebook',
    color: 'text-[#1877F2]',
    bgLight: 'bg-blue-50',
    bgDark: 'dark:bg-blue-950',
    borderLight: 'border-blue-200',
    borderDark: 'dark:border-blue-800',
    icon: 'f',
  },
  instagram: {
    name: 'Instagram',
    color: 'text-[#E4405F]',
    bgLight: 'bg-pink-50',
    bgDark: 'dark:bg-pink-950',
    borderLight: 'border-pink-200',
    borderDark: 'dark:border-pink-800',
    icon: 'IG',
  },
  youtube: {
    name: 'YouTube',
    color: 'text-[#FF0000]',
    bgLight: 'bg-red-50',
    bgDark: 'dark:bg-red-950',
    borderLight: 'border-red-200',
    borderDark: 'dark:border-red-800',
    icon: '▶',
  },
  linkedin: {
    name: 'LinkedIn',
    color: 'text-[#0A66C2]',
    bgLight: 'bg-sky-50',
    bgDark: 'dark:bg-sky-950',
    borderLight: 'border-sky-200',
    borderDark: 'dark:border-sky-800',
    icon: 'in',
  },
};

const platformGradients: Record<PlatformType, string> = {
  twitter: 'from-gray-800 to-black',
  facebook: 'from-[#1877F2] to-[#0d5bbf]',
  instagram: 'from-[#E4405F] via-[#C13584] to-[#833AB4]',
  youtube: 'from-[#FF0000] to-[#cc0000]',
  linkedin: 'from-[#0A66C2] to-[#074a8f]',
};

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

interface SocialPostCardProps {
  post: SocialPost;
  index: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4 },
  }),
};

export function SocialPostCard({ post, index }: SocialPostCardProps) {
  const t = useTranslations('social');
  const config = platformConfig[post.platform];

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`break-inside-avoid mb-4 rounded-2xl border ${config.borderLight} ${config.borderDark} bg-white dark:bg-navy-800 shadow-sm hover:shadow-lg transition-shadow overflow-hidden`}
    >
      {/* Platform header */}
      <div className={`flex items-center gap-3 px-4 pt-4 pb-2`}>
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${platformGradients[post.platform]} flex items-center justify-center text-white font-bold text-sm`}>
          {config.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-semibold text-sm ${config.color}`}>
            {config.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-sand-400">
            {post.date}
          </p>
        </div>
      </div>

      {/* Post content */}
      <div className="px-4 py-2">
        <p className="text-sm leading-relaxed text-gray-700 dark:text-sand-200 line-clamp-5">
          {post.content}
        </p>
      </div>

      {/* Image placeholder */}
      {post.hasImage && (
        <div className={`mx-4 my-2 h-40 rounded-xl ${config.bgLight} ${config.bgDark} flex items-center justify-center`}>
          <div className={`text-4xl opacity-30 ${config.color}`}>
            {config.icon}
          </div>
        </div>
      )}

      {/* Engagement stats */}
      <div className="flex items-center gap-4 px-4 py-3 border-t border-gray-100 dark:border-navy-700 text-xs text-gray-500 dark:text-sand-400">
        <span className="flex items-center gap-1">
          <Heart className="w-3.5 h-3.5" />
          {formatNumber(post.likes)}
        </span>
        <span className="flex items-center gap-1">
          <Share2 className="w-3.5 h-3.5" />
          {formatNumber(post.shares)}
        </span>
        <span className="flex items-center gap-1">
          <MessageCircle className="w-3.5 h-3.5" />
          {formatNumber(post.comments)}
        </span>
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`ltr:ml-auto rtl:mr-auto flex items-center gap-1 ${config.color} hover:underline font-medium`}
        >
          {t('viewPost')}
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
}
