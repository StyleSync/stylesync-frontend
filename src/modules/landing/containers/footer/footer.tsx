import Image from 'next/image';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { Divider } from '@/modules/core/components/divider';

import x from '@/modules/landing/landing-image/X.png';
import facebook from '@/modules/landing/landing-image/facebook.png';
import inst from '@/modules/landing/landing-image/inst.png';
import logo from '@/modules/landing/landing-image/logo.png';

export const Footer = () => {
  return (
    <footer className=' flex flex-col w-full  bg-black '>
      <div className=' pt-20 pb-11 pl-[100px] pr-[100px]'>
        <div className=' flex flex-col items-center gap-[30px] lg:flex-row  lg:justify-between   '>
          <div className=' flex gap-[36px]'>
            <Typography className=' whitespace-nowrap hover:cursor-pointer'>
              Privacy & Police
            </Typography>
            <Typography className=' whitespace-nowrap hover:cursor-pointer'>
              Terms & conditions
            </Typography>
          </div>
          <div className=' lg:mr-[140px]'>
            <Image width={170} height={44} alt='img' src={logo} />
          </div>
          <div className=' flex gap-[24px] justify-end'>
            <Image
              className=' hover:cursor-pointer'
              width={30}
              height={30}
              alt='img'
              src={facebook}
            />
            <Image
              className=' hover:cursor-pointer'
              width={30}
              height={30}
              alt='img'
              src={x}
            />
            <Image
              className=' hover:cursor-pointer'
              width={30}
              height={30}
              alt='img'
              src={inst}
            />
          </div>
        </div>

        <Divider
          className=' mt-[66px] px-[30px] md:px-[100px]'
          variant='horizontal'
        />
        <Typography
          className=' flex justify-center mt-[40px] !text-[#767A85]'
          variant='body2'
          weight='semibold'
        >
          © StyleSync 2024
        </Typography>
      </div>
    </footer>
  );
};
