/* eslint-disable no-console */
import type { Meta, StoryObj } from '@storybook/react';

import Card from './Card';

const meta: Meta<typeof Card> = {
  title: 'Atoms/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    draggable: false,
    onDragStart: (e) => console.log('Drag started', e),
  },
  render: (args) => (
    <Card {...args}>
      <Card.Header>
        <Card.Title>Card Title</Card.Title>
        <Card.FavoriteButton $isFavorite={false}>★</Card.FavoriteButton>
      </Card.Header>
      <Card.Description>
        This is a sample description for the card component.
      </Card.Description>
      <Card.DateInfo>Created on: 2024-03-20</Card.DateInfo>
      <Card.ButtonContainer>
        <button>Action 1</button>
        <button>Action 2</button>
      </Card.ButtonContainer>
    </Card>
  ),
};

export const Draggable: Story = {
  args: {
    draggable: true,
    onDragStart: (e) => console.log('Drag started', e),
  },
  render: (args) => (
    <Card {...args}>
      <Card.Header>
        <Card.Title>Draggable Card</Card.Title>
        <Card.FavoriteButton $isFavorite={true}>★</Card.FavoriteButton>
      </Card.Header>
      <Card.Description>
        This card can be dragged around.
      </Card.Description>
      <Card.DateInfo>Created on: 2024-03-20</Card.DateInfo>
      <Card.ButtonContainer>
        <button>Action 1</button>
        <button>Action 2</button>
      </Card.ButtonContainer>
    </Card>
  ),
};

export const WithLongContent: Story = {
  args: {
    draggable: false,
    onDragStart: (e) => console.log('Drag started', e),
  },
  render: (args) => (
    <Card {...args}>
      <Card.Header>
        <Card.Title>Card with Long Content</Card.Title>
        <Card.FavoriteButton $isFavorite={false}>★</Card.FavoriteButton>
      </Card.Header>
      <Card.Description>
        This is a very long description that should wrap properly within the card component.
        It contains multiple lines of text to demonstrate how the card handles overflow and
        maintains its layout structure.
      </Card.Description>
      <Card.DateInfo>Created on: 2024-03-20</Card.DateInfo>
      <Card.ButtonContainer>
        <button>Action 1</button>
        <button>Action 2</button>
        <button>Action 3</button>
      </Card.ButtonContainer>
    </Card>
  ),
}; 