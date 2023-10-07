import { type FC } from 'react';
// components
import { Icon, Popover, Typography } from '@/modules/core/components';

import type { DropdownMenuProps } from './dropdown-menu.interface';
import styles from './dropdown-menu.module.scss';

export const DropdownMenu: FC<DropdownMenuProps> = ({
  isOpen,
  onClose,
  onSelect,
  trigger,
  items,
  render,
}) => {
  return (
    <Popover isOpen={isOpen} onClose={onClose} trigger={trigger} sideOffset={4}>
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
