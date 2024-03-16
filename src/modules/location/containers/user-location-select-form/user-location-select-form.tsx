import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type L from 'leaflet';
import dynamic from 'next/dynamic';
import { Button } from '@/modules/core/components/button';
// types
import type { Address } from '@/modules/location/types/address.types';
import type { UserMarker } from '@/modules/location/components/map/map.interface';

import type {
  UserLocationSelectFormProps,
  UserLocationSelectFormHandle,
} from './user-location-select-form.interface';
import styles from './user-location-select-form.module.scss';

const ADDRESS_ZOOM = 17;

const LocationSearch = dynamic(
  () =>
    import('@/modules/location/components/location-search').then(
      (res) => res.LocationSearch
    ),
  {
    ssr: false,
  }
);
const Map = dynamic(
  () => import('@/modules/location/components/map').then((res) => res.Map),
  {
    ssr: false,
  }
);

const UserLocationSelectForm = forwardRef<
  UserLocationSelectFormHandle,
  UserLocationSelectFormProps
>(({ location }, ref) => {
  const [address, setAddress] = useState<Address | null>(
    location
      ? {
          name: location.name,
          lat: location.latitude,
          lng: location.longitude,
        }
      : null
  );
  // refs
  const mapRef = useRef<L.Map>(null);
  // memo
  const markers = useMemo<UserMarker[]>(() => {
    if (!address) {
      return [];
    }

    return [
      {
        lat: address.lat,
        lng: address.lng,
        markerProps: {
          draggable: true,
          eventHandlers: {
            dragend: (res) => {
              setAddress((current) => {
                if (!current) {
                  return null;
                }

                return {
                  ...current,
                  lat: res.target._latlng.lat ?? current.lat,
                  lng: res.target._latlng.lng ?? current.lng,
                };
              });
            },
          },
        },
      },
    ];
  }, [address]);

  useImperativeHandle(ref, () => ({
    getAddress: () => address,
  }));

  useEffect(() => {
    if (address) {
      mapRef.current?.flyTo(
        {
          lat: address.lat,
          lng: address.lng,
        },
        ADDRESS_ZOOM,
        {
          duration: 1,
        }
      );
    }
  }, [address]);

  const handleClearAddress = () => {
    setAddress(null);
  };

  return (
    <div className={styles.root}>
      <div className={styles.searchBar}>
        <LocationSearch
          value={address}
          onChange={setAddress}
          inputProps={{
            label: 'Address *',
            endAdornment: (
              <Button
                variant='unstyled'
                icon='close'
                onClick={handleClearAddress}
              />
            ),
          }}
        />
      </div>
      <Map
        mapRef={mapRef}
        markers={markers}
        center={address ? [address.lat, address.lng] : undefined}
        zoom={address ? ADDRESS_ZOOM : undefined}
      />
    </div>
  );
});

UserLocationSelectForm.displayName = 'UserLocationSelectForm';

export { UserLocationSelectForm };
