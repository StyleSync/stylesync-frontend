import { type FC, useState, useEffect, useRef } from 'react';
import type L from 'leaflet';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

import { ZoomControl } from '@/modules/location/components/zoom/zoom-control';
import {
  proUserMarkerIcon,
  viewerUserMarkerIcon,
} from '@/modules/location/constants/map.constants';

import styles from './map.module.scss';
import type { MapProps } from './map.interface';

export const Map: FC<MapProps> = ({ markers }) => {
  const [position, setPosition] = useState<null | [number, number]>(null);

  const mapRef = useRef<L.Map>(null);

  useEffect(() => {
    navigator.permissions.query({ name: 'geolocation' }).then(() => {
      navigator.geolocation.getCurrentPosition((pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      });
    });
  }, []);

  const handleZoomIn = () => {
    mapRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapRef.current?.zoomOut();
  };

  const defaultLatitude = 50.517483;
  const defaultLongitude = 30.495037;

  return (
    <div className={styles.mapContainer}>
      <ZoomControl
        className={styles.zoomControl}
        onZoomOut={handleZoomOut}
        onZoomIn={handleZoomIn}
      />
      <MapContainer
        center={[defaultLatitude, defaultLongitude]}
        zoom={13}
        scrollWheelZoom={true}
        zoomControl={false}
        ref={mapRef}
      >
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        {position && <Marker icon={viewerUserMarkerIcon} position={position} />}

        {markers.map((marker, index) => {
          const markeIcon = marker.avatar
            ? proUserMarkerIcon(marker.avatar)
            : undefined;

          return (
            <Marker
              key={index}
              icon={markeIcon}
              position={[marker.lat, marker.lng]}
            />
          );
        })}
      </MapContainer>
    </div>
  );
};
