import { useQuery } from '@tanstack/react-query';
import FadeUp from './FadeUp';
import { getRarities } from '../services/others';

const RaritiesFilter = ({ selectedRarities, onRaritiesChange }: { selectedRarities: string[]; onRaritiesChange: (rarities: string[]) => void; }) => {
  const {
    data: rarities = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['rarities'],
    queryFn: getRarities,
    staleTime: 5 * 60 * 1000,
    cacheTime: 20 * 60 * 1000,
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
          <h3 className="text-sm font-medium text-gray-700 mb-3">Rarities</h3>
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
          <h3 className="text-sm font-medium text-gray-700 mb-3">Rarities</h3>
          <p className="text-red-500 text-sm">Error loading rarities</p>
        </div>
      </FadeUp>
    );
  }

  return (
    <FadeUp>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-gray-700">Rarities</h3>
          <button
            onClick={handleSelectAll}
            className="text-xs text-blue-600 hover:text-blue-800 focus:outline-none"
          >
            {selectedRarities.length === rarities.length ? 'Clear All' : 'Select All'}
          </button>
        </div>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {rarities.map((rarity) => (
            <label key={rarity} className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded">
              <input
                type="checkbox"
                checked={selectedRarities.includes(rarity)}
                onChange={() => handleRarityToggle(rarity)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span className="ml-2 text-sm text-gray-700">{rarity}</span>
            </label>
          ))}
        </div>
        {selectedRarities.length > 0 && (
          <div className="mt-2 text-xs text-gray-500">
            {selectedRarities.length} of {rarities.length} selected
          </div>
        )}
      </div>
    </FadeUp>
  );
};

export default RaritiesFilter;