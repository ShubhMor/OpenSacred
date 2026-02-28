import { Speaker } from '@/types/gita';

export const speakers: Speaker[] = [
  {
    id: 'Krishna',
    name: 'Lord Krishna',
    sanskritName: 'कृष्ण',
    description: 'The Supreme Lord, the charioteer and divine guide of Arjuna. Krishna delivers the eternal wisdom of the Gita, revealing the nature of the soul, duty, and the path to liberation.',
    imageUrl: '/images/speakers/krishna.jpg',
    role: 'Divine Teacher'
  },
  {
    id: 'Arjuna',
    name: 'Arjuna',
    sanskritName: 'अर्जुन',
    description: 'The great Pandava warrior and skilled archer. Overwhelmed by moral dilemma on the battlefield, he seeks guidance from Krishna, becoming the ideal disciple.',
    imageUrl: '/images/speakers/arjuna.jpg',
    role: 'Devotee & Warrior'
  },
  {
    id: 'Sanjaya',
    name: 'Sanjaya',
    sanskritName: 'संजय',
    description: 'Minister and charioteer of King Dhritarashtra, blessed by the sage Vyasa with divine vision to witness and narrate the entirety of the Kurukshetra war. His faithful narration carries the words of the Gita to the world.',
    imageUrl: '/images/speakers/sanjaya.jpg',
    role: 'Divine Narrator'
  },
  {
    id: 'Dhritarashtra',
    name: 'Dhritarashtra',
    sanskritName: 'धृतराष्ट्र',
    description: 'The blind king of the Kauravas. Though physically blind, his moral blindness led to the great war. He listens to Sanjaya\'s narration of the Gita.',
    imageUrl: '/images/speakers/dhritarashtra.jpg',
    role: 'Blind King'
  }
];

export const getSpeakerById = (id: string): Speaker | undefined => {
  return speakers.find(speaker => speaker.id === id);
};

export const getSpeakerImageUrl = (name: string): string => {
  const speaker = speakers.find(s => s.id === name || s.name === name);
  return speaker?.imageUrl || '/images/speakers/default.jpg';
};
