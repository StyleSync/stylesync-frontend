'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

import Bg from '@/assets/images/bg-1.png';
import pictureV2 from '@/assets/images/intro-girl.png';
import { Button } from '@/modules/core/components/button';

export const IntroSection = () => {
  const params = useParams();

  return (
    <section className='relative flex h-screen w-full'>
      <div className='z-10 mx-auto flex w-full max-w-[1200px] flex-col gap-x-8 pt-[72px] md:flex-row md:pt-0'>
        <div className='flex flex-col justify-center gap-y-6 pt-8 lg:flex-1'>
          <h1 className='text-center text-[40px] font-semibold leading-[1.2] md:text-left md:text-6xl'>
            <span className='bg-gradient-to-r from-black to-black bg-clip-text text-transparent'>
              Всі твої записи - в одному місці
            </span>
          </h1>
          <span className='mx-auto max-w-[330px] text-center text-lg font-medium text-dark md:mx-0 md:text-left md:text-xl'>
            Простий онлайн-розклад і нагадування для майстрів краси та ваших
            клієнтів.
          </span>
          <div className='flex flex-col items-center gap-y-4 md:items-start'>
            <Button
              rippleColor='rgba(255,255,255,0.3)'
              className='z-10 mt-7 !h-[52px] rounded-[26px] bg-gradient-to-r from-[#FA719A] to-[#FDA571] text-white shadow-accentShadow shadow-orange/20 transition hover:shadow-[#FC858C]/30'
              classes={{
                text: '!text-base !font-semibold',
              }}
              onClick={() => {
                signIn(
                  'auth0',
                  {
                    callbackUrl: '/app/profile',
                  },
                  {
                    prompt: 'login',
                    screen_hint: 'signup',
                    ui_locales: params.lang as string,
                  }
                );
              }}
              text='Спробувати БЕЗКОШТОВНО'
              variant='unstyled'
            />
          </div>
        </div>
        <div className='relative flex-1'>
          <Image
            width={pictureV2.width}
            height={pictureV2.height}
            src={pictureV2.src}
            className='absolute left-1/2 top-0 z-10 mx-auto h-full w-auto -translate-x-1/2 object-contain'
            alt='img'
          />
        </div>
      </div>
      <Image
        src={Bg.src}
        alt='bg'
        width={Bg.width}
        height={Bg.height}
        className='absolute left-0 top-0 z-0 h-full w-full opacity-[0.3]'
      />
      <div
        className='absolute bottom-0 left-0 z-[15] h-[200px] w-full max-w-full'
        style={{
          background: 'linear-gradient(180deg, transparent 0%, white 70%)',
        }}
      />
    </section>
  );
};
