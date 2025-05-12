'use client';
import { useIntl } from 'react-intl';

import { Divider } from '@/modules/core/components/divider';
import { Icon } from '@/modules/core/components/icon';
import { Typography } from '@/modules/core/components/typogrpahy';

export const Footer = () => {
  const intl = useIntl();

  return (
    <footer className='relative z-10 flex w-full flex-col bg-[#0F1019]'>
      <div className='pb-[110px] pl-[100px] pr-[100px] pt-20'>
        <div className='flex flex-col items-center gap-[30px] lg:flex-row lg:justify-between'>
          <div className='flex items-center gap-[36px]'>
            <span
              onClick={() => {
                window.open('/app/privacy/policy', '_blank');
              }}
              className='whitespace-nowrap !text-[#767A85] duration-200 hover:cursor-pointer hover:!text-white'
            >
              {intl.formatMessage({ id: 'privacy.policy' })}
            </span>
            <span
              onClick={() => {
                window.open('/app/privacy/terms', '_blank');
              }}
              className='whitespace-nowrap !text-[#767A85] duration-200 hover:cursor-pointer hover:!text-white'
            >
              {intl.formatMessage({ id: 'privacy.terms' })}
            </span>
          </div>
          <Icon
            className='lg:mr-[325px]'
            name='logoLanding'
            width={169}
            height={40}
          />
          <div className='flex justify-end gap-[24px]'>
            {/* <Icon
              className='text-[#767A85] duration-200 hover:cursor-pointer hover:!text-white'
              name='facebookLanding'
              width={30}
              height={30}
            />
            <Icon
              className='text-[#767A85] duration-200 hover:cursor-pointer hover:!text-white'
              name='xLanding'
              width={30}
              height={30}
            /> */}
            <Icon
              className='text-[#767A85] duration-200 hover:cursor-pointer hover:!text-white'
              name='instagramLanding'
              width={30}
              height={30}
            />
          </div>
        </div>

        <Divider className='mt-[66px]' variant='horizontal' />
        <Typography
          className='mt-[40px] flex justify-center !text-[#767A85]'
          variant='body2'
          weight='semibold'
        >
          © StyleSync 2025
        </Typography>
      </div>
    </footer>
  );
};
