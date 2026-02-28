# OpenSacred — Hindu Scripture Library

A free, open, ad-free digital library of Hindu sacred texts — starting with the complete **Bhagavad Gita** (all 700 verses) in Sanskrit, transliteration, English translation, and multi-scholar commentary.

---

## Before You Deploy — Set Your Domain

Before deploying, set your domain in **two places**:

**1. Vercel environment variable** (or `.env.local` for local dev):
```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

**2. Static files** (find and replace `YOUR_DOMAIN` with your real domain):
- `public/robots.txt` — sitemap URL
- `public/llms.txt` — all reference URLs

That's it. All other domain references in the codebase read from `NEXT_PUBLIC_SITE_URL` automatically.

---

## Contact Form Setup

The contact form sends messages to `opensacred.in@gmail.com` via Gmail SMTP.

Add these to your Vercel environment variables:
```
GMAIL_USER=opensacred.in@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password
```

To generate a Gmail App Password:
1. Go to your Google Account → Security → 2-Step Verification (must be enabled)
2. Search "App passwords" → Create one named "OpenSacred"
3. Copy the 16-character password into `GMAIL_APP_PASSWORD`

---

## Tech Stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui**
- Deployed on **Vercel**

---

## Local Development

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/opensacred.git
cd opensacred

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env.local
# Edit .env.local — set NEXT_PUBLIC_SITE_URL and Gmail credentials

# 4. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploying to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → import your repo
3. Add Environment Variables in Vercel dashboard:
   - `NEXT_PUBLIC_SITE_URL` → your domain (e.g. `https://opensacred.in`)
   - `GMAIL_USER` → `opensacred.in@gmail.com`
   - `GMAIL_APP_PASSWORD` → your 16-char app password
4. Click Deploy ✓

---

## Adding YouTube Videos to Chapters

1. Open `src/data/chapters.ts`
2. Find the chapter and set `videoUrl`:

```ts
{
  number: 2,
  videoUrl: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
}
```

---

## SEO & AI Visibility

- Dynamic sitemap covering all 700 verse URLs
- Per-page JSON-LD structured data (Chapter + Quotation schema)
- `robots.txt` allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended
- `llms.txt` for AI crawler readability

---

## License

Sanskrit verse text is in the public domain. All other content © OpenSacred.
