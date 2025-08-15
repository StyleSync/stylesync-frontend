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
    title: 'client.header.title',
    match: (pathname) => pathname.includes('/app/clients'),
  },
];
