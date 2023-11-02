import {
  type MutableRefObject,
  createRef,
  type FC,
  useEffect,
  useState,
} from 'react';
import * as RadixToast from '@radix-ui/react-toast';
// components
import { Toast } from '@/modules/core/components/toast';
// types
import type { ChildrenProp } from '@/modules/core/types/react.types';
import type { ToastProps } from '@/modules/core/components/toast/toast.interface';

type ToastData = Omit<ToastProps, 'isOpen' | 'onClose'>;

const addToast: MutableRefObject<((toast: ToastData) => void) | null> =
  createRef();

export const showToast = (toast: ToastData) => {
  addToast.current && addToast.current(toast);
};

export const ToastProvider: FC<ChildrenProp> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    addToast.current = (toast: ToastData) => {
      setToasts((prevState) => [...prevState, toast]);
    };
  }, []);

  return (
    <RadixToast.Provider swipeDirection='right'>
      {children}
      {toasts.map((toast, index) => (
        <Toast
          key={index}
          {...toast}
          isOpen
          onClose={() =>
            setToasts((prevState) => prevState.filter((i) => i !== toast))
          }
        />
      ))}
      <RadixToast.Viewport className='ToastViewport' />
    </RadixToast.Provider>
  );
};
