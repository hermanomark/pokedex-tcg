import { useState } from 'react';
import FadeUp from './FadeUp';
import { ArrowDownUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const SortButton = ({ onSortChange, currentSort }: { onSortChange: (sort: string) => void; currentSort: string; }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: '', label: 'Default' },
    { value: 'name:ASC', label: 'Name A-Z' },
    { value: 'name:DESC', label: 'Name Z-A' },
    { value: 'hp:DESC', label: 'HP Low to High' },
    { value: 'hp:ASC', label: 'HP High to Low' },
  ];

  const handleSortSelect = (sortValue: string) => {
    onSortChange(sortValue);
    setIsOpen(false);
  };

  const currentSortLabel = sortOptions.find(option => option.value === currentSort)?.label || 'Default';

  return (
    <div className="relative">
      <Popover>
        <FadeUp>
          <PopoverTrigger asChild>
            <Button
              onClick={() => setIsOpen(!isOpen)}
              className='cursor-pointer'
              title="Sort cards"
              variant='outline'
            >
              <ArrowDownUp size={16} />
              <p className='text-xs'>{currentSortLabel}</p>
            </Button>
          </PopoverTrigger>
        </FadeUp>
        <PopoverContent className='w-50 p-0'>
          <div className="w-full">
            <div className="py-1 text-left">
              {sortOptions.map((option) => (
                <Button
                  key={option.value}
                  onClick={() => handleSortSelect(option.value)}
                  className={`cursor-pointer w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${currentSort === option.value ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                    }`}
                  variant='ghost'
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SortButton;