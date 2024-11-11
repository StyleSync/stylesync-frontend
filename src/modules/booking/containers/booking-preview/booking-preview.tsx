'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import getDistance from 'geolib/es/getDistance';
import { getHours, getMinutes, format } from 'date-fns';
import { useIntl } from 'react-intl';

// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { BookingPreviewDetailBox } from '@/modules/booking/components/booking-preview-detail-box/booking-preview-detail-box';
import { Button } from '@/modules/core/components/button';
import { Spinner } from '@/modules/core/components/spinner';
import { UserContactPopup } from '@/modules/user/components/user-contact-popup';
import { DownloadIcsButton } from '@/modules/booking/components/download-ics-button';
import { BookingPreviewProgressbar } from '@/modules/booking/components/booking-preview-progressbar';
import { BookingPreviewMap } from '@/modules/booking/components/booking-preview-map';
// hooks
import { useBoolean } from 'usehooks-ts';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
import { formatDuration } from '@/modules/core/utils/time.utils';
import { onQueryRetry } from '@/modules/core/utils/query-retry.utils';
import { getAddressGoogleLink } from '@/modules/location/utils/address.utils';
// style
import 'react-circular-progressbar/dist/styles.css';

const MILLISECONDS_IN_MINUTE = 60000;

export const BookingPreview = () => {
  const params = useParams();
  const code = params.code;
  const isContactOpen = useBoolean();
  const intl = useIntl();

  // state
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // user location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        setUserLocation({ latitude, longitude });
      });
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  // queries
  const bookingDetails = trpc.booking.getByCode.useQuery({
    code: Array.isArray(code) ? code[0] : code,
    expand: ['serviceProfessional'],
  });

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
    <main className='mx-auto mb-20 mt-28 flex w-full max-w-[950px] flex-1 flex-col px-[15px]'>
      <Typography className='mx-auto text-center !text-[24px]'>
        {intl.formatMessage({ id: 'booking.number' })}№ 20
      </Typography>
      <div className='mt-12 flex w-full'>
        <div className='flex flex-1 flex-col gap-4'>
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

          <div className='flex flex-col gap-3'>
            <BookingPreviewDetailBox
              label={intl.formatMessage({ id: 'service.price' })}
              value={`${bookingDetails.data?.serviceProfessional?.price} ${bookingDetails.data?.serviceProfessional?.currency}`}
            />
          </div>
          <div className='flex gap-6'>
            <div className='flex flex-col gap-3'>
              <BookingPreviewDetailBox
                label={intl.formatMessage({ id: 'service.start.time' })}
                value={
                  bookingDetails?.data
                    ? format(
                        new Date(bookingDetails?.data?.startTime || ''),
                        "EEEE', 'd MMM yyyy', 'HH:mm"
                      ).toLowerCase()
                    : ''
                }
              />
            </div>
            <div className='flex flex-col gap-3'>
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
        </div>

        {bookingDetails.data && (
          <BookingPreviewProgressbar
            createdAt={bookingDetails.data?.createdAt}
            startTime={bookingDetails.data?.startTime}
          />
        )}
      </div>
      <div className='mt-12 flex gap-4'>
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
        <DownloadIcsButton
          startEventTime={startEventTime}
          duration={{
            hours: bookingDetails.data?.serviceProfessional.duration
              ? getHours(bookingDetails.data?.serviceProfessional.duration)
              : 0,
            minutes: bookingDetails.data?.serviceProfessional.duration
              ? getMinutes(bookingDetails.data?.serviceProfessional.duration)
              : 0,
          }}
          title={bookingDetails.data?.serviceProfessional.title || ''}
          location={location?.name || ''}
          organizer={{
            name: professional.data?.user.firstName || '',
            email: professional.data?.user?.email || '',
          }}
          attendee={{
            name: `${bookingDetails.data?.guestFirstName} ${bookingDetails.data?.guestLastName}`,
            email: bookingDetails.data?.guestEmail || '',
          }}
        />
      </div>
      <div className='mt-12 flex h-[400px] w-full flex-col gap-5'>
        <div className='flex gap-5'>
          <Typography variant='small' className='!text-gray'>
            {location?.name}
          </Typography>
          <Typography variant='small' className='!text-gray'>
            {userLocation &&
              Array.isArray(markers) &&
              markers.length > 0 &&
              getDistance(userLocation, markers[0])}{' '}
            м
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
