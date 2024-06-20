import type { DialogProps } from '@/modules/core/components/dialog/dialog.interface';
import type { ButtonProps } from '@/modules/core/components/button/button.interface';

export type DialogWizardStep = {
  id: string;
  title?: string;
  isBack?: boolean;
  isNext?: boolean;
  nextBtnProps?: ButtonProps;
};

export type DialogWizardProps = DialogProps & {
  activeStepId: string;
  steps: DialogWizardStep[];
  onBack?: (id: string) => void;
  onNext?: (id: string) => void;
  isNextLoading?: boolean;
};
