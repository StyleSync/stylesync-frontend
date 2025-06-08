'use client';

import Image from 'next/image';
// import { useRouter } from 'next/navigation';
import { useIntl } from 'react-intl';

import Bg from '@/assets/images/bg-1.png';
import pictureV2 from '@/assets/images/temp2.png';
import { Button } from '@/modules/core/components/button';

export const IntroSection = () => {
  // const router = useRouter();
  const intl = useIntl();

  return (
    <section className='relative flex h-screen w-full'>
      <div className='z-10 mx-auto flex max-w-[1200px] flex-1 flex-row gap-x-8'>
        <div className='flex flex-1 flex-col justify-center gap-y-6'>
          {/* <div className={clsx('flex items-center gap-x-4')}>
            <ServiceCircle iconName='skincare' size={60} />
            <ServiceCircle iconName='makeup' size={70} />
            <ServiceCircle iconName='haircut' size={80} />
            <ServiceCircle iconName='nails' size={70} />
            <ServiceCircle iconName='fitness' size={60} />
          </div> */}
          <h1 className='text-6xl font-semibold leading-[1.2]'>
            <span className='bg-gradient-to-r from-black to-black bg-clip-text text-transparent'>
              Всі твої записи — в одному місці
            </span>
          </h1>
          <span className='text-xl font-normal text-dark'>
            Сервіс для запису, який розуміє твої потреби. Без адмінів. Без
            складнощів.
          </span>
          <div className='flex flex-col gap-y-4'>
            <Button
              rippleColor='rgba(255,255,255,0.3)'
              className='z-10 mt-7 !h-[52px] rounded-[26px] bg-gradient-to-r from-[#FA719A] to-[#FDA571] text-white shadow-accentShadow shadow-orange/20 transition hover:shadow-[#FC858C]/30'
              classes={{
                text: '!text-base !font-semibold',
              }}
              onClick={() => {}}
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
        className='absolute bottom-0 left-0 z-[15] hidden h-[300px] w-full max-w-full sm:flex'
        style={{
          background: 'linear-gradient(180deg, transparent 0%, white 70%)',
        }}
      />
    </section>
  );

  // return (
  //   <section className='grid h-screen w-full grid-cols-1 flex-col gap-y-6 pb-4 pt-[38px] [grid-template-rows:0.7fr_1.3fr] sm:pt-[72px]'>
  //     <div className='flex flex-col items-center justify-end pt-[6vh]'>
  //       <Typography
  //         className='max-w-[820px] px-2 text-center !text-5xl !font-semibold !text-black md:!text-6xl'
  //         variant='title'
  //         weight='semibold'
  //       >
  //         {intl.formatMessage({ id: 'pages.landing.intro.title' })}
  //       </Typography>
  //       <Typography
  //         variant='body1'
  //         className='mt-6 px-2 text-center !text-gray-accent'
  //       >
  //         {intl.formatMessage({ id: 'pages.landing.intro.subtitle' })}
  //       </Typography>
  //       {/* <Button
  //         rippleColor='rgba(255,255,255,0.3)'
  //         className='z-10 mx-auto mt-7 !h-[52px] rounded-[26px] bg-gradient-to-r from-[#FA719A] to-[#FDA571] text-white shadow-accentShadow shadow-orange/20 transition hover:shadow-[#FC858C]/30'
  //         classes={{
  //           text: '!text-base !font-semibold',
  //         }}
  //         onClick={() => {
  //           router.push('/app/search-pro');
  //         }}
  //         text={intl.formatMessage({ id: 'pages.landing.intro.book' })}
  //         variant='unstyled'
  //       /> */}
  //     </div>
  //     <div className='relative flex flex-1'>
  //       <div className='absolute left-0 top-0 flex h-full w-full justify-center'>
  //         <div className={clsx(styles.bubblesGroup, 'relative left-[80px]')}>
  //           <ServiceCircle iconName='makeup' />
  //           <ServiceCircle iconName='fitness' />
  //           <ServiceCircle iconName='haircut' />
  //           <ServiceCircle iconName='nails' />
  //         </div>
  //         <div className='relative aspect-square h-full overflow-hidden rounded-full'>
  //           <Image
  //             src={Bg}
  //             alt='bg'
  //             width={Bg.width}
  //             height={Bg.height}
  //             className='absolute left-0 top-0 z-0 h-full w-full opacity-[0.2]'
  //           />
  //           <Image
  //             width={pictureV2.width}
  //             height={pictureV2.height}
  //             src={pictureV2}
  //             className='absolute left-1/2 top-0 z-10 mx-auto h-full w-auto -translate-x-1/2 object-contain'
  //             alt='img'
  //           />
  //         </div>
  //
  //         <div className={clsx(styles.bubblesGroup, 'relative -left-[60px]')}>
  //           <ServiceCircle iconName='skincare' />
  //           <ServiceCircle iconName='faceMassage' />
  //           <ServiceCircle iconName='eyebrows' />
  //         </div>
  //       </div>
  //     </div>
  //   </section>
  // );
};
