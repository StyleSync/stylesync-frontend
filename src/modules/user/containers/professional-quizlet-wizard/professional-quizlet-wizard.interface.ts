import type { FC } from 'react';

export type ProfessionalQuizletWizardStepProps = {
  next: () => void;
  back: () => void;
};

export type ProfessionalQuizletWizardData<Value extends string> = Record<
  Value,
  {
    value: string;
    title: string;
    description: string;
    Step: FC<ProfessionalQuizletWizardStepProps>;
  }
>;
