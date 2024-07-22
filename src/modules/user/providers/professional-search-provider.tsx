import {
  createContext,
  type FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import type { ChildrenProp } from '@/modules/core/types/react.types';
import type { GeocodingFeature } from '@mapbox/search-js-core';
import { useBrowserLocationDetails } from '@/modules/location/hooks/use-browser-location-details';

type SelectedServices = {
  isAll: boolean;
  selectedServices: string[];
};

type ProfessionalSearchContextValues = {
  searchQuery: string;
  place: GeocodingFeature | null;
  date: Date | null;
  selectedServices: SelectedServices;
  onSearchQueryChange: (searchQuery: string) => void;
  onPlaceChange: (place: GeocodingFeature | null) => void;
  onDateChange: (date: Date | null) => void;
  onSelectedServicesChange: (
    selectedServices: Partial<SelectedServices>
  ) => void;
};

const defaultSelectedServices = {
  isAll: true,
  selectedServices: [],
};

export const ProfessionalSearchContext =
  createContext<ProfessionalSearchContextValues>({
    place: null,
    searchQuery: '',
    date: null,
    selectedServices: defaultSelectedServices,
    onPlaceChange: () => {},
    onSearchQueryChange: () => {},
    onDateChange: () => {},
    onSelectedServicesChange: () => {},
  });

export const ProfessionalSearchProvider: FC<ChildrenProp> = ({ children }) => {
  const browserLocationDetails = useBrowserLocationDetails();
  // state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [place, setPlace] = useState<GeocodingFeature | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [selectedServices, setSelectedServices] = useState<SelectedServices>(
    defaultSelectedServices
  );

  useEffect(() => {
    if (browserLocationDetails && !place) {
      setPlace(browserLocationDetails.place);
    }
  }, [place, browserLocationDetails]);

  const handleSelectedServicesChange = useCallback(
    (nextState: Partial<SelectedServices>) => {
      setSelectedServices((prevState) => ({ ...prevState, ...nextState }));
    },
    []
  );

  return (
    <ProfessionalSearchContext.Provider
      value={{
        place,
        searchQuery,
        date,
        selectedServices,
        onPlaceChange: setPlace,
        onSearchQueryChange: setSearchQuery,
        onDateChange: setDate,
        onSelectedServicesChange: handleSelectedServicesChange,
      }}
    >
      {children}
    </ProfessionalSearchContext.Provider>
  );
};
