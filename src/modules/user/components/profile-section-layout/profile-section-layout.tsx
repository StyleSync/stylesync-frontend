'use client';
import { type FC } from 'react';

import { useIntl } from 'react-intl';

import { Button } from '@/modules/core/components/button';

import { ProfileSectionLayoutProps } from './profile-section-layout.interface';

import styles from './profile-section-layout.module.scss';

export const ProfileSectionLayout: FC<ProfileSectionLayoutProps> = ({
  children,
  title,
  id,
  edit,
  onEdit,
  onCancel,
  isOwnProfile = false,
}) => {
  const intl = useIntl();

  const handleEdit = () => {
    edit ? onCancel?.() : onEdit?.();
  };

  return (
    <section className={`${styles.root}`} id={id}>
      <div className='flex items-center justify-between'>
        <h2 className='text-base font-medium text-dark'>
          {intl.formatMessage({ id: title })}
        </h2>
        {isOwnProfile && (
          <div className='flex items-center gap-2'>
            {edit ? (
              <>
                <Button
                  className='!bg-destructive/10 text-destructive transition-colors duration-500 hover:!bg-destructive/20'
                  variant='unstyled'
                  icon='close'
                  type='button'
                  onClick={handleEdit}
                />
              </>
            ) : (
              <Button
                variant='secondary'
                className='!bg-white shadow'
                icon='pencil'
                onClick={handleEdit}
              />
            )}
          </div>
        )}
      </div>
      {children}
    </section>
  );
};
