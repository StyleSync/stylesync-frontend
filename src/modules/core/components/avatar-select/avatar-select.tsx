import { type FC, useCallback, useRef } from 'react';

import clsx from 'clsx';
import { useIntl } from 'react-intl';

import { Avatar } from '@/modules/core/components/avatar';
import { Button } from '@/modules/core/components/button';

import type { AvatarSelectProps } from './avatar-select.interface';

import styles from './avatar-select.module.scss';

export const AvatarSelect: FC<AvatarSelectProps> = ({
  style,
  className,
  value,
  onRemove,
  ...props
}) => {
  const intl = useIntl();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelectClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  return (
    <div className={clsx(styles.root, className)} style={style}>
      <Avatar
        className={styles.avatar}
        size={80}
        url={value}
        shape='circle'
        shadow
      />
      <div className={styles.actions}>
        <Button
          className={clsx(styles.action, styles.select)}
          text={
            value
              ? intl.formatMessage({ id: 'button.avatar.select.new' })
              : intl.formatMessage({ id: 'button.avatar.select' })
          }
          variant='unstyled'
          onClick={handleSelectClick}
        />
        {!!value && (
          <>
            <div className={styles.divider} />
            <Button
              className={clsx(styles.action, styles.delete)}
              text={intl.formatMessage({ id: 'button.remove' })}
              variant='danger'
              onClick={onRemove}
            />
          </>
        )}
      </div>
      <input
        aria-label='Avatar select'
        ref={inputRef}
        type='file'
        className='visibilityHidden'
        multiple={false}
        {...props}
      />
    </div>
  );
};
