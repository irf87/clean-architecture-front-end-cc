import type { Meta, StoryObj } from '@storybook/react';
import { UserNavigation } from './UserNavigation';

const meta: Meta<typeof UserNavigation> = {
  title: 'Molecules/Navigation/UserNavigation',
  component: UserNavigation,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UserNavigation>;

export const Default: Story = {
  args: {
    email: 'user@example.com',
    onLogout: () => console.log('Logout clicked'),
  },
};

export const WithLongEmail: Story = {
  args: {
    email: 'very.long.email.address@example.com',
    onLogout: () => console.log('Logout clicked'),
  },
}; 