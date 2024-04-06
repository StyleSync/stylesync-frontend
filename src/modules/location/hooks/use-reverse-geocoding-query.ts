import { useQuery } from '@tanstack/react-query';
import { useGeocodingCore } from '@mapbox/search-js-react';
import { type LngLatLike } from '@mapbox/search-js-core/dist/LngLat';

const CITY_BY_LOCATION_CACHE_KEY = 'CITY_BY_LOCATION';

export const MAPBOX_TOKEN =
  'pk.eyJ1IjoidmFkaW10YXJhc2Vua28iLCJhIjoiY2x5Yms2aGNtMTdxZTJscXRxZHhzZzdsNSJ9.XFyRcBKK31uCUZ0JmcgULw';

export const useReverseGeocodingQuery = (lngLat?: LngLatLike | null) => {
  const geocodingCore = useGeocodingCore({
    accessToken: MAPBOX_TOKEN,
  });

  return useQuery({
    queryKey: [CITY_BY_LOCATION_CACHE_KEY],
    queryFn: () => {
      return geocodingCore.reverse(lngLat || [0, 0]);
    },
    enabled: !!lngLat,
  });
};
