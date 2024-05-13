import type { Meta, StoryObj } from '@storybook/react';

import { AlbumCard } from './album-card';

const meta: Meta<typeof AlbumCard> = {
  title: 'Gallery UI/AlbumCard',
  component: AlbumCard,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof AlbumCard>;

export const Base: Story = {};
