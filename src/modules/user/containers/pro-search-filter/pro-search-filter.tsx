import { type FC, useContext } from 'react';

import type { ProSearchFilterProps } from './pro-search-filter.interface';
import { Typography } from '@/modules/core/components/typogrpahy';
import { Checkbox } from '@/modules/core/components/checkbox';
import { DateSelect } from '@/modules/core/components/date-select';
import clsx from 'clsx';
import { Button } from '@/modules/core/components/button';
import type { ChildrenProp } from '@/modules/core/types/react.types';
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
import { animated, useTransition } from '@react-spring/web';
import { DialogFullScreen } from '@/modules/core/components/dialog-full-screen';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { useIntl } from 'react-intl';
import { ProfessionalSearchContext } from '@/modules/user/providers/professional-search-provider';

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
  // context
  const {
    date,
    selectedServices: { isAll, selectedServices },
    onSelectedServicesChange,
    onDateChange,
  } = useContext(ProfessionalSearchContext);
  // queries
  const serviceListQuery = trpc.service.list.useQuery({
    limit: 15,
  });

  const handleIsAllChange = () => {
    if (!serviceListQuery.data) {
      return;
    }

    if (isAll) {
      onSelectedServicesChange({
        isAll: false,
        selectedServices:
          selectedServices.length > 0
            ? selectedServices
            : [serviceListQuery.data[0].id],
      });

      return;
    }

    onSelectedServicesChange({
      isAll: true,
      selectedServices: [],
    });
  };

  return (
    <FilterWrapper isActive={isOpen} onActiveChange={onOpenChange}>
      <div className='z-10 flex h-fit min-h-[100%] w-full flex-col gap-y-10 px-6 py-8 md:min-h-0 md:py-6'>
        <div className='flex w-full flex-col gap-y-6'>
          <Typography
            variant='body1'
            className='!text-sm !font-medium text-dark'
          >
            Services for Search
          </Typography>
          <div className='flex flex-col gap-y-1'>
            <div className='flex items-center gap-x-1'>
              <Checkbox
                value={isAll}
                onChange={handleIsAllChange}
                size='small'
              />
              <span>All</span>
            </div>
            {serviceListQuery.data?.map((service) => {
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
            Date for Booking Availability
          </Typography>
          <DateSelect
            value={date}
            onChange={onDateChange}
            placeholder='All dates'
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
          <Button text='Clear All' variant='outlined' className='!w-full' />
          <Button
            text='Apply Filters'
            variant='primary'
            className='!w-full md:!hidden'
            onClick={() => {
              onOpenChange(false);
            }}
          />
        </div>
      </div>
    </FilterWrapper>
  );
};
