import type { Address } from '@/modules/location/types/address.types';
import type { InputProps } from '@/modules/core/components/text-field/text-field.interface';

export type LocationSearchProps = {
  value: Address | null;
  onChange: (value: Address | null) => void;
  inputProps?: Omit<InputProps, 'variant' | 'value' | 'onChange' | 'onFocus'>;
};
