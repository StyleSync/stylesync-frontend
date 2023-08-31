'use client';
import styles from './user-header.module.scss';
// components
import { Typography, Button, Icon, Avatar } from '@/modules/core/components';
import { ServiceTag } from '@/modules/service/components';
import { useWindowSize } from 'usehooks-ts';

export const UserHeader = () => {
  const { width } = useWindowSize();
  const mobileBreakpoint = 450;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography className={styles.title} variant='title'>
          Tennisha’s Beauty
        </Typography>
      </div>
      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <Avatar
            className={styles.avatar}
            shadow
            shape='rect'
            size={width < mobileBreakpoint ? 'medium' : 'large'}
          />
          <div className={styles.tagsAndMap}>
            <div className={styles.serviceTags}>
              <div className={styles.tags}>
                <ServiceTag service='hair' />
                <ServiceTag service='nails' />
                <ServiceTag service='makeup' />
              </div>
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
