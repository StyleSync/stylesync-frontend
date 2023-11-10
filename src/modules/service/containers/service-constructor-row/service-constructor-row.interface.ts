import type {
  ServiceOnProfessional,
  ServiceOnProfessionalEditableFields,
} from '@/modules/service/types/service.types';
import type { Currency } from '@prisma/client';

export type ServiceConstructorRowFormValues = {
  title: string;
  duration: string;
  price: {
    value: string;
    currency: Currency;
  };
};

export type ServiceConstructorRowProps = {
  data: ServiceOnProfessional;
  onChange: (data: ServiceOnProfessionalEditableFields) => void;
  onDelete: (serviceOnProfessionalId: string) => void;
};
