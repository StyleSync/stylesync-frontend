import { type FC, useState, useEffect } from 'react';

import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  ZoomControl,
} from 'react-leaflet';

import { divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

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

  useEffect(() => {
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      navigator.geolocation.getCurrentPosition((pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      });
    });
  }, []);

  const URL = 'eugenederii/clkls8pny000c01qx0bnr2mhl';
  const AccessToken =
    'pk.eyJ1IjoiZXVnZW5lZGVyaWkiLCJhIjoiY2xrbHMxY2t5MDZucjNlb3h0Mmc4OGVlcSJ9.stj0ywdapaAI46qlOoFV9A';

  return (
    <div className={styles.map_container}>
      <MapContainer
        center={[50.517483, 30.495037]}
        zoom={13}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`https://api.mapbox.com/styles/v1/${URL}/tiles/{z}/{x}/{y}?access_token=${AccessToken}`}
        />
        <ZoomControl zoomInText='s' position='bottomright' />
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
