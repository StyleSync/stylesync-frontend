import type {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react';
import type { SupportedFonts } from '@/styles/styles.types';

type Variant = 'input' | 'textarea';

type TextFieldGeneralProps = {
  label?: string;
  error?: boolean;
  classes?: {
    container?: string;
    label?: string;
    fieldset?: string;
  };
  font?: SupportedFonts;
  endAdornment?: ReactNode;
};

export type InputProps = {
  variant: 'input';
  fieldSize?: 'small' | 'medium';
} & TextFieldGeneralProps &
  InputHTMLAttributes<HTMLInputElement>;

type TextAreaProps = {
  variant: 'textarea';
} & TextFieldGeneralProps &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

export type TextFieldProps = InputProps | TextAreaProps;

export function isInputProps(
  variant: Variant,
  props: Omit<TextFieldProps, 'variant'>
): props is InputProps {
  return variant === 'input';
}

export function isTextAreaProps(
  variant: Variant,
  props: Omit<TextFieldProps, 'variant'>
): props is TextAreaProps {
  return variant === 'textarea';
}
