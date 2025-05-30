import type { ReactNode } from 'react';

import type { DialogProps } from '@/modules/core/types/dialog.types';

export type PhotoUploadModalProps = DialogProps & {
  trigger?: ReactNode;
  portfolioId?: string;
  albumId?: string;
};

export type PhotoUploadModalHeaderProps = {
  state: PhotoUploadState;
  onBackClick: () => void;
  onNextClick: () => void;
  onSaveClick: () => void;
  isSaveLoading?: boolean;
};

export type PhotoUploadState =
  | {
      step: 'select';
    }
  | {
      step: 'crop';
      file: File;
      preview: string;
    }
  | {
      step: 'details';
      file: File;
      preview: string;
      editedPreview: string;
    }
  | {
      step: 'preview';
    };

export type PhotoUploadStep = PhotoUploadState['step'];
