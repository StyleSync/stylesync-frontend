import { type FC } from 'react';
import clsx from 'clsx';
// components
import {
  Illustration,
  Placeholder,
  Typography,
} from '@/modules/core/components';

import type { ItemsListEmptyIllustrationPlaceholderProps } from './items-list-empty-illustration-placeholder.interface';
import styles from './items-list-empty-illustration-placeholder.module.scss';

export const ItemsListEmptyIllustrationPlaceholder: FC<
  ItemsListEmptyIllustrationPlaceholderProps
> = ({ illustration, children, className, style, description, ...props }) => {
  return (
    <Placeholder
      className={clsx(styles.root, className)}
      style={style}
      placeholder={
        <>
          {illustration && <Illustration name={illustration} width={220} />}
          {description && <Typography>{description}</Typography>}
        </>
      }
      {...props}
    >
      {children}
    </Placeholder>
  );
};
