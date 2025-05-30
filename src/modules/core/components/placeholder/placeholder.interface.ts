import type { ReactNode } from 'react';

import type { IllustrationName } from '@/modules/core/components/illustration/illustration';
import type { ChildrenProp } from '@/modules/core/types/react.types';
import type { StylingProps } from '@/styles/styles.types';

export type PlaceholderProps = ChildrenProp &
  StylingProps & {
    isActive: boolean;
    placeholder?:
      | ReactNode
      | {
          illustration: IllustrationName;
          description?: string;
          action?: ReactNode;
        };
    fadeIn?: boolean;
  };
