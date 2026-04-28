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
import { useSearchParams } from 'react-router-dom';
import SortButton from '@/components/SortButton';
import { type SetBrief } from '@/types';

const Sets = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('search') || '');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(searchTerm);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || '');

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearchTerm) params.set('search', debouncedSearchTerm);
    if (sortBy) params.set('sort', sortBy);

    setSearchParams(params);
  }, [debouncedSearchTerm, sortBy, setSearchParams]);

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
  } = useInfiniteQuery<SetBrief[]>({
    queryKey: ['sets', debouncedSearchTerm, sortBy],
    queryFn: ({ pageParam = 1 }) => getAllSets({
      page: pageParam as number,
      itemsPerPage: 10,
      searchName: debouncedSearchTerm,
      sortBy: sortBy
    }),
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
    page.filter((set) => set.logo)
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

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  }

  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      <Header header="Sets" />
      <div className='flex gap-3 mb-6 w-full'>
        <div className="flex-1">
          <SearchInput onSearch={handleSearch} value={searchTerm} placeholder='Search for sets...' />
        </div>
        <SortButton onSortChange={handleSortChange} currentSort={sortBy} type="sets" />
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