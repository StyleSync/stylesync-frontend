'use client';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useIntl } from 'react-intl';

import Bg from '@/assets/images/bg-1.png';
import searchEn from '@/assets/images/en-pro-search.png';
import profileEn from '@/assets/images/profile1en.png';
import profileUk from '@/assets/images/profile1uk.png';
import searchUk from '@/assets/images/uk-pro-search.png';
import { Button } from '@/modules/core/components/button';
import { Icon } from '@/modules/core/components/icon';
import { IphoneLayout } from '@/modules/core/components/iphone-layout';

const advantages = [
  {
    title: 'Усі записи в одному місці',
  },
  {
    title: 'Гнучкі налаштування - адаптуй платформу під свій стиль роботи',
  },
  {
    title: 'SMS нагадування - клієнти не забудуть про запис',
  },
  {
    title:
      'Легке керування бронюваннями - підтверджуй або скасовуй записи за кілька кліків',
  },
];

export const ServiceDataSection = () => {
  const intl = useIntl();
  const params = useParams();

  const profile = intl.locale === 'uk' ? profileUk.src : profileEn.src;
  const search = intl.locale === 'uk' ? searchUk.src : searchEn.src;

  return (
    <section className='relative mt-8 flex w-full py-24 md:py-56'>
      <div className='z-10 mx-auto flex w-full max-w-[1200px] flex-1 flex-col items-center gap-x-8 px-4 xl:flex-row'>
        <div className='flex flex-1 flex-col gap-y-6'>
          <h1 className='mx-auto text-center text-[40px] font-semibold leading-[1.2] md:text-left md:text-5xl'>
            <span className='bg-gradient-to-r from-black to-black bg-clip-text text-transparent'>
              StyleSync це все автоматизує
            </span>
          </h1>
          <div className='mt-10 flex flex-col gap-4'>
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className='flex items-center gap-x-4 rounded-xl border border-gray-light bg-white p-4 shadow-colour'
              >
                <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-light'>
                  <Icon
                    name='check-mark'
                    width={24}
                    height={24}
                    className='text-green'
                  />
                </div>
                <span className='text-lg font-medium text-dark'>
                  {advantage.title}
                </span>
              </div>
            ))}
          </div>
          <Button
            text='Почати користуватися'
            variant='primary'
            classes={{
              root: '!h-12 !rounded-lg',
              text: '!text-base',
            }}
            className='mx-auto mt-10 md:mx-0'
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
          />
        </div>
        <div className='mt-[55px] w-full flex-1 sm:w-auto'>
          <div className='flex flex-1 items-center sm:mx-4 sm:flex-row sm:items-end'>
            <IphoneLayout
              imageUrl={profile}
              className='relative left-[50px] z-10 sm:left-[70px] xl:left-[100px]'
              width={300}
            />
            <IphoneLayout
              imageUrl={search}
              className='relative right-[50px] mt-[46px] sm:right-0 md:right-[50px]'
              width={270}
            />
          </div>
        </div>
      </div>
      <Image
        src={Bg}
        alt='bg'
        width={Bg.width}
        height={Bg.height}
        className='absolute left-0 top-0 z-0 h-full w-full opacity-[0.3]'
      />
      <div
        className='absolute left-0 top-0 z-[15] h-[110px] w-full max-w-full sm:flex md:h-[220px]'
        style={{
          background: 'linear-gradient(0deg, transparent 0%, white 70%)',
        }}
      />
      <div
        className='absolute bottom-0 left-0 z-[15] h-[110px] w-full max-w-full sm:flex md:h-[220px]'
        style={{
          background: 'linear-gradient(180deg, transparent 0%, white 70%)',
        }}
      />
    </section>
  );
};
