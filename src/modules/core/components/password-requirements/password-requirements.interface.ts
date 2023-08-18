import type { StylingProps } from '@/styles/styles.types';

export type PasswordStrengthBarProps = StylingProps & {
  password: string;
  highlight?: boolean;
};
