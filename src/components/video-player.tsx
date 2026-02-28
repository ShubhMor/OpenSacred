'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Play, Youtube, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl?: string;
  title?: string;
  chapterNumber?: number;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

/** Extract the YouTube video ID from any standard YouTube URL format */
function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    // youtu.be/ID
    if (parsed.hostname === 'youtu.be') return parsed.pathname.slice(1).split('?')[0];
    // youtube.com/watch?v=ID
    const v = parsed.searchParams.get('v');
    if (v) return v;
    // youtube.com/embed/ID
    const embedMatch = parsed.pathname.match(/\/embed\/([^/?]+)/);
    if (embedMatch) return embedMatch[1];
  } catch {
    // not a valid URL — try regex fallback
    const match = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
    if (match) return match[1];
  }
  return null;
}

export function VideoPlayer({
  videoUrl,
  title,
  chapterNumber,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = videoUrl ? extractYouTubeId(videoUrl) : null;
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
  const embedUrl = videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&color=white`
    : null;

  const handlePlay = useCallback(() => {
    if (videoId) setIsPlaying(true);
  }, [videoId]);

  return (
    <div className="w-full rounded-xl overflow-hidden border border-brand/20 bg-gradient-to-br from-brand-subtle/60 to-transparent">

      {/* ── Video area ── */}
      <div className="relative w-full" style={{ aspectRatio: '16/9' }}>

        {/* State: playing — show iframe */}
        {isPlaying && embedUrl && (
          <iframe
            src={embedUrl}
            title={title ?? `Bhagavad Gita Chapter ${chapterNumber ?? ''}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            loading="lazy"
          />
        )}

        {/* State: has video, not yet playing — thumbnail + play button */}
        {!isPlaying && videoId && thumbnailUrl && (
          <button
            onClick={handlePlay}
            className="absolute inset-0 w-full h-full group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            aria-label={`Play video: ${title ?? 'Chapter video'}`}
          >
            {/* Thumbnail */}
            <Image
              src={thumbnailUrl}
              alt={title ?? `Chapter ${chapterNumber} video`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 800px"
              unoptimized // YouTube thumbnails are already optimized
            />
            {/* Dark overlay */}
            <span className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
            {/* Play button */}
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-2xl transition-transform duration-200 group-hover:scale-110">
                <Play className="h-7 w-7 text-white fill-white ml-1" />
              </span>
            </span>
            {/* YouTube badge */}
            <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-md bg-black/70 px-2 py-1 text-[11px] text-white/90">
              <Youtube className="h-3.5 w-3.5 text-red-500" />
              Watch on YouTube
            </span>
          </button>
        )}

        {/* State: no video yet — placeholder */}
        {!videoId && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/40 gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-border bg-background/80">
              <Youtube className="h-6 w-6 text-muted-foreground/50" />
            </div>
            <p className="text-sm text-muted-foreground text-center px-4">
              Video coming soon
            </p>
            <p className="text-xs text-muted-foreground/60 text-center px-6">
              Add a YouTube URL to the <code className="font-mono bg-muted px-1 py-0.5 rounded text-[10px]">videoUrl</code> field in <code className="font-mono bg-muted px-1 py-0.5 rounded text-[10px]">chapters.ts</code>
            </p>
          </div>
        )}
      </div>

      {/* ── Controls bar ── */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border/30">

        {/* Left — previous chapter */}
        <div className="w-24">
          {hasPrevious && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onPrevious}
              className="text-xs text-muted-foreground hover:text-foreground gap-1.5 h-8 px-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </Button>
          )}
        </div>

        {/* Center — title + external link */}
        <div className="flex flex-col items-center gap-0.5 flex-1 min-w-0 px-2">
          {title && (
            <p className="text-xs font-medium text-foreground/80 truncate max-w-full">{title}</p>
          )}
          {videoId && (
            <a
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-brand transition-colors"
            >
              <ExternalLink className="h-2.5 w-2.5" />
              Open in YouTube
            </a>
          )}
        </div>

        {/* Right — next chapter */}
        <div className="w-24 flex justify-end">
          {hasNext && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onNext}
              className="text-xs text-muted-foreground hover:text-foreground gap-1.5 h-8 px-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
