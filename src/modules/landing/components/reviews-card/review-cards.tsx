import { type FC } from 'react';
import Image from 'next/image';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
// types
import type { ReviewCardProps } from './review-cards.interface';
import img from '@/assets/images/girl.png';

export const ReviewCard: FC<ReviewCardProps> = ({ text, name, occupation }) => {
  return (
    <div className='p-4 border-2 rounded-[12px] border-[#F9F9F9] flex flex-col items-center xl:flex-row gap-6 '>
      <div>
        <Image
          className=' rounded-lg'
          src={img}
          alt='img'
          width={164}
          height={194}
        />
      </div>

      <div className='w-full'>
        <Typography className='!text-[#1F2026] ' variant='body1'>
          {text}
        </Typography>
        <div className='mt-7 flex gap-x-4 justify-center xl:justify-start'>
          <div className='flex overflow-hidden flex-shrink-0 rounded-[50%] w-9 h-9'>
            <Image
              className='w-full h-full object-cover shrink-0'
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
