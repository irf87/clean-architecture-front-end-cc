import type { Meta, StoryObj } from '@storybook/react';

import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Design System/Atoms/Inputs/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

// Basic Select
export const Basic: Story = {
  args: {
    label: 'Select Option',
  },
  render: (args) => (
    <Select {...args}>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </Select>
  ),
};

// With Helper Text
export const WithHelperText: Story = {
  args: {
    label: 'Select Option',
    helperText: 'This is a helper text',
  },
  render: (args) => (
    <Select {...args}>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </Select>
  ),
};

// With Error
export const WithError: Story = {
  args: {
    label: 'Select Option',
    error: true,
    helperText: 'This field is required',
  },
  render: (args) => (
    <Select {...args}>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </Select>
  ),
};

// Disabled
export const Disabled: Story = {
  args: {
    label: 'Select Option',
    disabled: true,
  },
  render: (args) => (
    <Select {...args}>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </Select>
  ),
};

// Full Width
export const FullWidth: Story = {
  args: {
    label: 'Select Option',
    fullWidth: true,
  },
  render: (args) => (
    <div style={{ width: '300px' }}>
      <Select {...args}>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </Select>
      <Select {...args} fullWidth={false}>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </Select>
    </div>
  ),
};

// With Custom Options
export const WithCustomOptions: Story = {
  args: {
    label: 'Task Status',
  },
  render: (args) => (
    <Select {...args}>
      <option value="pending">Pendiente</option>
      <option value="in_progress">En progreso</option>
      <option value="done">Hecho</option>
    </Select>
  ),
}; 