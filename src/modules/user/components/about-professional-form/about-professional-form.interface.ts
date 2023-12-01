export type AboutProfessionalFormProps = {
  formId?: string;
  onSubmit?: (
    data: AboutProfessionalFormValues & { avatar: File | null }
  ) => void;
  initialValues?: Partial<AboutProfessionalFormValues>;
};

export type AboutProfessionalFormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  facebook: string;
  instagram: string;
  about: string;
};
