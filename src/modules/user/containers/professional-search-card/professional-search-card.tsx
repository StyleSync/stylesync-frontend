import { type FC } from 'react';

import { useRouter } from 'next/navigation';
import { useIntl } from 'react-intl';

import { Avatar } from '@/modules/core/components/avatar';
import { Icon, type IconName } from '@/modules/core/components/icon';
import { Typography } from '@/modules/core/components/typogrpahy';
import { getFullName } from '@/modules/user/utils/user.utils';

import type { ProfessionalSearchCardProps } from './professional-search-card.interface';

export const ProfessionalSearchCard: FC<ProfessionalSearchCardProps> = ({
  professional,
}) => {
  const intl = useIntl();
  const router = useRouter();

  return (
    <div
      onClick={() =>
        router.push(
          `/app/profile/${professional.user?.nickname || professional.user.id}`
        )
      }
      className='flex h-fit w-full cursor-pointer flex-col justify-between gap-y-0 overflow-hidden rounded-xl bg-white pb-6 shadow transition hover:shadow-accentShadow'
    >
      <div className='relative flex flex-col gap-x-4 object-fill'>
        <Avatar
          url={professional.user.avatar}
          size={200}
          shape='rect'
          className='z-10 !w-full !rounded-none !border-none'
        />
        <div className='z-10 flex flex-col justify-center gap-y-6 px-4 pt-6'>
          <div className='flex items-center gap-x-2'>
            <Typography variant='body1' weight='medium'>
              {getFullName(professional.user)}
            </Typography>
            <div className='flex h-[14px] w-[14px] items-center justify-center rounded-full bg-dark'>
              <Icon name='check-mark' color='#fff' />
            </div>
          </div>
          <div className='flex flex-col gap-y-3'>
            <div className='flex w-full items-center gap-x-2 text-dark'>
              <Icon name='location' className='h-4 w-4 !text-gray' />
              <Typography variant='body2' className='truncate !text-inherit'>
                {professional.location?.name}
              </Typography>
            </div>
            {/* todo: show this label if doesn't have bookings for last 7 days and the user has been registered less than 1 week ago  */}
            {/* <div className='flex w-fit items-center gap-x-2 text-green'> */}
            {/*   <Icon name='time' className='w-4 h-4' /> */}
            {/*   <Typography variant='body2' className='!text-inherit'> */}
            {/*     New on site */}
            {/*   </Typography> */}
            {/* </div> */}
            <div className='flex w-fit items-center gap-x-2 text-dark'>
              {professional.mainServices.length > 2 ? (
                <Icon
                  name='clipboard'
                  className='ml-[-1px] h-4 w-4 !text-gray'
                />
              ) : (
                professional.mainServices.map((service) => (
                  <Icon
                    key={service.id}
                    name={service.icon as IconName}
                    className='h-4 w-4 !text-gray'
                  />
                ))
              )}
              {/* {professional.mainServices.map((service) => (
                <Icon
                  key={service.id}
                  name={
                    professional.mainServices.length <= 2
                      ? (service.icon as IconName)
                      : 'clipboard'
                  }
                  className='h-4 w-4 !text-gray'
                />
              ))} */}
              {professional.mainServices.map((service, index) => (
                <Typography
                  key={service.id}
                  variant='body2'
                  className='!text-inherit'
                >
                  {intl.formatMessage({ id: service.name })}
                  {index < professional.mainServices.length - 1 && ','}
                </Typography>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
