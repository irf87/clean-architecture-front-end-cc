/* eslint-disable import/export */
import { render as rtlRender } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import { colors, shadows, spacing } from '@/presentation/design-system/domain/theme';

const theme = {
  colors,
  shadows,
  spacing
};

function render(ui: React.ReactElement, { ...options } = {}) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

// re-export everything
export * from '@testing-library/react';
export { render }; 