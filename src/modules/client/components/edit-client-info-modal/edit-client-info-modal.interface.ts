import type { DialogProps } from '@/modules/core/types/dialog.types';

export type EditClientInfoModalProps = DialogProps & {
  initialValues?: Partial<EditClientInfoModalValues>;
  onSubmit?: (
    data: EditClientInfoModalValues & { image?: File | string | null },
    onError: (error: any) => void
  ) => Promise<void>;
};

export type EditClientInfoModalValues = {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  notes?: string;
  image?: string | File | null;
};
