'use client';
import Image from 'next/image';

// components
import { Button } from '@/modules/core/components/button';
import { Typography } from '@/modules/core/components/typogrpahy';
import blur1 from '@/modules/landing/landing-image/blur1.png';
import blur2 from '@/modules/landing/landing-image/blur2.png';
import bg from '@/modules/landing/landing-image/bg.png';

export const ServiceDataSection = () => {
  return (
    <section className=' w-full px-[30px] md:px-[80px]  py-[60px]'>
      <div className=' relative px-14  md:px-[80px] py-[50px]  md:py-[100px] rounded-3xl flex flex-col gap-[70px] md:gap-[100px] z-10'>
        <Image
          className=' -z-10 absolute w-full h-full left-0 top-0 rounded-[20px]'
          src={bg}
          width={1000}
          height={1000}
          alt='image'
        />
        <div className=' flex flex-col sm:grid sm:grid-cols-2 gap-12 lg:gap-16'>
          <div className=' flex flex-col gap-10'>
            <Typography
              className=' max-w-[557px] !text-4xl  lg:!text-5xl text-dark'
              weight='semibold'
            >
              Features to Ease Your Service Data Management
            </Typography>
            <Typography className=' max-w-[550px]'>
              In the admin dashboard feature, you can manage client data
              accurately, saving time, and incorporating additional features for
              you.
            </Typography>
            <Button
              className=' mx-auto sm:mx-0 !bg-white !border-[#D0D5DD]'
              text='Book now'
              variant='unstyled'
            />
          </div>
          <Image
            className=' shrink-0'
            alt='img'
            src={blur2}
            width={600}
            height={450}
          />
        </div>
        <div className=' flex flex-col-reverse sm:grid sm:grid-cols-2 gap-16'>
          <Image
            className=' shrink-0'
            alt='img'
            src={blur1}
            width={600}
            height={450}
          />
          <div className=' flex flex-col gap-10'>
            <Typography
              className=' max-w-[557px] !text-4xl  lg:!text-5xl text-dark'
              weight='semibold'
            >
              Assignment to be create appointment
            </Typography>
            <Typography className=' max-w-[550px]'>
              Flexibility to schedule clients based on their specified wishes
              and urgency, interacting directly with the master to efficiently
              manage appointments.
            </Typography>
            <Button
              className=' mx-auto sm:mx-0 !bg-white !border-[#D0D5DD]'
              text='Book now'
              variant='unstyled'
            />
          </div>
        </div>
      </div>
    </section>
  );
};
