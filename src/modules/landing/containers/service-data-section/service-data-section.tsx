'use client';
import Image from 'next/image';
import { useIntl } from 'react-intl';
// components
import { Button } from '@/modules/core/components/button';
import ServicesSettingsScreenshot from '@/assets/images/services-settings-screenshot.png';
import MyBookingsScreenshot from '@/assets/images/my-bookings-screenshot.png';
import Screenshot from '@/assets/images/screenshot.png';
import Screenshot2 from '@/assets/images/screenshot2.png';
import bg from '@/modules/landing/landing-image/bg.png';
import { IphoneLayout } from '@/modules/core/components/iphone-layout';
import { BrowserView } from '@/modules/core/components/browser-view';

export const ServiceDataSection = () => {
  const intl = useIntl();

  return (
    <section className='w-full px-[30px] md:px-[80px]  py-[60px]'>
      <div className='relative px-14  md:px-[80px] py-[50px]  md:py-[100px] rounded-3xl flex flex-col gap-[70px] md:gap-[100px] z-10'>
        <Image
          className='-z-10 absolute w-full h-full object-fill left-0 top-0 rounded-[20px]'
          src={bg}
          width={bg.width}
          height={bg.height}
          alt='image'
        />
        <div className='flex flex-col sm:grid sm:grid-cols-2 gap-12 lg:gap-16'>
          <div className='flex flex-col gap-10 pt-14'>
            <span className='max-w-[557px] text-4xl lg:text-5xl !text-black font-semibold'>
              {intl.formatMessage({
                id: 'pages.landing.features.booking.title',
              })}
            </span>
            <span className='text-base max-w-[550px] !text-dark'>
              {intl.formatMessage({
                id: 'pages.landing.features.booking.description',
              })}
            </span>
            <Button text='Book Now' variant='outlined' />
          </div>
          <div className='flex items-end flex-1'>
            <IphoneLayout
              imageUrl={Screenshot2.src}
              className='relative left-[100px]'
              width={270}
            />
            <IphoneLayout imageUrl={Screenshot.src} width={300} />
          </div>
        </div>
        <div className='flex flex-col-reverse sm:grid sm:grid-cols-2 gap-[80px]'>
          <div className='relative'>
            <BrowserView
              image={ServicesSettingsScreenshot}
              meta={{
                siteUrl: 'stylesync.com',
                siteIcon: 'google-logo',
                siteName: 'Style Sync',
              }}
              className='shadow-accentShadow !w-[80%] mb-[30%] rounded-lg '
            />
            <BrowserView
              image={MyBookingsScreenshot}
              meta={{
                siteUrl: 'stylesync.com',
                siteIcon: 'google-logo',
                siteName: 'Style Sync',
              }}
              className='!absolute top-[40%] left-[20%] !w-[80%] shadow-accentShadow shadow-orange/15 rounded-lg'
            />
          </div>
          <div className='flex flex-col gap-10 pt-14'>
            <span className='max-w-[557px] text-4xl lg:text-5xl text-black font-semibold'>
              {intl.formatMessage({
                id: 'pages.landing.features.forPro.title',
              })}
            </span>
            <span className='text-base max-w-[550px] !text-dark'>
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
