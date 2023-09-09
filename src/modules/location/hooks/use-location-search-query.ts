import { useQuery } from '@tanstack/react-query';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

const LOCATION_SEARCH_CACHE_KEY = 'LOCATION_SEARCH';

const provider = new OpenStreetMapProvider();

export const useLocationSearchQuery = (query: string) => {
  return useQuery(
    [LOCATION_SEARCH_CACHE_KEY, query],
    async () => {
      return provider.search({ query });
    },
    {
      keepPreviousData: true,
    }
  );
};
