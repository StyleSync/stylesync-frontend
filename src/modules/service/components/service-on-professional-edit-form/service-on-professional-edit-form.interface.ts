import type { ServiceOnProfessional } from '@/modules/service/types/service.types';
import type { Currency } from '@prisma/client';

export type ServiceOnProfessionalEditFormProps = {
  isActive: boolean;
  data: ServiceOnProfessional;
  onOpenChange: (isOpen: boolean) => void;
};

export type ServiceOnProfessionalFormValues = {
  title: string;
  duration: string;
  price: {
    value: string;
    currency: Currency;
  };
  description: string;
};
