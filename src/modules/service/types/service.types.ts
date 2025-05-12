import type { Currency, Prisma, Service } from '@prisma/client';

export type ServiceOnProfessional = {
  id: string;
  title: string;
  duration: number;
  price: number;
  currency: Currency;
  service: Service;
  description: string | null;
};

export type ServiceOnProfessionalList = Omit<
  Prisma.ServiceOnProfessionalGetPayload<{
    include: { service: true };
  }>,
  'professionalId' | 'serviceId' | 'createdAt' | 'updatedAt' | 'deletedAt'
>[];

export type ServiceOnProfessionalListItem = ServiceOnProfessionalList[number];

export type ServiceOnProfessionalGroup = {
  service: Service;
  serviceOnProfessionalList: ServiceOnProfessional[];
};

export type ServiceOnProfessionalEditableFields = Pick<
  ServiceOnProfessionalListItem,
  'title' | 'duration' | 'price' | 'currency' | 'description'
>;
