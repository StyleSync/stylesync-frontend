import type { Meta, StoryObj } from '@storybook/react';
import 'leaflet/dist/leaflet.css';

import { Map } from './map';

const meta: Meta<typeof Map> = {
  title: 'Location UI/Map',
  component: Map,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Map>;

export const Default: Story = {
  args: {
    markers: [
      {
        lat: 50.517483,
        lng: 30.495037,
        avatar:
          'https://images.unsplash.com/photo-1580483046931-aaba29b81601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cnVzc2lhbiUyMGdpcmx8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
      },
    ],
  },
};
