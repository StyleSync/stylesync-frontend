'use client';
import { type FC } from 'react';

import dynamic from 'next/dynamic';
import { useIntl } from 'react-intl';

import { Typography } from '@/modules/core/components/typogrpahy';
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
  const intl = useIntl();

  // queries
  const { data: professional } = trpc.professional.get.useQuery({
    id: userId,
    expand: ['user'],
  });
  const { data: location } = trpc.location.getByProfessionalId.useQuery(
    {
      id: professional?.id ?? '',
    },
    {
      enabled: Boolean(professional?.id),
      retry: false,
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

  if (!location) {
    return (
      <div className={styles.root}>
        <Typography className={styles.address}>
          {intl.formatMessage({
            id: 'professional.settings.location.not.specified',
          })}
        </Typography>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <Typography className={styles.address}>{location.name}</Typography>
      <div className={styles.mapContainer}>
        <Map markers={markers} center={center} zoom={zoom} />
      </div>
    </div>
  );
};
