import { type FC } from 'react';

import { Avatar } from '@/modules/core/components/avatar';

import { type ClientCardProps } from './client-card.interface';

export const ClientCard: FC<ClientCardProps> = ({
  name,
  phone,
  isLast,
  onClick,
  image,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-[10px] py-3 pl-6 hover:cursor-pointer ${isLast ? '' : 'border-b border-gray-light px-6'} `}
    >
      <Avatar
        fallback={
          name
            ? `${name.split(' ')[0]?.[0] ?? ''}${name.split(' ')[1]?.[0] ?? ''}`
            : ''
        }
        url={image ?? ''}
      />
      <div className='flex flex-col'>
        <span>{name}</span>
        <span className='text-gray'>{phone}</span>
      </div>
    </div>
  );
};
