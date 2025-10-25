import { useState } from 'react';
import FadeUp from './FadeUp';

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
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
            />
          </svg>
          <p className='text-sm'>{currentSortLabel}</p>
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