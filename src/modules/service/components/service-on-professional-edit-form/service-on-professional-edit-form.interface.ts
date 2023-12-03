import type {
  ServiceOnProfessional,
  ServiceOnProfessionalEditableFields,
} from '@/modules/service/types/service.types';
import type { Currency } from '@prisma/client';

export type ServiceOnProfessionalEditFormProps = {
  isActive: boolean;
  data: ServiceOnProfessional;
  onSubmit: (values: ServiceOnProfessionalEditableFields) => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
};

export type ServiceOnProfessionalFormValues = {
  title: string;
  duration: string;
  price: {
    value: string;
    currency: Currency;
  };
};
