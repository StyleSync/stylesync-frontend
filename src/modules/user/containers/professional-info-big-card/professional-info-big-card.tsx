'use client';
import { type FC, Suspense } from 'react';

import Image from 'next/image';

import Bg from '@/assets/images/bg-1.png';
import { trpc } from '@/modules/core/utils/trpc.utils';

import { ProData } from './elements/pro-data';
import { ProDataSkeleton } from './elements/pro-data-skeleton';
import { UserData } from './elements/user-data';
import type { ProfileInfoBigCardProps } from './professional-info-big-card.interface';

export const ProfessionalInfoBigCard: FC<ProfileInfoBigCardProps> = ({
  userId,
  session,
}) => {
  const [professional] = trpc.professional.get.useSuspenseQuery({
    id: userId,
    expand: ['user'],
  });

  return (
    <div className='relative mt-6'>
      <div className='relative z-[2] flex h-fit w-full flex-col rounded-lg bg-white shadow'>
        <UserData professional={professional} />
        <Suspense fallback={<ProDataSkeleton />}>
          <ProData professional={professional} session={session} />
        </Suspense>
      </div>
      <Image
        className='absolute bottom-[80px] left-1/2 z-[1] h-[500px] w-[1000px] min-w-[1000px] -translate-x-1/2 md:w-[2000px] md:min-w-[2000px]'
        src={Bg.src}
        width={Bg.width}
        height={Bg.height}
        blurDataURL={Bg.blurDataURL}
        alt='background'
      />
    </div>
  );
};
