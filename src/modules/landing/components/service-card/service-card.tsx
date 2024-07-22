import { type FC } from 'react';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
// types
import type { ServiceCardProps } from './service-card.interface';
import Image from 'next/image';

export const ServiceCard: FC<ServiceCardProps> = ({ title, image }) => {
  return (
    <div className='relative rounded-[20px] z-10 overflow-hidden h-[200px] shadow hover:shadow-accentShadow flex items-center justify-center hover:scale-105 transition hover:z-10'>
      <div className='relative z-40 flex items-center'>
        <Typography
          className='!text-white !text-3xl whitespace-nowrap'
          variant='subtitle'
          weight='semibold'
        >
          {title}
        </Typography>
      </div>
      <div className='absolute top-1 opacity-50 left-1 w-[calc(100%-0.5rem)] h-[calc(100%-0.5rem)] bg-gradient-to-t z-20 from-[#111111] from-15% to-transparent rounded-[16px]' />
      <div className='absolute top-0 left-0 opacity-50 w-full h-full bg-gradient-to-r z-30 from-[#675050] from-15% to-transparent' />
      {image && (
        <Image
          className='absolute left-1 top-1 object-cover w-[calc(100%-0.5rem)] h-[calc(100%-0.5rem)] z-10 rounded-[16px]'
          src={image}
          alt='image'
          width={600}
          height={540}
        />
      )}
    </div>
  );
};
