import { type FC, useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

import { ZoomControl } from '@/modules/core/components/zoom/zoom';
import {
  proUserMarkerIcon,
  viewerUserMarkerIcon,
} from '@/modules/location/constants/map.constants';

import styles from './map.module.scss';

export const Map: FC = () => {
  const [position, setPosition] = useState<null | [number, number]>(null);

  const mapRef = useRef<L.Map>(null);

  useEffect(() => {
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
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

  return (
    <div className={styles.map_container}>
      <ZoomControl
        className={styles.zoomControl}
        onZoomOut={handleZoomOut}
        onZoomIn={handleZoomIn}
      />
      <MapContainer
        center={[50.517483, 30.495037]}
        zoom={13}
        scrollWheelZoom={true}
        zoomControl={false}
        ref={mapRef}
      >
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        {position && (
          <>
            <Marker icon={viewerUserMarkerIcon} position={position}></Marker>
            <Marker
              icon={proUserMarkerIcon}
              position={[50.517483, 30.495037]}
            ></Marker>
          </>
        )}
      </MapContainer>
    </div>
  );
};
