import { type ReactNode } from 'react';

import type { DialogProps as BaseDialogProps } from '@/modules/core/types/dialog.types';
import type { ChildrenProp } from '@/modules/core/types/react.types';

export type DialogProps = ChildrenProp &
  BaseDialogProps & {
    isCloseButtonVisible?: boolean;
    trigger?: ReactNode;
    classes?: {
      overlay?: string;
      content?: string;
    };
  };
