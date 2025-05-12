import type { StaticImageData } from 'next/image';

import type { IconName } from '@/modules/core/components/icon';
import type { StylingProps } from '@/styles/styles.types';

export type BrowserViewProps = StylingProps & {
  image: StaticImageData;
  meta: {
    siteIcon: IconName;
    siteName: string;
    siteUrl: string;
  };
};
