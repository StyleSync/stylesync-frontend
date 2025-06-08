import { type FC } from 'react';

import Image from 'next/image';

import img from '@/assets/images/girl.png';
import { Typography } from '@/modules/core/components/typogrpahy';

import type { ReviewCardProps } from './review-cards.interface';

export const ReviewCard: FC<ReviewCardProps> = ({ text, name, occupation }) => {
  return (
    <div className='my-4 flex flex-col items-center gap-6 rounded-2xl border-2 border-gray-light p-4 shadow xl:flex-row'>
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
          <div className='flex flex-col'>
            <Typography weight='semibold' variant='body1'>
              {name}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
