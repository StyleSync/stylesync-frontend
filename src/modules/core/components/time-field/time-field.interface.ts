import type { InputProps } from '@/modules/core/components/text-field/text-field.interface';

export type TimeFieldProps = {
  value: string;
  onChange: (value: string) => void;
  inputProps?: Omit<InputProps, 'variant' | 'value' | 'onChange'>;
  formatValue?: (value: string) => string;
};
