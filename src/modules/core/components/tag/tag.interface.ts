import type { IconName } from '@/modules/core/components/icon';
import type { StylingProps } from '@/styles/styles.types';

export type TagProps = StylingProps & {
  icon?: IconName;
  iconEnd?: IconName;
  text?: string;
};
