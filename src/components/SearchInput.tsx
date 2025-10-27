import { useEffect, useState } from 'react';
import FadeUp from './FadeUp';
import { Search, X } from 'lucide-react';

const SearchInput = ({ onSearch, placeholder = "Search Pokemon cards...", value = '' }: { onSearch: (value: string) => void; placeholder?: string; value?: string; }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  return (
    <FadeUp>
      <div className="relative w-full max-w-md">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="w-full px-4 py-2 pl-10 pr-10 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search size={16} className="text-gray-400" />
          </div>
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
    </FadeUp>
  );
};

export default SearchInput;