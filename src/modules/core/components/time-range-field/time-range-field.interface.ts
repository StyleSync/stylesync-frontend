import type { InputProps } from '@/modules/core/components/text-field/text-field.interface';

export type TimeRangeFieldInterface = {
  value: string;
  onChange: (value: string) => void;
  inputProps?: Omit<InputProps, 'variant' | 'value' | 'onChange'>;
};
