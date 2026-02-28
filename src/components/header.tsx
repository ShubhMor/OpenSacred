'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useThemeContext } from '@/components/theme-provider';
import { Moon, Sun, Search, Menu, Bookmark } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Header() {
  const { theme, toggleTheme, mounted } = useThemeContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const navigation = [
    { name: 'Library', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsOpen(false);
      setSearchQuery('');
    }
  }, [searchQuery, router]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/96 backdrop-blur-md">
      <div className="container mx-auto flex h-[56px] items-center justify-between px-4">

        {/* ── Logo: transparent icon + CSS text — works in light & dark ── */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <Image
            src="/images/logo-no-bg.jpg"
            alt=""
            width={36}
            height={36}
            className="object-contain rounded-xl transition-transform group-hover:scale-105 duration-200"
          />
          {/* Text logo — hidden on very small screens, shown sm+ */}
          <span
            className="hidden sm:inline text-[1.05rem] font-bold tracking-tight transition-opacity group-hover:opacity-80"
            style={{ color: 'var(--brand)' }}
          >
            OpenSacred
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="px-3.5 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-brand-subtle"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search verses…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 pl-8 h-8 text-sm bg-muted/50 border-border/60 focus-visible:ring-1 focus-visible:ring-[var(--brand)] focus-visible:border-[var(--brand)]"
            />
          </form>

          <Link href="/bookmarks">
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-brand-subtle hover:text-brand" title="Bookmarks">
              <Bookmark className="h-4 w-4" />
            </Button>
          </Link>

          {mounted && (
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-8 w-8 hover:bg-brand-subtle">
              {theme === 'dark'
                ? <Sun className="h-4 w-4" style={{ color: 'var(--brand-light)' }} />
                : <Moon className="h-4 w-4 text-muted-foreground" />
              }
            </Button>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-1">
          {mounted && (
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-8 w-8 hover:bg-brand-subtle">
              {theme === 'dark'
                ? <Sun className="h-4 w-4" style={{ color: 'var(--brand-light)' }} />
                : <Moon className="h-4 w-4 text-muted-foreground" />
              }
            </Button>
          )}

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-brand-subtle">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-4">
              <div className="flex flex-col space-y-4 mt-6">

                {/* Drawer logo */}
                <div className="flex items-center gap-2.5 px-2 pb-4 border-b border-border">
                  <Image
                    src="/images/logo-no-bg.jpg"
                    alt="OpenSacred"
                    width={32}
                    height={32}
                    className="object-contain rounded-lg"
                  />
                  <span className="text-sm font-bold" style={{ color: 'var(--brand)' }}>
                    OpenSacred
                  </span>
                </div>

                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search verses…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 h-9 text-sm bg-muted/50"
                  />
                </form>

                <nav className="flex flex-col space-y-0.5">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="px-3 py-2.5 text-sm font-medium text-foreground hover:bg-brand-subtle hover:text-brand rounded-lg transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    href="/bookmarks"
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-2.5 text-sm font-medium text-foreground hover:bg-brand-subtle hover:text-brand rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Bookmark className="h-4 w-4" />
                    Bookmarks
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}
