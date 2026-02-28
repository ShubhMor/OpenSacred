import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // ✅ Removed "standalone" — Vercel handles its own output format automatically

  reactStrictMode: true,

  typescript: {
    ignoreBuildErrors: true,
  },

  // Fix: silence the workspace root detection warning
  turbopack: {
    root: path.resolve(__dirname),
  },

  // Optimize heavy packages — reduces bundle size via tree-shaking
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "recharts",
      "@radix-ui/react-accordion",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-select",
      "@radix-ui/react-tabs",
    ],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // YouTube thumbnails (used for video player preview)
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
    ],
  },

  compress: true,

  async headers() {
    return [
      // Static image caching
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // ✅ Allow YouTube iframes sitewide (required for embedded players)
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://www.youtube-nocookie.com",
              "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
              "img-src 'self' data: blob: https://img.youtube.com https://i.ytimg.com",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
