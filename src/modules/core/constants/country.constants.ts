import { defaultCountries, parseCountry } from 'react-international-phone';

// exclude  Belarus, rusia, Iran, Iraq, Venezuela, Cuba, Nicaragua, Eritrea, Syria, Myanmar, Zimbabwe, Congo,Uganda,Kingdom of Eswatini, China and North Korea
export const countries = defaultCountries.filter((terorist) => {
  const { iso2 } = parseCountry(terorist);

  return (
    iso2 !== 'ru' &&
    iso2 !== 'ir' &&
    iso2 !== 'by' &&
    iso2 !== 'iq' &&
    iso2 !== 've' &&
    iso2 !== 'cu' &&
    iso2 !== 'ni' &&
    iso2 !== 'er' &&
    iso2 !== 'sy' &&
    iso2 !== 'mm' &&
    iso2 !== 'cn' &&
    iso2 !== 'sz' &&
    iso2 !== 'cg' &&
    iso2 !== 'ug' &&
    iso2 !== 'zw' &&
    iso2 !== 'kp'
  );
});
