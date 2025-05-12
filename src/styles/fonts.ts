import { GeistSans } from 'geist/font/sans';
import type { NextFont } from 'next/dist/compiled/@next/font';
import { Inter } from 'next/font/google';

import type { SupportedFonts } from '@/styles/styles.types';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const fonts: Record<SupportedFonts, NextFont> = {
  INTER: inter,
  GEIST: GeistSans,
};

export { fonts };
