import { type FC, useCallback, useRef } from 'react';
import clsx from 'clsx';
// components
import { Avatar } from '@/modules/core/components/avatar';
import { Emoji } from '@/modules/core/components/emoji';
import { Button } from '@/modules/core/components/button';

import type { AvatarSelectMobileProps } from './avatar-select.interface';
import styles from './avatar-select.module.scss';

export const AvatarSelect: FC<AvatarSelectMobileProps> = ({
  style,
  className,
  value,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelectClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  return (
    <div className={clsx(styles.root, className)} style={style}>
      <Avatar
        className={styles.avatar}
        size={70}
        fallback={<Emoji name='sunglasses' width={40} height={40} />}
        url={value}
        // shape='rect'
        shadow
      />
      <div className={styles.actions}>
        <Button
          className={clsx(styles.action, styles.select)}
          text={value ? 'Select new avatar' : 'Select avatar'}
          variant='unstyled'
          onClick={handleSelectClick}
        />
        {!!value && (
          <>
            <div className={styles.divider} />
            <Button
              className={clsx(styles.action, styles.delete)}
              text='Remove'
              variant='danger'
            />
          </>
        )}
      </div>
      <input
        ref={inputRef}
        type='file'
        className='visibilityHidden'
        multiple={false}
        {...props}
      />
    </div>
  );
};
