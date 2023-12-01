import { useEffect, type FC } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { useBoolean } from 'usehooks-ts';
import clsx from 'clsx';

import type { ModalProps } from './dialog.interface';
import styles from './dialog.module.scss';

export const Dialog: FC<ModalProps> = ({
  children,
  isOpen,
  trigger,
  onOpenChange,
  fullScreen = false,
}) => {
  const _isOpen = useBoolean(isOpen);

  useEffect(() => {
    if (isOpen) {
      _isOpen.setTrue();

      return;
    }

    let timeout: null | ReturnType<typeof setTimeout> = null;
    const animationDelay = 150;

    if (!isOpen) {
      timeout = setTimeout(() => {
        _isOpen.setFalse();
      }, animationDelay);
    }

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [isOpen, _isOpen.setFalse, _isOpen.setTrue]);

  return (
    <RadixDialog.Root open={_isOpen.value} onOpenChange={onOpenChange}>
      {trigger && <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>}
      <RadixDialog.Portal>
        <RadixDialog.Overlay
          className={clsx(styles.DialogOverlay, {
            [styles.fullScreen]: fullScreen,
            [styles.closeAnimation]: !isOpen,
          })}
        />
        <RadixDialog.Content
          className={clsx(styles.DialogContent, {
            [styles.fullScreen]: fullScreen,
            [styles.closeAnimation]: !isOpen,
          })}
        >
          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
