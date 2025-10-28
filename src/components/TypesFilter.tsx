import { useQuery } from '@tanstack/react-query';
import FadeUp from '@/components/FadeUp';
import { getTypes } from '@/services/others';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const TypesFilter = ({ selectedTypes, onTypesChange }: { selectedTypes: string[]; onTypesChange: (types: string[]) => void; }) => {
  const {
    data: types = [],
    isLoading,
    error
  } = useQuery<string[]>({
    queryKey: ['types'],
    queryFn: getTypes,
    staleTime: 5 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
  });

  const handleTypeToggle = (type: string) => {
    const updatedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(r => r !== type)
      : [...selectedTypes, type];


    onTypesChange(updatedTypes);
  };

  const handleSelectAll = () => {
    if (selectedTypes.length === types.length) {
      onTypesChange([]);
    } else {
      onTypesChange(types);
    }
  };

  if (isLoading) {
    return (
      <FadeUp>
        <div className="mb-6">
          <h3 className="text-sm font-medium text-secondary-foreground mb-3">Types</h3>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div className="w-4 h-4 bg-gray-200 rounded animate-pulse mr-2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>
    );
  }

  if (error) {
    return (
      <FadeUp>
        <div className="mb-6">
          <h3 className="text-sm font-medium text-secondary-foreground mb-3">Types</h3>
          <p className="text-red-500 text-sm">Error loading types</p>
        </div>
      </FadeUp>
    );
  }

  return (
    <FadeUp>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-secondary-foreground mb-3">Energy Types</h3>
          <Button
            onClick={handleSelectAll}
            className="cursor-pointer text-xs"
            variant='ghost'
          >
            {selectedTypes.length === types.length ? 'Clear All' : 'Select All'}
          </Button>
        </div>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {types.map((type) => (
            <div key={type} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 hover:dark:bg-gray-800 p-1 rounded">
              <Checkbox
                id={`type-${type}`}
                checked={selectedTypes.includes(type)}
                onCheckedChange={() => handleTypeToggle(type)}
              />
              <Label
                htmlFor={`type-${type}`}
                className="cursor-pointer text-sm font-normal text-primary"
              >
                {type}
              </Label>
            </div>
          ))}
        </div>
        {selectedTypes.length > 0 && (
          <div className="mt-2 text-xs text-primary">
            {selectedTypes.length} of {types.length} selected
          </div>
        )}
      </div>
    </FadeUp>
  );
};

export default TypesFilter;