import { type FC } from 'react';
// components
import { Popover } from '@/modules/core/components/popover';
import { Button } from '@/modules/core/components/button';

import type { UserContactPopupProps } from './user-contact-popup.interface';
import styles from './user-contact-popup.module.scss';

export const UserContactPopup: FC<UserContactPopupProps> = ({ ...props }) => {
  return (
    <Popover {...props}>
      <div className={styles.root}>
        <Button icon='phone' />
        <Button icon='instagram-logo' />
      </div>
    </Popover>
  );
};
