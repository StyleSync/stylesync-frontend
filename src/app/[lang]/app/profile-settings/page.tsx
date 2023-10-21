'use client';
import clsx from 'clsx';
// components
import { InviteBox } from '@/modules/core/components/invite-box';
import { Button } from '@/modules/core/components/button';
// containers
import { ProfileSettingsNavigation } from '@/modules/user/containers/profile-settings-navigation';
import { ProfileSettingsContent } from '@/modules/user/containers/profile-settings-content';

import styles from './profile-settings.module.scss';

export default function ProfileSettingsAbout() {
  return (
    <div className={styles.root}>
      <section className={clsx(styles.sideSection, styles.left)}>
        <ProfileSettingsNavigation />
      </section>
      <div className={clsx('pageContent', styles.container)}>
        <ProfileSettingsContent />
      </div>
      <section className={clsx(styles.sideSection, styles.right)}>
        <InviteBox
          copyText='stylesync/gloria-dalas'
          title='Link to your profile!'
          bg='linear-gradient(-45deg, #89f7fe 0%, #66a6ff 100%)'
          subTitle='We highly recommend adding a link to your business account on Instagram, Facebook, or any other platform you use to connect with your clients'
        />
        <InviteBox
          copyText='stylesync/invite.com.us'
          title='Invite your friends!'
          subTitle='To invite your friend use this referal link'
          bg='linear-gradient(-45deg, rgb(132, 250, 176) 0%, rgb(143, 211, 244) 100%)'
          slotAfterCopyBox={
            <div className={styles.social}>
              <Button icon='facebook-logo' variant='unstyled' />
              <Button icon='instagram-logo-invite' variant='unstyled' />
              <Button icon='facebook-messenger' variant='unstyled' />
              <Button icon='gmail' variant='unstyled' />
              <Button icon='viber' variant='unstyled' />
            </div>
          }
        />
      </section>
    </div>
  );
}
