import { Inter } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
// types
import type { SupportedFonts } from '@/styles/styles.types';
import type { NextFont } from 'next/dist/compiled/@next/font';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const fonts: Record<SupportedFonts, NextFont> = {
  INTER: inter,
  GEIST: GeistSans,
};

export { fonts };
