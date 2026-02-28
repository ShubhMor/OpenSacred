// Speaker types
export type SpeakerName = 'Krishna' | 'Arjuna' | 'Sanjaya' | 'Dhritarashtra';

export interface Speaker {
  id: SpeakerName;
  name: string;
  sanskritName: string;
  description: string;
  imageUrl: string;
  role: string;
}

// Commentary types
export interface Commentary {
  id: string;
  scholar: string;
  text: string;
  source?: string;
  tradition?: string; // e.g. 'Advaita', 'Vishishtadvaita', 'Dvaita', 'Vedantic'
}

// Verse types
export interface Verse {
  id: string;
  chapterId: number;
  verseNumber: number;
  speaker: SpeakerName;
  sanskrit: string;
  transliteration: string;
  englishTranslation: string;
  generalMeaning: string;
  commentaries: Commentary[];
  wordMeanings?: WordMeaning[];
  isHard?: boolean; // marks philosophically dense or complex verses
}

export interface WordMeaning {
  sanskrit: string;
  transliteration: string;
  meaning: string;
}

// Chapter types
export interface Chapter {
  id: number;
  number: number;
  sanskritTitle: string;
  englishTitle: string;
  verseCount: number;
  summary: string;
  introduction: string;
  topics: string[];
  keyTeachings: string[];
  location?: string;
  characters?: string[];
  imageUrl?: string;   // chapter thumbnail e.g. /images/chapters/chapter_01.jpg
  audioUrl?: string;   // kept for backward compat — use videoUrl going forward
  videoUrl?: string;   // YouTube URL e.g. "https://www.youtube.com/watch?v=XXXXXXXXXXX"
}
  location?: string;
  characters?: string[];
  audioUrl?: string;
}

// Bookmark types
export interface Bookmark {
  verseId: string;
  chapterId: number;
  verseNumber: number;
  savedAt: string;
}

// Search types
export interface SearchResult {
  type: 'verse' | 'chapter';
  id: string;
  title: string;
  preview: string;
  chapterId?: number;
  verseNumber?: number;
}

// Theme types
export type Theme = 'light' | 'dark';

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Commentary vote types
export interface CommentaryVote {
  likes: number;
  dislikes: number;
  userVote: 'like' | 'dislike' | null;
}
