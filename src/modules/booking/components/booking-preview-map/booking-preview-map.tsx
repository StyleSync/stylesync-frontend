import { type FC } from 'react';

import dynamic from 'next/dynamic';

import type { BookingPreviewMapProps } from './booking-preview-map.interface';

const Map = dynamic(
  () => import('@/modules/location/components/map').then((res) => res.Map),
  {
    ssr: false,
  }
);

export const BookingPreviewMap: FC<BookingPreviewMapProps> = ({
  zoom,
  center,
  markers,
}) => {
  return <Map zoom={zoom} center={center} markers={markers} />;
};
