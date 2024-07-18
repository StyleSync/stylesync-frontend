import { type FC, useCallback, useMemo } from 'react';
import { useBoolean } from 'usehooks-ts';
import clsx from 'clsx';
import { useIntl } from 'react-intl';
// components
import { DropdownMenu } from '@/modules/core/components/dropdown-menu';
import { Button } from '@/modules/core/components/button';
// hooks
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
// types
import type { IconName } from '@/modules/core/components/icon';
import type { ButtonProps } from '@/modules/core/components/button/button.interface';
import type { PopoverProps } from '@/modules/core/components/popover/popover.interface';
import type { DropdownItem } from '@/modules/core/components/dropdown-menu/dropdown-menu.interface';

import type { ServiceSelectProps } from './service-select.interface';
import styles from './service-select.module.scss';

export const ServiceSelect: FC<ServiceSelectProps> = ({
  services,
  onServiceSelect,
  isLoading,
  blackList = [],
}) => {
  const { formatMessage } = useIntl();
  const isOpen = useBoolean();
  const deviceType = useDeviceType();
  // memo
  const buttonProps = useMemo<Partial<ButtonProps>>(() => {
    if (deviceType === 'mobile') {
      return {
        icon: 'plus',
        variant: 'primary',
      };
    }

    return {
      text: formatMessage({ id: 'select.service.add.group' }),
      variant: 'outlined',
    };
  }, [deviceType, formatMessage]);
  const popoverProps = useMemo<Partial<PopoverProps>>(() => {
    if (deviceType === 'mobile') {
      return {
        align: 'end',
        side: 'top',
        sideOffset: 10,
      };
    }

    return {
      followTriggerWidth: true,
    };
  }, [deviceType]);

  const handleSelect = useCallback(
    (value: DropdownItem) => {
      const service = services.find((item) => item.id === value.id);

      if (onServiceSelect && service) {
        onServiceSelect(service);
      }

      isOpen.setFalse();
    },
    [services, onServiceSelect, isOpen]
  );

  return (
    <DropdownMenu
      items={services
        .filter((service) => !blackList.includes(service.id))
        .map((service) => {
          return {
            id: service.id,
            text: formatMessage({ id: service.name }),
            icon: service.icon as IconName,
          };
        })}
      trigger={
        <Button
          {...buttonProps}
          onClick={isOpen.toggle}
          disabled={services.length === blackList.length}
          className={clsx('mobileActionBtn', styles.trigger)}
        />
      }
      isOpen={isOpen.value}
      onClose={isOpen.setFalse}
      onSelect={handleSelect}
      isLoading={isLoading}
      popoverProps={{
        followTriggerWidth: true,
        disablePortal: true,
        align: 'start',
        ...popoverProps,
      }}
    />
  );
};
