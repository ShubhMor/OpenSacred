'use client';

import { use } from 'react';
import Link from 'next/link';
import { getBookBySlug, categoryLabel } from '@/data/books';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Clock, BookOpen, Users, Tag } from 'lucide-react';

interface TextPageProps {
  params: Promise<{ slug: string }>;
}

export default function TextPage({ params }: TextPageProps) {
  const { slug } = use(params);
  const book = getBookBySlug(slug);

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Text Not Found</h1>
        <Link href="/"><Button>Back to Library</Button></Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Library</Link>
            <span className="text-muted-foreground/50">›</span>
            <span className="text-foreground">{book.englishTitle}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-2xl">

        {/* Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${book.accentColor} text-4xl shadow-lg mb-4`}>
            {book.symbol}
          </div>
          <p className="text-sm text-muted-foreground font-medium mb-1" lang="sa">
            {book.sanskritTitle}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            {book.englishTitle}
          </h1>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Badge variant="outline" className="text-xs">{categoryLabel[book.category]}</Badge>
            <Badge variant="outline" className="text-xs">{book.chaptersOrKandas} {book.chaptersLabel}</Badge>
            <Badge variant="outline" className="text-xs">~{book.estimatedVerses.toLocaleString()} verses</Badge>
          </div>
        </div>

        {/* Coming Soon Card */}
        <Card className="mb-6 border-dashed border-2 bg-muted/20">
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
            <h2 className="text-base font-semibold text-foreground mb-2">Coming Soon</h2>
            <p className="text-sm text-muted-foreground">
              We are carefully preparing the complete text of the {book.englishTitle} with Sanskrit verses,
              transliterations, translations, and commentary. Check back soon.
            </p>
          </CardContent>
        </Card>

        {/* Description */}
        <Card className="mb-4">
          <CardContent className="p-5">
            <h2 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              About this Text
            </h2>
            <p className="text-sm leading-relaxed text-foreground/90">{book.description}</p>
          </CardContent>
        </Card>

        {/* Key Figures & Topics */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Key Figures
              </h3>
              <div className="flex flex-wrap gap-2">
                {book.keyFigures.map(f => (
                  <Badge key={f} variant="secondary" className="text-xs">{f}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {book.topics.map(t => (
                  <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Link href="/">
          <Button variant="outline" className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Library
          </Button>
        </Link>
      </div>
    </div>
  );
}
