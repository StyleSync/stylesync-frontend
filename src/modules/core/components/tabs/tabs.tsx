import { type CSSProperties, forwardRef, useMemo, useState } from 'react';
import clsx from 'clsx';
// components
import { Icon } from '@/modules/core/components/icon';
import { Typography } from '@/modules/core/components/typogrpahy';

import type { TabsProps } from './tabs.interface';
import styles from './tabs.module.scss';

const INDICATOR_WIDTH_RATIO = 0.7;

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ value, tabs, onChange, typographyProps }, ref) => {
    // state
    const [activeTabElement, setActiveTabElement] =
      useState<HTMLDivElement | null>(null);
    // memo
    const indicatorStyles = useMemo<CSSProperties>(() => {
      if (!activeTabElement) {
        return {};
      }

      return {
        left: activeTabElement.offsetLeft,
        width: activeTabElement.clientWidth * INDICATOR_WIDTH_RATIO,
      };
    }, [activeTabElement]);

    const handleTabClick = (key: string) => () => {
      if (value !== key) {
        onChange && onChange(key);
      }
    };

    return (
      <div className={styles.root} ref={ref}>
        {tabs.map((tab) => (
          <div
            key={tab.key}
            ref={(element) => {
              if (element && tab.key === value) {
                setActiveTabElement(element);
              }
            }}
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
        <div className={styles.indicator} style={indicatorStyles} />
      </div>
    );
  }
);

Tabs.displayName = 'Tabs';

export { Tabs };
