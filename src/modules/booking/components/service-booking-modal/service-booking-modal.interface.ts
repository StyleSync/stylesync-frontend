// import { DialogProps } from '@radix-ui/react-dialog';
import { type ReactNode } from 'react';

export type ServiceBookingModalProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  trigger: ReactNode;
  onClickNext?: () => void;
  onClickBack?: () => void;
};
