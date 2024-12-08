import { type MutableRefObject } from 'react';
import { type Swiper } from 'swiper/types';
import type { AppRouterOutputs } from '@/server/types';

export type DateSliderCalendarProps = {
  days: Date[] | undefined;
  swiperRef: MutableRefObject<any>;
  onSwiper: (swiper: Swiper) => void;
  onDateSelect: (date: Date) => void;
  selectedDate: Date | null;
  events: AppRouterOutputs['booking']['list'];
};
