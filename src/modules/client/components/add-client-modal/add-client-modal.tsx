import { type FC } from 'react';

import { Button } from '@/modules/core/components/button';
import { DialogFullScreen } from '@/modules/core/components/dialog-full-screen';
import { TextField } from '@/modules/core/components/text-field';

import { type AddClientModalProps } from './add-client-modal.interface';

import styles from './add-client-modal.module.scss';

export const AddClientModal: FC<AddClientModalProps> = ({
  isOpen,
  onOpenChange,
  trigger,
}) => {
  const handleCloseModal = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  return (
    <DialogFullScreen
      trigger={trigger}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classes={{
        overlay: styles.dialogOverlay,
        content: styles.dialogContent,
      }}
      applyMobileBottomTabPadding
    >
      <form className='flex w-full flex-col'>
        <Button
          variant='outlined'
          icon='arrow-left'
          className='-ml-2 !border-none !text-dark'
          onClick={handleCloseModal}
        />
        <h2 className='mt-3 text-2xl font-medium text-dark'>Новий клієнт</h2>

        <div className='mt-14 flex flex-1 flex-col gap-7'>
          <TextField className='!w-full' label='Телефон' variant='input' />
          <TextField label='Імя' variant='input' />
          <TextField label='Призвіще' variant='input' />
        </div>

        <div className='mt-auto'>
          <Button className='!mt-auto !w-full' text='Зберегти' />
        </div>
      </form>
    </DialogFullScreen>
  );
};
