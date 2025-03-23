import { type FC, Fragment, useCallback } from 'react';

import clsx from 'clsx';

import { Button } from '@/modules/core/components/button';
import { Icon } from '@/modules/core/components/icon';
// components
import { Typography } from '@/modules/core/components/typogrpahy';

import type { SidebarLink, SidebarProps } from './sidebar.interface';

import styles from './sidebar.module.scss';

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
                    link.renderItem({})
                  ) : (
                    <Button
                      className={clsx(styles.link, {
                        [styles.active]: activeLink === link.id,
                      })}
                      key={link.id}
                      icon={link.icon}
                      text={link.name}
                      onClick={handleLinkClick(link)}
                      variant='unstyled'
                      iconEnd='chevron-right'
                      classes={{
                        text: '!text-base !font-semibold lg:!font-normal',
                      }}
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
