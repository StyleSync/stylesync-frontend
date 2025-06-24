import type { FC } from 'react';

export type ProOnboardStepProps = {
  next: () => void;
  back: () => void;
  active: string;
};

export type ProOnboardData<Value extends string> = Record<
  Value,
  {
    value: string;
    title: string;
    description: string;
    Step: FC<ProOnboardStepProps>;
    allowSkip?: boolean;
  }
>;
