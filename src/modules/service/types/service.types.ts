import type { Currency } from '@/modules/core/types/currency.types';

export type SupportedServiceKey = 'makeup' | 'hair' | 'nails';

export type ServiceData = {
  id: string;
  serviceKey: SupportedServiceKey;
  title: string;
  duration: string;
  price: {
    value: string;
    currency: Currency;
  };
};

export type ServiceGroup = Partial<
  Record<SupportedServiceKey, { services: ServiceData[] }>
>;
