import type { MetadataRoute } from 'next'

import { seo } from '@/data/meta'

/**
 * Single-route sitemap, generated at build time. `lastModified` is intentionally
 * omitted rather than pinned to a made-up date.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: seo.url,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
