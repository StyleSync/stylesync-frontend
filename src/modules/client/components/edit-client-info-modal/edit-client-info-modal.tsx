import { type FC } from 'react';

import { AvatarSelect } from '@/modules/core/components/avatar-select';
import { Button } from '@/modules/core/components/button';
import { DialogFullScreen } from '@/modules/core/components/dialog-full-screen';
import { TextField } from '@/modules/core/components/text-field';

import { type EditClientInfoModalProps } from './edit-client-info-modal.interface';

export const EditClientInfoModal: FC<EditClientInfoModalProps> = ({
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

        <div className='mt-7 flex flex-1 flex-col items-center gap-7'>
          <AvatarSelect className='flex flex-col' />
          <TextField variant='input' label='Імя' />
          <TextField variant='input' label='Призвіще' />
          <TextField className='!w-full' label='Телефон' variant='input' />
          <TextField variant='input' label='Email' />
          <TextField
            showCharacterCount
            maxCharacterCount={1000}
            variant='textarea'
            label='Інформація'
            style={{ height: 200, resize: 'none' }}
          />
        </div>

        <div className='mt-auto'>
          <Button className='!mt-auto !w-full' text='Зберегти' />
        </div>
      </form>
    </DialogFullScreen>
  );
};
