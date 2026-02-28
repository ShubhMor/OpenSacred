'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { chapters, getChapterById } from '@/data/chapters';
import { getVersesByChapter } from '@/data/verses';
import { getSpeakerById } from '@/data/speakers';
import { VideoPlayer } from '@/components/video-player';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useReadingProgress } from '@/hooks/use-reading-progress';
import { 
  ArrowLeft, 
  ArrowRight, 
  ChevronRight,
  MapPin,
  Users,
  BookOpen,
  Play,
  CheckCircle2,
  MessageSquare
} from 'lucide-react';

interface ChapterPageProps {
  params: Promise<{ id: string }>;
}

export default function ChapterPage({ params }: ChapterPageProps) {
  const resolvedParams = use(params);
  const chapterId = parseInt(resolvedParams.id);
  const chapter = getChapterById(chapterId);
  const { getChapterProgress, isRead, loaded } = useReadingProgress();

  if (!chapter) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Chapter Not Found</h1>
        <Link href="/chapters">
          <Button>Back to Chapters</Button>
        </Link>
      </div>
    );
  }

  const chapterVerses = getVersesByChapter(chapterId);
  const prevChapter = chapters.find(c => c.number === chapterId - 1);
  const nextChapter = chapters.find(c => c.number === chapterId + 1);
  const speakersInChapter = chapter.characters?.map(name => getSpeakerById(name)).filter(Boolean) || [];

  const readCount = loaded ? getChapterProgress(chapterId, chapterVerses.length) : 0;
  const progressPct = chapterVerses.length > 0 ? Math.round((readCount / chapterVerses.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Library</Link>
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            <Link href="/chapters" className="hover:text-foreground transition-colors">Bhagavad Gita</Link>
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-foreground">{chapter.number === 0 ? 'Introduction' : `Chapter ${chapter.number}`}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-3xl mx-auto">
          
          {/* Chapter Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className={`relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl font-bold text-xl sm:text-2xl shadow-lg overflow-hidden ${
                chapter.number === 0 
                  ? 'bg-gradient-to-br from-purple-500 to-indigo-600'
                  : 'bg-gradient-to-br [background:linear-gradient(135deg,var(--brand-dark)_0%,var(--brand)_60%,var(--brand-light)_100%)]'
              } text-white`}>
                {chapter.imageUrl ? (
                  <Image src={chapter.imageUrl} alt={chapter.englishTitle} fill className="object-cover" priority />
                ) : (
                  chapter.number === 0 ? 'ॐ' : chapter.number
                )}
              </div>
            </div>
            
            {chapter.sanskritTitle && (
              <p className="text-sm text-brand font-medium mb-1" lang="sa">
                {chapter.sanskritTitle}
              </p>
            )}
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              {chapter.englishTitle}
            </h1>
            {chapter.verseCount > 0 && (
              <Badge variant="secondary" className="text-sm">
                {chapter.verseCount} Verses
              </Badge>
            )}
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-4 sm:gap-6 mb-6 sm:mb-8">
            
            {/* Description Card */}
            <Card className="border-brand/10">
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-brand" />
                  Description
                </h2>
                <p className="text-sm sm:text-base leading-relaxed text-foreground/90">
                  {chapter.introduction}
                </p>
                
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex flex-wrap gap-2">
                    {chapter.topics.map((topic, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Info Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {chapter.location && (
                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-brand" />
                      Location
                    </h3>
                    <p className="text-sm text-foreground">{chapter.location}</p>
                  </CardContent>
                </Card>
              )}

              {speakersInChapter.length > 0 && (
                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                      <Users className="h-4 w-4 text-brand" />
                      Characters
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {speakersInChapter.map((speaker) => speaker && (
                        <div key={speaker.id} className="flex items-center gap-2 bg-muted/50 rounded-full pl-1 pr-3 py-1">
                          <div className="relative w-6 h-6 rounded-full overflow-hidden">
                            <Image src={speaker.imageUrl} alt={speaker.name} fill className="object-cover" />
                          </div>
                          <span className="text-xs font-medium">{speaker.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Video Player */}
            <Card className="border-brand/10 overflow-hidden">
              <CardContent className="p-0">
                <div className="px-4 pt-4 pb-2 flex items-center gap-2">
                  <Play className="h-4 w-4 text-brand" />
                  <h2 className="text-sm font-medium text-muted-foreground">
                    Watch Chapter Discourse
                  </h2>
                </div>
                <div className="px-4 pb-4">
                  <VideoPlayer
                    videoUrl={chapter.videoUrl}
                    title={chapter.number === 0 ? 'Introduction to the Bhagavad Gita' : `Chapter ${chapter.number} — ${chapter.englishTitle}`}
                    chapterNumber={chapter.number}
                    hasPrevious={!!prevChapter}
                    hasNext={!!nextChapter}
                    onPrevious={prevChapter ? () => window.location.href = `/chapters/${prevChapter.number}` : undefined}
                    onNext={nextChapter ? () => window.location.href = `/chapters/${nextChapter.number}` : undefined}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Verses Section */}
          {chapter.verseCount > 0 && (
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                  Read Verses
                </h2>
                <Badge variant="outline" className="text-xs">
                  {chapterVerses.length} of {chapter.verseCount} available
                </Badge>
              </div>

              {/* Reading Progress Bar */}
              {loaded && chapterVerses.length > 0 && readCount > 0 && (
                <div className="mb-4 p-3 rounded-lg bg-brand-subtle border border-brand/10">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-muted-foreground">Reading progress</span>
                    <span className="text-xs font-medium text-brand">{readCount} / {chapterVerses.length} read</span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r [background:linear-gradient(90deg,var(--brand)_0%,var(--brand-light)_100%)] rounded-full transition-all duration-500"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>
              )}

              {chapterVerses.length > 0 ? (
                <div className="space-y-2">
                  {chapterVerses.map((verse) => {
                    const speaker = getSpeakerById(verse.speaker);
                    const read = loaded && isRead(verse.id);
                    const commentaryCount = verse.commentaries?.length ?? 0;
                    return (
                      <Link
                        key={verse.id}
                        href={`/chapters/${chapterId}/verses/${verse.verseNumber}`}
                        className="group block p-4 rounded-xl border border-border bg-card hover:bg-muted/50 hover:border-brand/30 transition-all duration-200"
                      >
                        <div className="flex items-start gap-3">
                          {/* Verse Number */}
                          <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-white text-sm font-semibold transition-colors ${
                            read 
                              ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                              : 'bg-gradient-to-br [background:linear-gradient(135deg,var(--brand-dark)_0%,var(--brand)_60%,var(--brand-light)_100%)]'
                          }`}>
                            {read ? <CheckCircle2 className="h-4 w-4" /> : verse.verseNumber}
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm sm:text-base leading-relaxed text-foreground group-hover:text-brand transition-colors mb-1">
                              {verse.englishTranslation}
                            </p>
                            <p className="text-xs text-muted-foreground line-clamp-1 mb-2.5">
                              {verse.generalMeaning}
                            </p>

                            {/* Commentary CTA pill */}
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-all duration-200 group-hover:shadow-sm"
                                style={{
                                  background: 'rgba(176,132,57,0.10)',
                                  color: '#8a6428',
                                  border: '1px solid rgba(176,132,57,0.22)',
                                }}
                              >
                                <MessageSquare className="h-3 w-3 flex-shrink-0" />
                                {commentaryCount > 0
                                  ? `${commentaryCount} Commentar${commentaryCount === 1 ? 'y' : 'ies'}`
                                  : 'Read Commentary'}
                              </span>
                              <span className="text-[11px] text-muted-foreground/50 group-hover:text-brand/60 transition-colors">
                                Sanskrit · Analysis · Insights
                              </span>
                            </div>
                          </div>

                          {/* Speaker & Arrow */}
                          <div className="flex flex-col items-end gap-2 flex-shrink-0">
                            {speaker && (
                              <div className="relative w-7 h-7 rounded-full overflow-hidden border border-border">
                                <Image src={speaker.imageUrl} alt={speaker.name} fill className="object-cover" />
                              </div>
                            )}
                            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <Card className="bg-muted/30">
                  <CardContent className="p-6 text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      Verse content coming soon...
                    </p>
                    <p className="text-xs text-muted-foreground">
                      This chapter has {chapter.verseCount} verses.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Key Teachings */}
          {chapter.keyTeachings.length > 0 && (
            <Card className="mb-6 sm:mb-8 bg-brand-subtle border-brand/10">
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-sm font-medium text-muted-foreground mb-3">
                  Key Teachings
                </h2>
                <ul className="space-y-2">
                  {chapter.keyTeachings.map((teaching, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/90">
                      <span className="text-brand mt-0.5">•</span>
                      {teaching}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-border">
            {prevChapter ? (
              <Link href={`/chapters/${prevChapter.number}`} className="flex-1 sm:flex-none">
                <Button variant="outline" className="w-full group touch-target">
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="hidden sm:inline">
                    {prevChapter.number === 0 ? 'Introduction' : `Ch ${prevChapter.number}`}
                  </span>
                  <span className="sm:hidden">Previous</span>
                </Button>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            
            {nextChapter ? (
              <Link href={`/chapters/${nextChapter.number}`} className="flex-1 sm:flex-none">
                <Button variant="outline" className="w-full group touch-target">
                  <span className="hidden sm:inline">Ch {nextChapter.number}</span>
                  <span className="sm:hidden">Next</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
