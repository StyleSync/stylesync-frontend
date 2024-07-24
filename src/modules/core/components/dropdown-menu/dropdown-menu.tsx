// components
import type { IconName } from '@/modules/core/components/icon';
import { Icon } from '@/modules/core/components/icon';
import { Popover } from '@/modules/core/components/popover';
import { Typography } from '@/modules/core/components/typogrpahy';

import type { DropdownMenuProps } from './dropdown-menu.interface';
import styles from './dropdown-menu.module.scss';
import clsx from 'clsx';
import { Placeholder } from '@/modules/core/components/placeholder';

export function DropdownMenu<OptionData = undefined>({
  isOpen,
  onClose,
  onSelect,
  trigger,
  items,
  render,
  classes,
  popoverProps,
  typographyProps,
  isLoading = false,
}: DropdownMenuProps<OptionData>) {
  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      trigger={trigger}
      sideOffset={4}
      {...popoverProps}
    >
      <div className={styles.root}>
        <Placeholder
          isActive={isLoading}
          className={styles.skeleton}
          placeholder={
            <>
              <div className='skeleton' />
              <div className='skeleton' />
              <div className='skeleton' />
            </>
          }
        >
          {items.map((item) => (
            <button
              className={clsx(
                styles.option,
                { [styles.danger]: item.variant === 'danger' },
                { [styles.primary]: item.variant === 'primary' },
                classes?.option,
                item.className
              )}
              key={item.id}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onSelect && onSelect(item);
              }}
              disabled={item.disabled}
            >
              {typeof render === 'function' ? (
                render(item)
              ) : (
                <>
                  {item.icon &&
                    (typeof item.icon === 'string' ? (
                      <Icon
                        name={item.icon as IconName}
                        width={20}
                        height={20}
                      />
                    ) : (
                      <>{item.icon}</>
                    ))}
                  <Typography {...typographyProps}>{item.text}</Typography>
                </>
              )}
            </button>
          ))}
        </Placeholder>
      </div>
    </Popover>
  );
}
