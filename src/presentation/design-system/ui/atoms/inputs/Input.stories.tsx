import type { Meta, StoryObj } from '@storybook/react';

import StyledComponentsRegistry from '@/lib/registry';
import { ThemeProvider } from '@/presentation/design-system/providers/ThemeProvider';

import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Design System/Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <StyledComponentsRegistry>
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      </StyledComponentsRegistry>
    ),
  ],
  argTypes: {
    label: {
      control: 'text',
    },
    helperText: {
      control: 'text',
    },
    error: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// Default Input
export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
  },
};

// With Helper Text
export const WithHelperText: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    helperText: 'We will never share your email',
  },
};

// With Error
export const WithError: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    error: true,
    helperText: 'Password must be at least 8 characters',
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    disabled: true,
  },
};

// Full Width
export const FullWidth: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
}; 