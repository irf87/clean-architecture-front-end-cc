'use client';

import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { colors, shadows } from '@/presentation/design-system/domain/theme';

const theme = {
  colors: {
    brand: colors.brand,
    background: colors.background,
    text: colors.text,
    border: colors.border,
    status: colors.status,
    label: colors.labels,
    surface: colors.surface,
    interaction: colors.interaction,
  },
  shadows,
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
}