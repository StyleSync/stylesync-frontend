import {
  type RefObject,
  type TouchEventHandler,
  type TouchEvent as ReactTouchEvent,
  useCallback,
  useRef,
} from 'react';
// utils
import { reassignCssProperties } from '@/modules/core/utils/css.utils';

type Direction = 'horizontal' | 'vertical';

type TouchDragOptions = {
  direction: Direction;
  disabled?: boolean;
  onDrag?: (visibility: { px: number; percent: number }) => void;
  onDragEnd?: (offset: { x: number; y: number }) => void;
};

const getElementVisibility = (
  { width, height }: DOMRect,
  offset: { x: number; y: number },
  direction: Direction
) => {
  const dimensionPx = direction === 'horizontal' ? width : height;
  const offsetPx = direction === 'horizontal' ? offset.x : offset.y;

  let visibilityPx = dimensionPx - offsetPx;

  if (visibilityPx > dimensionPx) {
    visibilityPx = dimensionPx;
  }

  if (visibilityPx < 0) {
    visibilityPx = 0;
  }

  return { px: visibilityPx, percent: (visibilityPx * 100) / dimensionPx };
};

type TouchDragRegister<T extends HTMLElement> = {
  onTouchStart: TouchEventHandler<T>;
  onTouchEnd: TouchEventHandler<T>;
};

export const useTouchDirectionDrag = <T extends HTMLElement>(
  targetRef: RefObject<T>,
  config: TouchDragOptions
) => {
  const initialTargetRect = useRef<DOMRect | null>(null);
  const initialTouch = useRef<{ x: number; y: number } | null>(null);

  const completeDrag = useCallback(() => {
    if (!targetRef.current || !initialTargetRect.current) {
      return;
    }

    if (config.onDragEnd) {
      const targetRect = targetRef.current.getBoundingClientRect();
      const offsetX = targetRect.x - initialTargetRect.current.x;
      const offsetY = targetRect.y - initialTargetRect.current.y;

      config.onDragEnd({ x: offsetX, y: offsetY });
    }

    initialTargetRect.current = null;
    initialTouch.current = null;
  }, [config, targetRef]);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (
        !targetRef.current ||
        !initialTargetRect.current ||
        !initialTouch.current
      ) {
        return;
      }

      const offsetX = -(initialTouch.current.x - e.touches[0].clientX);
      const offsetY = -(initialTouch.current.y - e.touches[0].clientY);
      const dragDirection: Direction =
        offsetX > offsetY ? 'horizontal' : 'vertical';

      if (dragDirection !== config.direction) {
        completeDrag();

        document.removeEventListener('touchmove', handleTouchMove);

        return;
      }

      const visibility = getElementVisibility(
        initialTargetRect.current,
        {
          x: offsetX,
          y: offsetY,
        },
        config.direction
      );

      config.onDrag && config.onDrag(visibility);

      if (config.direction === 'vertical') {
        reassignCssProperties(targetRef.current, {
          bottom: `-${initialTargetRect.current.width - visibility.px}px`,
        });
      } else {
        throw new Error('TODO: Implement');
      }
    },
    [completeDrag, config, targetRef]
  );

  const handleTouchStart = useCallback(
    (e: ReactTouchEvent<T>) => {
      if (!targetRef.current) {
        return;
      }

      initialTargetRect.current = targetRef.current.getBoundingClientRect();
      initialTouch.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };

      reassignCssProperties(targetRef.current, { transition: 'none' });

      document.addEventListener('touchmove', handleTouchMove);
    },
    [targetRef, handleTouchMove]
  );

  const handleTouchEnd = useCallback(() => {
    completeDrag();

    document.removeEventListener('touchmove', handleTouchMove);
  }, [completeDrag, handleTouchMove]);

  const register: TouchDragRegister<T> = {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
  };

  return {
    register,
  };
};
