import type { FC } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import { Button } from '@/modules/core/components';

import type { ModalProps } from './modal-window.interface';
import styles from './modal-window.module.scss';

export const ModalWindow: FC<ModalProps> = ({
  children,
  isOpen,
  trigger,
  onClose,
}) => {
  const dialogTrigger = trigger && (
    <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
  );

  const controlButtons = trigger ? null : (
    <div className={styles.buttonsContainer}>
      <Dialog.Close asChild>
        <Button
          className={styles.closeButton}
          text='Close'
          onClick={onClose}
          variant='secondary'
        />
      </Dialog.Close>
      <Dialog.Close asChild>
        <Button text='My bookings' onClick={onClose} variant='secondary' />
      </Dialog.Close>
    </div>
  );

  return (
    <Dialog.Root open={isOpen}>
      {dialogTrigger}
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          <Dialog.Title className={styles.DialogTitle}>
            Modal window
          </Dialog.Title>

          {children}
          {controlButtons}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
