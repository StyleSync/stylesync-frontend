import { type DialogProps } from '@/modules/core/components/dialog/dialog.interface';

export type ModalProfileLinksProps = Omit<DialogProps, 'children'> & {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};
