import type { StylingProps } from '@/styles/styles.types';
import type { IconName } from '@/modules/core/components/icon';

export type TagProps = StylingProps & {
  icon?: IconName;
  iconEnd?: IconName;
  text?: string;
};
