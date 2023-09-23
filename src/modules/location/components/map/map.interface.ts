export type UserMarker = {
  lat: number;
  lng: number;
  avatar?: string;
};

export type MapProps = {
  markers: UserMarker[];
};
