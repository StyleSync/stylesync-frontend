'use client';
import { useParams } from 'next/navigation';
import { getHours, getMinutes, isAfter } from 'date-fns';
import { useIntl } from 'react-intl';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { BookingPreviewDetailBox } from '@/modules/booking/components/booking-preview-detail-box/booking-preview-detail-box';
import { Button } from '@/modules/core/components/button';
import { Spinner } from '@/modules/core/components/spinner';
import { UserContactPopup } from '@/modules/user/components/user-contact-popup';
import { AddGoogleCalendarEventBtn } from '@/modules/booking/components/add-google-calendar-event';
import { BookingPreviewProgressbar } from '@/modules/booking/components/booking-preview-progressbar';
import { BookingPreviewMap } from '@/modules/booking/components/booking-preview-map';
import { BookingStatus } from '@/modules/booking/components/booking-status';
// hooks
import { useBoolean } from 'usehooks-ts';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
import { formatDuration } from '@/modules/core/utils/time.utils';
import { onQueryRetry } from '@/modules/core/utils/query-retry.utils';
import { getAddressGoogleLink } from '@/modules/location/utils/address.utils';
import { formatDateIntl } from '@/modules/core/utils/date.utils';
// style
import 'react-circular-progressbar/dist/styles.css';

const MILLISECONDS_IN_MINUTE = 60000;
const now = new Date();

export const BookingPreview = () => {
  const params = useParams();
  const code = params.code;
  const isContactOpen = useBoolean();
  const intl = useIntl();

  // queries
  const bookingDetails = trpc.booking.getByCode.useQuery({
    code: Array.isArray(code) ? code[0] : code,
    expand: ['serviceProfessional'],
  });

  const isEventPast = bookingDetails?.data?.endTime
    ? isAfter(now, new Date(bookingDetails.data.endTime))
    : false;

  const professional = trpc.professional.get.useQuery(
    {
      // @ts-ignore
      id: bookingDetails.data?.serviceProfessional?.professional?.userId || '',
      expand: ['user'],
    },
    {
      // @ts-ignore
      enabled: !!bookingDetails.data?.serviceProfessional?.professional?.userId,
    }
  );

  const { data: location } = trpc.location.getByProfessionalId.useQuery(
    {
      // @ts-ignore
      id: bookingDetails.data?.serviceProfessional?.professional?.id || '',
    },
    {
      retry: (retryCount, error) => onQueryRetry(retryCount, error),
      // @ts-ignore
      enabled: !!bookingDetails.data?.serviceProfessional?.professional?.id,
    }
  );

  const startEventTime = bookingDetails.data?.startTime
    ? new Date(bookingDetails.data?.startTime).getTime() -
      new Date().getTimezoneOffset() * MILLISECONDS_IN_MINUTE
    : new Date().getTime();

  // map
  const zoomNum = 17;
  const markers = location && [
    { lat: location.latitude, lng: location.longitude },
  ];
  const center = location && {
    lat: location.latitude,
    lng: location.longitude,
  };
  const zoom = location && zoomNum;

  if (bookingDetails.isLoading) {
    return (
      <div className='mx-auto mt-[190px]'>
        <Spinner size='large' />
      </div>
    );
  }

  return (
    <main className='mx-auto mb-20 mt-8 flex w-full max-w-[950px] flex-1 flex-col px-6 md:mt-20'>
      <div className='mt-12 flex w-full'>
        <div className='flex flex-1 flex-col'>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col gap-4'>
              <a
                target='_blank'
                href={`/app/profile/${professional.data?.userId}`}
                rel='noreferrer'
              >
                <BookingPreviewDetailBox
                  label={intl.formatMessage({ id: 'specialist' })}
                  value={`${professional.data?.user?.firstName} ${professional.data?.user?.lastName}`}
                  avatar={professional.data?.user?.avatar || ''}
                />
              </a>
              <div className='flex flex-col gap-3'>
                <BookingPreviewDetailBox
                  label={intl.formatMessage({ id: 'service.title' })}
                  value={bookingDetails.data?.serviceProfessional?.title || ''}
                />
              </div>
            </div>
            {bookingDetails.data && (
              <BookingPreviewProgressbar
                createdAt={bookingDetails.data?.createdAt}
                startTime={bookingDetails.data?.startTime}
              />
            )}
          </div>

          <div className='flex flex-col gap-3 md:mt-[-14px]'>
            <BookingPreviewDetailBox
              label={intl.formatMessage({ id: 'service.price' })}
              value={`${bookingDetails.data?.serviceProfessional?.price} ${bookingDetails.data?.serviceProfessional?.currency}`}
            />
          </div>
          <div className='flex gap-6'>
            <div className='mt-3 flex flex-col gap-3'>
              <BookingPreviewDetailBox
                label={intl.formatMessage({ id: 'service.start.time' })}
                value={
                  bookingDetails?.data
                    ? formatDateIntl(
                        new Date(bookingDetails?.data?.startTime || ''),
                        intl
                      )
                    : ''
                }
              />
            </div>
            <div className='mt-3 flex flex-col gap-3'>
              <BookingPreviewDetailBox
                label={intl.formatMessage({ id: 'service.duration' })}
                value={
                  bookingDetails.data?.serviceProfessional.duration !==
                  undefined
                    ? formatDuration(
                        bookingDetails.data?.serviceProfessional.duration,
                        intl
                      )
                    : ''
                }
              />
            </div>
          </div>
          <div className='mt-3 flex flex-col gap-3'>
            <Typography weight='medium' variant='body2' className='!text-gray'>
              {intl.formatMessage({ id: 'service.status' })}
            </Typography>
            {bookingDetails.data?.status && (
              <BookingStatus status={bookingDetails.data?.status} />
            )}
          </div>
        </div>
      </div>
      <div className='mt-8 flex gap-4'>
        <UserContactPopup
          // @ts-ignore
          professional={professional.data}
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

        {!isEventPast && (
          <AddGoogleCalendarEventBtn
            startEventTime={startEventTime}
            title={bookingDetails.data?.serviceProfessional.title || ''}
            duration={{
              hours: bookingDetails.data?.serviceProfessional.duration
                ? getHours(bookingDetails.data?.serviceProfessional.duration)
                : 0,
              minutes: bookingDetails.data?.serviceProfessional.duration
                ? getMinutes(bookingDetails.data?.serviceProfessional.duration)
                : 0,
            }}
            location={location?.name || ''}
          />
        )}
      </div>
      <div className='mt-8 flex h-[400px] w-full flex-col gap-5'>
        <div className='flex gap-5'>
          <Typography variant='small' className='!text-gray'>
            {location?.name}
          </Typography>
        </div>
        <BookingPreviewMap markers={markers} zoom={zoom} center={center} />
      </div>
      <Button
        onClick={() => {
          const link = getAddressGoogleLink({
            latitude: String(location?.latitude),
            longitude: String(location?.longitude),
          });

          if (link !== null) {
            window.open(link, '__blank');
          }
        }}
        className='mt-12'
        variant='outlined'
        text={intl.formatMessage({ id: 'button.google.map' })}
      />
    </main>
  );
};
