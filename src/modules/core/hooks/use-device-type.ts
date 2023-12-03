import { useWindowSize } from 'usehooks-ts';
import { useMemo } from 'react';
// styles
import scssVariables from '@/styles/variables.module.scss';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

// todo: review this part
const pxToNumber = (px: string): number => {
  return +px.replace('px', '');
};

export const useDeviceType = (): DeviceType => {
  const { width } = useWindowSize();

  return useMemo<DeviceType>(() => {
    if (width <= pxToNumber(scssVariables.screenPhone)) {
      return 'mobile';
    }

    if (width <= pxToNumber(scssVariables.screenTablet)) {
      return 'tablet';
    }

    return 'desktop';
  }, [width]);
};
