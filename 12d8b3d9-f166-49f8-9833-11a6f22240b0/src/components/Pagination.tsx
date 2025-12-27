import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalResults?: number;
  resultsPerPage?: number;
}
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalResults,
  resultsPerPage
}: PaginationProps) {
  const pages = [];
  const maxVisible = 7;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);
  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Results Info */}
      {totalResults !== undefined && resultsPerPage !== undefined && <div className="text-sm text-gray-600">
          Showing{' '}
          {Math.min((currentPage - 1) * resultsPerPage + 1, totalResults)} to{' '}
          {Math.min(currentPage * resultsPerPage, totalResults)} of{' '}
          {totalResults.toLocaleString()} results
        </div>}

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" aria-label="Previous page">
          <ChevronLeftIcon className="w-5 h-5" />
        </button>

        {startPage > 1 && <>
            <button onClick={() => onPageChange(1)} className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-sm font-medium">
              1
            </button>
            {startPage > 2 && <span className="px-2 text-gray-500">...</span>}
          </>}

        {pages.map(page => <button key={page} onClick={() => onPageChange(page)} className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${page === currentPage ? 'bg-[var(--color-navy)] text-white border-[var(--color-navy)]' : 'border-gray-300 hover:bg-gray-50'}`}>
            {page}
          </button>)}

        {endPage < totalPages && <>
            {endPage < totalPages - 1 && <span className="px-2 text-gray-500">...</span>}
            <button onClick={() => onPageChange(totalPages)} className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-sm font-medium">
              {totalPages}
            </button>
          </>}

        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" aria-label="Next page">
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
    </div>;
}