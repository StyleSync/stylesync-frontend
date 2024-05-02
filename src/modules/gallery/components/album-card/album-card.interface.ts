import type { Portfolio, Album } from '@prisma/client';

export type AlbumCardProps = {
  isActive?: boolean;
  name: string;
  hidden?: boolean;
  onClick: () => void;
  onCloseClick?: () => void;
  album?: Album & {
    portfolios: Portfolio[];
  };
  onEditClick?: (album: Album) => void;
  isMoreButtonVisible: boolean;
};
