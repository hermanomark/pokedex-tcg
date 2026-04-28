import { useState } from 'react';
import RaritiesFilter from './RaritiesFilter';
import HpSlider from './HpSlider';
import FadeUp from './FadeUp';
import CategoriesFilter from './CategoriesFilter';
import { Funnel, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TypesFilter from './TypesFilter';

const SidebarFilter = ({
  selectedCategory,
  onCategoryChange,
  selectedTypes,
  onTypesChange,
  selectedRarities,
  onRaritiesChange,
  hpRange,
  onHPChange
}: { selectedCategory: string; onCategoryChange: (category: string) => void; selectedTypes: string[]; onTypesChange: (types: string[]) => void; selectedRarities: string[]; onRaritiesChange: (rarities: string[]) => void; hpRange: [number, number]; onHPChange: (range: [number, number]) => void; }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {/* Filter Button */}
      <FadeUp>
        <Button
          onClick={toggleSidebar}
          variant='outline'
          className='cursor-pointer'
        >
          <Funnel size={16} />
        </Button>
      </FadeUp >

      {/* Mobile/Desktop overlay */}
      {
        isOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={toggleSidebar}
          />
        )
      }

      {/* Sidebar */}
      <div className={`
        fixed top-0 right-0 z-50
        w-80 h-full
        bg-sidebar-accent shadow-xl
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        sm:w-96
      `}>
        <div className="p-6 h-full overflow-y-auto">
          {/* Sidebar header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-primary">Filters</h2>
            <Button
              onClick={toggleSidebar}
              className="cursor-pointer"
              variant='ghost'
            >
              <X />
            </Button>
          </div>

          {/* Filter sections */}
          <div className="space-y-6">
            <div>
              <CategoriesFilter
                selectedCategory={selectedCategory}
                onCategoryChange={onCategoryChange}
              />
            </div>

            <div>
              <TypesFilter
                selectedTypes={selectedTypes}
                onTypesChange={onTypesChange}
              />
            </div>

            <div>
              <RaritiesFilter
                selectedRarities={selectedRarities}
                onRaritiesChange={onRaritiesChange}
              />
            </div>

            <div>
              <HpSlider
                minHP={0}
                maxHP={380}
                currentRange={hpRange}
                onHPChange={onHPChange}
              />
            </div>

            {/* Clear all filters */}
            <div className="pt-4 border-t border-gray-200">
              <Button
                onClick={() => {
                  onCategoryChange('');
                  onRaritiesChange([]);
                  onHPChange([0, 380]);
                }}
                className="cursor-pointer w-full"
                variant='outline'>
                Clear Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarFilter;