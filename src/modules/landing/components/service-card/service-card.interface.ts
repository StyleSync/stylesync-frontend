import { type StaticImageData } from 'next/image';

export type ServiceCardProps = {
  title: string;
  services: string[];
  image: StaticImageData;
};
