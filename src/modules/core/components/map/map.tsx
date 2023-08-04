import { type FC, useState, useEffect, useRef } from 'react';
import L, { divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  ZoomControl,
} from 'react-leaflet';

import { Zoom } from '../zoom/zoom';

import styles from './map.module.scss';
import avatar from './avatar.png';

const customMarkerIcon = divIcon({
  html: `<div class=${styles.custom_icon_container}>
            <img class=${styles.custom_avatar} src=${avatar.src} alt='Marker' />
          </div>`,
  iconSize: [0, 0],
  iconAnchor: [20, 50],
  className: '',
});

const customMarker = divIcon({
  html: `<div class=${styles.custom_marker_container}>
            <div class=${styles.custom_marker_animation}></div>
            <div class=${styles.custom_marker_center}></div>
          </div>`,
});

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

  const URL = 'eugenederii/clkls8pny000c01qx0bnr2mhl';
  const AccessToken =
    'pk.eyJ1IjoiZXVnZW5lZGVyaWkiLCJhIjoiY2xrbHMxY2t5MDZucjNlb3h0Mmc4OGVlcSJ9.stj0ywdapaAI46qlOoFV9A';

  return (
    <div className={styles.map_container}>
      <Zoom
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
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/${URL}/tiles/{z}/{x}/{y}?access_token=${AccessToken}`}
        />
        {position && (
          <>
            <Marker icon={customMarker} position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
            <Marker icon={customMarkerIcon} position={[50.517483, 30.495037]}>
              <Popup>ddd</Popup>
            </Marker>
          </>
        )}
      </MapContainer>
    </div>
  );
};
