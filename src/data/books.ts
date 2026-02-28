export type BookStatus = 'available' | 'coming-soon' | 'partial';

export interface SacredBook {
  id: string;
  slug: string;
  sanskritTitle: string;
  englishTitle: string;
  category: 'Smriti' | 'Shruti' | 'Itihas' | 'Purana' | 'Sutra' | 'Other';
  language: string;
  estimatedVerses: number;
  chaptersOrKandas: number;
  chaptersLabel: string;  // 'Chapters' | 'Kandas' | 'Adhyayas' | 'Upanishads'
  status: BookStatus;
  summary: string;
  description: string;
  keyFigures: string[];
  topics: string[];
  internalPath: string | null; // null = use /texts/[slug]
  accentColor: string;        // tailwind gradient classes
  symbol: string;             // emoji or Sanskrit symbol
  imageUrl?: string;          // book cover thumbnail e.g. /images/books/bhagavad-gita.jpg
}

export const books: SacredBook[] = [
  {
    id: 'bhagavad-gita',
    slug: 'bhagavad-gita',
    sanskritTitle: 'श्रीमद् भगवद्गीता',
    englishTitle: 'Bhagavad Gita',
    category: 'Smriti',
    language: 'Sanskrit',
    estimatedVerses: 700,
    chaptersOrKandas: 18,
    chaptersLabel: 'Chapters',
    status: 'available',
    summary: 'The divine discourse between Lord Krishna and Arjuna on the battlefield of Kurukshetra — a timeless guide to duty, action, and liberation.',
    description: 'Part of the Mahabharata, the Bhagavad Gita is a 700-verse dialogue between Prince Arjuna and Lord Krishna addressing the moral, philosophical, and spiritual crises of life. It teaches Karma Yoga, Jnana Yoga, and Bhakti Yoga as paths to moksha.',
    keyFigures: ['Krishna', 'Arjuna', 'Sanjaya', 'Dhritarashtra'],
    topics: ['Dharma', 'Karma Yoga', 'Jnana Yoga', 'Bhakti Yoga', 'Moksha', 'Atman'],
    internalPath: '/chapters',
    accentColor: 'from-orange-500 to-amber-600',
    symbol: '🪷',
    imageUrl: '/images/books/bhagavad-gita.jpg',
  },
  {
    id: 'ramayana',
    slug: 'ramayana',
    sanskritTitle: 'रामायण',
    englishTitle: 'Ramayana',
    category: 'Itihas',
    language: 'Sanskrit',
    estimatedVerses: 24000,
    chaptersOrKandas: 7,
    chaptersLabel: 'Kandas',
    status: 'coming-soon',
    summary: 'The epic journey of Lord Rama — a story of righteousness, devotion, and the eternal victory of dharma over adharma.',
    description: 'Written by Sage Valmiki, the Ramayana is one of the two great Sanskrit epics of ancient India. It narrates the life of Rama, an avatar of Vishnu, his wife Sita, his devoted brother Lakshmana, and their battle against the demon king Ravana.',
    keyFigures: ['Rama', 'Sita', 'Lakshmana', 'Hanuman', 'Ravana', 'Valmiki'],
    topics: ['Dharma', 'Devotion', 'Duty', 'Righteousness', 'Loyalty', 'Sacrifice'],
    internalPath: null,
    accentColor: 'from-blue-500 to-indigo-600',
    symbol: '🏹',
  },
  {
    id: 'mahabharata',
    slug: 'mahabharata',
    sanskritTitle: 'महाभारत',
    englishTitle: 'Mahabharata',
    category: 'Itihas',
    language: 'Sanskrit',
    estimatedVerses: 100000,
    chaptersOrKandas: 18,
    chaptersLabel: 'Parvas',
    status: 'coming-soon',
    summary: 'The great epic of the Bharata dynasty — encompassing the Kurukshetra war, the Pandavas and Kauravas, and profound philosophical teachings.',
    description: 'The Mahabharata, attributed to sage Vyasa, is the longest poem ever written. It narrates the conflict between the Pandava and Kaurava clans, contains the Bhagavad Gita, and explores themes of dharma, artha, kama, and moksha through hundreds of embedded stories and dialogues.',
    keyFigures: ['Vyasa', 'Yudhishthira', 'Arjuna', 'Bhima', 'Draupadi', 'Duryodhana', 'Krishna', 'Bhishma'],
    topics: ['Dharma', 'War', 'Kingship', 'Ethics', 'Philosophy', 'Devotion'],
    internalPath: null,
    accentColor: 'from-red-500 to-rose-600',
    symbol: '⚔️',
  },
  {
    id: 'upanishads',
    slug: 'upanishads',
    sanskritTitle: 'उपनिषद्',
    englishTitle: 'Principal Upanishads',
    category: 'Shruti',
    language: 'Sanskrit',
    estimatedVerses: 2500,
    chaptersOrKandas: 12,
    chaptersLabel: 'Upanishads',
    status: 'coming-soon',
    summary: 'The philosophical heart of the Vedas — profound meditations on the nature of Brahman, Atman, and the ultimate reality.',
    description: 'The Upanishads are the concluding portions of the Vedas (Vedanta), representing the highest philosophical thought of ancient India. They explore Brahman (universal consciousness), Atman (individual self), and their ultimate identity — "Aham Brahmasmi" (I am Brahman).',
    keyFigures: ['Yajnavalkya', 'Uddalaka', 'Shankara', 'Svetaketu', 'Maitreyi'],
    topics: ['Brahman', 'Atman', 'Vedanta', 'Non-duality', 'Meditation', 'Consciousness'],
    internalPath: null,
    accentColor: 'from-violet-500 to-purple-600',
    symbol: 'ॐ',
  },
  {
    id: 'yoga-sutras',
    slug: 'yoga-sutras',
    sanskritTitle: 'योगसूत्र',
    englishTitle: 'Yoga Sutras of Patanjali',
    category: 'Sutra',
    language: 'Sanskrit',
    estimatedVerses: 196,
    chaptersOrKandas: 4,
    chaptersLabel: 'Padas',
    status: 'coming-soon',
    summary: 'Patanjali\'s definitive codification of yoga — the 196 sutras that form the foundation of classical Raja Yoga.',
    description: 'The Yoga Sutras, compiled by the sage Patanjali around 400 CE, are the foundational text of Raja Yoga. Divided into four padas (chapters), they lay out the eight-limbed (Ashtanga) path of yoga: yama, niyama, asana, pranayama, pratyahara, dharana, dhyana, and samadhi.',
    keyFigures: ['Patanjali'],
    topics: ['Ashtanga Yoga', 'Samadhi', 'Citta', 'Pratyahara', 'Dharana', 'Dhyana'],
    internalPath: null,
    accentColor: 'from-teal-500 to-cyan-600',
    symbol: '🧘',
  },
  {
    id: 'srimad-bhagavatam',
    slug: 'srimad-bhagavatam',
    sanskritTitle: 'श्रीमद्भागवतम्',
    englishTitle: 'Srimad Bhagavatam',
    category: 'Purana',
    language: 'Sanskrit',
    estimatedVerses: 18000,
    chaptersOrKandas: 12,
    chaptersLabel: 'Skandhas',
    status: 'coming-soon',
    summary: 'The glory of Lord Vishnu and his devotees — the Maha Purana that is considered the ripened fruit of all Vedic literature.',
    description: 'Composed by Vyasa, the Srimad Bhagavatam (Bhagavata Purana) is the foremost of all Puranas. Spanning 12 skandhas, it glorifies the pastimes of Lord Vishnu and his avatars, with the 10th skandha dedicated to the life and leelas of Lord Krishna.',
    keyFigures: ['Vyasa', 'Shukadeva', 'Parikshit', 'Krishna', 'Vishnu', 'Prahlada'],
    topics: ['Bhakti', 'Vishnu', 'Krishna Leela', 'Devotion', 'Liberation', 'Cosmology'],
    internalPath: null,
    accentColor: 'from-yellow-500 to-amber-500',
    symbol: '🌸',
  },
];

export const getBookBySlug = (slug: string): SacredBook | undefined =>
  books.find(b => b.slug === slug);

export const availableBooks = books.filter(b => b.status === 'available' || b.status === 'partial');
export const comingSoonBooks = books.filter(b => b.status === 'coming-soon');

export const categoryLabel: Record<SacredBook['category'], string> = {
  Smriti: 'Smriti',
  Shruti: 'Shruti (Veda)',
  Itihas: 'Itihasa',
  Purana: 'Purana',
  Sutra: 'Sutra',
  Other: 'Other',
};
