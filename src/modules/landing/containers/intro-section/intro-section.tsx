'use client';

import { Button } from '@/modules/core/components/button';
import { Typography } from '@/modules/core/components/typogrpahy';
import picture from '@/assets/images/Banner picture.png';
import Image from 'next/image';
import { Icon } from '@/modules/core/components/icon';
import { useRouter } from 'next/navigation';

export const IntroSection = () => {
  const router = useRouter();

  return (
    <section className='w-full h-screen flex flex-col sm:pt-[72px] pt-[58px]'>
      <div className='flex-[0.4] flex flex-col items-center justify-end pt-[9vh]'>
        <Typography
          className='text-center !text-5xl md:!text-6xl !text-black !font-semibold max-w-[820px] px-2'
          variant='title'
          weight='semibold'
        >
          Discover Your Style with StyleSync
        </Typography>
        <Typography
          variant='body1'
          className='text-center !text-gray-accent px-2 mt-6'
        >
          Find the Perfect Professional for Your Beauty Needs
        </Typography>
        <Button
          rippleColor='rgba(255,255,255,0.3)'
          className='mx-auto bg-gradient-to-r z-10 from-[#FA719A] to-[#FDA571] transition mt-7 rounded-[26px] !h-[52px] text-white shadow-accentShadow shadow-orange/20 hover:shadow-[#FC858C]/30'
          classes={{
            text: '!text-base',
          }}
          onClick={() => {
            router.push('/app/search-pro');
          }}
          text='Book Your Appointment Now'
          variant='unstyled'
        />
      </div>

      <div className='flex-1 flex items-end'>
        <div className='relative flex justify-center w-full h-[calc(100%-2rem)]'>
          <div className='flex flex-col justify-center w-fit h-full pt-8'>
            <div className='w-[80px] h-[80px] rounded-full bg-[#F9DFE6] border-[3px] border-white flex items-center justify-center shadow'>
              <Icon name='makeup' width={38} height={38} />
            </div>
            <div className='mt-8 ml-[90px] w-[80px] h-[80px] rounded-full bg-[#E9F3FD] border-[3px] border-white flex items-center justify-center shadow'>
              <Icon name='fitness' width={38} height={38} />
            </div>
            <div className='mt-8 -ml-8 w-[80px] h-[80px] rounded-full bg-[#FFEBCE] border-[3px] border-white flex items-center justify-center shadow'>
              <Icon name='haircut' width={38} height={38} />
            </div>
            <div className='mt-8 ml-[100px] w-[80px] h-[80px] rounded-full bg-[#EDDFFF] border-[3px] border-white flex items-center justify-center shadow'>
              <Icon name='nails' width={38} height={38} />
            </div>
          </div>
          <Image
            width={picture.width}
            height={picture.height}
            src={picture}
            className='w-auto h-full object-contain'
            alt='img'
          />

          <div className='flex flex-col justify-center w-fit h-full pt-8'>
            <div className='w-[80px] h-[80px] rounded-full bg-[#FFE5DB] border-[3px] border-white flex items-center justify-center shadow'>
              <Icon name='skincare' width={38} height={38} />
            </div>
            <div className='mt-8 ml-[100px] w-[80px] h-[80px] rounded-full bg-[#CEF9F6] border-[3px] border-white flex items-center justify-center shadow'>
              <Icon name='faceMassage' width={38} height={38} />
            </div>
            <div className='mt-8 ml-[30px] w-[80px] h-[80px] rounded-full bg-[#FFEBCE] border-[3px] border-white flex items-center justify-center shadow'>
              <Icon name='eyebrows' width={38} height={38} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
