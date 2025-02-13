import { type AboutProfessionalFormValues } from '@/modules/user/components/about-professional-form/about-professional-form.interface';
import type { UseFormSetError, UseFormClearErrors } from 'react-hook-form';

export type NickNameFieldProps = {
  value: string | undefined;
  label: string;
  error?: boolean | string;
  onChange: (value: string) => void;
  setError: UseFormSetError<AboutProfessionalFormValues>;
  clearErrors: UseFormClearErrors<AboutProfessionalFormValues>;
};
