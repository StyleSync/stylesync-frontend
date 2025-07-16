import type { DialogProps } from '@/modules/core/types/dialog.types';

export type EditClientInfoModalProps = DialogProps & {
  clientId: string | null;
  initialValues?: Partial<EditClientInfoModalValues>;
};

export type EditClientInfoModalValues = {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  notes?: string;
  image?: string | File | null;
};
