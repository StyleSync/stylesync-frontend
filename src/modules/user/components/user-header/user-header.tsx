'use client';
import Link from 'next/link';
import clsx from 'clsx';
import { faker } from '@faker-js/faker';
import { useBoolean } from 'usehooks-ts';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { Button } from '@/modules/core/components/button';
import { Icon } from '@/modules/core/components/icon';
import { Avatar } from '@/modules/core/components/avatar';
import { ServiceTag } from '@/modules/service/components/service-tag';
import { UserContactPopup } from '@/modules/user/components/user-contact-popup';
// temp
import GirlPng from '@/assets/images/girl.png';

import styles from './user-header.module.scss';

export const UserHeader = () => {
  const isOpen = useBoolean();

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Avatar
          className={styles.avatar}
          size='medium'
          shadow
          shape='rect'
          url={GirlPng.src}
        />
        <Typography className={styles.name} variant='title'>
          Tennisha’s Beauty
        </Typography>
      </div>
      <div className={styles.info}>
        <div className={styles.general}>
          <div className={styles.services}>
            <ServiceTag className={styles.service} service='hair' />
            <ServiceTag className={styles.service} service='makeup' />
            <ServiceTag className={styles.service} service='nails' />
          </div>
          <div className={styles.location}>
            <Icon name='location' />
            <Typography>
              {faker.location.streetAddress({ useFullAddress: true })}
            </Typography>
            <Typography>
              <Link href='#' className={clsx('link', styles.showOnMapLink)}>
                Show on map
              </Link>
            </Typography>
          </div>
        </div>
        <div className={styles.actions}>
          <UserContactPopup
            isOpen={isOpen.value}
            onClose={isOpen.setFalse}
            trigger={
              <Button
                onClick={isOpen.setTrue}
                variant='secondary'
                text='Contact'
              />
            }
          />
          <Button variant='primary' text='Book' />
        </div>
      </div>
    </div>
  );
};
