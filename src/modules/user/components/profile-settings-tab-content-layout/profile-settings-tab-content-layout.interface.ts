import type { ButtonProps } from '@/modules/core/components/button/button.interface';
import type { ChildrenProp } from '@/modules/core/types/react.types';
import type { IconName } from '@/modules/core/components/icon';
import { type ReactNode } from 'react';

export type ProfileSettingsTabContentLayoutProps = ChildrenProp & {
  title: string;
  icon?: IconName;
  actions?: Array<(ButtonProps | { actionNode: ReactNode}) & { isMobile?: boolean }>;
  hideActions?: boolean;
  isLoading?: boolean;
};
