import { type FC } from 'react';

import { DialogFullScreen } from '@/modules/core/components/dialog-full-screen';

import { type CreateBookingModalProps } from './create-booking-modal.inerface';

export const CreateBookingModal: FC<CreateBookingModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  return (
    <DialogFullScreen isOpen={isOpen} onOpenChange={onOpenChange}>
      <div>CreateBookingModal</div>
    </DialogFullScreen>
  );
};
