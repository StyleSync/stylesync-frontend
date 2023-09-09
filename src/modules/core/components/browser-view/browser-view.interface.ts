import type { StylingProps } from '@/styles/styles.types';
import type { StaticImageData } from 'next/image';

export type BrowserViewProps = StylingProps & {
  image: StaticImageData;
};
