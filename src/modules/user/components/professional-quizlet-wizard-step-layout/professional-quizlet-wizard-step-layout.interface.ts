import type { ChildrenProp } from '@/modules/core/types/react.types';
import type { ButtonProps } from '@/modules/core/components/button/button.interface';

export type ProfessionalQuizletWizardStepLayoutProps = ChildrenProp & {
  meta: {
    title: string;
    description: string;
  };
  nextButtonProps?: Partial<ButtonProps>;
  prevButtonProps?: Partial<ButtonProps>;
};