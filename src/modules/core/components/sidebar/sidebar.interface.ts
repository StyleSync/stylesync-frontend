import type { FC, ReactNode } from 'react';

import type { IconName } from '@/modules/core/components/icon';

export type SidebarLink = {
  id: string;
  name?: string;
  icon?: IconName;
  onClick?: () => void;
  renderItem?: FC;
};

export type SidebarLinkGroup = {
  id: string;
  title?: string;
  links: SidebarLink[];
};

export type SidebarProps = {
  linkGroups: SidebarLinkGroup[];
  onSelect?: (link: SidebarLink) => void;
  activeLink?: string;
  slots?: {
    top?: ReactNode[];
    bottom?: ReactNode[];
  };
};
