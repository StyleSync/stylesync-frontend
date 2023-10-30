import type { ButtonProps } from '@/modules/core/components/button/button.interface';
import type { ChildrenProp } from '@/modules/core/types/react.types';
import type { IconName } from '@/modules/core/components/icon';

export type ProfileSettingsTabContentLayoutProps = ChildrenProp & {
  title: string;
  icon?: IconName;
  actions?: ButtonProps[];
};
