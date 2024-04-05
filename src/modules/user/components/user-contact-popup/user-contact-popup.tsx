import { type FC } from 'react';
import clsx from 'clsx';
// components
import { Popover } from '@/modules/core/components/popover';
import { Button } from '@/modules/core/components/button';

import type { UserContactPopupProps } from './user-contact-popup.interface';
import styles from './user-contact-popup.module.scss';

export const UserContactPopup: FC<UserContactPopupProps> = ({ ...props }) => {
  const handlePhoneClick = () => {
    if (props.professional && props.professional.user.phone) {
      window.open(`tel:${props.professional.user.phone}`);
    }
  };

  const handleSocialMediaClick = (url?: string | null) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const handleEmailClick = () => {
    if (props.professional && props.professional.user.email) {
      location.href = `mailto:${props.professional.user.email}`;
    }
  };

  return (
    <Popover {...props} sideOffset={5} side='bottom'>
      <div className={styles.root}>
        {props.professional && props.professional.user.phone && (
          <Button
            onClick={handlePhoneClick}
            icon='phone'
            className={clsx('focusable', styles.socialBtn, styles.phone)}
            variant='unstyled'
            rippleColor={styles.rippleColor}
          />
        )}

        {props.professional && props.professional.facebook && (
          <Button
            onClick={() => handleSocialMediaClick(props.professional.facebook)}
            icon='facebook'
            className={clsx('focusable', styles.socialBtn, styles.facebook)}
            variant='unstyled'
            rippleColor={styles.rippleColor}
          />
        )}

        {props.professional && props.professional.instagram && (
          <Button
            onClick={() => handleSocialMediaClick(props.professional.instagram)}
            icon='instagram'
            className={clsx('focusable', styles.socialBtn, styles.instagram)}
            variant='unstyled'
            rippleColor={styles.rippleColor}
          />
        )}

        {props.professional && props.professional.user.email && (
          <Button
            onClick={handleEmailClick}
            icon='inbox'
            className={clsx('focusable', styles.socialBtn, styles.mail)}
            variant='unstyled'
            rippleColor={styles.rippleColor}
          />
        )}
      </div>
    </Popover>
  );
};
