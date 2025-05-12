import type { InputProps } from '@/modules/core/components/text-field/text-field.interface';
import type { Currency } from '@/modules/core/types/currency.types';

export type PriceFieldProps = {
  price: string;
  currency: Currency;
  onPriceChange: (price: string) => void;
  onCurrencyChange: (currency: Currency) => void;
  inputProps?: Omit<InputProps, 'variant' | 'value' | 'onChange' | 'onFocus'>;
};
