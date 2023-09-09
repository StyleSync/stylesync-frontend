import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
// constants
import { currencies } from '@/modules/core/constants/currency.constants';
// types
import type { Currency } from '@/modules/core/types/currency.types';

import { PriceField } from './price-field';

const meta: Meta<typeof PriceField> = {
  title: 'Core UI/PriceField',
  component: PriceField,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PriceField>;

export const Base: Story = {
  render: () => {
    const [price, setPrice] = useState<string>('100');
    const [currency, setCurrency] = useState<Currency>(currencies[0]);

    return (
      <PriceField
        price={price}
        currency={currency}
        onPriceChange={setPrice}
        onCurrencyChange={setCurrency}
      />
    );
  },
};
