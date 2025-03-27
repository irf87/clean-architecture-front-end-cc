import type { Meta, StoryObj } from '@storybook/react';
import { NavigationBar } from './NavigationBar';

const meta: Meta<typeof NavigationBar> = {
  title: 'Organisms/Navigation/NavigationBar',
  component: NavigationBar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NavigationBar>;

export const Default: Story = {
  args: {
    userEmail: 'user@example.com',
    onLogout: () => console.log('Logout clicked'),
  },
};

export const WithLongEmail: Story = {
  args: {
    userEmail: 'very.long.email.address@example.com',
    onLogout: () => console.log('Logout clicked'),
  },
}; 