'use client';

import { useState, useEffect, useCallback } from 'react';
import { Theme } from '@/types/gita';

const THEME_KEY = 'gita_theme';

function getThemeFromStorage(): Theme {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem(THEME_KEY) as Theme | null;
  if (stored && (stored === 'light' || stored === 'dark')) {
    return stored;
  }
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Load theme after mount (client-side only)
  useEffect(() => {
    const stored = getThemeFromStorage();
    setTheme(stored);
    setMounted(true);
  }, []);

  // Update document class when theme changes
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;
    
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(THEME_KEY, theme);
  }, [theme, mounted]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const setLightTheme = useCallback(() => setTheme('light'), []);
  const setDarkTheme = useCallback(() => setTheme('dark'), []);

  return {
    theme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    mounted
  };
}
