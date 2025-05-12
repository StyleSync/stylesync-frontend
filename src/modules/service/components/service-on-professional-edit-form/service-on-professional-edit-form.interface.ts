import type { Currency } from '@prisma/client';

import type { ServiceOnProfessional } from '@/modules/service/types/service.types';

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
