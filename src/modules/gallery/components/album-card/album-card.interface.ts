export type AlbumCardProps = {
  isActive: boolean;
  name: string;
  hidden?: boolean;
  onClick: () => void;
  onCloseClick: () => void;
};
