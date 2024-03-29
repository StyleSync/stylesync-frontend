import type { FC } from 'react';
import type { ChildrenProp } from '@/modules/core/types/react.types';
import type { Metadata } from 'next';

// PWA Metadata
export const metadata: Metadata = {
  title: 'StyleSync',
  description: 'Find the Perfect Professional for Your Beauty Needs',
  generator: 'StyleSync Team',
  manifest: '/manifest.json',
  keywords: ['beauty', 'makeup', 'hair', 'stylesync', 'style sync', ''],
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#3b82ef' }],
  authors: [
    { name: 'Ihor Balan' },
    { name: 'Vadim Tarasenko' },
    { name: 'Yevhen Derii' },
  ],
  viewport:
    'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
  icons: [
    { rel: 'apple-touch-icon', url: '/icons/icon-128x128.png' },
    { rel: 'icon', url: '/icons/icon-128x128.png' },
  ],
};

const Layout: FC<ChildrenProp> = ({ children }) => <>{children}</>;

export default Layout;
