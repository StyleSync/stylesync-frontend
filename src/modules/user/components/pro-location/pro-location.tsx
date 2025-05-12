'use client';
import { type FC } from 'react';

import dynamic from 'next/dynamic';

import { Typography } from '@/modules/core/components/typogrpahy';
import { onQueryRetry } from '@/modules/core/utils/query-retry.utils';
import { trpc } from '@/modules/core/utils/trpc.utils';

import type { ProLocationProps } from './pro-location.interface';

import styles from './pro-location.module.scss';

const Map = dynamic(
  () => import('@/modules/location/components/map').then((res) => res.Map),
  {
    ssr: false,
  }
);

export const ProLocation: FC<ProLocationProps> = ({ userId }) => {
  // queries
  const [professional] = trpc.professional.get.useSuspenseQuery({
    id: userId,
    expand: ['user'],
  });
  const [location] = trpc.location.getByProfessionalId.useSuspenseQuery(
    {
      id: professional.id,
    },
    {
      retry: (retryCount, error) => onQueryRetry(retryCount, error),
    }
  );

  const zoomNum = 17;
  const markers = location && [
    { lat: location.latitude, lng: location.longitude },
  ];
  const center = location && {
    lat: location.latitude,
    lng: location.longitude,
  };
  const zoom = location && zoomNum;

  return (
    <div className={styles.root}>
      <Typography className={styles.address}>{location?.name}</Typography>
      <div className={styles.mapContainer}>
        <Map markers={markers} center={center} zoom={zoom} />
      </div>
    </div>
  );
};
