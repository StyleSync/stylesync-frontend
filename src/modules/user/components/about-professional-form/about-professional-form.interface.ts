export type AboutProfessionalFormProps = {
  formId?: string;
  onSubmit?: (
    data: AboutProfessionalFormValues & { avatar?: File | string | null }
  ) => void;
  initialValues?: Partial<AboutProfessionalFormValues & { avatar: string }>;
  phoneApiError: string | null;
};

export type AboutProfessionalFormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  facebook?: string;
  instagram?: string;
  about?: string;
};
