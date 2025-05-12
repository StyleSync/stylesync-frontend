import type { UseFormClearErrors, UseFormSetError } from 'react-hook-form';

import { type AboutProfessionalFormValues } from '@/modules/user/components/about-professional-form/about-professional-form.interface';

export type NickNameFieldProps = {
  value: string | undefined;
  label: string;
  error?: boolean | string;
  onChange: (value: string) => void;
  setError: UseFormSetError<AboutProfessionalFormValues>;
  clearErrors: UseFormClearErrors<AboutProfessionalFormValues>;
};
