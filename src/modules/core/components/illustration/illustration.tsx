import { type FC, memo, type SVGAttributes } from 'react';

import FilesIllustration from '@/assets/illustrations/files.svg?icon';
import FolderIllustration from '@/assets/illustrations/folder.svg?icon';

export const illustrations = {
  folder: FolderIllustration,
  files: FilesIllustration,
} satisfies Record<string, FC<SVGAttributes<SVGElement>>>;

export type IllustrationName = keyof typeof illustrations;

type IllustrationProps = {
  name: IllustrationName;
} & SVGAttributes<SVGElement>;

const Illustration = memo<IllustrationProps>(({ name, ...props }) => {
  const IllustrationElement = illustrations[name];

  if (!IllustrationElement) {
    throw new Error(`Illustration with name ${name} doesn't exist`);
  }

  return <IllustrationElement {...props} />;
});

Illustration.displayName = 'Illustration';

export { Illustration };
