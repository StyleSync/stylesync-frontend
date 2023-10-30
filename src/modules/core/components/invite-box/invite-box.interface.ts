import type { ReactElement } from 'react';

export type InviteBoxProps = {
  title: string;
  subTitle: string;
  copyText: string;
  bg?: string;
  slotAfterCopyBox?: ReactElement;
};
