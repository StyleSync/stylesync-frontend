import { type FC, useState } from 'react';
import Image from 'next/image';
import Bg from '@/assets/images/bg-1.png';

import { Button } from '@/modules/core/components/button';
import { DialogFullScreen } from '@/modules/core/components/dialog-full-screen';
import { TextField } from '@/modules/core/components/text-field';

import { type AddNewBookingModalProps } from './add-new-booking-modal.interface';
import { TimeField } from '@/modules/core/components/time-field';
import { ClientSelector } from '@/modules/client/components/client-selector';

export const AddNewBookingModal: FC<AddNewBookingModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const [timeValue, setTimeValue] = useState('');

  const handleCloseModal = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const handleClientSelect = () => {
    // TODO: Implement client selection logic
    console.log('Open client selection from modal');
  };

  return (
    <DialogFullScreen
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classes={{
        overlay: 'z-[20]',
        content: 'w-full p-6',
      }}
      applyMobileBottomTabPadding
    >
      <form className='flex w-full flex-col'>
        <Button
          variant='outlined'
          icon='chevron-left'
          className='absolute left-6 top-[30px] z-[200] -ml-2 !border-none !text-dark'
          onClick={handleCloseModal}
          type='button'
        />
        <h2 className='z-50 mt-3 text-center text-2xl font-medium text-dark'>
          Нове бронювання
        </h2>

        <div className='z-50 mt-14 flex flex-1 flex-col gap-7'>
          <ClientSelector onSelect={handleClientSelect} />

          <TextField className='!w-full' label='Сервіс' variant='input' />
          <TextField label='Дата' variant='input' />
          <TextField label='Час' variant='input' />
          <TimeField value={timeValue} onChange={setTimeValue} />
        </div>

        <div className='z-50 mt-auto'>
          <Button className='!mt-auto !w-full' text='Зберегти' />
        </div>

        <Image
          className='fixed left-0 top-0 h-full w-full object-cover opacity-[0.1]'
          src={Bg.src}
          width={Bg.width}
          height={Bg.height}
          blurDataURL={Bg.blurDataURL}
          alt='background'
        />

        <div className='fixed left-0 top-0 z-[2] h-full w-full bg-gradient-to-b from-white to-transparent' />
      </form>
    </DialogFullScreen>
  );
};
