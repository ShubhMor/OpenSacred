import { Metadata } from 'next';
import { SITE_URL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Contact | OpenSacred — Hindu Scripture Library',
  description: 'Get in touch with OpenSacred. Report an error, suggest a new text, or share feedback about your experience reading the Bhagavad Gita on our platform.',
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
