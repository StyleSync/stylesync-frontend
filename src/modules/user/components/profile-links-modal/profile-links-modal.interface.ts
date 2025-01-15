import { type DialogProps } from '@/modules/core/components/dialog/dialog.interface';

export type ProfileModalLinksProps = Omit<DialogProps, 'children'> & {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};
