import clsx from 'clsx';
import type { FC } from 'react';

import type { ChildrenProp } from '@/modules/core/types/react.types';

type BadgeProps = {
  className?: string;
} & ChildrenProp;

export const Badge: FC<BadgeProps> = ({ className, children }) => {
  return (
    <div
      className={clsx(
        'flex h-4 w-4 items-center justify-center rounded-full border border-white shadow',
        className
      )}
    >
      <span className='text-xs font-medium text-white'>{children}</span>
    </div>
  );
};
