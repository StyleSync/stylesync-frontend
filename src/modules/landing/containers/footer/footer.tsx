// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { Divider } from '@/modules/core/components/divider';
import { Icon } from '@/modules/core/components/icon';

export const Footer = () => {
  return (
    <footer className='flex flex-col w-full  bg-black'>
      <div className='pt-20 pb-11 pl-[100px] pr-[100px]'>
        <div className='flex flex-col items-center gap-[30px] lg:flex-row  lg:justify-between'>
          <div className=' flex gap-[36px]'>
            <Typography className='whitespace-nowrap hover:cursor-pointer hover:!text-white duration-200 !text-[#767A85]'>
              Privacy & Police
            </Typography>
            <Typography className='whitespace-nowrap hover:cursor-pointer hover:!text-white duration-200 !text-[#767A85]'>
              Terms & conditions
            </Typography>
          </div>
          <Icon
            className='lg:mr-[140px]'
            name='logoLanding'
            width={169}
            height={40}
          />
          <div className='flex gap-[24px] justify-end'>
            <Icon
              className='hover:cursor-pointer hover:!text-white duration-200 text-[#767A85]'
              name='facebookLanding'
              width={30}
              height={30}
            />
            <Icon
              className='hover:cursor-pointer hover:!text-white duration-200 text-[#767A85]'
              name='xLanding'
              width={30}
              height={30}
            />
            <Icon
              className='hover:cursor-pointer hover:!text-white duration-200 text-[#767A85]'
              name='instagramLanding'
              width={30}
              height={30}
            />
          </div>
        </div>

        <Divider className='mt-[66px]' variant='horizontal' />
        <Typography
          className='flex justify-center mt-[40px] !text-[#767A85]'
          variant='body2'
          weight='semibold'
        >
          © StyleSync 2024
        </Typography>
      </div>
    </footer>
  );
};
