/**
 * Central site configuration.
 * Set NEXT_PUBLIC_SITE_URL in your environment (Vercel dashboard or .env.local).
 * Example: https://opensacred.in
 *
 * All NEXT_PUBLIC_ variables are safe to expose to the browser.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://opensacred.in';

export const SITE_NAME = 'OpenSacred — Hindu Scripture Library';
export const CONTACT_EMAIL = 'opensacred.in@gmail.com';
