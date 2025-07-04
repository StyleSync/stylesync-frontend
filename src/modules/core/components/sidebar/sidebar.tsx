import { type FC, Fragment, useCallback } from 'react';

import clsx from 'clsx';

import { Button } from '@/modules/core/components/button';
import { Icon } from '@/modules/core/components/icon';
// components
import { Typography } from '@/modules/core/components/typogrpahy';

import type { SidebarLink, SidebarProps } from './sidebar.interface';

import styles from './sidebar.module.scss';

const bgColors = [
  'bg-primary',
  'bg-purple',
  'bg-cyan',
  'bg-green',
  'bg-orange',
];

export const Sidebar: FC<SidebarProps> = ({
  linkGroups,
  activeLink,
  slots,
  onSelect,
}) => {
  const handleLinkClick = useCallback(
    (link: SidebarLink) => () => {
      link.onClick && link.onClick();

      onSelect && onSelect(link);
    },
    [onSelect]
  );

  return (
    <div className={styles.root}>
      <Icon className={styles.corner} name='corner' />
      {slots?.top?.map((slot, i) => <Fragment key={i}>{slot}</Fragment>)}
      <div className={styles.groups}>
        {linkGroups.map((group) => (
          <div key={group.id} className={styles.group}>
            {group.title && (
              <Typography className={styles.title} variant='small'>
                {group.title}
              </Typography>
            )}
            <div className={styles.links}>
              {group.links.map((link, index) => (
                <Fragment key={index}>
                  {link.renderItem ? (
                    link.renderItem()
                  ) : (
                    <Button
                      className={clsx(styles.link, {
                        [styles.active]: activeLink === link.id,
                      })}
                      key={link.id}
                      text={link.name}
                      onClick={handleLinkClick(link)}
                      variant='unstyled'
                      iconEnd='chevron-right'
                      classes={{
                        text: '!text-base !font-medium lg:!font-normal',
                        iconEnd: '!text-gray ml-auto md:hidden',
                      }}
                      slot={
                        link.icon && (
                          <div
                            className={clsx(
                              'flex h-8 w-8 shrink-0 items-center justify-center rounded-md',
                              bgColors[index % bgColors.length]
                            )}
                          >
                            <Icon
                              name={link.icon}
                              width={20}
                              height={20}
                              className='text-white'
                            />
                          </div>
                        )
                      }
                    />
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
      {slots?.bottom?.map((slot) => <>{slot}</>)}
    </div>
  );
};
