'use client';
import { useState, type FC } from 'react';
import { useTransition, animated } from '@react-spring/web';
import clsx from 'clsx';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { Checkbox } from '@/modules/core/components/checkbox';
import { DateSelect } from '@/modules/core/components/date-select';
import { Button } from '@/modules/core/components/button';
import { ProSearchField } from '@/modules/location/components/pro-search-field';
// hooks
import { useBoolean } from 'usehooks-ts';
// containers
import { ProfessionalSearchCard } from '@/modules/user/containers/professional-search-card';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
// styles
import styles from './search-pro.module.scss';
import type { ChildrenProp } from '@/modules/core/types/react.types';
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
import { DialogFullScreen } from '@/modules/core/components/dialog-full-screen';

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

  if (deviceType === 'mobile') {
    return (
      <DialogFullScreen
        isOpen={isActive}
        onOpenChange={onActiveChange}
        classes={{
          content: 'max-w-[80%]',
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
              className='w-[300px] rounded-lg bg-white shadow sticky right-0 md:top-[150px] top-[120px]'
            >
              {children}
            </animated.div>
          )
      )}
    </>
  );
};

export default function SearchProPage() {
  const { data: professionalList } = trpc.professional.list.useQuery({
    limit: 6,
  });
  // state
  const [date, setDate] = useState<null | Date>(null);

  const isFilterActive = useBoolean(false);

  const services = ['All', 'Makeup', 'Fitness', 'Hair', 'Nails', 'Massage'];

  return (
    <div className={clsx(styles.root)}>
      <section className='flex-1 flex px-6 md:px-[40px] w-full'>
        <div className='py-6 md:py-12 flex-1 flex flex-col'>
          <div className='lg:hidden flex gap-5'>
            <ProSearchField />
          </div>

          <div className='flex flex-row items-center mt-6 lg:mt-0'>
            <span className='text-dark text-base lg:text-xl font-medium'>
              We found{' '}
              <span className='text-primary'>6 pro&apos;s for you</span>
            </span>

            <Button
              variant='light'
              onClick={isFilterActive.toggle}
              text='Filters'
              icon='filter'
              classes={{ root: 'ml-auto lg:ml-1 shrink-0', icon: '!w-4 !h-4' }}
            />
          </div>
          <div className='flex flex-1 gap-x-8 mt-4 lg:mt-8'>
            <div className='flex-1 grid [grid-template-columns:repeat(auto-fit,_minmax(230px,1fr))] gap-6'>
              {professionalList?.map((pro) => (
                // @ts-ignore todo: Will be fixed later. Expected different api query with different response.
                <ProfessionalSearchCard professional={pro} key={pro.id} />
              ))}
            </div>
            <FilterWrapper
              isActive={isFilterActive.value}
              onActiveChange={isFilterActive.setValue}
            >
              <div className='flex flex-col w-full gap-y-10 md:min-h-0 min-h-[100%] h-fit z-10 md:py-6 py-8 px-6'>
                <div className='flex flex-col w-full gap-y-6'>
                  <Typography
                    variant='body1'
                    className='text-dark !text-sm !font-medium'
                  >
                    Services for Search
                  </Typography>
                  <div className='flex flex-col gap-y-1'>
                    {services.map((service) => (
                      <div key={service} className='flex items-center gap-x-1'>
                        <Checkbox value={false} size='small' />
                        <span>{service}</span>
                      </div>
                    ))}
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
                    onChange={setDate}
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
                  <Button
                    text='Clear All'
                    variant='outlined'
                    className='!w-full'
                  />
                  <Button
                    text='Apply Filters'
                    variant='primary'
                    className='!w-full md:!hidden'
                    onClick={isFilterActive.setFalse}
                  />
                </div>
              </div>
            </FilterWrapper>
          </div>
        </div>
      </section>
    </div>
  );
}
