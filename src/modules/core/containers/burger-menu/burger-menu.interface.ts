import type { IconName } from '@/modules/core/components/icon';
import type { Session } from 'next-auth';

export type BurgerMenuProps = {
  session?: Session | null;
};

export type BurgerMenuAction = {
  id: string;
  text: string;
  icon: IconName;
  variant: 'default' | 'danger' | 'primary';
};
