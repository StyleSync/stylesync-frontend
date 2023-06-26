import localFont from 'next/font/local';
// types
import type { SupportedFonts } from '@/styles/styles.types';

const sfProText = localFont({
  src: [
    {
      path: '../assets/fonts/SFProText/SF-Pro-Text-Ultralight.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../assets/fonts/SFProText/SF-Pro-Text-Thin.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../assets/fonts/SFProText/SF-Pro-Text-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/SFProText/SF-Pro-Text-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/SFProText/SF-Pro-Text-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/SFProText/SF-Pro-Text-Semibold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/SFProText/SF-Pro-Text-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/SFProText/SF-Pro-Text-Bold.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../assets/fonts/SFProText/SF-Pro-Text-Black.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  fallback: ['sans-serif'],
});

const fonts: Record<SupportedFonts, ReturnType<typeof localFont>> = {
  SF_PRO_TEXT: sfProText,
};

export { fonts };
