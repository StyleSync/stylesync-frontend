import { type LngLatLike } from '@mapbox/search-js-core/dist/LngLat';
import { useGeocodingCore } from '@mapbox/search-js-react';
import { useQuery } from '@tanstack/react-query';

const CITY_BY_LOCATION_CACHE_KEY = 'CITY_BY_LOCATION';

export const useReverseGeocodingQuery = (lngLat?: LngLatLike | null) => {
  const geocodingCore = useGeocodingCore({
    accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
  });

  return useQuery({
    queryKey: [CITY_BY_LOCATION_CACHE_KEY],
    queryFn: () => {
      return geocodingCore.reverse(lngLat || [0, 0]);
    },
    enabled: !!lngLat,
  });
};
