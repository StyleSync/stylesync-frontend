'use client';
import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useParams } from 'next/navigation';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';
import getDistance from 'geolib/es/getDistance';
import { useBoolean } from 'usehooks-ts';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { BookingDetailBox } from '@/modules/booking/components/booking-preview-detail-box/booking-preview-detail-box';
import { Button } from '@/modules/core/components/button';
import { Spinner } from '@/modules/core/components/spinner';
import { UserContactPopup } from '@/modules/user/components/user-contact-popup';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
import { formatDuration } from '@/modules/core/utils/time.utils';
import { onQueryRetry } from '@/modules/core/utils/query-retry.utils';
import { getAddressGoogleLink } from '@/modules/location/utils/address.utils';
// style
import 'react-circular-progressbar/dist/styles.css';

const Map = dynamic(
  () => import('@/modules/location/components/map').then((res) => res.Map),
  {
    ssr: false,
  }
);

const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

export const BookingPreview = () => {
  const params = useParams();
  const code = params.code;
  const isContactOpen = useBoolean();

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
    code,
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

  // progress
  const createdAt = new Date(bookingDetails.data?.createdAt || '');
  const currentDate = new Date();
  const startDate = new Date(bookingDetails.data?.startTime || '');

  // Calculate the number of days remaining until the service date
  const daysRemaining = Math.ceil(
    (startDate.getTime() - currentDate.getTime()) /
      (MILLISECONDS_IN_SECOND *
        SECONDS_IN_MINUTE *
        MINUTES_IN_HOUR *
        HOURS_IN_DAY)
  );

  // Calculate the number of days that have passed since the reservation was created
  const daysWaited = Math.ceil(
    (currentDate.getTime() - createdAt.getTime()) /
      (MILLISECONDS_IN_SECOND *
        SECONDS_IN_MINUTE *
        MINUTES_IN_HOUR *
        HOURS_IN_DAY)
  );

  // Calculate the percentage of time passed
  const percents = (daysWaited * 100) / daysRemaining;

  if (bookingDetails.isLoading) {
    return (
      <div className='mt-[220px] mx-auto'>
        <Spinner size='large' />
      </div>
    );
  }

  return (
    <main className=' w-full max-w-[950px] flex flex-col flex-1 mx-auto px-[15px] mt-28 mb-20'>
      <Typography className='mx-auto !text-[24px] text-center'>
        Booking №{code}
      </Typography>
      <div className='flex w-full mt-12'>
        <div className='flex flex-col gap-4 flex-1'>
          <BookingDetailBox
            label='Specialist'
            value={`${professional.data?.user?.firstName} ${professional.data?.user?.lastName}`}
            avatar={professional.data?.user?.avatar || ''}
          />

          <div className='flex flex-col gap-3'>
            <BookingDetailBox
              label='Title'
              value={bookingDetails.data?.serviceProfessional?.title || ''}
            />
          </div>
          <div className='flex flex-col gap-3'>
            <BookingDetailBox
              label='Price'
              value={`${bookingDetails.data?.serviceProfessional?.price} ${bookingDetails.data?.serviceProfessional?.currency}`}
            />
          </div>
          <div className='flex gap-6'>
            <div className='flex flex-col gap-3'>
              <BookingDetailBox
                label='Start time'
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
              <BookingDetailBox
                label='Duration'
                value={
                  bookingDetails.data?.serviceProfessional.duration !==
                  undefined
                    ? formatDuration(
                        bookingDetails.data?.serviceProfessional.duration
                      )
                    : ''
                }
              />
            </div>
          </div>
        </div>
        <div
          style={{
            position: 'relative',
            width: '120px',
            height: '120px',
            marginTop: '66px',
            marginRight: '20px',
          }}
        >
          <CircularProgressbar
            strokeWidth={3}
            value={percents}
            styles={buildStyles({
              pathColor: '#64e841',
              trailColor: '#d8e6fc',
            })}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography>Залишилось</Typography>
            <Typography weight='semibold'>{`${daysRemaining} д.`}</Typography>
          </div>
        </div>
      </div>
      <div className='flex gap-4 mt-12'>
        <UserContactPopup
          // @ts-ignore
          professional={bookingDetails.data?.serviceProfessional?.professional}
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
        <Button variant='outlined' text='Add to calendar' />
      </div>
      <div className='flex flex-col gap-5 h-[400px] w-full mt-12'>
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
        <Map zoom={zoom} center={center} markers={markers} />
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
        text='Open on google maps'
      />
    </main>
  );
};
