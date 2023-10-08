import { type FC, useMemo } from 'react';
import { useBoolean } from 'usehooks-ts';
import clsx from 'clsx';
// components
import { DropdownMenu } from '@/modules/core/components/dropdown-menu';
import { Button } from '@/modules/core/components/button';
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
    <DropdownMenu
      items={Object.keys(SERVICE_METADATA)
        .filter(
          (service) => !blackList.includes(service as SupportedServiceKey)
        )
        .map((service) => {
          const { icon, name } =
            SERVICE_METADATA[service as SupportedServiceKey];

          return {
            id: service,
            text: name,
            icon,
          };
        })}
      trigger={
        <Button
          {...buttonProps}
          onClick={isOpen.toggle}
          disabled={Object.keys(SERVICE_METADATA).length === blackList.length}
          className={clsx('mobileActionBtn', styles.trigger)}
        />
      }
      isOpen={isOpen.value}
      onClose={isOpen.setFalse}
      onSelect={(item) => {
        if (onServiceSelect) {
          onServiceSelect(item.id as SupportedServiceKey);
        }

        isOpen.setFalse();
      }}
      popoverProps={{
        followTriggerWidth: true,
        ...popoverProps,
      }}
    />
  );
};
