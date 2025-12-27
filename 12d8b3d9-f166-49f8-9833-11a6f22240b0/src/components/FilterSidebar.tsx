import React from 'react';
import { XIcon } from 'lucide-react';
interface FilterOption {
  label: string;
  value: string;
  count?: number;
}
interface FilterGroup {
  title: string;
  options: FilterOption[];
}
interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filterGroups: FilterGroup[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (groupTitle: string, value: string) => void;
  onClearAll: () => void;
}
export function FilterSidebar({
  isOpen,
  onClose,
  filterGroups,
  selectedFilters,
  onFilterChange,
  onClearAll
}: FilterSidebarProps) {
  if (!isOpen) return null;
  const totalSelected = Object.values(selectedFilters).reduce((sum, arr) => sum + arr.length, 0);
  return <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />

      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-screen lg:h-auto
        w-80 bg-white border-r lg:border-r-0 lg:border border-gray-200 
        rounded-none lg:rounded-lg p-6 overflow-y-auto z-50
        transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-[var(--color-navy)]">
            Filters
          </h3>
          <div className="flex items-center gap-2">
            {totalSelected > 0 && <button onClick={onClearAll} className="text-sm text-[var(--color-gold)] hover:underline font-medium">
                Clear all
              </button>}
            <button onClick={onClose} className="lg:hidden p-1 hover:bg-gray-100 rounded">
              <XIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Groups */}
        <div className="space-y-6">
          {filterGroups.map(group => <div key={group.title}>
              <h4 className="font-semibold text-[var(--color-navy)] mb-3">
                {group.title}
              </h4>
              <div className="space-y-2">
                {group.options.map(option => {
              const isSelected = selectedFilters[group.title]?.includes(option.value) || false;
              return <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" checked={isSelected} onChange={() => onFilterChange(group.title, option.value)} className="w-4 h-4 rounded border-gray-300 text-[var(--color-gold)] focus:ring-[var(--color-gold)]" />
                      <span className="text-sm text-gray-700 group-hover:text-[var(--color-navy)] flex-1">
                        {option.label}
                      </span>
                      {option.count !== undefined && <span className="text-xs text-gray-500">
                          ({option.count})
                        </span>}
                    </label>;
            })}
              </div>
            </div>)}
        </div>
      </div>
    </>;
}