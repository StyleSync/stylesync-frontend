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
import pictureV2 from '@/assets/images/banner-girlV2.png';
import Bg from '@/assets/images/bg-1.png';

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
    <section className='grid h-screen w-full grid-cols-1 flex-col gap-y-6 pb-4 pt-[38px] [grid-template-rows:0.7fr_1.3fr] sm:pt-[72px]'>
      <div className='flex flex-col items-center justify-end pt-[6vh]'>
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
      <div className='relative flex flex-1'>
        <div className='absolute left-0 top-0 flex h-full w-full justify-center'>
          <div className={clsx(styles.bubblesGroup, 'relative left-[80px]')}>
            <ServiceCircle iconName='makeup' />
            <ServiceCircle iconName='fitness' />
            <ServiceCircle iconName='haircut' />
            <ServiceCircle iconName='nails' />
          </div>
          <div className='relative aspect-square h-full overflow-hidden rounded-full'>
            <Image
              src={Bg}
              alt='bg'
              width={Bg.width}
              height={Bg.height}
              className='absolute left-0 top-0 z-0 h-full w-full opacity-[0.2]'
            />
            <Image
              width={pictureV2.width}
              height={pictureV2.height}
              src={pictureV2}
              className='absolute left-1/2 top-0 z-10 mx-auto h-full w-auto -translate-x-1/2 object-contain'
              alt='img'
            />
          </div>

          <div className={clsx(styles.bubblesGroup, 'relative -left-[60px]')}>
            <ServiceCircle iconName='skincare' />
            <ServiceCircle iconName='faceMassage' />
            <ServiceCircle iconName='eyebrows' />
          </div>
        </div>
      </div>
    </section>
  );
};
