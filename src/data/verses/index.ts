import { Verse } from '@/types/gita';
import { verses as chapter1 } from './chapter-1';
import { verses as chapter2 } from './chapter-2';
import { verses as chapter3 } from './chapter-3';
import { verses as chapter4 } from './chapter-4';
import { verses as chapter5 } from './chapter-5';
import { verses as chapter6 } from './chapter-6';
import { verses as chapter7 } from './chapter-7';
import { verses as chapter8 } from './chapter-8';
import { verses as chapter9 } from './chapter-9';
import { verses as chapter10 } from './chapter-10';
import { verses as chapter11 } from './chapter-11';
import { verses as chapter12 } from './chapter-12';
import { verses as chapter13 } from './chapter-13';
import { verses as chapter14 } from './chapter-14';
import { verses as chapter15 } from './chapter-15';
import { verses as chapter16 } from './chapter-16';
import { verses as chapter17 } from './chapter-17';
import { verses as chapter18 } from './chapter-18';
// To add a new chapter: import { verses as chapterN } from './chapter-N';
// then add `...chapterN` to the array below.

export const verses: Verse[] = [
  ...chapter1,
  ...chapter2,
  ...chapter3,
  ...chapter4,
  ...chapter5,
  ...chapter6,
  ...chapter7,
  ...chapter8,
  ...chapter9,
  ...chapter10,
  ...chapter11,
  ...chapter12,
  ...chapter13,
  ...chapter14,
  ...chapter15,
  ...chapter16,
  ...chapter17,
  ...chapter18,
];

export const getVerseById = (id: string): Verse | undefined =>
  verses.find(v => v.id === id);

export const getVersesByChapter = (chapterId: number): Verse[] =>
  verses.filter(v => v.chapterId === chapterId);

export const getAllVerses = (): Verse[] => verses;

export const getRandomVerse = (): Verse =>
  verses[Math.floor(Math.random() * verses.length)];
