'use client';
import { useContext, useEffect, useMemo } from 'react';

import clsx from 'clsx';
import type { BBox } from 'geojson';
import { useIntl } from 'react-intl';
import { useBoolean } from 'usehooks-ts';

import { Button } from '@/modules/core/components/button';
import { InfinityListController } from '@/modules/core/components/infinity-list-controller/infinity-list-controller';
import { mapDateToDayEnum } from '@/modules/core/utils/date.utils';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { Footer } from '@/modules/landing/containers/footer/footer';
import { ProSearchField } from '@/modules/location/components/pro-search-field';
import { bboxLargestSideInKm } from '@/modules/location/utils/bbox.utils';
import { ProSearchFilter } from '@/modules/user/containers/pro-search-filter';
import { ProfessionalSearchCard } from '@/modules/user/containers/professional-search-card';
import { ProfessionalSearchContext } from '@/modules/user/providers/professional-search-provider';

import styles from './search-pro.module.scss';

export default function SearchProPage() {
  const intl = useIntl();

  // context
  const {
    date,
    place,
    selectedServices: { isAll, selectedServices },
    searchQuery,
    activateBrowserLocationSearch,
  } = useContext(ProfessionalSearchContext);
  // memo
  const queryFilter = useMemo<
    Parameters<typeof trpc.professional.list.useQuery>[0]
  >(() => {
    const res: Parameters<typeof trpc.professional.list.useQuery>[0] = {
      query: searchQuery,
    };

    if (date) {
      res.day = mapDateToDayEnum(date);
    }

    if (place) {
      const placeSizeKm = bboxLargestSideInKm(place.properties.bbox as BBox);
      const minPlaceSizeKm = 30;

      res.longitude = place.properties.coordinates.longitude;
      res.latitude = place.properties.coordinates.latitude;

      if (placeSizeKm > minPlaceSizeKm) {
        res.precision = Math.round(placeSizeKm);
      }
    }

    if (!isAll && selectedServices.length > 0) {
      res.serviceIds = selectedServices;
    }

    return res;
  }, [isAll, date, place, searchQuery, selectedServices]);
  // query
  const {
    data: professionalListQuery,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = trpc.professional.list.useInfiniteQuery(queryFilter, {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
  const isFilterActive = useBoolean();

  const professionalList =
    professionalListQuery?.pages.map((page) => page.items).flat() || [];

  useEffect(() => {
    activateBrowserLocationSearch();
  }, [activateBrowserLocationSearch]);

  return (
    <>
      <main className={clsx(styles.root)}>
        <section className='flex w-full flex-1 px-6 md:px-[40px]'>
          <div className='flex flex-1 flex-col py-6 md:py-12'>
            <div className='flex gap-5 lg:hidden'>
              <ProSearchField />
            </div>

            <div className='mt-6 flex flex-row items-center gap-x-4 lg:mt-0'>
              {isLoading ? (
                <div className='skeleton h-5 w-[80%] max-w-[250px] rounded' />
              ) : (
                <span className='text-base font-medium text-dark lg:text-xl'>
                  {intl.formatMessage(
                    { id: 'professional.count' },
                    { count: professionalList.length }
                  )}
                </span>
              )}

              <Button
                variant='light'
                onClick={isFilterActive.toggle}
                text={intl.formatMessage({ id: 'professional.search.filters' })}
                icon='filter'
                classes={{
                  root: 'ml-auto lg:ml-1 shrink-0',
                  icon: '!w-4 !h-4',
                }}
              />
            </div>
            <div className='mt-4 flex flex-1 gap-x-8 lg:mt-8'>
              <div className='relative grid flex-1 gap-6 transition [grid-template-columns:repeat(auto-fill,_minmax(240px,1fr))] [grid-template-rows:max-content]'>
                {isLoading ? (
                  <>
                    <div className='skeleton h-[337px] w-full rounded-xl' />
                    <div className='skeleton h-[337px] w-full rounded-xl' />
                    <div className='skeleton h-[337px] w-full rounded-xl' />
                  </>
                ) : (
                  <>
                    {professionalList && professionalList.length ? (
                      professionalList.map((pro) => (
                        <ProfessionalSearchCard
                          // @ts-ignore todo: Will be fixed later. Expected different api query with different response.
                          professional={pro}
                          key={pro.id}
                        />
                      ))
                    ) : (
                      <div className='absolute left-0 top-0 flex h-full w-full flex-col gap-y-4'>
                        <span className='text-sm font-medium text-gray'>
                          {intl.formatMessage({
                            id: 'pages.searchPro.noFound.description',
                          })}
                        </span>
                      </div>
                    )}
                  </>
                )}
                <InfinityListController
                  hasNextPage={hasNextPage || false}
                  onLoadMore={fetchNextPage}
                  isNextPageLoading={isFetchingNextPage}
                />
              </div>
              <ProSearchFilter
                isOpen={isFilterActive.value}
                onOpenChange={isFilterActive.setValue}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
