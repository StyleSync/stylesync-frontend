import { type FC, useEffect } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

type InfinityListControllerProps = {
  hasNextPage: boolean;
  onLoadMore: () => void;
  isNextPageLoading: boolean;
};

export const InfinityListController: FC<InfinityListControllerProps> = ({
  hasNextPage,
  onLoadMore,
  isNextPageLoading,
}) => {
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.5,
  });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isNextPageLoading) {
      onLoadMore();
    }
  }, [isIntersecting, hasNextPage, isNextPageLoading, onLoadMore]);

  return (
    <div ref={ref} className='h-[1px] min-h-[1px] w-full bg-transparent' />
  );
};
