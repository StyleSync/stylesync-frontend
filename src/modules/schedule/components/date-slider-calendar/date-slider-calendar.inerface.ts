import { type MutableRefObject } from 'react';
import { type Swiper } from 'swiper/types';

export type DateSliderCalendarProps = {
  days: Date[] | undefined;
  swiperRef: MutableRefObject<any>;
  onSwiper: (swiper: Swiper) => void;
  onDateSelect: (date: Date) => void;
  selectedDate: Date | null;
};
