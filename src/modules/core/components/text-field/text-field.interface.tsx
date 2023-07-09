import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { StylingProps, SupportedFonts } from '@/styles/styles.types';

type Variant = 'input' | 'textarea';

export type InputProps = StylingProps &
  InputHTMLAttributes<HTMLInputElement> & {
    variant: 'input';
    label?: string;
    error?: boolean;
    containerClassName?: string;
    labelClassName?: string;
    font?: SupportedFonts;
  };

export type TextAreaProps = StylingProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    variant: 'textarea';
    label?: string;
    error?: boolean;
    containerClassName?: string;
    labelClassName?: string;
    font?: SupportedFonts;
  };

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
