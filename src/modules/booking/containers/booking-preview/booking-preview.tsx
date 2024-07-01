import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { BookingDetailBox } from '@/modules/booking/components/booking-preview-detail-box/booking-preview-detail-box';
import { Button } from '@/modules/core/components/button';
import { Map } from '@/modules/location/components/map';

export const BookingPreview = () => {
  return (
    <div className=' w-full max-w-[950px] flex flex-col mx-auto px-[15px] mt-28 mb-20'>
      <Typography className='mx-auto !text-[24px]'>Booking №243564</Typography>
      <div className='flex w-full mt-12'>
        <div className='flex flex-col gap-4 flex-1'>
          <BookingDetailBox
            label='Specialist'
            value='Mandy Pierce'
            avatar='eee'
          />

          <div className='flex flex-col gap-3'>
            <BookingDetailBox label='Title' value='Service title' />
          </div>
          <div className='flex flex-col gap-3'>
            <BookingDetailBox label='Price' value='120 USDT' />
          </div>
          <div className='flex gap-4'>
            <div className='flex flex-col gap-3'>
              <BookingDetailBox
                label='Start time'
                value='monday, 30 jun 2024, 12:00'
              />
            </div>
            <div className='flex flex-col gap-3'>
              <BookingDetailBox label='Duration' value='1' />
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
            value={12}
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
            <Typography weight='semibold'>2 дні</Typography>
          </div>
        </div>
      </div>
      <div className='flex gap-4 mt-12'>
        <Button variant='secondary' text='Contact' />
        <Button variant='outlined' text='Add to calendar' />
      </div>
      <div className='flex flex-col gap-5 h-[400px] w-full mt-12'>
        <div className='flex gap-5'>
          <Typography variant='small' className='!text-gray'>
            Greyhound Dr, Bradford BD7 1NQ
          </Typography>
          <Typography variant='small' className='!text-gray'>
            290 m. from you
          </Typography>
        </div>
        <Map />
      </div>
      <Button className='mt-12' variant='outlined' text='Open on google maps' />
    </div>
  );
};
