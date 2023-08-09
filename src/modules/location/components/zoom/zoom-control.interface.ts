import type { StylingProps } from '@/styles/styles.types';

export type ZoomProps = StylingProps & {
  onZoomIn: () => void;
  onZoomOut: () => void;
};
