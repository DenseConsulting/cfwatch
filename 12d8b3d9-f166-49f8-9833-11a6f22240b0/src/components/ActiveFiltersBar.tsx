import React from 'react';
import { XIcon } from 'lucide-react';
interface ActiveFiltersBarProps {
  activeFilters: Record<string, string[]>;
  onRemoveFilter: (category: string, value: string) => void;
  onClearAll: () => void;
}
export function ActiveFiltersBar({
  activeFilters,
  onRemoveFilter,
  onClearAll
}: ActiveFiltersBarProps) {
  // Check if there are any active filters
  const hasActiveFilters = Object.values(activeFilters).some(values => values.length > 0);
  if (!hasActiveFilters) return null;
  return <div className="flex flex-wrap items-center gap-2 mb-4 animate-in fade-in slide-in-from-top-2 duration-200">
      <span className="text-xs font-medium text-gray-500 mr-1">
        Active Filters:
      </span>

      {Object.entries(activeFilters).map(([category, values]) => values.map(value => <div key={`${category}-${value}`} className="inline-flex items-center bg-gray-100 border border-gray-200 rounded-full px-3 py-1 text-xs font-medium text-[var(--color-navy)] group hover:bg-gray-200 transition-colors">
            <span className="text-gray-500 mr-1">{category}:</span>
            <span>{value}</span>
            <button onClick={() => onRemoveFilter(category, value)} className="ml-1.5 p-0.5 rounded-full hover:bg-gray-300 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-navy)] focus:ring-offset-1" aria-label={`Remove filter ${category}: ${value}`}>
              <XIcon className="w-3 h-3" />
            </button>
          </div>))}

      <button onClick={onClearAll} className="text-xs text-gray-500 hover:text-[var(--color-navy)] font-medium ml-2 underline decoration-dotted underline-offset-2 transition-colors">
        Clear all filters
      </button>
    </div>;
}