import { type FC } from 'react';
// components
import { Icon } from '@/modules/core/components/icon';
import { Popover } from '@/modules/core/components/popover';
import { Typography } from '@/modules/core/components/typogrpahy';

import type { DropdownMenuProps } from './dropdown-menu.interface';
import styles from './dropdown-menu.module.scss';
import clsx from 'clsx';

export const DropdownMenu: FC<DropdownMenuProps> = ({
  isOpen,
  onClose,
  onSelect,
  trigger,
  items,
  render,
  popoverProps,
  typographyProps,
}) => {
  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      trigger={trigger}
      sideOffset={4}
      {...popoverProps}
    >
      <div className={styles.root}>
        {items.map((item) => (
          <button
            className={clsx(
              styles.option,
              { [styles.danger]: item.variant === 'danger' },
              item.className
            )}
            key={item.id}
            onClick={() => onSelect && onSelect(item)}
            disabled={item.disabled}
          >
            {typeof render === 'function' ? (
              render(item)
            ) : (
              <>
                {item.icon && <Icon name={item.icon} width={20} height={20} />}
                <Typography {...typographyProps}>{item.text}</Typography>
              </>
            )}
          </button>
        ))}
      </div>
    </Popover>
  );
};
