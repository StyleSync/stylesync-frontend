'use client';
import Link from 'next/link';
import { faker } from '@faker-js/faker';
// components
import { Typography, Button, Icon, Avatar } from '@/modules/core/components';
import { ServiceTag } from '@/modules/service/components';
// temp
import GirlPng from '@/assets/images/girl.png';

import styles from './user-header.module.scss';

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
            <Link href='#' className={styles.link}>
              <Typography>Show on map</Typography>
            </Link>
          </div>
        </div>
        <div className={styles.actions}>
          <Button variant='secondary' text='Send message' />
          <Button variant='primary' text='Book' />
        </div>
      </div>
      {/* <div className={styles.footer}>*/}
      {/*  <div className={styles.footerContent}>*/}
      {/*    <div className={styles.tagsAndMap}>*/}
      {/*      <div className={styles.serviceTags}>*/}
      {/*        <div className={styles.tags}>*/}
      {/*          <ServiceTag service='hair' />*/}
      {/*          <ServiceTag service='nails' />*/}
      {/*          <ServiceTag service='makeup' />*/}
      {/*        </div>*/}
      {/*        <span className={styles.additionalCount}>*/}
      {/*          <Typography variant='small'>+2</Typography>*/}
      {/*        </span>*/}
      {/*      </div>*/}
      {/*      <div className={styles.locationSection}>*/}
      {/*        <Icon className={styles.locationIcon} name='location' />*/}
      {/*        <Typography variant='body2' className={styles.distance}>*/}
      {/*          290 m. from you*/}
      {/*        </Typography>*/}
      {/*        <Typography variant='body2' className={styles.showOnMap}>*/}
      {/*          Show on map*/}
      {/*        </Typography>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div className={styles.footerButtons}>*/}
      {/*      <Button variant='secondary' text='Send message' />*/}
      {/*      <Button variant='primary' text='Book' />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/* </div>*/}
    </div>
  );
};
