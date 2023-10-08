'use client';
// components
import { Typography, Button } from '@/modules/core/components';
import { GradientButton } from '@/modules/core/components/gradient-button';
// styles
import scssVariables from '@/styles/variables.module.scss';

import styles from './about-me.module.scss';

export const AboutMe = () => {
  return (
    <div className={styles.root}>
      <Typography className={styles.title} As='h2' variant='subtitle'>
        About me
      </Typography>
      <Typography className={styles.description} variant='body2'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. A est sed
        sodales eget. Bibendum ipsum donec eget convallis enim est. Massa nulla
        magna in elementum diam sodales. Vitae sem et blandit quis congue. Elit
        turpis sit leo fusce semper tristique arcu phasellus risus. Nulla mi sed
        velit sit. Porta ac id tellus et mattis libero fringilla.
        <br />
        <br />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. A est sed
        sodales eget. Bibendum ipsum donec eget convallis enim est. Massa nulla
        magna in elementum diam sodales. Vitae sem et blandit quis congue. Elit
        turpis sit leo fusce semper tristique arcu phasellus risus. Nulla mi sed
        velit sit. Porta ac id tellus et mattis libero fringilla.
      </Typography>
      <div className={styles.contacts}>
        <GradientButton
          gradient={scssVariables.facebookGradient}
          icon='facebook-logo'
          text='Facebook'
        />
        <GradientButton
          gradient={scssVariables.instagramGradient}
          className={styles.gradientButton}
          icon='instagram-logo'
          text='Instagram'
        />
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
