import { type FC } from 'react';

import { Button } from '@/modules/core/components/button';
import { DialogFullScreen } from '@/modules/core/components/dialog-full-screen';
import { TextField } from '@/modules/core/components/text-field';

import { type AddNewBookingModalProps } from './add-new-booking-modal.interface';

export const AddNewBookingModal: FC<AddNewBookingModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const handleCloseModal = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  return (
    <DialogFullScreen
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classes={{
        overlay: 'z-[199]',
        content: 'w-full p-6',
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
        <h2 className='mt-3 text-2xl font-medium text-dark'>Нове бронювання</h2>

        <div className='mt-14 flex flex-1 flex-col gap-7'>
          <TextField className='!w-full' label='Сервіс' variant='input' />
          <TextField label='Дата' variant='input' />
          <TextField label='Час' variant='input' />
        </div>

        <div className='mt-auto'>
          <Button className='!mt-auto !w-full' text='Зберегти' />
        </div>
      </form>
    </DialogFullScreen>
  );
};
