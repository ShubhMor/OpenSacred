'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { Theme } from '@/types/gita';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setLightTheme: () => void;
  setDarkTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const themeValue = useTheme();

  return (
    <ThemeContext.Provider value={themeValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}
