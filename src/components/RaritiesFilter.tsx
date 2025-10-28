import { useQuery } from '@tanstack/react-query';
import FadeUp from '@/components/FadeUp';
import { getRarities } from '@/services/others';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const RaritiesFilter = ({ selectedRarities, onRaritiesChange }: { selectedRarities: string[]; onRaritiesChange: (rarities: string[]) => void; }) => {
  const {
    data: rarities = [],
    isLoading,
    error
  } = useQuery<string[]>({
    queryKey: ['rarities'],
    queryFn: getRarities,
    staleTime: 5 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
  });

  const handleRarityToggle = (rarity: string) => {
    const updatedRarities = selectedRarities.includes(rarity)
      ? selectedRarities.filter(r => r !== rarity)
      : [...selectedRarities, rarity];


    onRaritiesChange(updatedRarities);
  };

  const handleSelectAll = () => {
    if (selectedRarities.length === rarities.length) {
      onRaritiesChange([]);
    } else {
      onRaritiesChange(rarities);
    }
  };

  if (isLoading) {
    return (
      <FadeUp>
        <div className="mb-6">
          <h3 className="text-sm font-medium text-secondary-foreground mb-3">Rarities</h3>
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
          <h3 className="text-sm font-medium text-secondary-foreground mb-3">Rarities</h3>
          <p className="text-red-500 text-sm">Error loading rarities</p>
        </div>
      </FadeUp>
    );
  }

  return (
    <FadeUp>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-secondary-foreground mb-3">Rarities</h3>
          <Button
            onClick={handleSelectAll}
            className="cursor-pointer text-xs"
            variant='ghost'
          >
            {selectedRarities.length === rarities.length ? 'Clear All' : 'Select All'}
          </Button>
        </div>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {rarities.map((rarity) => (
            <div key={rarity} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 hover:dark:bg-gray-800 p-1 rounded">
              <Checkbox
                id={`rarity-${rarity}`}
                checked={selectedRarities.includes(rarity)}
                onCheckedChange={() => handleRarityToggle(rarity)}
              />
              <Label
                htmlFor={`rarity-${rarity}`}
                className="cursor-pointer text-sm font-normal text-primary"
              >
                {rarity}
              </Label>
            </div>
          ))}
        </div>
        {selectedRarities.length > 0 && (
          <div className="mt-2 text-xs text-primary">
            {selectedRarities.length} of {rarities.length} selected
          </div>
        )}
      </div>
    </FadeUp>
  );
};

export default RaritiesFilter;