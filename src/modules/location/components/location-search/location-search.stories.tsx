import type { Meta, StoryObj } from '@storybook/react';

import { LocationSearch } from './location-search';
import { useState } from 'react';
import type { Address } from '@/modules/location/types/address.types';

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
