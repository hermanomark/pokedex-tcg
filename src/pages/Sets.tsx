import { useEffect, useRef, useState } from 'react';
import Header from "../components/Header";
import LoadMore from "../components/LoadMore";
import Card from "../components/Card";
import GridLayout from "../layouts/GridLayout";
import { useInfiniteQuery } from '@tanstack/react-query'
import { getAllSets } from "../services/sets";
import { Spinner } from "@/components/ui/spinner";
import SearchInput from '../components/SearchInput';
import { useDebounce } from 'react-use';

const Sets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useDebounce(() => {
    setDebouncedSearchTerm(searchTerm);
  }, 720, [searchTerm]);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  } = useInfiniteQuery({
    queryKey: ['sets', debouncedSearchTerm],
    queryFn: ({ pageParam = 1 }) => getAllSets(pageParam as number, 10, debouncedSearchTerm),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || (Array.isArray(lastPage) && (lastPage.length === 0 || lastPage.length < 10))) {
        return undefined;
      }
      return allPages.length + 1;
    },
    staleTime: 5 * 60 * 1000,
  });

  const sets = (data?.pages ?? []).flatMap(page =>
    page.filter((set: { logo: string }) => set.logo)
  ) ?? [];

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  }

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
      <Header header="Sets" />
      <div className="mb-12">
        <SearchInput onSearch={handleSearch} placeholder='Search for sets...' />
      </div>
      {sets.length === 0 && debouncedSearchTerm && !isLoading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No sets found matching your criteria.
          </p>
        </div>
      ) : (
        <>
          {isLoading && sets.length === 0 ? (
            <div className="flex justify-center py-8">
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <Spinner />
                Loading sets...
              </div>
            </div>
          ) : (
            <>
              <GridLayout >
                {sets.map((item) => (
                  <Card key={item.id} card={item} type='sets' />
                ))}
              </GridLayout>
              <LoadMore loadMoreRef={loadMoreRef} isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} />
            </>
          )}
        </>
      )}
    </>
  );
}

export default Sets;