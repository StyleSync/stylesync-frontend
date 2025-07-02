import type { ReactNode } from 'react';

import type { DialogProps } from '@/modules/core/types/dialog.types';

export type AddClientModalProps = DialogProps & {
  trigger?: ReactNode;
};
