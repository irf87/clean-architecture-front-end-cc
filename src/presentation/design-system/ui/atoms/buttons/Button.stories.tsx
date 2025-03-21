import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { ThemeProvider } from '@/presentation/design-system/providers/ThemeProvider';
import StyledComponentsRegistry from '@/lib/registry';

const meta: Meta<typeof Button> = {
  title: 'Design System/Atoms/Button',
  component: Button,
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
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    isLoading: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Primary Button
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
    size: 'medium',
  },
};

// Secondary Button
export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
    size: 'medium',
  },
};

// Tertiary Button
export const Tertiary: Story = {
  args: {
    children: 'Tertiary Button',
    variant: 'tertiary',
    size: 'medium',
  },
};

// Small Button
export const Small: Story = {
  args: {
    children: 'Small Button',
    variant: 'primary',
    size: 'small',
  },
};

// Large Button
export const Large: Story = {
  args: {
    children: 'Large Button',
    variant: 'primary',
    size: 'large',
  },
};

// Loading Button
export const Loading: Story = {
  args: {
    children: 'Loading Button',
    variant: 'primary',
    size: 'medium',
    isLoading: true,
  },
};

// Disabled Button
export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    variant: 'primary',
    size: 'medium',
    disabled: true,
  },
};

// Full Width Button
export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    variant: 'primary',
    size: 'medium',
    fullWidth: true,
  },
}; 