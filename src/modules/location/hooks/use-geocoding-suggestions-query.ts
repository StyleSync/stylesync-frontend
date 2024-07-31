import { useQuery } from '@tanstack/react-query';
import { useGeocodingCore } from '@mapbox/search-js-react';
import type { GeocodingOptions } from '@mapbox/search-js-core';

const GEOCODING_SUGGESTIONS_CACHE_KEY = 'GEOCODING_SUGGESTIONS';

export const useGeocodingSuggestionsQuery = (
  searchText: string,
  optionsArg?: Partial<GeocodingOptions>
) => {
  const geocodingCore = useGeocodingCore({
    accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
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
