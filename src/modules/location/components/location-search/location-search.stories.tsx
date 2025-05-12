import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import type { Address } from '@/modules/location/types/address.types';

import { LocationSearch } from './location-search';

const meta: Meta<typeof LocationSearch> = {
  title: 'Location UI/LocationSearch',
  component: LocationSearch,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof LocationSearch>;

export const Base: Story = {
  render: () => {
    const [address, setAddress] = useState<Address | null>(null);

    return <LocationSearch value={address} onChange={setAddress} />;
  },
};
