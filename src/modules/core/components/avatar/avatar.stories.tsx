import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Core UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

const URL =
  'https://sneg.top/uploads/posts/2023-06/1688075821_sneg-top-p-avatarki-dlya-lolza-krasivo-33.jpg';

export const Base: Story = {};

export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '50px',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          columnGap: '20px',
        }}
      >
        <Avatar shadow size='medium' url={URL} />
        <Avatar shadow size='medium' url={URL} shape='rect' />
      </div>

      <div
        style={{
          display: 'flex',
          columnGap: '20px',
        }}
      >
        <Avatar shadow size='large' url={URL} />
        <Avatar shadow size='medium' url={URL} />
        <Avatar shadow size='small' url={URL} />
      </div>
    </div>
  ),
};
