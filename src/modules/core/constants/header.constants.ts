export const headerRouteConfig: {
  title?: string;
  match: (pathname: string) => boolean;
}[] = [
  {
    title: 'burger.menu.btn.myBookings',
    match: (pathname) => pathname.includes('/app/my-bookings'),
  },
  {
    title: 'burger.menu.btn.settings',
    match: (pathname) => pathname.includes('/app/settings'),
  },
  {
    title: 'Клієнти', // todo: translate
    match: (pathname) => pathname.includes('/app/clients'),
  },
];
