'use client';

import { type FC, useContext, useEffect } from 'react';

import { animated, useTransition } from '@react-spring/web';
import clsx from 'clsx';
import { useIntl } from 'react-intl';

import { Button } from '@/modules/core/components/button';
import { Checkbox } from '@/modules/core/components/checkbox';
import { DateSelect } from '@/modules/core/components/date-select';
import { DialogFullScreen } from '@/modules/core/components/dialog-full-screen';
import { Typography } from '@/modules/core/components/typogrpahy';
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
import { useQueryParams } from '@/modules/core/hooks/use-search-params';
import type { ChildrenProp } from '@/modules/core/types/react.types';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { ProfessionalSearchContext } from '@/modules/user/providers/professional-search-provider';

import type { ProSearchFilterProps } from './pro-search-filter.interface';

const FilterWrapper: FC<
  ChildrenProp & {
    isActive: boolean;
    onActiveChange: (isActive: boolean) => void;
  }
> = ({ children, isActive, onActiveChange }) => {
  const deviceType = useDeviceType();
  const transitions = useTransition(isActive, {
    from: { transform: 'translateX(100%)', opacity: 0 },
    enter: { transform: 'translateX(0%)', opacity: 1 },
    leave: { transform: 'translateX(100%)', opacity: 0 },
    config: { tension: 330, friction: 30 },
  });

  if (deviceType === 'mobile' || deviceType === 'tablet') {
    return (
      <DialogFullScreen
        isOpen={isActive}
        onOpenChange={onActiveChange}
        closeOnOutsideClick
        classes={{
          content: 'max-w-[300px]',
        }}
      >
        {children}
      </DialogFullScreen>
    );
  }

  return (
    <>
      {transitions(
        (style, item) =>
          item && (
            <animated.div
              style={style}
              className='sticky right-0 top-[120px] h-fit w-[300px] rounded-lg bg-white shadow md:top-[100px]'
            >
              {children}
            </animated.div>
          )
      )}
    </>
  );
};

export const ProSearchFilter: FC<ProSearchFilterProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const intl = useIntl();
  const { queryParams, clearQueryParams } = useQueryParams<{
    serviceId: string;
  }>();

  // context
  const {
    date,
    selectedServices: { isAll, selectedServices },
    onSelectedServicesChange,
    onDateChange,
  } = useContext(ProfessionalSearchContext);
  // queries
  const { data: serviceListQuery } = trpc.service.list.useInfiniteQuery(
    {
      limit: 15,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const serviceList =
    serviceListQuery?.pages.map((page) => page.items).flat() || [];

  const handleIsAllChange = () => {
    if (!serviceListQuery?.pages) {
      return;
    }

    if (isAll) {
      onSelectedServicesChange({
        isAll: false,
        selectedServices:
          selectedServices.length > 0
            ? selectedServices
            : [serviceListQuery.pages[0]?.items[0]?.id],
      });

      return;
    }

    onSelectedServicesChange({
      isAll: true,
      selectedServices: [],
    });
  };

  const handleClearAll = () => {
    onSelectedServicesChange({
      isAll: false,
      selectedServices: [],
    });
    onDateChange(null);
  };

  useEffect(() => {
    if (queryParams.serviceId) {
      onSelectedServicesChange({
        isAll: false,
        selectedServices: [queryParams.serviceId],
      });
      clearQueryParams(['serviceId']);
    }
  }, [onSelectedServicesChange, queryParams.serviceId]);

  return (
    <FilterWrapper isActive={isOpen} onActiveChange={onOpenChange}>
      <div className='relative z-10 flex h-fit min-h-[100%] w-full flex-col gap-y-10 px-6 py-8 md:min-h-0 md:py-6'>
        <Button
          className='absolute right-[14px] top-[14px] text-gray-accent'
          variant='unstyled'
          icon='close'
          type='button'
          onClick={() => {
            onOpenChange(false);
          }}
        />

        <div className='flex w-full flex-col gap-y-6'>
          <Typography
            variant='body1'
            className='!text-sm !font-medium text-dark'
          >
            {intl.formatMessage({
              id: 'filter.service.for.search',
            })}
          </Typography>
          <div className='flex flex-col gap-y-1'>
            <div className='flex items-center gap-x-1'>
              <Checkbox
                value={isAll}
                onChange={handleIsAllChange}
                size='small'
              />
              <span>
                {intl.formatMessage({
                  id: 'filter.service.all',
                })}
              </span>
            </div>
            {serviceList?.map((service) => {
              const isActive = selectedServices.includes(service.id);

              return (
                <div key={service.id} className='flex items-center gap-x-1'>
                  <Checkbox
                    value={isActive}
                    size='small'
                    onChange={() => {
                      if (isActive) {
                        const filteredServices = selectedServices.filter(
                          (serviceId) => serviceId !== service.id
                        );

                        onSelectedServicesChange({
                          isAll: filteredServices.length === 0,
                          selectedServices: filteredServices,
                        });

                        return;
                      }

                      onSelectedServicesChange({
                        isAll: false,
                        selectedServices: [...selectedServices, service.id],
                      });
                    }}
                  />
                  <span>{intl.formatMessage({ id: service.name })}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className='flex w-full flex-col gap-y-6'>
          <Typography
            variant='body2'
            weight='medium'
            className='!text-sm !text-dark'
          >
            {intl.formatMessage({
              id: 'filter.date.for.booking',
            })}
          </Typography>
          <DateSelect
            value={date}
            onChange={onDateChange}
            placeholder={intl.formatMessage({ id: 'filter.all.dates' })}
            triggerProps={{
              classes: {
                root: clsx('!w-full !justify-between', {
                  '!border-gray !text-gray hover:!border-primary hover:!text-primary':
                    !date,
                }),
              },
            }}
          />
        </div>
        <div className='mt-auto flex w-full gap-x-4'>
          <Button
            text={intl.formatMessage({
              id: 'button.clear.all',
            })}
            variant='outlined'
            className='!w-full'
            onClick={handleClearAll}
          />
        </div>
      </div>
    </FilterWrapper>
  );
};
