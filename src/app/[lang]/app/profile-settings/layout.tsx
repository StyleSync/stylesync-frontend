// containers
import { ProfileSettingsNavigation } from '@/modules/user/containers/profile-settings-navigation/profile-settings-navigation';
// types
import type { ChildrenProp } from '@/modules/core/types/react.types';
// component
import { InviteBox } from '@/modules/core/components/invite-box';

import styles from './profile-settings.module.scss';

export default function ProfileSettingsLayout({ children }: ChildrenProp) {
  return (
    <div className={styles.root}>
      <ProfileSettingsNavigation />
      <div className={styles.mainContainer}>{children}</div>

      <div className={styles.menuInvite}>
        <InviteBox
          variant='link'
          titleColor='yellow'
          copyText='stylesync/gloria-dalas'
          title='Link to your profile!'
          subTitle='We highly recommend adding a link to your business account on Instagram, Facebook, or any other platform you use to connect with your clients'
        />
        <InviteBox
          variant='invite'
          titleColor='blue'
          copyText='stylesync/invite.com.us'
          title='Invite your friends!'
          subTitle='To invite your friend use this referal link'
          icon={[
            'instagram-logo-invite',
            'facebook-logo',
            'facebook-messenger',
            'gmail',
            'viber',
          ]}
        />
      </div>
    </div>
  );
}
