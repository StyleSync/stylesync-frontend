'use client';
import Link from 'next/link';
import { faker } from '@faker-js/faker';
// components
import { Typography, Button, Icon, Avatar } from '@/modules/core/components';
import { ServiceTag } from '@/modules/service/components';
// temp
import GirlPng from '@/assets/images/girl.png';

import styles from './user-header.module.scss';
import clsx from 'clsx';

export const UserHeader = () => {
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
          <Button variant='secondary' text='Send message' />
          <Button variant='primary' text='Book' />
        </div>
      </div>
    </div>
  );
};
