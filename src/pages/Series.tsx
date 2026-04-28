import { useEffect, useRef } from 'react';
import Header from "../components/Header";
import LoadMore from "../components/LoadMore";
import Card from "../components/Card";
import GridLayout from "../layouts/GridLayout";
import { useInfiniteQuery } from '@tanstack/react-query'
import { getAllSeries } from "../services/series";
import { Spinner } from "../components/ui/spinner";

const Series = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['series'],
    queryFn: ({ pageParam = 1 }) => getAllSeries(
      { page: pageParam as number, itemsPerPage: 10 }
    ),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || (Array.isArray(lastPage) && (lastPage.length === 0 || lastPage.length < 10))) {
        return undefined;
      }
      return allPages.length + 1;
    },
    staleTime: 5 * 60 * 1000,
  });

  const series = (data?.pages ?? []).flatMap((page) =>
    page.filter((card) => card.logo)
  ) ?? [];

  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      <Header header="Series" />
      <>
        {isLoading && series.length === 0 ? (
          <div className="flex justify-center py-8">
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <Spinner />
              Loading series...
            </div>
          </div>
        ) : (
          <>
            <GridLayout >
              {series.map((item) => (
                <Card key={item.id} card={item} type='series' />
              ))}
            </GridLayout>
            <LoadMore loadMoreRef={loadMoreRef} isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} /></>
        )}
      </>
    </>
  );
}

export default Series;