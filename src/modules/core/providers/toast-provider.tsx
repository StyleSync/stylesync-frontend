import {
  createRef,
  type FC,
  type MutableRefObject,
  useEffect,
  useState,
} from 'react';

import * as RadixToast from '@radix-ui/react-toast';

import { Toast } from '@/modules/core/components/toast';
import type { ToastProps } from '@/modules/core/components/toast/toast.interface';
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
import type { ChildrenProp } from '@/modules/core/types/react.types';

type ToastData = Omit<ToastProps, 'isOpen' | 'onClose'>;

const addToast: MutableRefObject<((toast: ToastData) => void) | null> =
  createRef();

export const showToast = (toast: ToastData) => {
  addToast.current && addToast.current(toast);
};

export const ToastProvider: FC<ChildrenProp> = ({ children }) => {
  const deviceType = useDeviceType();
  // state
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    addToast.current = (toast: ToastData) => {
      setToasts((prevState) => [...prevState, toast]);
    };
  }, []);

  return (
    <RadixToast.Provider
      duration={1800}
      swipeDirection={deviceType === 'mobile' ? 'up' : 'right'}
    >
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
