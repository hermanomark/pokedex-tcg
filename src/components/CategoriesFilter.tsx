import { useQuery } from '@tanstack/react-query';
import FadeUp from './FadeUp';
import { getCategories } from '../services/others';

const CategoriesFilter = ({ selectedCategory, onCategoryChange }: { selectedCategory: string; onCategoryChange: (category: string) => void; }) => {
  const {
    data: categories,
    isLoading,
    error
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <FadeUp>
        <div className="mb-6">
          <div className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 animate-pulse h-10"></div>
        </div>
      </FadeUp>
    );
  }

  if (error) {
    return (
      <FadeUp>
        <div className="mb-6">
          <p className="text-red-500 text-sm">Error loading categories</p>
        </div>
      </FadeUp>
    );
  }

  return (
    <FadeUp>
      <div className="mb-6">
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option key={'All Card Types'} value="">
            All Card Types
          </option>
          {Array.isArray(categories) && categories.map((category: string) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </FadeUp>
  );
};

export default CategoriesFilter;