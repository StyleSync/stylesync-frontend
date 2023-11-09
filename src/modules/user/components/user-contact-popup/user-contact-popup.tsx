import { type FC } from 'react';
import clsx from 'clsx';
// components
import { Popover } from '@/modules/core/components/popover';
import { Button } from '@/modules/core/components/button';

import type { UserContactPopupProps } from './user-contact-popup.interface';
import styles from './user-contact-popup.module.scss';

export const UserContactPopup: FC<UserContactPopupProps> = ({ ...props }) => {
  return (
    <Popover {...props} sideOffset={5} side='bottom'>
      <div className={styles.root}>
        <Button
          icon='phone'
          className={clsx('focusable', styles.socialBtn, styles.phone)}
          variant='unstyled'
          rippleColor={styles.rippleColor}
        />
        <Button
          icon='facebook'
          className={clsx('focusable', styles.socialBtn, styles.facebook)}
          variant='unstyled'
          rippleColor={styles.rippleColor}
        />
        <Button
          icon='instagram'
          className={clsx('focusable', styles.socialBtn, styles.instagram)}
          variant='unstyled'
          rippleColor={styles.rippleColor}
        />
        <Button
          icon='inbox'
          className={clsx('focusable', styles.socialBtn, styles.mail)}
          variant='unstyled'
          rippleColor={styles.rippleColor}
        />
      </div>
    </Popover>
  );
};
