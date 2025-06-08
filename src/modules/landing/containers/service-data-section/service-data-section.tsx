'use client';
import Image from 'next/image';
import { useIntl } from 'react-intl';

import Bg from '@/assets/images/bg-1.png';
import searchEn from '@/assets/images/en-pro-search.png';
import profileEn from '@/assets/images/profile1en.png';
import profileUk from '@/assets/images/profile1uk.png';
import searchUk from '@/assets/images/uk-pro-search.png';
import { Button } from '@/modules/core/components/button';
import { Icon } from '@/modules/core/components/icon';
import { IphoneLayout } from '@/modules/core/components/iphone-layout';

export const ServiceDataSection = () => {
  const intl = useIntl();

  const profile = intl.locale === 'uk' ? profileUk.src : profileEn.src;
  const search = intl.locale === 'uk' ? searchUk.src : searchEn.src;

  return (
    <section className='relative mt-8 flex w-full py-56'>
      <div className='z-10 mx-auto flex max-w-[1200px] flex-1 flex-row items-center gap-x-8'>
        <div className='flex flex-1 flex-col gap-y-6'>
          <h1 className='text-5xl font-semibold leading-[1.2]'>
            <span className='bg-gradient-to-r from-black to-black bg-clip-text text-transparent'>
              StyleSync це все автоматизує
            </span>
          </h1>
          <div className='mt-10 flex flex-col gap-4'>
            <div className='flex items-center gap-x-4 rounded-xl bg-white p-4 shadow'>
              <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-green-light'>
                <Icon
                  name='check-mark'
                  width={24}
                  height={24}
                  className='text-green'
                />
              </div>
              <span className='text-lg'>Усі записи в одному місці</span>
            </div>
            <div className='flex items-center gap-x-4 rounded-xl bg-white p-4 shadow'>
              <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-light'>
                <Icon
                  name='check-mark'
                  width={24}
                  height={24}
                  className='text-green'
                />
              </div>
              <span className='text-lg'>
                Гнучкі налаштування - адаптуй платформу під свій стиль роботи
              </span>
            </div>
            <div className='flex items-center gap-x-4 rounded-xl bg-white p-4 shadow'>
              <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-light'>
                <Icon
                  name='check-mark'
                  width={24}
                  height={24}
                  className='text-green'
                />
              </div>
              <span className='text-lg'>
                SMS нагадування - клієнти не забудуть про запис
              </span>
            </div>
            <div className='flex items-center gap-x-4 rounded-xl bg-white p-4 shadow'>
              <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-light'>
                <Icon
                  name='check-mark'
                  width={24}
                  height={24}
                  className='text-green'
                />
              </div>
              <span className='text-lg'>
                Легке керування бронюваннями - підтверджуй або скасовуй записи
                за кілька кліків
              </span>
            </div>
          </div>
          <Button
            text='Почати користуватися'
            variant='primary'
            classes={{
              root: '!h-12',
              text: '!text-base',
            }}
            className='mt-10'
          />
        </div>
        <div className='flex-1'>
          <div className='flex flex-1 items-end'>
            <IphoneLayout
              imageUrl={profile}
              className='relative left-[50px] z-10 sm:left-[70px] xl:left-[100px]'
              width={300}
            />
            <IphoneLayout
              imageUrl={search}
              className='relative right-[50px] sm:right-0'
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
        className='absolute left-0 top-0 z-[15] hidden h-[240px] w-full max-w-full sm:flex'
        style={{
          background: 'linear-gradient(0deg, transparent 0%, white 70%)',
        }}
      />
      <div
        className='absolute bottom-0 left-0 z-[15] hidden h-[240px] w-full max-w-full sm:flex'
        style={{
          background: 'linear-gradient(180deg, transparent 0%, white 70%)',
        }}
      />
    </section>
  );

  // return (
  //   <section className='w-full px-4 pb-[60px] pt-4 sm:py-[60px] lg:px-[80px]'>
  //     <div className='relative z-10 flex flex-col gap-[70px] rounded-3xl px-8 py-[50px] sm:px-10 lg:gap-[100px] lg:px-[80px] lg:py-[80px]'>
  //       <Image
  //         className='absolute left-0 top-0 -z-10 h-full w-full rounded-[20px] object-fill'
  //         src={bg}
  //         width={bg.width}
  //         height={bg.height}
  //         alt='image'
  //       />
  //       <div className='flex flex-col gap-12 sm:grid sm:grid-cols-2 lg:gap-10 xl:gap-16'>
  //         <div className='flex flex-col gap-10 lg:pt-12'>
  //           <span className='max-w-[557px] text-4xl font-semibold !text-black lg:text-5xl'>
  //             {/* {intl.formatMessage({
  //               id: 'pages.landing.features.booking.title',
  //             })} */}
  //             StyleSync все це автоматизує
  //           </span>
  //           <span className='max-w-[550px] text-base !text-dark'>
  //             {/* {intl.formatMessage({
  //               id: 'pages.landing.features.booking.description',
  //             })} */}
  //           </span>
  //           <Button
  //             text={intl.formatMessage({
  //               id: 'button.book.now',
  //             })}
  //             variant='outlined'
  //           />
  //         </div>
  //         <div className='flex flex-1 items-end'>
  //           <IphoneLayout
  //             imageUrl={profile}
  //             className='relative left-[50px] z-10 sm:left-[70px] xl:left-[100px]'
  //             width={300}
  //           />
  //           <IphoneLayout
  //             imageUrl={search}
  //             className='relative right-[50px] sm:right-0'
  //             width={270}
  //           />
  //         </div>
  //       </div>
  //       <div className='flex flex-col-reverse gap-[80px] sm:grid sm:grid-cols-2'>
  //         <div className='relative'>
  //           <BrowserView
  //             image={ServicesSettingsScreenshot}
  //             meta={{
  //               siteUrl: 'stylesync.com',
  //               siteIcon: 'google-logo',
  //               siteName: 'Style Sync',
  //             }}
  //             className='mb-[30%] !w-[80%] rounded-lg shadow-accentShadow'
  //           />
  //           <BrowserView
  //             image={MyBookingsScreenshot}
  //             meta={{
  //               siteUrl: 'stylesync.com',
  //               siteIcon: 'google-logo',
  //               siteName: 'Style Sync',
  //             }}
  //             className='!absolute left-[20%] top-[40%] !w-[80%] rounded-lg shadow-accentShadow shadow-orange/15'
  //           />
  //         </div>
  //         <div className='flex flex-col gap-10 pt-14'>
  //           <span className='max-w-[557px] text-4xl font-semibold text-black lg:text-5xl'>
  //             {intl.formatMessage({
  //               id: 'pages.landing.features.forPro.title',
  //             })}
  //           </span>
  //           <span className='max-w-[550px] text-base !text-dark'>
  //             {intl.formatMessage({
  //               id: 'pages.landing.features.forPro.description',
  //             })}
  //           </span>
  //           <Button
  //             text={intl.formatMessage({
  //               id: 'button.pro.now',
  //             })}
  //             variant='outlined'
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   </section>
  // );
};
