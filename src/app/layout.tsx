import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

import { seo } from '@/data/meta'

import './portfolio.css'

const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Anton&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;1,400&family=Instrument+Serif:ital@1&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&display=swap'

const FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%2308090d'/%3E%3Ctext x='16' y='25' font-family='Arial Black,sans-serif' font-size='22' fill='%23f28a2e' text-anchor='middle'%3ES%3C/text%3E%3C/svg%3E"

export const metadata: Metadata = {
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
  alternates: { canonical: seo.url },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#08090d',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="style" href={FONT_URL} />
        <link href={FONT_URL} rel="stylesheet" />
        <link rel="icon" href={FAVICON} />
      </head>
      <body>{children}</body>
    </html>
  )
}
