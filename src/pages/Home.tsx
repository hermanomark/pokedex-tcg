import { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query'
import { useDebounce } from 'react-use';
import { useSearchParams } from 'react-router-dom';
import { getAllCards } from '../services/cards';
import Card from '@/components/Card';
import GridLayout from '@/layouts/GridLayout';
import Header from '@/components/Header';
import LoadMore from '@/components/LoadMore';
import { Spinner } from '@/components/ui/spinner';
import SidebarFilter from '@/components/SideBarFilter';
import SearchInput from '@/components/SearchInput';
import SortButton from '@/components/SortButton';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('search') || '');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(searchTerm);
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || '');
  const [selectedRarities, setSelectedRarities] = useState<string[]>(
    searchParams.get('rarity') ? searchParams.get('rarity')!.split('|') : []
  );
  const [hpRange, setHpRange] = useState<[number, number]>(() => {
    const hpParam = searchParams.get('hp');
    if (hpParam) {
      const [min, max] = hpParam.split('-').map(Number);
      return [min, max];
    }
    return [0, 380];
  });
  const [debouncedHpRange, setDebouncedHpRange] = useState<[number, number]>(hpRange);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || '');

  useDebounce(() => {
    setDebouncedSearchTerm(searchTerm);
  }, 720, [searchTerm]);

  useDebounce(() => {
    setDebouncedHpRange(hpRange);
  }, 720, [hpRange]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearchTerm) params.set('search', debouncedSearchTerm);
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedRarities.length > 0) params.set('rarity', selectedRarities.join('|'));
    if (debouncedHpRange[0] !== 0 || debouncedHpRange[1] !== 380) {
      params.set('hp', `${debouncedHpRange[0]}-${debouncedHpRange[1]}`);
    }
    if (sortBy) params.set('sort', sortBy);

    setSearchParams(params);
  }, [debouncedSearchTerm, selectedCategory, selectedRarities, debouncedHpRange, sortBy, setSearchParams]);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  } = useInfiniteQuery({
    queryKey: [
      'cards',
      debouncedSearchTerm,
      selectedCategory,
      selectedRarities,
      debouncedHpRange,
      sortBy],
    queryFn: ({ pageParam = 1 }) =>
      getAllCards(
        pageParam as number,
        10,
        debouncedSearchTerm,
        selectedCategory,
        selectedRarities,
        debouncedHpRange,
        sortBy),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || (Array.isArray(lastPage) && (lastPage.length === 0 || lastPage.length < 10))) {
        return undefined;
      }
      return allPages.length + 1;
    },
    staleTime: 5 * 60 * 1000,
  });

  const cards = (data?.pages ?? []).flatMap(page =>
    page.filter((card: { image: string }) => card.image)
  ) ?? [];

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  }

  const handleRaritiesChange = (rarities: string[]) => {
    setSelectedRarities(rarities);
  }

  const handleHPChange = (newRange: [number, number]) => {
    setHpRange(newRange);
  }

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
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

  if (isLoading) return <p className="text-gray-700"><Spinner /></p>;
  if (isError) return <p className="text-red-700">Error: {error.message}</p>;

  return (
    <>
      <Header header="TCG Cards" />

      <div className='flex flex-row justify-between sm:flex-row gap-4 mb-6 w-full'>
        <SearchInput onSearch={handleSearch} value={searchTerm} />
        <div className='flex gap-3'>
          <SortButton onSortChange={handleSortChange} currentSort={sortBy} />
          <SidebarFilter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            selectedRarities={selectedRarities}
            onRaritiesChange={handleRaritiesChange}
            hpRange={hpRange}
            onHPChange={handleHPChange}
          />
        </div>
      </div>
      {cards.length === 0 && (debouncedSearchTerm || selectedCategory || selectedRarities.length > 0 || hpRange[0] !== 0 || hpRange[1] !== 380) ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No cards found matching your criteria.
          </p>
        </div>
      ) : (
        <>
          <GridLayout>
            {cards.map((card) => (
              <Card key={`${card.id}-${card.name}`} card={card} type='cards' />
            ))}
          </GridLayout>
          <LoadMore loadMoreRef={loadMoreRef} isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} />
        </>
      )}
    </>
  );
}

export default Home;