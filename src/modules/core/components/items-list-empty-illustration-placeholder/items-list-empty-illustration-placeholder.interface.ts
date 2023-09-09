import type { IllustrationName } from '@/modules/core/components/illustration/illustration';
import type { PlaceholderProps } from '@/modules/core/components/placeholder/placeholder.interface';

export type ItemsListEmptyIllustrationPlaceholderProps = Omit<
  PlaceholderProps,
  'placeholder'
> & {
  illustration?: IllustrationName;
  description?: string;
};
