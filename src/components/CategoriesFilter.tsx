import { useQuery } from '@tanstack/react-query';
import FadeUp from './FadeUp';
import { getCategories } from '../services/others';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CategoriesFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoriesFilter = ({ selectedCategory, onCategoryChange }: CategoriesFilterProps) => {
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
      <div className="relative mb-6">
        <Select
          value={selectedCategory}
          onValueChange={onCategoryChange}
        >
          <SelectTrigger className="w-full cursor-pointer">
            <SelectValue placeholder="Select a Card Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Card Types</SelectLabel>
              <SelectItem value="all">
                All Cards
              </SelectItem>
              {Array.isArray(categories) && categories.map((category: string) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </FadeUp >
  );
};

export default CategoriesFilter;