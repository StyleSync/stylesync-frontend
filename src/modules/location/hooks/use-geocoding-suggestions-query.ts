import { useQuery } from '@tanstack/react-query';
import { useGeocodingCore } from '@mapbox/search-js-react';
import { MAPBOX_TOKEN } from '@/modules/location/hooks/use-reverse-geocoding-query';
import type { GeocodingOptions } from '@mapbox/search-js-core';

const GEOCODING_SUGGESTIONS_CACHE_KEY = 'GEOCODING_SUGGESTIONS';

export const useGeocodingSuggestionsQuery = (
  searchText: string,
  optionsArg?: Partial<GeocodingOptions>
) => {
  const geocodingCore = useGeocodingCore({
    accessToken: MAPBOX_TOKEN,
  });

  return useQuery({
    queryKey: [GEOCODING_SUGGESTIONS_CACHE_KEY, searchText, optionsArg],
    queryFn: () => {
      return geocodingCore.suggest(searchText, optionsArg);
    },
    keepPreviousData: true,
    enabled: !!searchText,
  });
};
