import { useMemo } from 'react';

import { useWindowSize } from 'usehooks-ts';

import { pxToNumber } from '@/modules/core/utils/css.utils';
import scssVariables from '@/styles/variables.module.scss';

type DeviceType = 'mobile' | 'tablet' | 'desktop' | null;

let cacheWidth = 0;

export const useDeviceType = (): DeviceType => {
  const { width } = useWindowSize();

  return useMemo<DeviceType>(() => {
    if (width === 0 && cacheWidth === 0) {
      return null;
    }

    let _width = width;

    if (width === 0 && cacheWidth !== 0) {
      _width = cacheWidth;
    }

    cacheWidth = _width;

    if (_width <= pxToNumber(scssVariables.screenPhone)) {
      return 'mobile';
    }

    if (_width <= pxToNumber(scssVariables.screenTablet)) {
      return 'tablet';
    }

    return 'desktop';
  }, [width]);
};
