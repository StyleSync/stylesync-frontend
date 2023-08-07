import type { Meta, StoryObj } from '@storybook/react';
import 'leaflet/dist/leaflet.css';

import { Map } from './map';

const meta: Meta<typeof Map> = {
  title: 'Core UI/Map',
  component: Map,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Map>;

export const Default: Story = {};
