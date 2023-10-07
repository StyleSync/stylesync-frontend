import { type FC, useMemo } from 'react';
import { Button, Icon, Popover, Typography } from '@/modules/core/components';
import { useBoolean } from 'usehooks-ts';
// constants
import { SERVICE_METADATA } from '@/modules/service/constants/service.constants';
// hooks
import { useWindowSizeType } from '@/modules/core/hooks/use-window-size-type';
// types
import type { SupportedServiceKey } from '@/modules/service/types/service.types';
import type { ButtonProps } from '@/modules/core/components/button/button.interface';
import type { PopoverProps } from '@/modules/core/components/popover/popover.interface';

import type { ServiceSelectProps } from './service-select.interface';
import styles from './service-select.module.scss';
import clsx from 'clsx';

export const ServiceSelect: FC<ServiceSelectProps> = ({
  onServiceSelect,
  blackList = [],
}) => {
  const isOpen = useBoolean();
  const windowSizeType = useWindowSizeType();
  // memo
  const buttonProps = useMemo<Partial<ButtonProps>>(() => {
    if (windowSizeType === 'mobile') {
      return {
        icon: 'plus',
        variant: 'primary',
      };
    }

    return {
      text: 'Add services group',
      variant: 'outlined',
    };
  }, [windowSizeType]);
  const popoverProps = useMemo<Partial<PopoverProps>>(() => {
    if (windowSizeType === 'mobile') {
      return {
        align: 'end',
        side: 'top',
        sideOffset: 10,
      };
    }

    return {
      followTriggerWidth: true,
    };
  }, [windowSizeType]);

  return (
    <Popover
      isOpen={isOpen.value}
      onClose={isOpen.setFalse}
      trigger={
        <Button
          {...buttonProps}
          onClick={isOpen.toggle}
          disabled={Object.keys(SERVICE_METADATA).length === blackList.length}
          className={clsx('mobileActionBtn', styles.trigger)}
        />
      }
      {...popoverProps}
    >
      <div className={styles.root}>
        {Object.keys(SERVICE_METADATA)
          .filter(
            (service) => !blackList.includes(service as SupportedServiceKey)
          )
          .map((service) => {
            const { icon, name } =
              SERVICE_METADATA[service as SupportedServiceKey];

            return (
              <button
                key={service}
                className={styles.option}
                onClick={() => {
                  if (onServiceSelect) {
                    onServiceSelect(service as SupportedServiceKey);
                  }

                  isOpen.setFalse();
                }}
              >
                <Icon name={icon} width={20} height={20} />
                <Typography>{name}</Typography>
              </button>
            );
          })}
      </div>
    </Popover>
  );
};
