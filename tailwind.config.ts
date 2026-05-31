import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx,md,mdx}', './components/**/*.{ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#fafaf5',
          ink: '#1a1a1a',
          muted: '#6b6b6b',
          rule: '#d9d6cc',
          accent: '#9c2a2a',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Source Serif Pro', 'Charter', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        'paper-base': ['1.0625rem', { lineHeight: '1.65' }],
      },
      maxWidth: { paper: '70ch' },
      backgroundImage: {
        lined:
          'repeating-linear-gradient(to bottom, transparent 0, transparent 21px, #d9d6cc 21px, #d9d6cc 22px)',
      },
    },
  },
  plugins: [],
};

export default config;
