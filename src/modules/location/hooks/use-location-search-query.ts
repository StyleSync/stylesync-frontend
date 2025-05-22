import { useQuery } from '@tanstack/react-query';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

const LOCATION_SEARCH_CACHE_KEY = 'LOCATION_SEARCH';

const provider = new OpenStreetMapProvider();

export const useLocationSearchQuery = (query: string) => {
  return useQuery({
    queryKey: [LOCATION_SEARCH_CACHE_KEY, query],
    queryFn: async () => {
      return provider.search({ query });
    },
    placeholderData: (previousData) => previousData,
  });
};
