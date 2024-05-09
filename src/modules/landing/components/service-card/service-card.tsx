import { type FC } from 'react';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
// types
import type { ServiceCardProps } from './service-card.interface';

export const ServiceCard: FC<ServiceCardProps> = ({ title, services }) => {
  return (
    <div className=' pl-9 pt-9 pb-14 pr-20  bg-slate-600 rounded-[20px] border-8'>
      <Typography
        className=' !text-white !text-3xl whitespace-nowrap'
        variant='subtitle'
        weight='semibold'
      >
        {title}
      </Typography>
      <div className=' pt-9 flex flex-col gap-y-6'>
        {services.map((service, index) => (
          <Typography key={index} variant='body1' className='!text-white'>
            {service}
          </Typography>
        ))}
      </div>
    </div>
  );
};
