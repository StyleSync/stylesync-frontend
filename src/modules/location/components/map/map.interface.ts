import type L from 'leaflet';
import type { MarkerProps } from 'react-leaflet';
import type { RefObject } from 'preact/compat';

export type UserMarker = {
  lat: number;
  lng: number;
  avatar?: string;
  markerProps?: Partial<Omit<MarkerProps, 'icon' | 'position'>>;
};

export type MapProps = {
  markers?: UserMarker[];
  showUserPosition?: boolean;
  mapRef?: RefObject<L.Map>;
  center?: L.LatLngExpression;
  zoom?: number;
};
