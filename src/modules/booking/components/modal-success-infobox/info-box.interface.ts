import { type ReactNode } from 'react';

export type InfoBoxProps = {
  title: string;
  content: ReactNode;
  status?: string;
};
