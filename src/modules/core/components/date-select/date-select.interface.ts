import type { ButtonProps } from '@/modules/core/components/button/button.interface';

export type DateSelectProps = {
  triggerProps?: Partial<Omit<ButtonProps, 'text' | 'onChange'>>;
  value?: Date | null;
  onChange?: (value: Date | null) => void;
  placeholder?: string;
};
