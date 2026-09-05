import type { Config } from 'tailwindcss'

/**
 * Design system tokens.
 *
 * Every colour resolves to a CSS custom property declared in `src/app/globals.css`,
 * so no raw hex value ever appears in a component. Colour variables are stored in
 * space-separated RGB channel form (`--background: 10 10 15`) which is what lets
 * Tailwind's alpha modifier work (`bg-background/80` in the navbar, `bg-background/95`
 * in the project modal). Resolved hex copies (`--background-hex`) exist for the
 * inline-SVG diagram, which needs real colour strings.
 *
 * Canonical spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 px.
 * Depth is communicated with 1px borders, never box shadows.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--background) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-elevated': 'rgb(var(--surface-elevated) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        'border-emphasis': 'rgb(var(--border-emphasis) / <alpha-value>)',
        primary: 'rgb(var(--text-primary) / <alpha-value>)',
        secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
        muted: 'rgb(var(--text-muted) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-foreground': 'rgb(var(--accent-foreground) / <alpha-value>)',
        'accent-muted': 'rgb(var(--accent) / 0.1)',
        success: 'rgb(var(--success) / <alpha-value>)',
        mono: 'rgb(var(--text-mono) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-display)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        // 52px at desktop, fluid down to 34px so the hero never overflows at 375px.
        display: ['clamp(2.125rem, 1.15rem + 4.2vw, 3.25rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        title: ['2.25rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        h3: ['1.5rem', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        'card-title': ['1.375rem', { lineHeight: '1.25', letterSpacing: '-0.015em' }],
        h4: ['1.125rem', { lineHeight: '1.35', letterSpacing: '-0.01em' }],
        h5: ['0.875rem', { lineHeight: '1.5' }],
        body: ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.6' }],
        'body-xs': ['0.8125rem', { lineHeight: '1.5' }],
        meta: ['0.75rem', { lineHeight: '1.5' }],
        label: ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.08em' }],
      },
      borderRadius: {
        card: '6px',
        tag: '4px',
        code: '2px',
        none: '0px',
      },
      spacing: {
        18: '72px',
        26: '104px',
      },
      maxWidth: {
        container: '1120px',
        prose: '420px',
      },
      zIndex: {
        nav: '50',
        overlay: '100',
      },
      transitionDuration: {
        fast: '150ms',
        base: '400ms',
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
}

export default config
