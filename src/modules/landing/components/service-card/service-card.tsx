import { type FC } from 'react';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
// types
import type { ServiceCardProps } from './service-card.interface';
import Image from 'next/image';

export const ServiceCard: FC<ServiceCardProps> = ({
  title,
  services,
  image,
}) => {
  return (
    <div className='relative bg-slate-600 rounded-[20px] border-8 z-10 overflow-hidden'>
      <div className=' bg-service-card absolute top-0 left-0 w-full h-full z-20' />
      <Image
        className=' absolute left-0 top-0 object-cover w-full h-full z-10'
        src={image}
        alt='image'
        width={600}
        height={540}
      />
      <div className=' relative pl-9 pt-9 pb-14 pr-20 z-30'>
        <Typography
          className='!text-white !text-3xl whitespace-nowrap'
          variant='subtitle'
          weight='semibold'
        >
          {title}
        </Typography>
        <div className='pt-9 flex flex-col gap-y-6'>
          {services.map((service, index) => (
            <Typography key={index} variant='body1' className='!text-white'>
              {service}
            </Typography>
          ))}
        </div>
      </div>
    </div>
  );
};
