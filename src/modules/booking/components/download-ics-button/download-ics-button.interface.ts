export type DownloadIcsButtonProps = {
  startEventTime: number;
  duration: { hours: number; minutes: number };
  title: string;
  location: string;
  organizer: { name: string; email: string };
  attendee: { name: string; email: string };
};
