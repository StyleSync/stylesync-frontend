import {
  type FC,
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from 'react';
import type L from 'leaflet';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
// components
import { ZoomControl } from '@/modules/location/components/zoom';
// constants
import {
  proUserMarkerIcon,
  viewerUserMarkerIcon,
} from '@/modules/location/constants/map.constants';
// hooks
import { useCombinedRefs } from '@/modules/core/hooks/use-combined-refs';
// styles
import 'leaflet/dist/leaflet.css';

import type { MapProps } from './map.interface';
import styles from './map.module.scss';

const defaultCoordinates = { latitude: 48.3358856, longitude: 31.1788196 };

const Map: FC<MapProps> = ({
  center,
  markers,
  showUserPosition = false,
  zoom = 6,
  ...props
}) => {
  // state
  const [userPosition, setUserPosition] = useState<null | [number, number]>(
    null
  );
  // refs
  const mapRef = useRef<L.Map>(null);
  const combinedRef = useCombinedRefs<L.Map>(props.mapRef, mapRef);

  useEffect(() => {
    if (showUserPosition) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserPosition([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  }, [showUserPosition]);

  useLayoutEffect(() => {
    const attributionElement = document.querySelector(
      '.leaflet-control-attribution'
    );

    if (attributionElement) {
      attributionElement.remove();
    }
  }, []);

  const handleZoomIn = useCallback(() => {
    combinedRef.current?.zoomIn();
  }, [combinedRef]);

  const handleZoomOut = useCallback(() => {
    combinedRef.current?.zoomOut();
  }, [combinedRef]);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        ref={combinedRef}
        center={
          center || [defaultCoordinates.latitude, defaultCoordinates.longitude]
        }
        zoom={zoom}
        scrollWheelZoom
        zoomControl={false}
        data-swipable='true'
      >
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        {showUserPosition && userPosition && (
          <Marker icon={viewerUserMarkerIcon} position={userPosition} />
        )}
        {markers?.map((marker, index) => {
          const icon = proUserMarkerIcon(marker.avatar);

          return (
            <Marker
              key={index}
              icon={icon}
              position={[marker.lat, marker.lng]}
              {...marker.markerProps}
            />
          );
        })}
      </MapContainer>
      <ZoomControl
        className={styles.zoomControl}
        onZoomOut={handleZoomOut}
        onZoomIn={handleZoomIn}
      />
    </div>
  );
};

Map.displayName = 'Map';

export { Map };
