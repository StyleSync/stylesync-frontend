import { IconName } from '@/modules/core/components';
import { TypographyProps } from '@/modules/core/components/typogrpahy/typography.interface';

type Tab = {
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
