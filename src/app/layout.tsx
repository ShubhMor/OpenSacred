import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SITE_URL, SITE_NAME } from "@/lib/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "OpenSacred | Bhagavad Gita — Sanskrit, Translation & Commentary",
    template: "%s | OpenSacred — Hindu Scripture Library",
  },
  description:
    "Read all 700 Bhagavad Gita verses — Sanskrit, transliteration, English translation & commentary by Shankaracharya, Ramanujacharya & Madhvacharya. Free, ad-free.",
  keywords: [
    "Bhagavad Gita",
    "Bhagavad Gita in English",
    "Bhagavad Gita Sanskrit",
    "Bhagavad Gita translation",
    "Bhagavad Gita commentary",
    "Gita verses",
    "Krishna teachings",
    "Arjuna",
    "Dharma",
    "Karma Yoga",
    "Bhakti Yoga",
    "Jnana Yoga",
    "Hindu scripture",
    "Hinduism",
    "Indian philosophy",
    "Vedic texts",
    "sacred texts online",
    "Sanatan Dharma",
    "Moksha",
    "Atman",
    "Mahabharata",
    "spiritual wisdom",
    "read Gita online",
    "Gita app",
  ],
  authors: [{ name: "OpenSacred", url: SITE_URL }],
  creator: "OpenSacred",
  publisher: "OpenSacred",
  category: "Religion & Spirituality",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "OpenSacred | Bhagavad Gita — Sanskrit, Translation & Commentary",
    description:
      "Read all 700 verses with Sanskrit originals, transliteration, English translation & commentary by Shankaracharya, Ramanujacharya & Madhvacharya. Free and ad-free.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "OpenSacred — Read the Bhagavad Gita Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenSacred | Bhagavad Gita — Sanskrit, Translation & Commentary",
    description:
      "Read all 700 verses with Sanskrit originals, transliteration, English translation & commentary by Shankaracharya, Ramanujacharya & Madhvacharya. Free and ad-free.",
    images: ["/images/hero-bg.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    // Add your Google / Bing verification tokens here when you have them
    // google: "YOUR_GOOGLE_VERIFICATION_TOKEN",
    // other: { "msvalidate.01": "YOUR_BING_TOKEN" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: "OpenSacred — Hindu Scripture Library",
                  description:
                    "The most complete free online library of Hindu sacred texts, starting with the complete Bhagavad Gita in Sanskrit, transliteration, English translation, and commentary.",
                  publisher: { "@id": `${SITE_URL}/#organization` },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
                    },
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "Organization",
                  "@id": `${SITE_URL}/#organization`,
                  name: "OpenSacred",
                  url: SITE_URL,
                  logo: {
                    "@type": "ImageObject",
                    url: `${SITE_URL}/images/logo-no-bg.jpg`,
                  },
                  sameAs: [
                    "https://en.wikipedia.org/wiki/Bhagavad_Gita",
                    "https://www.wikidata.org/wiki/Q5164",
                  ],
                },
                {
                  "@type": "Book",
                  "@id": `${SITE_URL}/chapters#book`,
                  name: "Bhagavad Gita",
                  alternateName: ["Bhagavadgita", "Gita", "The Song of God", "Srimad Bhagavad Gita"],
                  description:
                    "The Bhagavad Gita is a 700-verse Hindu scripture that is part of the Mahabharata. It presents a conversation between Arjuna and Krishna on the battlefield of Kurukshetra, covering duty, righteousness, devotion, knowledge, and the path to liberation.",
                  url: `${SITE_URL}/chapters`,
                  inLanguage: ["en", "sa"],
                  numberOfPages: 18,
                  numberOfItems: 700,
                  image: `${SITE_URL}/images/books/bhagavad-gita.jpg`,
                  genre: ["Sacred text", "Hindu scripture", "Philosophy", "Spirituality"],
                  author: {
                    "@type": "Person",
                    name: "Vyasa",
                    sameAs: "https://en.wikipedia.org/wiki/Vyasa",
                  },
                  about: [
                    { "@type": "Thing", name: "Dharma" },
                    { "@type": "Thing", name: "Karma Yoga" },
                    { "@type": "Thing", name: "Bhakti Yoga" },
                    { "@type": "Thing", name: "Jnana Yoga" },
                    { "@type": "Thing", name: "Moksha" },
                    { "@type": "Thing", name: "Atman" },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
