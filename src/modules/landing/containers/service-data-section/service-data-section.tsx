'use client';
import Image from 'next/image';
import { useIntl } from 'react-intl';
// components
import { Button } from '@/modules/core/components/button';
import { IphoneLayout } from '@/modules/core/components/iphone-layout';
import { BrowserView } from '@/modules/core/components/browser-view';
// assets
import ServicesSettingsScreenshot from '@/assets/images/services-settings-screenshot.png';
import MyBookingsScreenshot from '@/assets/images/my-bookings-screenshot.png';
import Screenshot from '@/assets/images/screenshot.png';
import Screenshot2 from '@/assets/images/screenshot2.png';
import bg from '@/modules/landing/landing-image/bg.png';

export const ServiceDataSection = () => {
  const intl = useIntl();

  return (
    <section className='w-full px-6 pb-[60px] pt-4 sm:py-[60px] lg:px-[80px]'>
      <div className='relative z-10 flex flex-col gap-[70px] rounded-3xl px-8 py-[50px] sm:px-10 lg:gap-[100px] lg:px-[80px] lg:py-[80px]'>
        <Image
          className='absolute left-0 top-0 -z-10 h-full w-full rounded-[20px] object-fill'
          src={bg}
          width={bg.width}
          height={bg.height}
          alt='image'
        />
        <div className='flex flex-col gap-12 sm:grid sm:grid-cols-2 lg:gap-10 xl:gap-16'>
          <div className='flex flex-col gap-10 lg:pt-12'>
            <span className='max-w-[557px] text-4xl font-semibold !text-black lg:text-5xl'>
              {intl.formatMessage({
                id: 'pages.landing.features.booking.title',
              })}
            </span>
            <span className='max-w-[550px] text-base !text-dark'>
              {intl.formatMessage({
                id: 'pages.landing.features.booking.description',
              })}
            </span>
            <Button text='Book Now' variant='outlined' />
          </div>
          <div className='flex flex-1 items-end'>
            <IphoneLayout
              imageUrl={Screenshot2.src}
              className='relative left-[50px] z-10 sm:left-[70px] xl:left-[100px]'
              width={270}
            />
            <IphoneLayout
              imageUrl={Screenshot.src}
              className='relative right-[50px] sm:right-0'
              width={300}
            />
          </div>
        </div>
        <div className='flex flex-col-reverse gap-[80px] sm:grid sm:grid-cols-2'>
          <div className='relative'>
            <BrowserView
              image={ServicesSettingsScreenshot}
              meta={{
                siteUrl: 'stylesync.com',
                siteIcon: 'google-logo',
                siteName: 'Style Sync',
              }}
              className='mb-[30%] !w-[80%] rounded-lg shadow-accentShadow'
            />
            <BrowserView
              image={MyBookingsScreenshot}
              meta={{
                siteUrl: 'stylesync.com',
                siteIcon: 'google-logo',
                siteName: 'Style Sync',
              }}
              className='!absolute left-[20%] top-[40%] !w-[80%] rounded-lg shadow-accentShadow shadow-orange/15'
            />
          </div>
          <div className='flex flex-col gap-10 pt-14'>
            <span className='max-w-[557px] text-4xl font-semibold text-black lg:text-5xl'>
              {intl.formatMessage({
                id: 'pages.landing.features.forPro.title',
              })}
            </span>
            <span className='max-w-[550px] text-base !text-dark'>
              {intl.formatMessage({
                id: 'pages.landing.features.forPro.description',
              })}
            </span>
            <Button text='Become a Pro Now' variant='outlined' />
          </div>
        </div>
      </div>
    </section>
  );
};
