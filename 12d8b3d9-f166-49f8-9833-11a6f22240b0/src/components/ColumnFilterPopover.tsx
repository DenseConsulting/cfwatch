import React, { useEffect, useState, useRef } from 'react';
import { SearchIcon, XIcon, CheckIcon } from 'lucide-react';
import { Button } from './Button';
interface ColumnFilterPopoverProps {
  title: string;
  options: {
    label: string;
    value: string;
  }[];
  selectedValues: string[];
  onApply: (values: string[]) => void;
  onClose: () => void;
  isOpen: boolean;
  triggerRef: React.RefObject<HTMLElement>;
}
export function ColumnFilterPopover({
  title,
  options,
  selectedValues,
  onApply,
  onClose,
  isOpen,
  triggerRef
}: ColumnFilterPopoverProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [tempSelected, setTempSelected] = useState<string[]>(selectedValues);
  const popoverRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Reset temp selection when opening
  useEffect(() => {
    if (isOpen) {
      setTempSelected(selectedValues);
      setSearchQuery('');
      // Focus input on open
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, selectedValues]);
  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node) && triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);
  // Filter options based on search
  const filteredOptions = options.filter(option => option.label.toLowerCase().includes(searchQuery.toLowerCase()));
  const toggleOption = (value: string) => {
    setTempSelected(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };
  const handleApply = () => {
    onApply(tempSelected);
    onClose();
  };
  const handleClear = () => {
    setTempSelected([]);
  };
  if (!isOpen) return null;
  return <div ref={popoverRef} className="absolute z-50 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-100" style={{
    top: '100%',
    left: 0
  }} role="dialog" aria-label={`Filter by ${title}`}>
      <div className="p-3 border-b border-gray-100">
        <div className="relative">
          <SearchIcon className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input ref={inputRef} type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder={`Search ${title}...`} className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-200 rounded-md focus:border-[var(--color-navy)] focus:ring-1 focus:ring-[var(--color-navy)] focus:outline-none" />
        </div>
      </div>

      <div className="max-h-60 overflow-y-auto p-1">
        {filteredOptions.length > 0 ? <div className="space-y-0.5">
            {filteredOptions.map(option => {
          const isSelected = tempSelected.includes(option.value);
          return <label key={option.value} className={`flex items-center px-2 py-1.5 rounded cursor-pointer text-sm ${isSelected ? 'bg-blue-50 text-[var(--color-navy)]' : 'hover:bg-gray-50 text-gray-700'}`}>
                  <div className={`w-4 h-4 rounded border mr-2 flex items-center justify-center ${isSelected ? 'bg-[var(--color-navy)] border-[var(--color-navy)]' : 'border-gray-300 bg-white'}`}>
                    {isSelected && <CheckIcon className="w-3 h-3 text-white" />}
                  </div>
                  <input type="checkbox" className="hidden" checked={isSelected} onChange={() => toggleOption(option.value)} />
                  <span className="truncate">{option.label}</span>
                </label>;
        })}
          </div> : <div className="p-4 text-center text-xs text-gray-500">
            No options found
          </div>}
      </div>

      <div className="p-3 border-t border-gray-100 flex items-center justify-between bg-gray-50">
        <button onClick={handleClear} className="text-xs text-gray-500 hover:text-gray-700 font-medium" disabled={tempSelected.length === 0}>
          Clear
        </button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="!py-1 !px-2 !text-xs h-7" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" className="!py-1 !px-2 !text-xs h-7" onClick={handleApply}>
            Apply
          </Button>
        </div>
      </div>
    </div>;
}