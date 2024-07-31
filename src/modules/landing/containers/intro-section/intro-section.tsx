'use client';
import { type FC } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useIntl } from 'react-intl';
// components
import { Button } from '@/modules/core/components/button';
import { Typography } from '@/modules/core/components/typogrpahy';
import { Icon, type IconName } from '@/modules/core/components/icon';
// types
import type { StylingProps } from '@/styles/styles.types';
// assets
import picture from '@/assets/images/Banner picture.png';

import styles from './intro-section.module.scss';

const ServiceCircle: FC<{ iconName: IconName } & StylingProps> = ({
  iconName,
  className,
  style,
}) => {
  return (
    <div
      className={clsx(
        'flex h-[80px] w-[80px] shrink-0 items-center justify-center rounded-full border-[3px] border-white shadow transition',
        className
      )}
      style={style}
    >
      <Icon name={iconName} width={38} height={38} />
    </div>
  );
};

export const IntroSection = () => {
  const router = useRouter();
  const intl = useIntl();

  return (
    <section className='h-[700px]:bg-red-500 flex h-screen w-full flex-col pt-[38px] sm:pt-[72px]'>
      <div className='flex flex-[0.4] flex-col items-center justify-end pt-[9vh]'>
        <Typography
          className='max-w-[820px] px-2 text-center !text-5xl !font-semibold !text-black md:!text-6xl'
          variant='title'
          weight='semibold'
        >
          {intl.formatMessage({ id: 'pages.landing.intro.title' })}
        </Typography>
        <Typography
          variant='body1'
          className='mt-6 px-2 text-center !text-gray-accent'
        >
          {intl.formatMessage({ id: 'pages.landing.intro.subtitle' })}
        </Typography>
        <Button
          rippleColor='rgba(255,255,255,0.3)'
          className='z-10 mx-auto mt-7 !h-[52px] rounded-[26px] bg-gradient-to-r from-[#FA719A] to-[#FDA571] text-white shadow-accentShadow shadow-orange/20 transition hover:shadow-[#FC858C]/30'
          classes={{
            text: '!text-base !font-semibold',
          }}
          onClick={() => {
            router.push('/app/search-pro');
          }}
          text={intl.formatMessage({ id: 'pages.landing.intro.book' })}
          variant='unstyled'
        />
      </div>

      <div className='flex flex-1 items-end'>
        <div className='relative flex h-[calc(100%-2rem)] w-full justify-center'>
          <div className={styles.bubblesGroup}>
            <ServiceCircle iconName='makeup' />
            <ServiceCircle iconName='fitness' />
            <ServiceCircle iconName='haircut' />
            <ServiceCircle iconName='nails' />
          </div>
          <Image
            width={picture.width}
            height={picture.height}
            src={picture}
            className='h-full w-auto object-contain'
            alt='img'
          />

          <div className={styles.bubblesGroup}>
            <ServiceCircle iconName='skincare' />
            <ServiceCircle iconName='faceMassage' />
            <ServiceCircle iconName='eyebrows' />
          </div>
        </div>
      </div>
    </section>
  );
};
