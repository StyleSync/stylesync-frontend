'use client';
import {
  type FC,
  type ReactNode,
  createContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  useContext,
  useId,
  useMemo,
} from 'react';
// types
import type { ChildrenProp } from '@/modules/core/types/react.types';

import type { BottomFixedContentProps } from './bottom-fixed-content.interface';
import styles from './bottom-fixed-content.module.scss';

type RenderElement = {
  id: string;
  element: ReactNode;
  orderIndex: number;
};

const BottomFixedContentContext = createContext<{
  render: (data: RenderElement) => void;
  unmount: (id: string) => void;
}>({
  render: () => {},
  unmount: () => {},
});

const BottomFixedContent: FC<BottomFixedContentProps> & {
  Item: FC<ChildrenProp & { orderIndex: number }>;
} = ({ children }) => {
  const [items, setItems] = useState<RenderElement[]>([]);
  // refs
  const rootRef = useRef<HTMLDivElement>(null);
  // memo
  const displayItems = useMemo(
    () => items.sort((item1, item2) => item2.orderIndex - item1.orderIndex),
    [items]
  );

  useEffect(() => {
    const element = rootRef.current;

    if (!element) return;

    const heightObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { height } = entry.contentRect;

        // This css variable can be used in layouts to add bottom padding the same as bottom fixed content height
        document.documentElement.style.setProperty(
          '--bottom-fixed-content-height',
          `${height}px`
        );
      }
    });

    heightObserver.observe(element);

    return () => {
      heightObserver.unobserve(element);
    };
  }, []);

  const render = useCallback((data: RenderElement) => {
    setItems((prevState) => {
      const existingItem = prevState.find((item) => item.id === data.id);

      if (!existingItem) {
        return [data, ...prevState];
      }

      if (existingItem.element !== data.element) {
        return [data, ...prevState.filter((item) => item.id !== data.id)];
      }

      return prevState;
    });
  }, []);

  const unmount = useCallback((id: string) => {
    setItems((prevState) => prevState.filter((item) => item.id !== id));
  }, []);

  return (
    <BottomFixedContentContext.Provider value={{ render, unmount }}>
      {children}
      <div className={styles.root} ref={rootRef}>
        {displayItems.map((item) => (
          <div className={styles.item} key={item.id}>
            {item.element}
          </div>
        ))}
      </div>
    </BottomFixedContentContext.Provider>
  );
};

const Item: FC<ChildrenProp & { orderIndex: number }> = ({
  children,
  orderIndex,
}) => {
  const id = useId();
  const { render, unmount } = useContext(BottomFixedContentContext);

  useEffect(() => {
    render({ id, element: children, orderIndex });

    return () => {
      unmount(id);
    };
  }, [children, id, orderIndex, render, unmount]);

  return null;
};

BottomFixedContent.Item = Item;

export { BottomFixedContent };
