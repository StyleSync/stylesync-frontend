'use client';

import styles from './search-pro.module.scss';
import { ProfessionalSearchCard } from '@/modules/user/containers/professional-search-card';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { Typography } from '@/modules/core/components/typogrpahy';
import clsx from 'clsx';
import { DateSelect } from '@/modules/core/components/date-select';
import { useState } from 'react';
import { Checkbox } from '@/modules/core/components/checkbox';
import { Button } from '@/modules/core/components/button';

export default function SearchProPage() {
  const { data: professionalList } = trpc.professional.list.useQuery({
    limit: 6,
  });
  // state
  const [date, setDate] = useState<null | Date>(null);

  return (
    <div className={clsx(styles.root)}>
      {/* <section className='w-full max-w-[920px] mx-auto flex pt-14 pb-10'> */}
      {/*   <ProSearchField /> */}
      {/* </section> */}
      <section className='flex-1 flex px-[238px] w-full'>
        <div className='py-12 gap-y-8 flex-1 flex flex-col'>
          <Typography variant='subtitle' weight='medium'>
            We found <span className='text-primary'>13 pro&apos;s for you</span>
          </Typography>
          <div className='flex flex-1 gap-x-8'>
            <div className='flex-1 grid grid-cols-3 gap-6'>
              {professionalList?.map((pro) => (
                // @ts-ignore todo: Will be fixed later. Expected different api query with different response.
                <ProfessionalSearchCard professional={pro} key={pro.id} />
              ))}
            </div>
            <div className='flex w-[300px] flex-col gap-y-10 rounded-lg bg-white shadow h-fit p-6'>
              <div className='flex flex-col w-full gap-y-6'>
                <span className='text-dark text-sm font-medium'>
                  Services for Search
                </span>
                <div className='flex flex-col gap-y-1'>
                  <div className='flex items-center gap-x-1'>
                    <Checkbox value size='small' />
                    <span>All</span>
                  </div>
                  <div className='flex items-center gap-x-1'>
                    <Checkbox value={false} size='small' />
                    <span>Makeup</span>
                  </div>
                  <div className='flex items-center gap-x-1'>
                    <Checkbox value={false} size='small' />
                    <span>Fitness</span>
                  </div>
                  <div className='flex items-center gap-x-1'>
                    <Checkbox value={false} size='small' />
                    <span>Hair</span>
                  </div>
                  <div className='flex items-center gap-x-1'>
                    <Checkbox value={false} size='small' />
                    <span>Nails</span>
                  </div>
                  <div className='flex items-center gap-x-1'>
                    <Checkbox value={false} size='small' />
                    <span>Massage</span>
                  </div>
                </div>
              </div>
              <div className='flex flex-col w-full gap-y-6'>
                <span className='text-dark text-sm font-medium'>
                  Date for Booking Availability
                </span>
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
              <Button text='Clear All' variant='outlined' className='!w-full' />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
