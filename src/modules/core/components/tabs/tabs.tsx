import { type FC } from 'react';
import clsx from 'clsx';
// components
import { Icon } from '@/modules/core/components/icon';
import { Typography } from '@/modules/core/components/typogrpahy';

import type { TabsProps } from './tabs.interface';
import styles from './tabs.module.scss';

export const Tabs: FC<TabsProps> = ({
  value,
  tabs,
  onChange,
  typographyProps,
}) => {
  const handleTabClick = (key: string) => () => {
    if (value !== key) {
      onChange && onChange(key);
    }
  };

  return (
    <div className={styles.root}>
      {tabs.map((tab) => (
        <div
          key={tab.key}
          className={clsx(styles.tab, {
            [styles.tab_active]: value === tab.key,
          })}
          onClick={handleTabClick(tab.key)}
        >
          {tab.icon && <Icon name={tab.icon} className={styles.icon} />}
          <Typography
            weight='medium'
            className={styles.tabName}
            {...typographyProps}
          >
            {tab.name}
          </Typography>
        </div>
      ))}
    </div>
  );
};
