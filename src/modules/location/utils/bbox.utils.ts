import type { BBox } from 'geojson';

/**
 * Calculates the distance in kilometers between two latitude/longitude points using the Haversine formula.
 * @param lat1 - Latitude of the first point.
 * @param lon1 - Longitude of the first point.
 * @param lat2 - Latitude of the second point.
 * @param lon2 - Longitude of the second point.
 * @returns The distance between the two points in kilometers.
 */
function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  // eslint-disable-next-line no-magic-numbers
  const toRad = (value: number) => (value * Math.PI) / 180;
  const earthRadiusKm = 6371;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
}

/**
 * Calculates the largest side in kilometers of the area defined by the bounding box (bbox).
 * @param bbox - The bounding box defined as [minLng, minLat, maxLng, maxLat] or [minLng, minLat, minAlt, maxLng, maxLat, maxAlt].
 * @returns The largest side of the area in kilometers.
 */
export const bboxLargestSideInKm = (bbox: BBox): number => {
  const [minLng, minLat, maxLng, maxLat] =
    // eslint-disable-next-line no-magic-numbers
    bbox.length === 4 ? bbox : [bbox[0], bbox[1], bbox[3], bbox[4]];

  // Calculate width in kilometers (difference in longitude)
  const widthKm = haversineDistance(minLat, minLng, minLat, maxLng);

  // Calculate height in kilometers (difference in latitude)
  const heightKm = haversineDistance(minLat, minLng, maxLat, minLng);

  // Return the larger of the two distances
  return Math.max(widthKm, heightKm);
};
