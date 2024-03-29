import type { FC } from 'react';
import type { Session } from 'next-auth';
import type { Prisma } from '@prisma/client';
import { useBoolean } from 'usehooks-ts';
// components
import { Icon } from '@/modules/core/components/icon';
import { Typography } from '@/modules/core/components/typogrpahy';
import { UserContactPopup } from '@/modules/user/components/user-contact-popup';
import { Button } from '@/modules/core/components/button';
// containers
import { CreateBooking } from '@/modules/booking/containers/create-booking-container';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';

type ProDataProps = {
  professional: Prisma.ProfessionalGetPayload<{
    include: { user: true };
  }>;
  session: Session | null;
};

export const ProData: FC<ProDataProps> = ({ professional, session }) => {
  // queries
  const [serviceOnProfessionalList] =
    trpc.serviceOnProfessional.list.useSuspenseQuery({
      professionalId: professional.id,
    });
  // state
  const isContactOpen = useBoolean();

  return (
    <div className='flex items-center justify-between w-full bg-white py-5 px-6'>
      <div className='flex flex-col gap-y-3'>
        <div className='flex w-fit items-center gap-x-2 text-dark'>
          <Icon name='menu' className='w-4 h-4 !text-gray' />
          <Typography variant='body2' className='!text-inherit'>
            {serviceOnProfessionalList.length} services provided
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
          <Icon name='arrow-increase' className='w-4 h-4 !text-gray' />
          <Typography variant='body2' className='!text-inherit'>
            14 services booked in the last 7 days
          </Typography>
        </div>
      </div>
      {professional.userId !== session?.user?.id && (
        <div className='hidden items-center gap-x-4 sm:flex'>
          <UserContactPopup
            isOpen={isContactOpen.value}
            onClose={isContactOpen.setFalse}
            trigger={
              <Button
                variant='secondary'
                text='Contact'
                onClick={isContactOpen.setTrue}
              />
            }
          />
          <CreateBooking />
        </div>
      )}
    </div>
  );
};
