'use client';
import { useState } from 'react';
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

export default function SearchProPage() {
  const { data: professionalList } = trpc.professional.list.useQuery({
    limit: 6,
  });
  // state
  const [date, setDate] = useState<null | Date>(null);

  const isFilterActive = useBoolean(false);

  const transitions = useTransition(isFilterActive.value, {
    from: { transform: 'translateX(100%)', opacity: 0 },
    enter: { transform: 'translateX(0%)', opacity: 1 },
    leave: { transform: 'translateX(100%)', opacity: 0 },
    config: { tension: 330, friction: 30 },
  });

  const services = ['All', 'Makeup', 'Fitness', 'Hair', 'Nails', 'Massage'];

  return (
    <div className={clsx(styles.root)}>
      <section className='flex-1 flex px-[15px] md:px-[40px] w-full'>
        <div className='py-12 gap-y-8 flex-1 flex flex-col'>
          <div className=' md:hidden flex gap-5'>
            <ProSearchField />
          </div>

          <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 items-center'>
            <Typography variant='subtitle' weight='medium'>
              We found{' '}
              <span className='text-primary'>6 pro&apos;s for you</span>
            </Typography>

            <Button
              variant='unstyled'
              onClick={isFilterActive.toggle}
              text='Filter'
              icon='filter'
              className=' hover:!text-primary'
            />
          </div>
          <div className='flex flex-1 gap-x-8'>
            <div className='flex-1 grid [grid-template-columns:repeat(auto-fit,_minmax(230px,1fr))] gap-6'>
              {professionalList?.map((pro) => (
                // @ts-ignore todo: Will be fixed later. Expected different api query with different response.
                <ProfessionalSearchCard professional={pro} key={pro.id} />
              ))}
            </div>
            {transitions(
              (style, item) =>
                item && (
                  <animated.div
                    style={style}
                    className='flex w-[300px] flex-col gap-y-10 rounded-lg bg-white shadow top-[120px] h-fit  right-0 z-10  p-6 sticky md:top-[150px]'
                  >
                    <div className='flex flex-col w-full gap-y-6'>
                      <Typography
                        variant='body1'
                        className='text-dark !text-sm !font-medium'
                      >
                        Services for Search
                      </Typography>
                      <div className='flex flex-col gap-y-1'>
                        {services.map((service) => (
                          <div
                            key={service}
                            className='flex items-center gap-x-1'
                          >
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
                    <Button
                      text='Clear All'
                      variant='outlined'
                      className='!w-full'
                    />
                  </animated.div>
                )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
