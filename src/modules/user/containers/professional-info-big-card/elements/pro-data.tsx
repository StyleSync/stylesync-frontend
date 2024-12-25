import { useContext, type FC } from 'react';
import { useBoolean } from 'usehooks-ts';
import { useIntl } from 'react-intl';
// components
import { Icon } from '@/modules/core/components/icon';
import { Typography } from '@/modules/core/components/typogrpahy';
import { UserContactPopup } from '@/modules/user/components/user-contact-popup';
import { Button } from '@/modules/core/components/button';
// context
import { BookingContext } from '@/modules/booking/providers/booking-provider';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';

import type { ProDataProps } from '../professional-info-big-card.interface';

export const ProData: FC<ProDataProps> = ({ professional, session }) => {
  const intl = useIntl();
  // context
  const { book } = useContext(BookingContext);
  // queries
  const serviceOnProfessionalList =
    trpc.serviceOnProfessional.list.useInfiniteQuery(
      {
        professionalId: professional.id,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );
  // state
  const isContactOpen = useBoolean();

  return (
    <div className='z-10 flex w-full items-center justify-between bg-white px-6 py-5'>
      <div className='flex flex-col gap-y-3'>
        <div className='flex w-fit items-center gap-x-2 text-dark'>
          <Icon name='menu' className='h-4 w-4 !text-gray' />
          <Typography variant='body2' className='!text-inherit'>
            {serviceOnProfessionalList.data?.pages.length}{' '}
            {intl.formatMessage({ id: 'pro.data.services' })}
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
          {/* Todo: show quantity last bookings and icon */}
          {/* <Icon name='arrow-increase' className='h-4 w-4 !text-gray' />
          
          <Typography variant='body2' className='!text-inherit'>
            {intl.formatMessage({ id: 'pro.data.last.7.days' })}
          </Typography> */}
        </div>
      </div>
      {professional.userId !== session?.user?.id && (
        <div className='hidden items-center gap-x-4 sm:flex'>
          <UserContactPopup
            professional={professional}
            isOpen={isContactOpen.value}
            onClose={isContactOpen.setFalse}
            trigger={
              <Button
                variant='secondary'
                text={intl.formatMessage({ id: 'button.contact' })}
                onClick={isContactOpen.setTrue}
              />
            }
          />
          <Button
            variant='primary'
            onClick={() => {
              book();
            }}
            text={intl.formatMessage({
              id: 'button.book',
            })}
          />
        </div>
      )}
    </div>
  );
};
