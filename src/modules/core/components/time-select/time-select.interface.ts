import type { Time } from '@/modules/core/utils/time.utils';
import type { StylingProps } from '@/styles/styles.types';

export type TimeSelectProps = StylingProps & {
  value: Time;
  onChange: (time: Time) => void;
};
