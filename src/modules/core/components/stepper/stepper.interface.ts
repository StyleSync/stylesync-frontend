import type { TypographyProps } from '@/modules/core/components/typogrpahy/typography.interface';

type StepperStep = {
  value: string;
  text: string;
};

export type StepperProps = {
  value: string;
  steps: StepperStep[];
  vertical?: boolean;
  typographyProps?: TypographyProps;
  classes?: {
    root?: string;
    step?: string;
    line?: string;
    stepText?: string;
  };
};
