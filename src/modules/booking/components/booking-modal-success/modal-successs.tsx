import { type FC } from 'react';

// components
import { Dialog } from '@/modules/core/components/dialog';
import { Typography } from '@/modules/core/components/typogrpahy';

// style

import styles from './modal-success.module.scss';

// type
import { type DialogProps } from '@/modules/core/components/dialog/dialog.interface';
import { Icon } from '@/modules/core/components/icon';
import { Divider } from '@/modules/core/components/divider';
import { Button } from '@/modules/core/components/button';
import { InfoBox } from '../modal-success-infobox/info-box';

export const BookingModalSuccess: FC<Omit<DialogProps, 'children'>> = (
  props
) => {
  const handleModalClose = () => {
    if (props.onOpenChange) {
      props.onOpenChange(false);
    }
  };

  return (
    <Dialog {...props} classes={{ content: styles.content }}>
      <div className={styles.root}>
        <div className={styles.iconSuccess}>
          <Icon width={60} height={60} name='success' />
          <Typography variant='subtitle'>Booking successful!</Typography>
          <Divider variant='horizontal' />
        </div>
        <div className={styles.containerInfo}>
          <InfoBox title='Service' content='Evening makeup' />
          <InfoBox title='Price' content='25$' />
          <InfoBox title='Time' content='18 May, 11:00 - 12:00' />
          <InfoBox statusClass='requested' title='Status' content='Requested' />
        </div>
        <div className={styles.action}>
          <Button
            onClick={handleModalClose}
            variant='unstyled'
            text='Close'
            className={styles.closeBtn}
          />
          <Button
            variant='outlined'
            text='My booking'
            className={styles.booking}
          />
        </div>
      </div>
      <Typography />
    </Dialog>
  );
};
