'use client';
import styles from './user-header.module.scss';
// components
import { Typography, Button, Icon } from '@/modules/core/components';
import { ServiceTag } from '@/modules/service/components';

export const UserHeader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography className={styles.title} variant='title'>
          Tennisha’s Beauty
        </Typography>
      </div>
      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <img src='#' alt='d' />
          <div className={styles.tagsAndMap}>
            <div className={styles.serviceTags}>
              <ServiceTag service='hair' />
              <ServiceTag service='nails' />
              <ServiceTag service='makeup' />
              <span className={styles.additionalCount}>
                <Typography variant='small'>+2</Typography>
              </span>
            </div>
            <div className={styles.locationSection}>
              <Icon className={styles.locationIcon} name='location' />
              <Typography variant='body2' className={styles.distance}>
                290 m. from you
              </Typography>
              <Typography variant='body2' className={styles.showOnMap}>
                Show on map
              </Typography>
            </div>
          </div>
          <div className={styles.footerButtons}>
            <Button variant='secondary' text='Send message' />
            <Button variant='primary' text='Book' />
          </div>
        </div>
      </div>
    </div>
  );
};
