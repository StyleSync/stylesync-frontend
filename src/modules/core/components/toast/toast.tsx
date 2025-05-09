import { type FC } from 'react';

import * as RadixToast from '@radix-ui/react-toast';
import clsx from 'clsx';

// components
import { Typography } from '@/modules/core/components/typogrpahy';

import type { ToastProps } from './toast.interface';

import styles from './toast.module.scss';

export const Toast: FC<ToastProps> = ({
  variant,
  title,
  description,
  isOpen,
  onClose,
}) => {
  return (
    <RadixToast.Root
      className={clsx(styles.root, styles[variant])}
      open={isOpen}
      onOpenChange={onClose}
    >
      <div className={styles.slot}>
        <RadixToast.Title asChild>
          <Typography
            className={styles.title}
            weight='semibold'
            variant='body1'
          >
            {title}
          </Typography>
        </RadixToast.Title>
        {description && (
          <RadixToast.Description asChild>
            <Typography className={styles.description}>
              {description}
            </Typography>
          </RadixToast.Description>
        )}
      </div>
    </RadixToast.Root>
  );
};
