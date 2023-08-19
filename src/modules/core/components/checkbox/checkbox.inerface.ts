export type CheckboxProps = {
  value: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
  classes?: {
    root?: string;
    checkmark?: string;
  };
  error?: boolean;
};
