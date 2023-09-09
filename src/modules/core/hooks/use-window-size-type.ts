import { useWindowSize } from 'usehooks-ts';
import { useMemo } from 'react';
// styles
import scssVariables from '@/styles/variables.module.scss';

type WindowSizeType = 'mobile' | 'tablet' | 'desktop';

// todo: review this part
const pxToNumber = (px: string): number => {
  return +px.replace('px', '');
};

export const useWindowSizeType = (): WindowSizeType => {
  const { width } = useWindowSize();

  return useMemo<WindowSizeType>(() => {
    if (width <= pxToNumber(scssVariables.screenPhone)) {
      return 'mobile';
    }

    if (width <= pxToNumber(scssVariables.screenPhone)) {
      return 'tablet';
    }

    return 'desktop';
  }, [width]);
};
