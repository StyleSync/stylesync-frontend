export type BookingPreviewMapProps = {
  markers?: {
    lat: number;
    lng: number;
  }[];
  center?: { lat: number; lng: number };
  zoom?: number;
};
