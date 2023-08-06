import type { RefObject } from 'react';
import { useEventListener } from 'usehooks-ts';

type Handler = (event: MouseEvent) => void;

export function useOnClickOutsideExtended<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  ignoreRefs?: RefObject<HTMLElement>[],
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown'
): void {
  useEventListener(mouseEvent, (event) => {
    const el = ref?.current;

    // Do nothing if clicking ref's element or descendent elements
    if (
      !el ||
      el.contains(event.target as Node) ||
      (ignoreRefs &&
        ignoreRefs.some((refToIgnore) =>
          refToIgnore.current?.contains(event.target as Node)
        ))
    ) {
      return;
    }

    handler(event);
  });
}
