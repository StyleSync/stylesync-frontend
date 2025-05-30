import { type FC } from 'react';

import clsx from 'clsx';

import { Button } from '@/modules/core/components/button';
import { Popover } from '@/modules/core/components/popover';

import type { UserContactPopupProps } from './user-contact-popup.interface';

import styles from './user-contact-popup.module.scss';

export const UserContactPopup: FC<UserContactPopupProps> = ({
  professional,
  side,
  ...props
}) => {
  return (
    <Popover {...props} sideOffset={5} side={side}>
      <div className={styles.root}>
        {professional && professional.user?.phone && (
          <Button
            onClick={() => {
              window.open(`tel:${professional.user.phone}`);
            }}
            icon='phone'
            className={clsx('focusable', styles.socialBtn, styles.phone)}
            variant='unstyled'
            rippleColor={styles.rippleColor}
          />
        )}

        {professional && professional.facebook && (
          <Button
            onClick={() => {
              if (professional.facebook) {
                window.open(professional.facebook, '_blank');
              }
            }}
            icon='facebook'
            className={clsx('focusable', styles.socialBtn, styles.facebook)}
            variant='unstyled'
            rippleColor={styles.rippleColor}
          />
        )}

        {professional && professional.instagram && (
          <Button
            onClick={() => {
              if (professional.instagram) {
                window.open(professional.instagram, '_blank');
              }
            }}
            icon='instagram'
            className={clsx('focusable', styles.socialBtn, styles.instagram)}
            variant='unstyled'
            rippleColor={styles.rippleColor}
          />
        )}

        {professional && professional.tiktok && (
          <Button
            onClick={() => {
              if (professional.tiktok) {
                window.open(professional.tiktok, '_blank');
              }
            }}
            icon='tiktok'
            className={clsx('focusable', styles.socialBtn, styles.tiktok)}
            variant='unstyled'
            rippleColor={styles.rippleColor}
          />
        )}

        {professional && professional.user?.email && (
          <Button
            onClick={() => {
              if (professional.user.email) {
                location.href = `mailto:${professional.user.email}`;
              }
            }}
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
