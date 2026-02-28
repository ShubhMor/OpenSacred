'use client';

import Link from 'next/link';
import { Chapter } from '@/types/gita';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen } from 'lucide-react';

interface ChapterCardProps {
  chapter: Chapter;
  featured?: boolean;
}

export function ChapterCard({ chapter, featured = false }: ChapterCardProps) {
  if (featured) {
    return (
      <Link
        href={`/chapters/${chapter.number}`}
        className="group block relative overflow-hidden rounded-2xl border card-hover"
        style={{ borderColor: 'var(--brand-border)', background: 'linear-gradient(135deg, var(--brand-subtle) 0%, transparent 70%)' }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(176,132,57,0.18) 0%, transparent 70%)' }} />
        <CardContent className="relative p-6">
          <div className="flex items-start gap-4">
            <div
              className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform"
              style={{ background: 'linear-gradient(135deg, var(--brand-dark) 0%, var(--brand) 60%, var(--brand-light) 100%)' }}
            >
              {chapter.number}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--brand)' }}>
                {chapter.sanskritTitle}
              </p>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-brand transition-colors mb-2">
                {chapter.englishTitle}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {chapter.summary}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <Badge variant="secondary" className="text-xs">
                  {chapter.verseCount} verses
                </Badge>
                <span className="text-xs font-medium flex items-center gap-1 group-hover:gap-1.5 transition-all" style={{ color: 'var(--brand)' }}>
                  Read Chapter <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
    );
  }

  return (
    <Link href={`/chapters/${chapter.number}`} className="group block h-full">
      <Card className="h-full overflow-hidden card-hover border-border/70">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-4">
            <div
              className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform"
              style={{ background: chapter.number === 0
                ? 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)'
                : 'linear-gradient(135deg, var(--brand-dark) 0%, var(--brand) 60%, var(--brand-light) 100%)' }}
            >
              {chapter.number === 0 ? 'ॐ' : chapter.number}
            </div>
            <div className="flex-1 min-w-0">
              {chapter.sanskritTitle && (
                <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--brand)' }}>
                  {chapter.sanskritTitle}
                </p>
              )}
              <CardTitle className="text-base group-hover:text-brand transition-colors leading-snug">
                {chapter.englishTitle}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground line-clamp-3 mb-3 leading-relaxed">
            {chapter.summary}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {chapter.topics.slice(0, 2).map((topic, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {topic}
                </Badge>
              ))}
            </div>
            {chapter.verseCount > 0 && (
              <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                {chapter.verseCount} verses
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
