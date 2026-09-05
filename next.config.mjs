/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: the site is entirely static (no server runtime, no ISR).
  // This keeps it deployable to Vercel *and* to GitHub Pages via the existing
  // `.github/workflows/deploy.yml`, which uploads the generated `out/` dir.
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
}

export default nextConfig
