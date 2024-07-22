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
              className='w-[300px] rounded-lg h-fit bg-white shadow sticky right-0 md:top-[100px] top-[120px]'
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
      <div className='flex flex-col w-full gap-y-10 md:min-h-0 min-h-[100%] h-fit z-10 md:py-6 py-8 px-6'>
        <div className='flex flex-col w-full gap-y-6'>
          <Typography
            variant='body1'
            className='text-dark !text-sm !font-medium'
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
        <div className='flex flex-col w-full gap-y-6'>
          <Typography
            variant='body2'
            weight='medium'
            className='!text-dark !text-sm'
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
        <div className='flex w-full gap-x-4 mt-auto'>
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
