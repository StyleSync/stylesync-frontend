import type { ReactNode } from 'react';

import type { ChildrenProp } from '@/modules/core/types/react.types';
import type { StylingProps } from '@/styles/styles.types';

export type PageLayoutProps = ChildrenProp &
  StylingProps & {
    sidebar?: ReactNode;
  };
