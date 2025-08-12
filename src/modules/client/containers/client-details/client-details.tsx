import { type FC, useState } from 'react';

import { Skeleton } from '@mui/material';
import Image from 'next/image';
import { useIntl } from 'react-intl';

import Bg from '@/assets/images/bg-1.png';
import { BookingInfoDialog } from '@/modules/booking/containers/booking-info-dialog';
import { groupBookingsByDate } from '@/modules/booking/utils/booking.utils';
import { BookingCard } from '@/modules/client/components/booking-card';
import { ClientTabs } from '@/modules/client/components/client-tabs/client-tabs';
import { Avatar } from '@/modules/core/components/avatar';
import { Button } from '@/modules/core/components/button';
import { DialogFullScreen } from '@/modules/core/components/dialog-full-screen';
import { Placeholder } from '@/modules/core/components/placeholder';
import { Tabs } from '@/modules/core/components/tabs';
import type { Tab } from '@/modules/core/components/tabs/tabs.interface';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { formatI18n } from '@/modules/internationalization/utils/data-fns-internationalization';

import { type ClientsDetailProps } from './client-details.interface';

const now = new Date().toISOString();

export const ClientDetails: FC<ClientsDetailProps> = ({
  clientId,
  isOpen,
  onOpenChange,
  onAddBooking,
  onEditClientInfo,
}) => {
  const intl = useIntl();

  const [activeClientInfoTab, setActiveClientInfoTab] = useState<
    'future' | 'past'
  >('future');

  const [activeClientTab, setActiveClientTab] = useState<'booking' | 'about'>(
    'booking'
  );

  const [activeBookingId, setActiveBookingId] = useState<string | null>(null);

  const [me] = trpc.user.me.useSuspenseQuery({ expand: ['professional'] });

  const { data: client, isLoading } = trpc.client.get.useQuery(
    { id: clientId ?? '' },
    { enabled: !!clientId }
  );

  const upcomingBookingsQuery = trpc.booking.list.useInfiniteQuery(
    {
      clientId: clientId ?? '',
      expand: ['serviceProfessional'],
      sortField: 'startTime',
      startDate: now,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      enabled: !!clientId,
    }
  );

  const pastBookingsQuery = trpc.booking.list.useInfiniteQuery(
    {
      clientId: clientId ?? '',
      expand: ['serviceProfessional'],
      sortField: 'startTime',
      sortDirection: 'desc',
      endDate: now,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      enabled: !!clientId,
    }
  );

  const upcomingBookings = groupBookingsByDate(
    upcomingBookingsQuery.data?.pages.map((page) => page.items).flat() || []
  );
  const pastBookings = groupBookingsByDate(
    pastBookingsQuery.data?.pages.map((page) => page.items).flat() || []
  );

  const handleClose = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const handleClientInfoTabChange = (key: string) => {
    if (key === 'future' || key === 'past') {
      setActiveClientInfoTab(key);
    }
  };

  const tabs: Tab[] = [
    {
      key: 'future',
      name: intl.formatMessage({ id: 'client.booking.tabs.future' }),
    },
    {
      key: 'past',
      name: intl.formatMessage({ id: 'client.booking.tabs.past' }),
    },
  ];

  const SkeletonLoader = () => {
    const SKELETON_ITEMS_COUNT = 2;

    return (
      <div className='z-10 flex flex-col px-4'>
        {[...Array(SKELETON_ITEMS_COUNT)].map((_, index) => (
          <div
            key={index}
            className='flex items-center gap-x-4 border-b border-gray-light py-2 last:border-b-0'
          >
            <Skeleton variant='circular' width={38} height={38} />
            <div className='flex flex-col'>
              <Skeleton width={200} height={24} />
              <Skeleton width={120} height={20} />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <DialogFullScreen
      applyMobileBottomTabPadding
      onOpenChange={onOpenChange}
      isOpen={isOpen}
    >
      <div className='z-50 flex w-full flex-col overflow-y-auto'>
        <div className='z-[50] flex justify-between p-3'>
          <Button
            variant='outlined'
            icon='chevron-left'
            className='-ml-2 !border-none !text-dark'
            onClick={handleClose}
          />
          <Button
            className='!pr-0 text-primary'
            variant='unstyled'
            text={intl.formatMessage({ id: 'button.edit' })}
            onClick={onEditClientInfo}
          />
        </div>

        <div className='z-[100] mt-8 flex flex-col items-center gap-[18px]'>
          <Avatar
            url={client?.image ?? ''}
            fallback={`${client?.firstName?.[0] ?? ''}${client?.lastName?.[0] ?? ''}`}
            shadow
            size='medium'
          />
          {isLoading ? (
            <div className='skeleton h-8 w-24 rounded' />
          ) : (
            <span>{`${client?.firstName} ${client?.lastName}`}</span>
          )}
          <div className='flex gap-5'>
            <Button
              className='!bg-primary-light text-primary'
              variant='unstyled'
              icon='comment'
            />
            <Button
              className='!bg-primary-light text-primary'
              variant='unstyled'
              icon='phone'
            />
            <Button
              className='!bg-primary-light text-primary'
              variant='unstyled'
              icon='mail'
            />
          </div>
        </div>

        <div className='z-[100] mx-3 mb-[15px] mt-8 flex justify-between rounded-2xl bg-white px-4 py-3 shadow-md'>
          <div className='flex flex-col items-start'>
            <span className='text-base font-medium text-dark'>0</span>
            <span className='text-sm text-gray'>Бронювань</span>
          </div>
          <div className='flex flex-col items-start'>
            <span className='text-base font-medium text-dark'>0</span>
            <span className='text-sm text-gray'>Скасовано</span>
          </div>
          <div className='flex flex-col items-start'>
            <span className='text-base font-medium text-dark'>0.00 UAH</span>
            <span className='text-sm text-gray'>Загальний дохід</span>
          </div>
        </div>

        <div className='z-[100] w-full flex-1 bg-white'>
          <ClientTabs
            activeTab={activeClientTab}
            onChange={setActiveClientTab}
          />

          {activeClientTab === 'booking' && (
            <>
              <Button
                className='mt-4 text-primary'
                icon='plus'
                variant='unstyled'
                text={intl.formatMessage({ id: 'client.add.booking' })}
                onClick={onAddBooking}
              />
              <div className='mt-4 w-full px-3'>
                <Tabs
                  value={activeClientInfoTab}
                  onChange={handleClientInfoTabChange}
                  variant='contained'
                  tabs={tabs}
                />

                {me.userType === 'PROFESSIONAL' && me.professional && (
                  <>
                    {activeClientInfoTab === 'future' && (
                      <div className='mt-4 w-full px-3'>
                        {upcomingBookingsQuery.isPending ? (
                          <SkeletonLoader />
                        ) : (
                          <Placeholder
                            isActive={
                              Object.keys(upcomingBookings).length === 0
                            }
                            placeholder={
                              <div className='flex flex-col items-center justify-center gap-y-4 py-8'>
                                <span className='text-text text-sm font-medium text-dark'>
                                  {intl.formatMessage({
                                    id: 'client.booking.tabs.future.empty',
                                  })}
                                </span>
                              </div>
                            }
                          >
                            {Object.keys(upcomingBookings).map((date) => (
                              <div
                                className='mb-3 flex flex-col gap-y-4'
                                key={date}
                              >
                                <span className='text-xs font-medium text-gray-accent'>
                                  {formatI18n(
                                    new Date(date),
                                    'dd MMMM yyyy',
                                    intl.locale
                                  )}
                                </span>
                                <div className='grid gap-6 [grid-template-columns:repeat(auto-fill,_minmax(300px,1fr))] [grid-template-rows:max-content] md:[grid-template-columns:repeat(auto-fill,_minmax(400px,1fr))]'>
                                  {upcomingBookings[date].map((booking) => (
                                    <BookingCard
                                      key={booking.id}
                                      booking={booking}
                                      onClick={() => {
                                        setActiveBookingId(booking.id);
                                      }}
                                    />
                                  ))}
                                </div>
                              </div>
                            ))}
                          </Placeholder>
                        )}
                      </div>
                    )}

                    {activeClientInfoTab === 'past' && (
                      <div className='mt-4 w-full px-3'>
                        {pastBookingsQuery.isPending ? (
                          <SkeletonLoader />
                        ) : (
                          <Placeholder
                            isActive={Object.keys(pastBookings).length === 0}
                            placeholder={
                              <div className='flex flex-col items-center justify-center gap-y-4 py-8'>
                                <span className='text-text text-sm font-medium text-dark'>
                                  {intl.formatMessage({
                                    id: 'client.booking.tabs.past.empty',
                                  })}
                                </span>
                              </div>
                            }
                          >
                            {Object.keys(pastBookings).map((date) => (
                              <div
                                className='mb-3 flex flex-col gap-y-4'
                                key={date}
                              >
                                <span className='text-xs font-medium text-gray-accent'>
                                  {formatI18n(
                                    new Date(date),
                                    'dd MMMM yyyy',
                                    intl.locale
                                  )}
                                </span>
                                <div className='grid gap-6 [grid-template-columns:repeat(auto-fill,_minmax(300px,1fr))] [grid-template-rows:max-content] md:[grid-template-columns:repeat(auto-fill,_minmax(400px,1fr))]'>
                                  {pastBookings[date].map((booking) => (
                                    <BookingCard
                                      key={booking.id}
                                      booking={booking}
                                      onClick={() => {
                                        setActiveBookingId(booking.id);
                                      }}
                                    />
                                  ))}
                                </div>
                              </div>
                            ))}
                          </Placeholder>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          )}

          {activeClientTab === 'about' && (
            <div className='mt-6 flex flex-col gap-10 px-4'>
              <div className='flex flex-col gap-2'>
                <p className='text-xs text-dark'>
                  {intl.formatMessage({ id: 'client.notes' })}
                </p>
                <p className='text-dark'>
                  {isLoading ? (
                    <div className='skeleton h-4 w-full rounded' />
                  ) : (
                    client?.notes
                  )}
                </p>
              </div>

              <div className='flex flex-col gap-2'>
                <p className='text-xs text-dark'>
                  {intl.formatMessage({ id: 'client.email' })}
                </p>
                <p className='text-dark'>
                  {isLoading ? (
                    <div className='skeleton h-4 w-full rounded' />
                  ) : (
                    client?.email
                  )}
                </p>
              </div>

              <div className='flex flex-col gap-2'>
                <p className='text-xs text-dark'>
                  {intl.formatMessage({ id: 'client.phone' })}
                </p>
                <p className='text-dark'>
                  {isLoading ? (
                    <div className='skeleton h-4 w-full rounded' />
                  ) : (
                    client?.phone
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <BookingInfoDialog
        bookingId={activeBookingId}
        onClose={() => {
          setActiveBookingId(null);
        }}
      />

      <Image
        className='fixed left-0 top-0 h-full w-full object-cover opacity-[0.1]'
        src={Bg.src}
        width={Bg.width}
        height={Bg.height}
        blurDataURL={Bg.blurDataURL}
        alt='background'
      />

      <div className='fixed left-0 top-0 z-[2] h-full w-full bg-gradient-to-b from-white to-transparent' />
    </DialogFullScreen>
  );
};
