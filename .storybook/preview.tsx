import type { Preview } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from '@/presentation/design-system/providers/ThemeProvider';
import StyledComponentsRegistry from '@/lib/registry';
import '@/app/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <StyledComponentsRegistry>
        <ThemeProvider>
          <div style={{ margin: '3em' }}>
            <Story />
          </div>
        </ThemeProvider>
      </StyledComponentsRegistry>
    ),
  ],
};

export default preview; 