'use client';

import { Button } from '@/modules/core/components/button';
import { Typography } from '@/modules/core/components/typogrpahy';
import h from '@/modules/landing/landing-image/schedule.png';
import Image from 'next/image';

export const IntroSection = () => {
  return (
    <section className='w-full flex flex-col gap-y-6 items-center justify-center'>
      <Typography
        className='text-center !text-5xl md:!text-6xl text-dark max-w-[820px] px-2'
        variant='title'
        weight='semibold'
      >
        Discover Your Style with StyleSync
      </Typography>

      <Typography variant='body1' className=' text-center !text-gray px-2'>
        Find the Perfect Professional for Your Beauty Needs
      </Typography>
      <Button
        className=' mx-auto !bg-orange !rounded-lg text-white'
        text='Book Your Appointment Now'
        variant='unstyled'
      />

      <Image width={900} height={500} src={h} alt='img' />
    </section>
  );
};
