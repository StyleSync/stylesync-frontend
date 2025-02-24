import { type FC } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { type HoverTooltipProps } from './hover-tooltip.interface';
import styles from './hover-tooltip.module.scss';

export const HoverTooltip: FC<HoverTooltipProps> = ({ trigger, content }) => {
  return (
    <Tooltip.Provider delayDuration={200} skipDelayDuration={500}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button>{trigger}</button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className={styles.tooltipContent} sideOffset={16}>
            {content}
            <Tooltip.Arrow className={styles.tooltipArrow} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
