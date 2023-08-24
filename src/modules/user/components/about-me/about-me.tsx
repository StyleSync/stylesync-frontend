'use client';
import clsx from 'clsx';
// components
import { Typography, Button } from '@/modules/core/components';

import styles from './about-me.module.scss';

export const AboutMe = () => {
  return (
    <div className={styles.container}>
      <Typography className={styles.title} variant='title'>
        About me
      </Typography>
      <div>
        <Typography className={styles.overview} variant='body2'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. A est sed
          sodales eget. Bibendum ipsum donec eget convallis enim est. Massa
          nulla magna in elementum diam sodales. Vitae sem et blandit quis
          congue. Elit turpis sit leo fusce semper tristique arcu phasellus
          risus. Nulla mi sed velit sit. Porta ac id tellus et mattis libero
          fringilla.
        </Typography>
      </div>
      <div className={styles.contacts}>
        <div className={clsx(styles.borderContiner, styles.facebookContiner)}>
          <Button
            className={clsx(styles.socialButton, styles.facebookButton)}
            variant='unstyled'
            icon='facebook-logo'
            text='Facebook'
          />
        </div>
        <div className={clsx(styles.borderContiner, styles.instagramContainer)}>
          <Button
            className={clsx(styles.socialButton, styles.instagramButton)}
            variant='unstyled'
            icon='instagram-logo'
            text='Instagram'
          />
        </div>

        <Button
          className={styles.contactButton}
          variant='unstyled'
          icon='phone'
          text='+38 099 022 78 56'
        />
        <Button
          className={styles.contactButton}
          variant='unstyled'
          icon='inbox'
          text='kate@gmail.com'
        />
      </div>
    </div>
  );
};
