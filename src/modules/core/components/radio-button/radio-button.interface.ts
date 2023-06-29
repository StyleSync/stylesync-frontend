import type { ChildrenProp } from '@/modules/core/types/react.types';

export type RadioButtonProps = {
  value: string;
};

export type RadioGroupProps = ChildrenProp & {
  name: string;
  value: null | string;
  onChange: (value: string) => void;
};

export type RadioGroupContextValue = {
  activeValue: null | string;
  name: string;
  onChange: (value: string) => void;
};
