'use client';
import { type FC, Fragment, useCallback, useEffect, useRef } from 'react';
import * as RPopover from '@radix-ui/react-popover';
import { Transition } from 'react-transition-group';
import { useElementSize } from 'usehooks-ts';
import clsx from 'clsx';
import type { PointerDownOutsideEvent } from '@radix-ui/react-dismissable-layer';

import type { PopoverProps } from './popover.interface';
import styles from './popover.module.scss';

const IN_OUT_ANIMATION_DURATION = 200;

export const Popover: FC<PopoverProps> = ({
  isOpen,
  onClose,
  children,
  trigger,
  align,
  alignOffset,
  sideOffset,
  side,
  followTriggerWidth = false,
  disableAutofocus = false,
  disablePortal = false,
}) => {
  const popperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  // state
  const [setTriggreRef, { width }] = useElementSize();
  // refs
  const { current: PortalOrFragment } = useRef(
    disablePortal ? Fragment : RPopover.Portal
  );

  useEffect(() => {
    setTriggreRef(triggerRef.current);
  }, [setTriggreRef]);

  const handlePointerDownOutside = useCallback(
    (e: PointerDownOutsideEvent) => {
      if (triggerRef.current && triggerRef.current.contains(e.target as Node)) {
        return;
      }

      onClose();
    },
    [onClose]
  );

  const handleOpenAutoFocus = useCallback(
    (e: Event) => {
      if (disableAutofocus) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    [disableAutofocus]
  );

  return (
    <RPopover.Root open>
      <RPopover.Anchor ref={triggerRef} asChild>
        {trigger}
      </RPopover.Anchor>
      <Transition timeout={IN_OUT_ANIMATION_DURATION} in={isOpen} unmountOnExit>
        {(status) => (
          <PortalOrFragment>
            <RPopover.Content
              ref={popperRef}
              className={clsx(styles.content, styles[status])}
              style={{ width: followTriggerWidth ? width : 'unset' }}
              align={align}
              alignOffset={alignOffset}
              side={side}
              sideOffset={sideOffset}
              onEscapeKeyDown={onClose}
              onPointerDownOutside={handlePointerDownOutside}
              onOpenAutoFocus={handleOpenAutoFocus}
            >
              {children}
            </RPopover.Content>
          </PortalOrFragment>
        )}
      </Transition>
    </RPopover.Root>
  );
};
