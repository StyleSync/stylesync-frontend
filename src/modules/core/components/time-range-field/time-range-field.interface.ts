import type { InputProps } from '@/modules/core/components/text-field/text-field.interface';
import type { StylingProps } from '@/styles/styles.types';

export type TimeRangeFieldInterface = StylingProps & {
  value: string;
  onChange: (value: string) => void;
  inputProps?: Omit<InputProps, 'variant' | 'value' | 'onChange'>;
};
