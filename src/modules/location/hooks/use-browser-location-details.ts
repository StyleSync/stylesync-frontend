import { useBrowserLocation } from '@/modules/location/hooks/use-browser-location';
import { useReverseGeocodingQuery } from '@/modules/location/hooks/use-reverse-geocoding-query';
import { useMemo } from 'react';

type UseBrowserLocationDetailsOptions = {
  browserLocationSearchEnabled?: boolean;
};

export const useBrowserLocationDetails = (
  options?: UseBrowserLocationDetailsOptions
) => {
  const { data: browserLocation, ...browserLocationQuery } = useBrowserLocation(
    {
      enabled: options?.browserLocationSearchEnabled,
    }
  );
  const { data: geocodingResponse, ...geocodingQuery } =
    useReverseGeocodingQuery(browserLocation);
  // memo
  const place = useMemo(() => {
    if (geocodingResponse) {
      const placeFeature = geocodingResponse.features.find(
        (feature) => feature.properties.feature_type === 'place'
      );

      return placeFeature || null;
    }

    return null;
  }, [geocodingResponse]);

  return {
    place,
    isLoading: browserLocationQuery.isLoading || geocodingQuery.isLoading,
  };
};
