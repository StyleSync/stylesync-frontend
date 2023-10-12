import { Avatar } from '@/modules/core/components/avatar';
import { Typography } from '@/modules/core/components/typogrpahy';
import { Icon } from '@/modules/core/components/icon';

import styles from './profile-settings-navigation.module.scss';

export const ProfileSettingsNavigation = () => {
  return (
    <div>
      <div className={styles.menu}>
        <div className={styles.menuHeader}>
          <div className={styles.menuHeaderAvatar}>
            <Avatar size='medium' />
          </div>
          <div className={styles.menuHeaderName}>
            <Typography className={styles.headerTitle} variant='title'>
              Gloria Dallas
            </Typography>
          </div>
          <div className={styles.menuHeaderEmail}>
            <Typography className={styles.email} variant='small'>
              gloria_dalas@gmail.com
            </Typography>
          </div>
          <div className={styles.menuHeaderNumber}>
            <Typography className={styles.number} variant='small'>
              +38 099 022 78 56
            </Typography>
          </div>
        </div>
        <div className={styles.menuTabs}>
          <div className={styles.menuTab}>
            <Icon width={20} height={20} name='info' />
            <Typography className={styles.text} variant='body2'>
              About
            </Typography>
          </div>
          <div className={styles.menuTab}>
            <Icon width={20} height={20} name='folder' />
            <Typography className={styles.text} variant='body2'>
              Portfolio
            </Typography>
          </div>
          <div className={styles.menuTab}>
            <Icon width={20} height={20} name='beauty-service' />
            <Typography className={styles.text} variant='body2'>
              Services
            </Typography>
          </div>
          <div className={styles.menuTab}>
            <Icon width={20} height={20} name='calendar' />
            <Typography className={styles.text} variant='body2'>
              Schedule
            </Typography>
          </div>
          <div className={styles.menuTab}>
            <Icon width={20} height={20} name='location' />
            <Typography className={styles.text} variant='body2'>
              Location
            </Typography>
          </div>
        </div>

        <Typography className={styles.menuPolicy} variant='body2'>
          <span>Terms of Service</span> and <span>Privacy Policy</span>
        </Typography>
      </div>
    </div>
  );
};
