import React, {
  type FC,
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { animated, Controller } from '@react-spring/web';
import * as Dialog from '@radix-ui/react-dialog';
import { useBoolean } from 'usehooks-ts';
import clsx from 'clsx';

import type {
  DialogFullScreenAnimationConfig,
  DialogFullScreenProps,
} from './dialog-full-screen.interface';
import styles from './dialog-full-screen.module.scss';

const IN_OUT_ANIMATION_DURATION = 200;
const SWIPES_IGNORE_CLASS_NAMES = ['leaflet-container', 'leaflet-marker-pane'];

const defaultAnimationConfig: DialogFullScreenAnimationConfig = {
  overlay: {
    cssOpen: {
      opacity: '0.6',
      backdropFilter: 'saturate(180%)',
    },
    cssHidden: {
      opacity: '0',
      backdropFilter: 'saturate(100%)',
    },
    springConfig: {
      duration: IN_OUT_ANIMATION_DURATION,
    },
    getCssByVisibilityPercent: (percent) => {
      const MAX_OPACITY = 0.6;
      const MAX_SATURATE_OFFSET = 80;
      const DEFAULT_SATURATE = 100;
      const opacity = (MAX_OPACITY * percent) / 100;
      const saturate = DEFAULT_SATURATE + MAX_SATURATE_OFFSET * (percent / 100);

      return {
        opacity: opacity.toString(),
        backdropFilter: `saturate(${saturate}%)`,
      };
    },
  },
  content: {
    cssOpen: {
      right: '0%',
      opacity: '1',
    },
    cssHidden: {
      right: '-100%',
      opacity: '0',
    },
    springConfig: {
      duration: IN_OUT_ANIMATION_DURATION,
    },
    getCssByVisibilityPercent: (percent) => {
      return {
        right: `-${100 - percent}%`,
      };
    },
  },
};

const reassignCssProperties = (
  element: HTMLElement,
  cssProperties: CSSProperties
) => {
  for (const cssProperty in cssProperties) {
    if (cssProperties.hasOwnProperty(cssProperty)) {
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      element.style[cssProperty] = cssProperties[cssProperty];
    }
  }
};

const getElementCssProperties = (
  element: HTMLElement,
  cssProperties: CSSProperties
) => {
  let res = cssProperties;

  for (const cssProperty in cssProperties) {
    if (cssProperties.hasOwnProperty(cssProperty)) {
      res = {
        ...res,
        // @ts-ignore
        [cssProperty]: element.style[cssProperty],
      };
    }
  }

  return res;
};

export const DialogFullScreen: FC<DialogFullScreenProps> = ({
  children,
  isOpen,
  trigger,
  onOpenChange,
  classes,
  closeOnOutsideClick = false,
  animationConfig = defaultAnimationConfig,
}) => {
  const config = { ...defaultAnimationConfig, ...animationConfig };
  const _isOpen = useBoolean(isOpen);
  const [_children, setChildren] = useState(children);
  const contentAnimationController = useRef(
    new Controller({
      ...config.content.cssHidden,
      config: config.content.springConfig,
    })
  ).current;
  const overlayAnimationController = useRef(
    new Controller({
      ...config.overlay.cssHidden,
      config: config.overlay.springConfig,
    })
  ).current;
  // refs
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pointerXPosition = useRef<number>(0);
  const pointerYPosition = useRef<number>(0);
  const dragContentRect = useRef<DOMRect | null>(null);

  // sync _isOpen & children (do not update children if isOpen === false)
  useEffect(() => {
    if (isOpen) {
      setChildren(children);
      _isOpen.setTrue();
    }
  }, [isOpen, _isOpen.setTrue, children]);

  // in/out animation control
  useEffect(() => {
    if (isOpen) {
      contentAnimationController.start(config.content.cssOpen);
      overlayAnimationController.start(config.overlay.cssOpen);
    } else {
      Promise.all([
        contentAnimationController.start(config.content.cssHidden),
        overlayAnimationController.start(config.overlay.cssHidden),
      ]).finally(() => {
        _isOpen.setFalse();
        onOpenChange && onOpenChange(false);
      });
    }
  }, [
    isOpen,
    _isOpen.setFalse,
    contentAnimationController,
    overlayAnimationController,
    config.content.cssOpen,
    config.content.cssHidden,
    config.overlay.cssOpen,
    config.overlay.cssHidden,
    onOpenChange,
  ]);

  // drag
  const handleContentDrag = useCallback(
    (e: TouchEvent) => {
      if (
        !dragContentRect.current ||
        !contentRef.current ||
        !overlayRef.current
      ) {
        return;
      }

      const { width } = dragContentRect.current;
      const pointerOffsetX = -(pointerXPosition.current - e.touches[0].clientX);
      const pointerOffsetY = -(pointerYPosition.current - e.touches[0].clientY);

      if (pointerOffsetX < Math.abs(pointerOffsetY)) {
        // User is performing a vertical drag, so all other drag handling will be stopped
        document.removeEventListener('touchmove', handleContentDrag);

        // back position
        contentRef.current.style.transition = 'all 0.3s';
        overlayRef.current.style.transition = 'all 0.3s';

        reassignCssProperties(contentRef.current, config.content.cssOpen);
        reassignCssProperties(overlayRef.current, config.overlay.cssOpen);

        // set initial values
        dragContentRect.current = null;
        pointerXPosition.current = 0;
        pointerYPosition.current = 0;

        return;
      }

      let visibilityPercent = ((width - pointerOffsetX) * 100) / width; // 100 - Math.round((pointerOffsetX * 100) / width);

      if (visibilityPercent > 100) {
        visibilityPercent = 100;
      }

      if (visibilityPercent < 0) {
        visibilityPercent = 0;
      }

      const contentCss =
        config.content.getCssByVisibilityPercent(visibilityPercent);
      const overlayCss =
        config.overlay.getCssByVisibilityPercent(visibilityPercent);

      reassignCssProperties(contentRef.current, contentCss);
      reassignCssProperties(overlayRef.current, overlayCss);
    },
    [config.content, config.overlay]
  );

  const handleContentTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!contentRef.current || !overlayRef.current) {
        return;
      }

      // @ts-ignore
      const classList: string[] = (e.target && [...e.target.classList]) || [];

      const isIgnore = classList.some((className) =>
        SWIPES_IGNORE_CLASS_NAMES.includes(className)
      );

      if (isIgnore) {
        return;
      }

      dragContentRect.current = contentRef.current.getBoundingClientRect();
      pointerXPosition.current = e.touches[0].clientX;
      pointerYPosition.current = e.touches[0].clientY;

      contentRef.current.style.transition = 'none';
      overlayRef.current.style.transition = 'none';

      document.addEventListener('touchmove', handleContentDrag);
    },
    [contentRef, handleContentDrag]
  );

  const handleContentTouchEnd = useCallback(() => {
    if (!contentRef.current || !overlayRef.current) {
      return;
    }

    const x = contentRef.current.getBoundingClientRect().x;

    const CLOSE_OFFSET_BREAKPOINT = 60;

    if (x - pointerXPosition.current < CLOSE_OFFSET_BREAKPOINT) {
      // back position
      contentRef.current.style.transition = 'all 0.3s';
      overlayRef.current.style.transition = 'all 0.3s';

      reassignCssProperties(contentRef.current, config.content.cssOpen);
      reassignCssProperties(overlayRef.current, config.overlay.cssOpen);
    } else {
      // hide
      contentAnimationController.set(
        getElementCssProperties(contentRef.current, config.content.cssHidden)
      );
      overlayAnimationController.set(
        getElementCssProperties(overlayRef.current, config.overlay.cssHidden)
      );
      Promise.all([
        contentAnimationController.start({
          ...config.content.cssHidden,
        }),
        overlayAnimationController.start({
          ...config.overlay.cssHidden,
        }),
      ]).finally(() => {
        _isOpen.setFalse();
        onOpenChange && onOpenChange(false);
      });
    }

    dragContentRect.current = null;
    pointerXPosition.current = 0;
    pointerYPosition.current = 0;
    document.removeEventListener('touchmove', handleContentDrag);
  }, [
    _isOpen.setFalse,
    config.content.cssHidden,
    config.content.cssOpen,
    config.overlay.cssHidden,
    contentAnimationController,
    handleContentDrag,
    onOpenChange,
    overlayAnimationController,
  ]);

  return (
    <Dialog.Root
      open={_isOpen.value}
      onOpenChange={closeOnOutsideClick ? onOpenChange : undefined}
    >
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <animated.div
            className={clsx(styles.overlay, classes?.overlay)}
            style={overlayAnimationController.springs}
            ref={overlayRef}
          />
        </Dialog.Overlay>
        <Dialog.Content>
          <animated.div
            className={clsx(styles.content, classes?.content)}
            onTouchStart={handleContentTouchStart}
            onTouchEnd={handleContentTouchEnd}
            style={contentAnimationController.springs}
            ref={contentRef}
          >
            {_children}
          </animated.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
