import type { ChildrenProp } from '@/modules/core/types/react.types';

export type DividerProps = Partial<ChildrenProp> & {
  variant: 'horizontal' | 'vertical';
};
