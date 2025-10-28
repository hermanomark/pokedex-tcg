import { useEffect, useState } from 'react';
import FadeUp from './FadeUp';
import { SearchIcon, X } from 'lucide-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

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
          <InputGroup>
            <InputGroupInput
              value={searchTerm}
              onChange={handleInputChange}
              placeholder={placeholder} />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            {searchTerm && (
              <InputGroupAddon align="inline-end">
                <InputGroupButton className='cursor-pointer' onClick={clearSearch}><X size={16} /></InputGroupButton>
              </InputGroupAddon>)}
          </InputGroup>
        </div>
      </div>
    </FadeUp>
  );
};

export default SearchInput;