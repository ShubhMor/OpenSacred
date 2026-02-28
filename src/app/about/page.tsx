import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { chapters } from '@/data/chapters';
import { SITE_URL } from '@/lib/config';
import { ArrowRight, BookOpen, Heart, Library, Scroll, Users, Globe, Mail, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About | OpenSacred — Hindu Scripture Library',
  description:
    'OpenSacred is a free, open, ad-free digital library of Hindu sacred texts. Starting with the complete Bhagavad Gita — with more scriptures coming soon.',
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: 'About OpenSacred — Hindu Scripture Library',
    description:
      'A free library of Hindu sacred texts — Sanskrit, transliteration, English translation & three-tradition Vedantic commentary. No ads. No paywalls. Always.',
    url: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
  const totalVerses = chapters.reduce((total, chapter) => total + chapter.verseCount, 0);

  const upcomingTexts = [
    { name: 'Upanishads', desc: '108 principal Upanishads — the wellspring of Vedantic philosophy', status: 'Next' },
    { name: 'Yoga Sutras of Patanjali', desc: '196 sutras on the nature of mind and the path of Raja Yoga', status: 'Soon' },
    { name: 'Ramayana', desc: "Valmiki's epic — the story of Rama, Sita, and dharmic kingship", status: 'Planned' },
    { name: 'Srimad Bhagavatam', desc: 'The great Purana of devotion — the life and teachings of Krishna', status: 'Planned' },
  ];

  const traditions = [
    { name: 'Adi Shankaracharya', tradition: 'Advaita Vedanta', period: '8th century CE', note: 'Non-dual — Brahman alone is real; liberation is recognition, not attainment' },
    { name: 'Ramanujacharya', tradition: 'Vishishtadvaita', period: '11th–12th century CE', note: 'Qualified non-dualism — devotion and surrender as the path to the personal Lord' },
    { name: 'Madhvacharya', tradition: 'Dvaita', period: '13th century CE', note: 'Pure dualism — the soul and God are eternally distinct; bhakti is the means' },
  ];

  const principles = [
    { icon: Heart, label: 'Free, always', desc: 'No subscriptions, no paywalls, no premium tiers. Every word of every scripture is freely available to everyone.' },
    { icon: Globe, label: 'Ad-free', desc: 'No advertising, ever. The sacred word is not a vehicle for commercial messaging.' },
    { icon: Scroll, label: 'Sanskrit-first', desc: 'Every verse in Devanagari, with transliteration so you can say it aloud — not just read it.' },
    { icon: Users, label: 'Three traditions', desc: 'Commentary from Advaita, Vishishtadvaita, and Dvaita traditions — because the Gita is deep enough to hold all three.' },
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <div className="bg-gradient-to-br [background:linear-gradient(135deg,var(--brand-subtle)_0%,transparent_70%)] border-b border-border">
        <div className="container mx-auto px-4 py-8 sm:py-12 max-w-3xl">
          <div className="flex items-center gap-2 text-brand mb-3">
            <Library className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wide">Hindu Scripture Library</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            About OpenSacred
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
            A free, open, ad-free home for Hindu sacred texts — built so that anyone, anywhere in the world,
            can read India&apos;s greatest scriptures in Sanskrit, understand them in English, and hear them
            interpreted by the teachers who gave their lives to understanding them.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-3xl space-y-6">

        {/* Mission */}
        <Card>
          <CardContent className="p-5 sm:p-6">
            <h2 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500" />
              Why This Exists
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              The great texts of Sanatana Dharma — the Bhagavad Gita, the Upanishads, the Yoga Sutras,
              the Ramayana — have guided human beings toward wisdom, duty, and liberation for thousands of years.
              They belong to everyone. Not just scholars, not just those who read Sanskrit, not just those
              who can afford expensive editions.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              OpenSacred was built on a single conviction: these texts should be freely, beautifully, and
              accurately available to every sincere seeker — with the depth of traditional commentary intact,
              not flattened into something palatable but empty.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We started with the Bhagavad Gita — all 700 verses, complete, with commentary from all three
              great Vedantic acharyas. More scriptures are coming. This is a library that is being built
              for the long term.
            </p>
          </CardContent>
        </Card>

        {/* What's available now */}
        <Card>
          <CardContent className="p-5 sm:p-6">
            <h2 className="text-base font-semibold text-foreground mb-1 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-brand" />
              Available Now
            </h2>
            <p className="text-xs text-muted-foreground mb-4">Complete and fully annotated</p>

            <Link href="/chapters" className="block group">
              <div className="flex items-start gap-4 p-4 rounded-xl border border-brand/30 bg-gradient-to-br from-brand-subtle/60 to-transparent hover:border-brand/60 transition-colors">
                <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-[var(--brand-dark)] to-[var(--brand)] flex items-center justify-center text-white font-bold text-lg shadow">
                  ॐ
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="text-sm font-semibold text-foreground">Bhagavad Gita</p>
                    <Badge className="text-[9px] px-1.5 py-0 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 border-0">Complete</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    All {totalVerses} verses · 18 chapters · Sanskrit, transliteration, English translation
                    & commentary by Shankaracharya, Ramanujacharya & Madhvacharya
                  </p>
                  <div className="flex items-center gap-1 text-xs text-brand font-medium group-hover:gap-2 transition-all">
                    Start reading <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>

        {/* Upcoming */}
        <Card>
          <CardContent className="p-5 sm:p-6">
            <h2 className="text-base font-semibold text-foreground mb-1 flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Coming to the Library
            </h2>
            <p className="text-xs text-muted-foreground mb-4">Scriptures being prepared for publication</p>
            <div className="space-y-3">
              {upcomingTexts.map((text) => (
                <div key={text.name} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/50">
                  <Badge
                    variant="outline"
                    className={`text-[9px] px-1.5 shrink-0 mt-0.5 ${
                      text.status === 'Next'
                        ? 'border-brand/50 text-brand'
                        : text.status === 'Soon'
                        ? 'border-blue-400/50 text-blue-600 dark:text-blue-400'
                        : 'border-border text-muted-foreground'
                    }`}
                  >
                    {text.status}
                  </Badge>
                  <div>
                    <p className="text-xs font-semibold text-foreground mb-0.5">{text.name}</p>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">{text.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Three Traditions */}
        <Card>
          <CardContent className="p-5 sm:p-6">
            <h2 className="text-base font-semibold text-foreground mb-1">Three Traditions. One Truth.</h2>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              Every scripture on OpenSacred is presented with commentary from the three great acharyas of the
              Vedantic tradition. They do not always agree — and that disagreement is itself a teaching.
              The texts are deep enough to hold all three.
            </p>
            <div className="space-y-3">
              {traditions.map((t) => (
                <div key={t.name} className="flex items-start gap-3 p-3 rounded-lg border border-border/60 bg-muted/20">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <p className="text-xs font-semibold text-foreground">{t.name}</p>
                      <Badge variant="secondary" className="text-[9px] px-1.5 py-0">{t.period}</Badge>
                    </div>
                    <p className="text-[10px] text-brand font-medium mb-0.5">{t.tradition}</p>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">{t.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Principles */}
        <Card>
          <CardContent className="p-5 sm:p-6">
            <h2 className="text-base font-semibold text-foreground mb-4">Our Principles</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {principles.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-7 w-7 rounded-lg bg-brand-subtle flex items-center justify-center">
                    <Icon className="h-3.5 w-3.5 text-brand" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground mb-0.5">{label}</p>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="border-border/60">
          <CardContent className="p-5 sm:p-6 flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Have something to say?</p>
              <p className="text-xs text-muted-foreground">
                Found an error, have a suggestion, or want to collaborate — we read every message.
              </p>
            </div>
            <Link href="/contact">
              <Button size="sm" variant="outline" className="shrink-0">
                <Mail className="h-3.5 w-3.5 mr-2" />
                Get in Touch
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Separator />
        <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1 pb-2">
          Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for seekers worldwide
        </p>

      </div>
    </div>
  );
}
