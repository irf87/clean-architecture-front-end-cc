/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '@/presentation/design-system/ui/atoms/buttons/Button';

import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Design System/Atoms/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Basic Modal
export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <p>This is a basic modal with some content.</p>
        </Modal>
      </>
    );
  },
};

// Modal with Title
export const WithTitle: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal with Title</Button>
        <Modal 
          open={open} 
          onClose={() => setOpen(false)}
          title="Modal Title"
        >
          <p>This modal has a title and some content.</p>
        </Modal>
      </>
    );
  },
};

// Modal with Form
export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Form Modal</Button>
        <Modal 
          open={open} 
          onClose={() => setOpen(false)}
          title="Create Task"
        >
          <form onSubmit={(e) => {
            e.preventDefault();
            setOpen(false);
          }}>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem' }}>
                Title
              </label>
              <input
                type="text"
                id="title"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="description" style={{ display: 'block', marginBottom: '0.5rem' }}>
                Description
              </label>
              <textarea
                id="description"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  minHeight: '100px',
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Create
              </Button>
            </div>
          </form>
        </Modal>
      </>
    );
  },
};

// Modal with Long Content
export const WithLongContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Long Content Modal</Button>
        <Modal 
          open={open} 
          onClose={() => setOpen(false)}
          title="Terms and Conditions"
        >
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {Array.from({ length: 20 }).map((_, i) => (
              <p key={i} style={{ marginBottom: '1rem' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            ))}
          </div>
        </Modal>
      </>
    );
  },
}; 