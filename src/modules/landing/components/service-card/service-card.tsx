import { type FC } from 'react';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
// types
import type { ServiceCardProps } from './service-card.interface';
import Image from 'next/image';

export const ServiceCard: FC<ServiceCardProps> = ({ title, image }) => {
  return (
    <div className='relative z-10 flex aspect-[14/8] w-full items-center justify-center overflow-hidden rounded-[20px] shadow transition hover:z-10 hover:scale-105 hover:shadow-accentShadow'>
      <div className='relative z-40 flex items-center'>
        <Typography
          className='whitespace-nowrap !text-3xl !text-white'
          variant='subtitle'
          weight='semibold'
        >
          {title}
        </Typography>
      </div>
      <div className='absolute left-1 top-1 z-20 h-[calc(100%-0.5rem)] w-[calc(100%-0.5rem)] rounded-[16px] bg-gradient-to-t from-[#111111] from-15% to-transparent opacity-50' />
      <div className='absolute left-0 top-0 z-30 h-full w-full bg-gradient-to-r from-[#675050] from-15% to-transparent opacity-50' />
      {image && (
        <Image
          className='absolute left-1 top-1 z-10 h-[calc(100%-0.5rem)] w-[calc(100%-0.5rem)] rounded-[16px] object-cover'
          src={image}
          alt='image'
          width={600}
          height={540}
        />
      )}
    </div>
  );
};
