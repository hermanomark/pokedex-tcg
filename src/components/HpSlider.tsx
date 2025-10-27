import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';

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

  const handleSliderChange = (value: number[]) => {
    const newRange: [number, number] = [
      Math.min(value[0], value[1]),
      Math.max(value[0], value[1])
    ];
    setHpRange(newRange);
    onHPChange(newRange);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        HP Range: {hpRange[0]} - {hpRange[1]}
      </label>

      <div className="px-2 mb-2">
        <div className="relative">
          <Slider
            min={minHP}
            max={maxHP}
            step={1}
            value={hpRange}
            onValueChange={handleSliderChange}
            className="w-full hp-slider hp-slider-range cursor-pointer"
          />
        </div>
      </div>

      <div className="flex justify-between text-xs px-2">
        <span className="text-black-600 font-medium">Min: {hpRange[0]}</span>
        <span className="text-black-600 font-medium">Max: {hpRange[1]}</span>
      </div>
    </div>
  );
};

export default HpSlider;