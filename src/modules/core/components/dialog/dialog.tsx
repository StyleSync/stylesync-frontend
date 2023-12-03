import React, { type FC, useEffect } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import {
  Controller,
  easings,
  animated,
  type SpringConfig,
} from '@react-spring/web';
import { useBoolean } from 'usehooks-ts';
import clsx from 'clsx';
// components
import { Button } from '@/modules/core/components/button';

import type { DialogProps } from './dialog.interface';
import styles from './dialog.module.scss';

const IN_OUT_ANIMATION_DURATION = 200;
const OVERLAY_OPACITY = 0.6;

const animationConfig: SpringConfig = {
  duration: IN_OUT_ANIMATION_DURATION,
  easing: easings.easeInOutCubic,
};

const contentAnimationController = new Controller({
  opacity: 0,
  config: animationConfig,
});
const overlayAnimationController = new Controller({
  opacity: 0,
  config: animationConfig,
});

export const Dialog: FC<DialogProps> = ({
  children,
  isOpen,
  trigger,
  onOpenChange,
  classes,
}) => {
  const _isOpen = useBoolean();

  useEffect(() => {
    if (isOpen && !_isOpen.value) {
      _isOpen.setTrue();
    }
  }, [isOpen, _isOpen]);

  // in/out animation control
  useEffect(() => {
    // start 'open animation'
    if (isOpen && _isOpen.value) {
      void Promise.all([
        contentAnimationController.start({ opacity: 1 }),
        overlayAnimationController.start({ opacity: OVERLAY_OPACITY }),
      ]);
    }

    // start 'close animation'
    if (!isOpen && _isOpen.value) {
      Promise.all([
        contentAnimationController.start({ opacity: 0 }),
        overlayAnimationController.start({ opacity: 0 }),
      ]).finally(() => {
        _isOpen.setFalse();
      });
    }
  }, [isOpen, _isOpen]);

  return (
    <RadixDialog.Root open={_isOpen.value} onOpenChange={onOpenChange}>
      {trigger && <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>}
      <RadixDialog.Portal>
        <RadixDialog.Overlay>
          <animated.div
            className={clsx(styles.overlay, classes?.overlay)}
            style={overlayAnimationController.springs}
          />
        </RadixDialog.Overlay>
        <RadixDialog.Content>
          <animated.div
            className={clsx(styles.content, classes?.content)}
            style={contentAnimationController.springs}
          >
            <Button
              className={styles.closeButton}
              icon='close'
              variant='unstyled'
              onClick={() => onOpenChange(false)}
              rippleColor='#fafbfc'
            />
            {children}
          </animated.div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
