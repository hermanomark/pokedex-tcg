import { useState } from 'react';
import FadeUp from './FadeUp';
import { ArrowDownUp } from 'lucide-react';

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
      <FadeUp>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='cursor-pointer text-gray-400 flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-100'
          title="Sort cards"
        >
         <ArrowDownUp size={16} />
          <p className='text-xs'>{currentSortLabel}</p>
        </button>
      </FadeUp>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <div className="py-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortSelect(option.value)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${currentSort === option.value ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortButton;