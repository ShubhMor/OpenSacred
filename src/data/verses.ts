// This file is a re-export shim.
// All verse data now lives in src/data/verses/ — one file per chapter.
// To add a new chapter, create src/data/verses/chapter-N.ts and
// register it in src/data/verses/index.ts.
export {
  verses,
  getVerseById,
  getVersesByChapter,
  getAllVerses,
  getRandomVerse,
} from './verses/index';
