import { type FC, useCallback, useEffect, useRef } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import {
  Controller,
  animated,
  easings,
  type SpringConfig,
} from '@react-spring/web';
import { useBoolean, useScreen } from 'usehooks-ts';
// hooks
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
import { useTouchDirectionDrag } from '@/modules/core/hooks/use-touch-direction-drag';
// utils
import { reassignCssProperties } from '@/modules/core/utils/css.utils';

import type { BottomActionsProps } from './dialog-bottom.interface';
import styles from './dialog-bottom.module.scss';

const DRAG_OFFSET_CLOSE_BREAKDOWN = 100;
const IN_OUT_ANIMATION_DURATION = 200;
const OVERLAY_OPACITY = 0.6;

const animationConfig: SpringConfig = {
  duration: IN_OUT_ANIMATION_DURATION,
  easing: easings.easeInOutCubic,
};

const contentAnimationController = new Controller({
  bottom: '0px',
  config: animationConfig,
});
const overlayAnimationController = new Controller({
  opacity: 0,
  config: animationConfig,
});

export const DialogBottom: FC<BottomActionsProps> = ({
  isOpen,
  onOpenChange,
  children,
}) => {
  const deviceType = useDeviceType();
  // state
  const _isOpen = useBoolean(isOpen); // internal open state to keep modal visible until animation end
  const screen = useScreen();
  // refs
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // update _isOpen immediately to true
  useEffect(() => {
    if (isOpen) {
      _isOpen.setTrue();
    }
  }, [isOpen, _isOpen.setTrue]);

  // in/out animation control
  useEffect(() => {
    if (!screen) return;

    // start 'open animation'
    if (isOpen && _isOpen.value) {
      contentAnimationController.set({ bottom: `-${screen.height}px` });
      overlayAnimationController.set({ opacity: 0 });

      Promise.all([
        contentAnimationController.start({ bottom: '0px' }),
        overlayAnimationController.start({ opacity: OVERLAY_OPACITY }),
      ]);
    }

    // start 'close animation'
    if (!isOpen && _isOpen.value) {
      Promise.all([
        contentAnimationController.start({ bottom: `-${screen.height}` }),
        overlayAnimationController.start({ opacity: 0 }),
      ]).finally(() => {
        _isOpen.setFalse();
      });
    }
  }, [isOpen, _isOpen, screen]);

  const handleDrag = useCallback((visibility: { percent: number }) => {
    if (!overlayRef.current) {
      return;
    }

    reassignCssProperties(overlayRef.current, {
      opacity: (visibility.percent / 100) * OVERLAY_OPACITY,
    });
  }, []);

  const handleDragEnd = useCallback(
    (offset: { x: number; y: number }) => {
      if (!contentRef.current || !overlayRef.current || !screen) {
        return;
      }

      if (offset.y < DRAG_OFFSET_CLOSE_BREAKDOWN) {
        // back position
        reassignCssProperties(contentRef.current, {
          transition: `all ${IN_OUT_ANIMATION_DURATION}ms`,
          bottom: '0px',
        });
      } else {
        // hide
        contentAnimationController.set({
          bottom: contentRef.current.style.bottom,
        });
        overlayAnimationController.set({
          opacity: +overlayRef.current.style.opacity,
        });

        Promise.all([
          contentAnimationController.start({ bottom: `-${screen.height}px` }),
          overlayAnimationController.start({ opacity: 0 }),
        ]).finally(() => {
          _isOpen.setFalse();
          onOpenChange && onOpenChange(false);
        });
      }
    },
    [screen, _isOpen.setFalse, onOpenChange]
  );

  const touchDrag = useTouchDirectionDrag(contentRef, {
    direction: 'vertical',
    disabled: deviceType === 'mobile',
    onDrag: handleDrag,
    onDragEnd: handleDragEnd,
  });

  return (
    <RadixDialog.Root open={_isOpen.value} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay>
          <animated.div
            className={styles.overlay}
            ref={overlayRef}
            style={overlayAnimationController.springs}
          />
        </RadixDialog.Overlay>
        <RadixDialog.Content>
          <animated.div
            className={styles.content}
            ref={contentRef}
            style={contentAnimationController.springs}
            {...touchDrag.register}
          >
            <div className={styles.dragMarker} />
            {children}
          </animated.div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
