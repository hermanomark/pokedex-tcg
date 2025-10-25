import { useState, useEffect } from 'react';

const HpSlider = ({
  onHPChange,
  minHP = 0,
  maxHP = 380,
  currentRange = [0, 380]
}: { onHPChange: (range: [number, number]) => void; minHP?: number; maxHP?: number; currentRange?: [number, number]; }) => {
  const [hpRange, setHpRange] = useState(currentRange);

  useEffect(() => {
    setHpRange(currentRange);
  }, [currentRange]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const newRange: [number, number] = [Math.min(value, hpRange[1]), hpRange[1]];
    setHpRange(newRange);
    onHPChange(newRange);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const newRange: [number, number] = [hpRange[0], Math.max(value, hpRange[0])];
    setHpRange(newRange);
    onHPChange(newRange);
  };

  const getTrackStyle = () => {
    const minPercent = ((hpRange[0] - minHP) / (maxHP - minHP)) * 100;
    const maxPercent = ((hpRange[1] - minHP) / (maxHP - minHP)) * 100;

    return {
      background: `linear-gradient(to right, 
        #e5e7eb 0%, 
        #e5e7eb ${minPercent}%, 
        #3b82f6 ${minPercent}%, 
        #3b82f6 ${maxPercent}%, 
        #e5e7eb ${maxPercent}%, 
        #e5e7eb 100%)`
    };
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        HP Range: {hpRange[0]} - {hpRange[1]}
      </label>

      <div className="px-2 mb-4">
        <div className="relative">
          {/* Track */}
          <div
            className="h-2 rounded-lg"
            style={getTrackStyle()}
          />

          {/* Min slider */}
          <input
            type="range"
            min={minHP}
            max={maxHP}
            value={hpRange[0]}
            onChange={handleMinChange}
            className="absolute top-0 left-0 w-full h-2 bg-transparent appearance-none cursor-pointer hp-slider hp-slider-min"
          />

          {/* Max slider */}
          <input
            type="range"
            min={minHP}
            max={maxHP}
            value={hpRange[1]}
            onChange={handleMaxChange}
            className="absolute top-0 right-0 w-full h-2 bg-transparent appearance-none cursor-pointer hp-slider hp-slider-max"
          />
        </div>
      </div>

      {/* Min/Max labels */}
      <div className="flex justify-between text-xs text-gray-500 mb-2 px-2">
        <span>{minHP}</span>
        <span>{maxHP}</span>
      </div>

      {/* Current values */}
      <div className="flex justify-between text-xs px-2">
        <span className="text-blue-600 font-medium">Min: {hpRange[0]}</span>
        <span className="text-blue-600 font-medium">Max: {hpRange[1]}</span>
      </div>
    </div>
  );
};

export default HpSlider;