import { useQuery } from '@tanstack/react-query';
import type { LngLatLike } from '@mapbox/search-js-core/dist/LngLat';

const BROWSER_LOCATION_CACHE_KEY = 'BROWSER_LOCATION';

type UseBrowserLocationOptions = {
  enabled?: boolean;
};

export const useBrowserLocation = (options?: UseBrowserLocationOptions) => {
  return useQuery<LngLatLike>({
    queryKey: [BROWSER_LOCATION_CACHE_KEY],
    queryFn: async () => {
      return new Promise((resolve, reject) => {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
              resolve({
                lat: coords.latitude,
                lng: coords.longitude,
              });
            },
            (err) => {
              reject(new Error(err.message));
            }
          );
        } else {
          reject(new Error('Browser does not support geolocation'));
        }
      });
    },
    ...options,
  });
};
