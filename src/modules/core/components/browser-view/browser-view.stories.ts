import type { Meta, StoryObj } from '@storybook/react';

import AboutProPreview from '@/assets/images/about-pro-preview.png';

import { BrowserView } from './browser-view';

const meta: Meta<typeof BrowserView> = {
  title: 'Core UI/BrowserView',
  component: BrowserView,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BrowserView>;

export const Base: Story = {
  args: {
    image: AboutProPreview,
    meta: {
      siteIcon: 'google-logo',
      siteName: 'StyleSync',
      siteUrl: 'stylesync.com',
    },
  },
};
