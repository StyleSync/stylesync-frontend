import type { ChildrenProp } from '@/modules/core/types/react.types';
import type { StylingProps } from '@/styles/styles.types';

export type DividerProps = Partial<ChildrenProp> &
  StylingProps & {
    variant: 'horizontal' | 'vertical';
  };
