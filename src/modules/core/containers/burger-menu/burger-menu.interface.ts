import type { Session } from 'next-auth';

import type { IconName } from '@/modules/core/components/icon';

export type BurgerMenuProps = {
  session?: Session | null;
};

export type BurgerMenuAction = {
  id: string;
  text: string;
  icon: IconName;
  variant: 'default' | 'danger' | 'primary';
};
