import type { IconName } from '@/modules/core/components/icon';

export type BurgerMenuProps = {};

export type BurgerMenuAction = {
  id: string;
  text: string;
  icon: IconName;
  variant: 'default' | 'danger' | 'primary';
};
