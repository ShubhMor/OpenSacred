'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { books, categoryLabel, type SacredBook } from '@/data/books';
import { chapters } from '@/data/chapters';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, BookOpen, Clock, Sparkles, Library } from 'lucide-react';

function useLibraryStats() {
  return useMemo(() => {
    const totalTexts = books.length;
    const availableTexts = books.filter(b => b.status !== 'coming-soon').length;
    const totalEstimatedVerses = books.reduce((s, b) => s + b.estimatedVerses, 0);
    const gitaVerses = chapters.reduce((t, c) => t + c.verseCount, 0);
    return { totalTexts, availableTexts, totalEstimatedVerses, gitaVerses };
  }, []);
}

function BookCard({ book }: { book: SacredBook }) {
  const href = book.internalPath ?? `/texts/${book.slug}`;
  const isAvailable = book.status !== 'coming-soon';

  return (
    <Link href={href} className="group block h-full">
      <Card className={`h-full transition-all duration-200 ${
        isAvailable
          ? 'hover:shadow-lg cursor-pointer'
          : 'hover:shadow-sm opacity-80 hover:opacity-100'
      }`}
        style={isAvailable ? {} : {}}
      >
        <CardContent className="p-4 sm:p-5 flex flex-col h-full">
          {/* Top row */}
          <div className="flex items-start justify-between mb-3">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${book.accentColor} text-2xl shadow-md group-hover:scale-105 transition-transform overflow-hidden`}>
              {book.imageUrl ? (
                <Image src={book.imageUrl} alt={book.englishTitle} width={48} height={48} className="object-cover w-full h-full" />
              ) : book.symbol}
            </div>
            <div className="flex flex-col items-end gap-1">
              {book.status === 'partial' && (
                <Badge className="text-[10px] border-0"
                  style={{ background: 'rgba(176,132,57,0.12)', color: '#8a6428' }}>
                  In Progress
                </Badge>
              )}
              {book.status === 'available' && (
                <Badge className="text-[10px] bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 border-0">
                  Available
                </Badge>
              )}
              {book.status === 'coming-soon' && (
                <Badge variant="outline" className="text-[10px] text-muted-foreground gap-1">
                  <Clock className="h-2.5 w-2.5" /> Coming Soon
                </Badge>
              )}
              <span className="text-[10px] text-muted-foreground">{categoryLabel[book.category]}</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground font-medium mb-0.5" lang="sa">
            {book.sanskritTitle}
          </p>
          <h3 className={`text-base sm:text-lg font-bold mb-2 transition-colors ${
            isAvailable ? 'group-hover:text-brand' : ''
          } text-foreground`}>
            {book.englishTitle}
          </h3>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1 mb-3">
            {book.summary}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{book.chaptersOrKandas} {book.chaptersLabel}</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
              <span>~{book.estimatedVerses.toLocaleString()} verses</span>
            </div>
            {isAvailable && (
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: 'var(--brand)' }} />
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function LibraryHomePage() {
  const stats = useLibraryStats();
  const availableBooks = books.filter(b => b.status !== 'coming-soon');
  const comingSoonBooks = books.filter(b => b.status === 'coming-soon');

  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <section
        className="border-b border-border/60"
        style={{ background: 'linear-gradient(150deg, rgba(176,132,57,0.09) 0%, rgba(176,132,57,0.03) 60%, transparent 100%)' }}
      >
        <div className="container mx-auto px-4 py-10 sm:py-16">
          <div className="max-w-2xl mx-auto text-center">

            {/* Transparent lotus — blends perfectly on any background */}
            <div className="flex justify-center mb-5">
              <Image
                src="/images/logo-no-bg.jpg"
                alt="OpenSacred"
                width={68}
                height={68}
                className="object-contain"
              />
            </div>

            {/*
              Label pill — dark gold text (#7a5a1e) for strong contrast on
              the warm cream light background; adjusts in dark mode via CSS var.
            */}
            <div
              className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full"
              style={{
                background: 'rgba(176,132,57,0.12)',
                border: '1px solid rgba(176,132,57,0.30)',
              }}
            >
              <Library className="h-3.5 w-3.5 flex-shrink-0" style={{ color: '#8a6428' }} />
              <span
                className="text-[11px] font-semibold tracking-[0.12em] uppercase"
                style={{ color: '#8a6428' }}
              >
                Sacred Texts of Sanatan Dharma
              </span>
            </div>

            {/*
              Heading: "Hindu Scripture" in brand gold gradient, "Library" in foreground.
              Uses inline style to avoid Tailwind's bg-gradient-to-r + [background:] conflict.
            */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">
              <span
                style={{
                  background: 'linear-gradient(135deg, #8a6428 0%, #b08439 50%, #c8a05a 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'inline',
                }}
              >
                Hindu Scripture
              </span>
              {' '}
              <span className="text-foreground">Library</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground mb-7 leading-relaxed max-w-xl mx-auto">
              A growing digital collection of India's sacred texts — with Sanskrit verses,
              transliterations, English translations, and scholarly insights.
            </p>

            {/* Stats pill */}
            <div className="inline-flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground bg-muted/40 rounded-full px-5 py-2.5 border border-border/50">
              <span><strong className="text-foreground">{stats.totalTexts}</strong> Texts</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              <span><strong className="text-foreground">{stats.availableTexts}</strong> Available</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              <span><strong className="text-foreground">{(stats.totalEstimatedVerses / 1000).toFixed(0)}k+</strong> Verses</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-10 max-w-5xl">

        {/* Available Now */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-5">
            <Sparkles className="h-4 w-4" style={{ color: 'var(--brand)' }} />
            <h2 className="text-lg sm:text-xl font-bold text-foreground">Available Now</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableBooks.map(book => <BookCard key={book.id} book={book} />)}
          </div>
        </div>

        {/* Coming Soon */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-lg sm:text-xl font-bold text-foreground">Coming Soon</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {comingSoonBooks.map(book => <BookCard key={book.id} book={book} />)}
          </div>
        </div>

        {/* About CTA */}
        <div className="mt-12 pt-8 border-t border-border">
          <Card style={{
            borderColor: 'rgba(176,132,57,0.25)',
            background: 'linear-gradient(135deg, rgba(176,132,57,0.07) 0%, transparent 70%)',
          }}>
            <CardContent className="p-6 sm:p-8 text-center">
              <BookOpen className="h-8 w-8 mx-auto mb-3" style={{ color: 'var(--brand)' }} />
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Preserving Timeless Wisdom
              </h2>
              <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
                This library aims to make the sacred texts of Sanatan Dharma accessible to everyone —
                students, scholars, and seekers alike. Each text is presented with its original Sanskrit,
                transliteration, and commentary.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
