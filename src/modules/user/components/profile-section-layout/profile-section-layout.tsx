'use client';
import { type FC } from 'react';

import { useIntl } from 'react-intl';

import { Button } from '@/modules/core/components/button';
import { Typography } from '@/modules/core/components/typogrpahy';

import { ProfileSectionLayoutProps } from './profile-section-layout.interface';

import styles from './profile-section-layout.module.scss';

export const ProfileSectionLayout: FC<ProfileSectionLayoutProps> = ({
  children,
  title,
  id,
  edit,
  onEdit,
  onCancel,
}) => {
  const intl = useIntl();

  const handleEdit = () => {
    edit ? onCancel?.() : onEdit?.();
  };

  return (
    <section className={`${styles.root}`} id={id}>
      <div className='flex items-center justify-between'>
        <Typography className={styles.title} As='h2' variant='subtitle'>
          {intl.formatMessage({ id: title })}
        </Typography>
        <div className='flex items-center gap-2'>
          {edit ? (
            <>
              <Button
                className='!bg-destructive/10 text-destructive'
                variant='unstyled'
                icon='close'
                type='button'
                onClick={handleEdit}
              />
            </>
          ) : (
            <Button variant='secondary' icon='pencil' onClick={handleEdit} />
          )}
        </div>
      </div>
      {children}
    </section>
  );
};
