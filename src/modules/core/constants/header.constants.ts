export const headerRouteConfig: {
  title?: string;
  match: (pathname: string) => boolean;
}[] = [
  {
    title: 'burger.menu.btn.myBookings',
    match: (pathname) => pathname.includes('/app/my-bookings'),
  },
];
