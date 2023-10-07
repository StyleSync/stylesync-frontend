import type { FC } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';

import type { ModalProps } from './dialog.interface';
import styles from './dialog.module.scss';

export const Dialog: FC<ModalProps> = ({
  children,
  isOpen,
  trigger,
  // onClose,
}) => {
  return (
    <RadixDialog.Root open={isOpen}>
      {trigger && <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>}
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={styles.DialogOverlay} />
        <RadixDialog.Content className={styles.DialogContent}>
          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
