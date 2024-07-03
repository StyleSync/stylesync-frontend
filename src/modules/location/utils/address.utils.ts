export const getAddressGoogleLink = <
  T extends { latitude?: string; longitude?: string }
>(
  address?: T
) => {
  const lat = Number(address?.latitude);
  const lng = Number(address?.longitude);

  if (isNaN(lat) || isNaN(lng)) {
    return null;
  }

  return `https://maps.google.com/?q=${lat},${lng}`;
};
