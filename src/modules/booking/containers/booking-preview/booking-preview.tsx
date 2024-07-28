'use client';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import getDistance from 'geolib/es/getDistance';
import { createEvent, type EventAttributes } from 'ics';
import { getHours, getMinutes, format } from 'date-fns';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { BookingPreviewDetailBox } from '@/modules/booking/components/booking-preview-detail-box/booking-preview-detail-box';
import { Button } from '@/modules/core/components/button';
import { Spinner } from '@/modules/core/components/spinner';
import { UserContactPopup } from '@/modules/user/components/user-contact-popup';
// hooks
import { useBoolean } from 'usehooks-ts';
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

const MILLISECONDS_IN_MINUTE = 60000;
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

  const startEventTime = bookingDetails.data?.startTime
    ? new Date(bookingDetails.data?.startTime).getTime() -
      new Date().getTimezoneOffset() * MILLISECONDS_IN_MINUTE
    : new Date().getTime();

  const event: EventAttributes = useMemo(() => {
    return {
      start: startEventTime,

      duration: {
        hours: bookingDetails.data?.serviceProfessional.duration
          ? getHours(bookingDetails.data?.serviceProfessional.duration)
          : 0,
        minutes: bookingDetails.data?.serviceProfessional.duration
          ? getMinutes(bookingDetails.data?.serviceProfessional.duration)
          : 0,
      },
      title: `${bookingDetails.data?.serviceProfessional.title}`,
      location: `${location?.name}`,
      organizer: {
        name: `${professional.data?.user.firstName}`,
        email: `${professional.data?.user?.email}`,
      },
      attendees: [
        {
          name: `${bookingDetails.data?.guestFirstName} ${bookingDetails.data?.guestLastName}`,
          email: `${bookingDetails.data?.guestEmail}`,
          partstat: 'ACCEPTED',
          role: 'REQ-PARTICIPANT',
        },
      ],
    };
  }, [professional, professional.data, bookingDetails.data, location?.name]);

  const handleDownloadIcs = useCallback(async () => {
    const filename = 'ExampleEvent.ics';
    const file: File = await new Promise((resolve, reject) => {
      createEvent(event, (error, value) => {
        if (error) {
          reject(error);
        }

        resolve(new File([value], filename, { type: 'text/calendar' }));
      });
    });
    const url = URL.createObjectURL(file);

    // trying to assign the file URL to a window could cause cross-site
    // issues so this is a workaround using HTML5
    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download = filename;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    URL.revokeObjectURL(url);
  }, [event]);

  if (bookingDetails.isLoading) {
    return (
      <div className='mt-[190px] mx-auto'>
        <Spinner size='large' />
      </div>
    );
  }

  return (
    <main className='w-full max-w-[950px] flex flex-col flex-1 mx-auto px-[15px] mt-28 mb-20'>
      <Typography className='mx-auto !text-[24px] text-center'>
        Booking № 20
      </Typography>
      <div className='flex w-full mt-12'>
        <div className='flex flex-col gap-4 flex-1'>
          <a
            target='_blank'
            href={`/app/profile/${professional.data?.userId}`}
            rel='noreferrer'
          >
            <BookingPreviewDetailBox
              label='Specialist'
              value={`${professional.data?.user?.firstName} ${professional.data?.user?.lastName}`}
              avatar={professional.data?.user?.avatar || ''}
            />
          </a>

          <div className='flex flex-col gap-3'>
            <BookingPreviewDetailBox
              label='Title'
              value={bookingDetails.data?.serviceProfessional?.title || ''}
            />
          </div>

          <div className='flex flex-col gap-3'>
            <BookingPreviewDetailBox
              label='Price'
              value={`${bookingDetails.data?.serviceProfessional?.price} ${bookingDetails.data?.serviceProfessional?.currency}`}
            />
          </div>
          <div className='flex gap-6'>
            <div className='flex flex-col gap-3'>
              <BookingPreviewDetailBox
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
              <BookingPreviewDetailBox
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
        <div className='relative w-[120px] h-[120px] mt-[66px] ml-5'>
          <CircularProgressbar
            strokeWidth={3}
            value={percents}
            styles={buildStyles({
              pathColor: '#64e841',
              trailColor: '#d8e6fc',
            })}
          />
          <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center flex-col'>
            <Typography>Залишилось</Typography>
            <Typography weight='semibold'>{`${daysRemaining} д.`}</Typography>
          </div>
        </div>
      </div>
      <div className='flex gap-4 mt-12'>
        <UserContactPopup
          // @ts-ignore
          professional={professional.data}
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
        <Button
          variant='outlined'
          text='Add to calendar'
          onClick={handleDownloadIcs}
        />
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
