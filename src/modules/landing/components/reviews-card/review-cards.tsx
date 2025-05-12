import { type FC } from 'react';

import Image from 'next/image';

import img from '@/assets/images/girl.png';
import { Typography } from '@/modules/core/components/typogrpahy';

import type { ReviewCardProps } from './review-cards.interface';

export const ReviewCard: FC<ReviewCardProps> = ({ text, name, occupation }) => {
  return (
    <div className='flex flex-col items-center gap-6 rounded-[12px] border-2 border-[#F9F9F9] p-4 xl:flex-row'>
      <div>
        <Image
          className='rounded-lg'
          src={img}
          alt='img'
          width={164}
          height={194}
        />
      </div>

      <div className='w-full'>
        <Typography className='!text-[#1F2026]' variant='body1'>
          {text}
        </Typography>
        <div className='mt-7 flex justify-center gap-x-4 xl:justify-start'>
          <div className='flex h-9 w-9 flex-shrink-0 overflow-hidden rounded-[50%]'>
            <Image
              className='h-full w-full shrink-0 object-cover'
              src={img}
              width={44}
              height={44}
              alt='img'
            />
          </div>
          <div className='flex flex-col'>
            <Typography
              className='!text-[#767A85]'
              weight='semibold'
              variant='body1'
            >
              {name}
            </Typography>
            <Typography
              className='!text-[#767a85]'
              weight='semibold'
              variant='body1'
            >
              {occupation}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
