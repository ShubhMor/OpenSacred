'use client';

import Link from 'next/link';
import { SITE_URL } from '@/lib/config';
import Image from 'next/image';
import { Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const mainLinks = [
    { name: 'Library', href: '/' },
    { name: 'Bhagavad Gita', href: '/chapters' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Bookmarks', href: '/bookmarks' },
  ];

  const chapterLinks = [
    { name: 'Ch 1 — Arjuna\'s Dilemma', href: '/chapters/1' },
    { name: 'Ch 2 — Sānkhya Yoga', href: '/chapters/2' },
    { name: 'Ch 3 — Karma Yoga', href: '/chapters/3' },
    { name: 'Ch 6 — Dhyana Yoga', href: '/chapters/6' },
    { name: 'Ch 11 — Cosmic Form', href: '/chapters/11' },
    { name: 'Ch 18 — Liberation', href: '/chapters/18' },
  ];

  return (
    <footer className="border-t border-border/60 bg-muted/20" aria-label="Site footer">
      <div className="container mx-auto px-4 py-8 sm:py-10">

        {/* Main footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">

          {/* Brand column */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 group mb-3">
              <Image
                src="/images/logo-no-bg.jpg"
                alt="OpenSacred"
                width={32}
                height={32}
                className="object-contain rounded-xl opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <span className="text-sm font-semibold text-foreground/80 group-hover:text-foreground transition-colors">
                OpenSacred
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-[220px]">
              A free, open digital library of Hindu sacred texts — presented with Sanskrit, transliteration, English translation, and commentary.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wide mb-3">Navigation</p>
            <ul className="space-y-2">
              {mainLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs text-muted-foreground hover:text-brand transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Popular chapters */}
          <nav aria-label="Popular chapters">
            <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wide mb-3">Popular Chapters</p>
            <ul className="space-y-2">
              {chapterLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-muted-foreground hover:text-brand transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 border-t border-border/40">
          <p className="text-[11px] text-muted-foreground/70">
            © {currentYear} OpenSacred · Hindu Scripture Library ·{' '}
            <Link href="/about" className="hover:text-brand transition-colors">${SITE_URL.replace("https://","")}</Link>
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            Made with <Heart className="h-3 w-3 text-red-400 fill-red-400" /> for seekers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
