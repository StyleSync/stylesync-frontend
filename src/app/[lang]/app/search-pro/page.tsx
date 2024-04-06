'use client';
import { ProSearchField } from '@/modules/core/containers/pro-search-field';
import styles from './search-pro.module.scss';
import { ProfessionalSearchCard } from '@/modules/user/containers/professional-search-card';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { Typography } from '@/modules/core/components/typogrpahy';

export default function SearchProPage() {
  const { data: professionalList } = trpc.professional.list.useQuery({
    limit: 6,
  });

  return (
    <div className={styles.root}>
      <section className='w-full max-w-[920px] mx-auto flex pt-14 pb-10'>
        <ProSearchField />
      </section>
      <section className={styles.pageContent}>
        <div className='pageContent py-12 gap-y-8 flex flex-col'>
          <Typography variant='body1'>Search results</Typography>
          <div className='grid grid-cols-3 gap-6'>
            {professionalList?.map((pro) => (
              // @ts-ignore todo: Will be fixed later. Expected different api query with different response.
              <ProfessionalSearchCard professional={pro} key={pro.id} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
