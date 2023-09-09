import type { ButtonProps } from '@/modules/core/components/button/button.interface';

export type GradientButtonProps = Omit<ButtonProps, 'variant'> & {
  gradient: string;
  rippleColor?: string;
};
