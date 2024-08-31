import { type FC, Fragment, useCallback, useRef } from 'react';
import clsx from 'clsx';
import * as RPopover from '@radix-ui/react-popover';
import { Transition } from 'react-transition-group';
import { useResizeObserver } from 'usehooks-ts';
import { type PointerDownOutsideEvent } from '@radix-ui/react-dismissable-layer';

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
  side,
  classes,
  sideOffset = 5,
  followTriggerWidth = false,
  disableAutofocus = false,
  disablePortal = false,
  forceTriggerWidth = false,
  backgroundBlurEffect = true,
}) => {
  const popperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  // state
  const { width } = useResizeObserver({
    ref: popperRef,
  });

  // refs
  const { current: PortalOrFragment } = useRef(
    disablePortal ? Fragment : RPopover.Portal
  );

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
              className={clsx(
                styles.content,
                { [styles.backgroundBlurEffect]: backgroundBlurEffect },
                styles[status],
                classes?.content
              )}
              style={{
                minWidth:
                  followTriggerWidth || forceTriggerWidth ? width : 'unset',
                width: forceTriggerWidth ? width : 'unset',
                maxWidth: forceTriggerWidth ? width : 'unset',
              }}
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
