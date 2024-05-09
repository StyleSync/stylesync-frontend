import Image from 'next/image';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import apple from '@/modules/landing/landing-image/applePay.png';
import net from '@/modules/landing/landing-image/big-net.png';
import android from '@/modules/landing/landing-image/googlePay.png';
import iphone from '@/modules/landing/landing-image/ipnone13.png';

export const DownloandSection = () => {
  return (
    <section className=' relative w-full flex flex-col justify-center items-center mt-20 p-3'>
      <Image
        className=' absolute w-full h-full top-0 left-0 z-0'
        src={net}
        alt='img'
        width={1000}
        height={1000}
      />
      <div
        className=' absolute bottom-0 left-0 w-full h-[170px] z-10'
        style={{
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 70%)',
        }}
      />
      <div className=' flex flex-col gap-5'>
        <Typography
          weight='semibold'
          className='!text-4xl md:!text-5xl text-dark text-center'
        >
          Responsive Detail Medical Record
        </Typography>
        <Typography
          variant='body1'
          className='text-center !text-gray max-w-[820px] px-2'
        >
          An efficient dental appointment is one that is well-organized,
          minimizes waiting times, and ensures effective communication between
          the dental team and the patient.
        </Typography>
        <div className=' flex justify-center gap-5 md:gap-8'>
          <div className=' w-[140px] h-[50px] md:w-40 md:h-[50px] bg-black rounded-lg flex pl-4 pb-3 pt-3 items-center gap-3 hover:cursor-pointer'>
            <Image
              className=' z-10'
              width={24}
              height={24}
              alt='img'
              src={apple}
            />
            <div className=' flex flex-col'>
              <Typography className=' !text-white'>Get it on</Typography>
              <Typography
                weight='semibold'
                variant='body2'
                className=' !text-white z-10'
              >
                Apple Store
              </Typography>
            </div>
          </div>
          <div className=' w-[140px] h-[50px] md:w-40 md:h-[50px] bg-black rounded-lg flex pl-4 pb-3 pt-3 items-center gap-2 hover:cursor-pointer'>
            <Image width={24} height={24} alt='img' src={android} />
            <div className=' flex flex-col'>
              <Typography className='  !text-white'>Get it on</Typography>
              <Typography
                weight='semibold'
                variant='body2'
                className=' !text-white '
              >
                Apple Store
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <Image
        className=' mt-[104px]'
        width={800}
        height={700}
        alt='img'
        src={iphone}
      />
    </section>
  );
};
