import { type FC } from 'react';

import type { BurgerMenuProps } from './burger-menu.interface';
import styles from './burger-menu.module.scss';
import { Dialog } from '@/modules/core/components/dialog';
import { useBoolean } from 'usehooks-ts';
import { Typography } from '@/modules/core/components/typogrpahy';
import { Button } from '@/modules/core/components/button';
import { Avatar } from '@/modules/core/components/avatar';
import { Emoji } from '@/modules/core/components/emoji';
import girl from '@/assets/images/girl.png';
import clsx from 'clsx';

export const BurgerMenu: FC<BurgerMenuProps> = () => {
  const isOpen = useBoolean();

  return (
    <Dialog
      isOpen={isOpen.value}
      onOpenChange={isOpen.setValue}
      trigger={
        <Button
          className={styles.trigger}
          icon='menu'
          variant='unstyled'
          rippleColor='transparent'
          onClick={isOpen.toggle}
        />
      }
      fullScreen
    >
      <div className={styles.root}>
        <div className={styles.top}>
          <Avatar
            size='medium'
            className={styles.avatar}
            url={girl.src}
            fallback={<Emoji name='sunglasses' width={34} height={34} />}
          />
          <div className={styles.info}>
            <Typography className={styles.name} variant='body1' weight='medium'>
              Kate Gal
            </Typography>
            <Typography className={styles.email} variant='small'>
              kate@gmail.com
            </Typography>
          </div>
          <Button
            className={styles.close}
            icon='arrow-right'
            variant='unstyled'
            rippleColor='#fff'
            onClick={isOpen.setFalse}
          />
        </div>
        <div className={styles.content}>
          <Button
            className={clsx(styles.button)}
            icon='share'
            text='Share profile'
            variant='unstyled'
            typographyProps={{
              weight: 'medium',
            }}
          />
          <Button
            className={clsx(styles.button, styles.danger)}
            icon='log-out'
            text='Sign out'
            variant='unstyled'
            typographyProps={{
              weight: 'medium',
            }}
          />
        </div>
      </div>
    </Dialog>
  );
};
