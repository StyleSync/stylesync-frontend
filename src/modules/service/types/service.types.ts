import type { Service, Currency } from '@prisma/client';

export type SupportedServiceKey = string;

export type ServiceOnProfessional = {
  id: string;
  title: string;
  duration: number;
  price: number;
  currency: Currency;
  service: Service;
};

export type ServiceOnProfessionalGroup = {
  service: Service;
  serviceOnProfessionalList: ServiceOnProfessional[];
};

export type ServiceOnProfessionalEditableFields = Pick<
  ServiceOnProfessional,
  'title' | 'duration' | 'price' | 'currency'
>;
