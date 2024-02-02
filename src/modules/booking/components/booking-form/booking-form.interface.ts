export type BookingFormValue = {
  name: string;
  lastName?: string;
  phone: string;
  email: string;
  comment: string;
};

export type BookingFormProps = {
  onSubmit: (data: BookingFormValue) => void;
  onClickBack: () => void;
  isLoading: boolean;
};
