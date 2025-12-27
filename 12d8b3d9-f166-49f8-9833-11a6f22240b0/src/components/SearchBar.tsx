import React, { useState } from 'react';
import { SearchIcon, SlidersHorizontalIcon } from 'lucide-react';
interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onToggleFilters?: () => void;
  showFilterToggle?: boolean;
}
export function SearchBar({
  placeholder = 'Search...',
  onSearch,
  onToggleFilters,
  showFilterToggle = true
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };
  return <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder={placeholder} className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[var(--color-gold)] focus:outline-none text-gray-900 placeholder-gray-500" />
        </div>
        {showFilterToggle && <button type="button" onClick={onToggleFilters} className="px-4 py-3 bg-white border-2 border-gray-300 rounded-lg hover:border-[var(--color-navy)] transition-colors flex items-center gap-2 text-gray-700 font-medium">
            <SlidersHorizontalIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Filters</span>
          </button>}
        <button type="submit" className="px-6 py-3 bg-[var(--color-navy)] text-white rounded-lg hover:bg-[#1a2847] transition-colors font-semibold">
          Search
        </button>
      </div>
    </form>;
}