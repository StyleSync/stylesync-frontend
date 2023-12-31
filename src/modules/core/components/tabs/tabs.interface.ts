import type { IconName } from '@/modules/core/components/icon';
import type { TypographyProps } from '@/modules/core/components/typogrpahy/typography.interface';

export type Tab = {
  key: string;
  name: string;
  icon?: IconName;
};

export type TabsProps = {
  value: string;
  tabs: Tab[];
  onChange?: (key: string) => void;
  typographyProps?: TypographyProps;
};
