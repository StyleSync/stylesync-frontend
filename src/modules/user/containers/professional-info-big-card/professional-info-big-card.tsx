'use client';
import type { FC } from 'react';
import Link from 'next/link';
import { faker } from '@faker-js/faker';
import clsx from 'clsx';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { Button } from '@/modules/core/components/button';
import { Icon } from '@/modules/core/components/icon';
import { Avatar } from '@/modules/core/components/avatar';
import { ServiceTag } from '@/modules/service/components/service-tag';
import { Emoji } from '@/modules/core/components/emoji';
import { Placeholder } from '@/modules/core/components/placeholder';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
import { getFullName } from '@/modules/user/utils/user.utils';

import type { ProfileInfoBigCardProps } from './professional-info-big-card.interface';
import styles from './professional-info-big-card.module.scss';

export const ProfessionalInfoBigCard: FC<ProfileInfoBigCardProps> = () => {
  const { data: me, ...meQuery } = trpc.user.me.useQuery();

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Placeholder
          className={clsx('skeleton', styles.avatarSkeleton)}
          isActive={meQuery.isLoading}
          placeholder={null}
        >
          <Avatar
            className={styles.avatar}
            size='medium'
            shadow
            shape='rect'
            fallback={<Emoji name='sunglasses' width={50} height={50} />}
            url={me?.avatar}
          />
        </Placeholder>
        <Placeholder
          className={clsx('skeleton', styles.nameSkeleton)}
          isActive={meQuery.isLoading}
          placeholder={null}
        >
          <Typography className={styles.name} variant='title'>
            {getFullName(me ?? {})}
          </Typography>
        </Placeholder>
      </div>
      <div className={styles.info}>
        <div className={styles.general}>
          <div className={styles.services}>
            <Placeholder
              className={styles.servicesSkeleton}
              isActive={meQuery.isLoading}
              placeholder={
                <>
                  <div className='skeleton' />
                  <div className='skeleton' />
                  <div className='skeleton' />
                </>
              }
            >
              <ServiceTag className={styles.service} service='hair' />
              <ServiceTag className={styles.service} service='makeup' />
              <ServiceTag className={styles.service} service='nails' />
            </Placeholder>
          </div>
          <div className={styles.location}>
            <Placeholder
              className={clsx('skeleton', styles.locationSkeleton)}
              isActive={meQuery.isLoading}
              placeholder={null}
            >
              <Icon name='location' />
              <Typography>
                {faker.location.streetAddress({ useFullAddress: true })}
              </Typography>
              <Typography>
                <Link href='#' className={clsx('link', styles.showOnMapLink)}>
                  Show on map
                </Link>
              </Typography>
            </Placeholder>
          </div>
        </div>
        <div className={styles.actions}>
          <Button
            variant='secondary'
            text='Send message'
            disabled={meQuery.isLoading}
          />
          <Button variant='primary' text='Book' disabled={meQuery.isLoading} />
        </div>
      </div>
    </div>
  );
};