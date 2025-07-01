import { type FC, useContext } from 'react';

import { useIntl } from 'react-intl';
import { useBoolean } from 'usehooks-ts';

import { BookingContext } from '@/modules/booking/providers/booking-provider';
import { Button } from '@/modules/core/components/button';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { UserContactPopup } from '@/modules/user/components/user-contact-popup';
import type { ProDataProps } from '@/modules/user/containers/professional-info-big-card/professional-info-big-card.interface';

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

  if (professional.userId !== session?.user?.id) {
    return (
      <div className='mt-4 hidden w-full items-center justify-center gap-x-4 px-4 pb-4 sm:flex'>
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
    );
  }

  return null;
};
