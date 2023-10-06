// containers
import { IndexPreview } from '@/modules/core/containers/index-preview';
// types
import type { PageParams } from '@/modules/core/types/next.types';

export default async function Home({ params }: PageParams) {
  return (
    <main>
      <IndexPreview />
    </main>
  );
}
