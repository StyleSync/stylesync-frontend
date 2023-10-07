import type { ReactNode } from 'react';
import type { ChildrenProp } from '@/modules/core/types/react.types';
import type { StylingProps } from '@/styles/styles.types';
import type { IllustrationName } from '@/modules/core/components/illustration/illustration';

export type PlaceholderProps = ChildrenProp &
  StylingProps & {
    isActive: boolean;
    placeholder:
      | ReactNode
      | {
          illustration: IllustrationName;
          description?: string;
        };
    fadeIn?: boolean;
  };
