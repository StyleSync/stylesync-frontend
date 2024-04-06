import { type FC } from 'react';
// components
import { Avatar } from '@/modules/core/components/avatar';
import { Typography } from '@/modules/core/components/typogrpahy';
// utils
import { getFullName } from '@/modules/user/utils/user.utils';

import type { ProfessionalSearchCardProps } from './professional-search-card.interface';
import { useRouter } from 'next/navigation';
import { Icon } from '@/modules/core/components/icon';

export const ProfessionalSearchCard: FC<ProfessionalSearchCardProps> = ({
  professional,
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/app/profile/${professional.user.id}`)}
      className='shadow hover:shadow-accentShadow rounded-xl overflow-hidden flex flex-col justify-between bg-white gap-y-0 transition cursor-pointer'
    >
      <div className='gap-x-4 flex flex-col relative'>
        <Avatar
          url={professional.user.avatar}
          size={200}
          shape='rect'
          className='z-10 !rounded-none !border-none !w-full'
        />
        <div className='flex flex-col justify-center gap-y-6 z-10 px-4 pt-6'>
          <div className='flex items-center gap-x-2'>
            <Typography variant='body1' weight='medium'>
              {getFullName(professional.user)}
            </Typography>
            <div className='w-[14px] h-[14px] bg-dark rounded-full flex items-center justify-center'>
              <Icon name='check-mark' color='#fff' />
            </div>
          </div>
          <div className='flex flex-col gap-y-3'>
            <div className='flex w-fit items-center gap-x-2 text-dark'>
              <Icon name='location' className='w-4 h-4 !text-gray' />
              <Typography variant='body2' className='!text-inherit'>
                Ukraine, Kiev
              </Typography>
            </div>
            {/* todo: show this label if doesn't have bookings for last 7 days and the user has been registered less than 1 week ago  */}
            {/* <div className='flex w-fit items-center gap-x-2 text-green'> */}
            {/*   <Icon name='time' className='w-4 h-4' /> */}
            {/*   <Typography variant='body2' className='!text-inherit'> */}
            {/*     New on site */}
            {/*   </Typography> */}
            {/* </div> */}
            <div className='flex w-fit items-center gap-x-2 text-dark'>
              <Icon name='beauty-service' className='w-4 h-4 !text-gray' />
              <Typography variant='body2' className='!text-inherit'>
                Makeup, hair, nails
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
