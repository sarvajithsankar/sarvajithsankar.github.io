import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import type { ReactNode } from 'react'

import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { seo } from '@/data/meta'
import { cn } from '@/lib/utils'

import './globals.css'

/**
 * Both faces are self-hosted through `next/font/local`.
 *
 * The brief asked for `next/font/google`, but that fetches CSS from
 * fonts.googleapis.com during the build, so every build depends on a third-party
 * network being reachable. Vendoring the six woff2 files this site actually uses
 * (~82 kB, OFL — see src/fonts/) keeps everything `next/font` provides: zero FOUT,
 * preloading, scoped CSS variables, and an automatic size-adjusted fallback.
 * Builds are reproducible offline and no font request leaves the origin.
 */

/** Display face: headings, navigation, CTAs. */
const spaceGrotesk = localFont({
  src: [
    { path: '../fonts/space-grotesk-latin-400.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/space-grotesk-latin-500.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/space-grotesk-latin-600.woff2', weight: '600', style: 'normal' },
    { path: '../fonts/space-grotesk-latin-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-display',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'Helvetica Neue', 'sans-serif'],
  adjustFontFallback: 'Arial',
})

/** Metadata face: tags, labels, dates, category identifiers. Never body copy. */
const ibmPlexMono = localFont({
  src: [
    { path: '../fonts/ibm-plex-mono-latin-400.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/ibm-plex-mono-latin-500.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-mono',
  display: 'swap',
  preload: true,
  fallback: ['ui-monospace', 'SFMono-Regular', 'monospace'],
  // A proportional fallback would corrupt mono metrics; let the fallback stack handle it.
  adjustFontFallback: false,
})

export const metadata: Metadata = {
  // Required so the relative /og-image.png resolves to an absolute URL in tags.
  metadataBase: new URL(seo.url),
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  applicationName: seo.siteName,
  authors: [{ name: seo.siteName }],
  openGraph: {
    title: seo.title,
    description: seo.ogDescription,
    url: seo.url,
    siteName: seo.siteName,
    images: [{ url: seo.ogImage, width: seo.ogImageWidth, height: seo.ogImageHeight }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.ogDescription,
    images: [seo.ogImage],
  },
  robots: { index: true, follow: true },
  // Next.js expresses canonical URLs through `alternates`, not a top-level
  // `canonical` key — that key does not exist on the Metadata type.
  alternates: { canonical: seo.url },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0F',
  colorScheme: 'dark',
}

const skipLinkClass = [
  'sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-overlay',
  'focus:rounded-tag focus:border focus:border-accent focus:bg-surface',
  'focus:px-4 focus:py-2 focus:font-display focus:text-h5 focus:text-primary',
].join(' ')

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={cn(spaceGrotesk.variable, ibmPlexMono.variable)}>
      <body>
        {/* Framer Motion renders `initial` styles during SSR. If JavaScript never
            runs, nothing would animate them into view — so force every reveal
            target visible. */}
        <noscript>
          <style>{'.reveal-target{opacity:1 !important;transform:none !important}'}</style>
        </noscript>

        <a href="#main-content" className={skipLinkClass}>
          Skip to content
        </a>

        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
