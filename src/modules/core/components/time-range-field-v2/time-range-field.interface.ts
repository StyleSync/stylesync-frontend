import type { PopoverProps } from '@/modules/core/components/popover/popover.interface';
import type { InputProps } from '@/modules/core/components/text-field/text-field.interface';
import type { StylingProps } from '@/styles/styles.types';

export type TimeRangeFieldInterface = StylingProps & {
  value: string;
  onChange: (value: string) => void;
  inputProps?: Omit<InputProps, 'variant' | 'value' | 'onChange'> & {
    bigbtn?: boolean;
  };
  popoverProps?: Partial<Omit<PopoverProps, 'onClose' | 'isOpen' | 'trigger'>>;
  label?: string;
};
