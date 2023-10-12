import type { IconName } from '@/modules/core/components/icon';

export type InviteBoxVariant = 'link' | 'invite';
export type BoxTitleColor = 'yellow' | 'blue';

export type InviteBoxProps = {
  variant: InviteBoxVariant;
  title: string;
  titleColor: BoxTitleColor;
  subTitle: string;
  copyText: string;
  icon?: IconName[];
};
