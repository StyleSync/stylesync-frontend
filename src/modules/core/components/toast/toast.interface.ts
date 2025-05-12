export type ToastVariant = 'info' | 'success' | 'error';

export type ToastProps = {
  isOpen: boolean;
  onClose: () => void;
  variant: ToastVariant;
  title: string;
  description?: string;
};
