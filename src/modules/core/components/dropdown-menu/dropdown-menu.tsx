import { type FC } from 'react';
// components
import { Icon } from '@/modules/core/components/icon';
import { Popover } from '@/modules/core/components/popover';
import { Typography } from '@/modules/core/components/typogrpahy';

import type { DropdownMenuProps } from './dropdown-menu.interface';
import styles from './dropdown-menu.module.scss';

export const DropdownMenu: FC<DropdownMenuProps> = ({
  isOpen,
  onClose,
  onSelect,
  trigger,
  items,
  render,
  popoverProps,
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
            className={styles.option}
            key={item.id}
            onClick={() => onSelect && onSelect(item)}
          >
            {typeof render === 'function' ? (
              render(item)
            ) : (
              <>
                {item.icon && <Icon name={item.icon} width={20} height={20} />}
                <Typography>{item.text}</Typography>
              </>
            )}
          </button>
        ))}
      </div>
    </Popover>
  );
};