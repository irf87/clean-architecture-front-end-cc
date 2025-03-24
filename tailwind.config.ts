import type { Config } from 'tailwindcss';
import { shadows, colors, spacing } from './src/presentation/design-system/domain/theme';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/presentation/**/*.{js,ts,jsx,tsx,mdx}',
    './src/domains/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: colors.brand,
        bg: colors.background,
        text: colors.text,
        border: colors.border,
        status: colors.status,
        label: colors.labels,
        surface: colors.surface,
        interaction: colors.interaction,
      },
      boxShadow: shadows,
      spacing: spacing,
    },
  },
  plugins: [],
};

export default config; 