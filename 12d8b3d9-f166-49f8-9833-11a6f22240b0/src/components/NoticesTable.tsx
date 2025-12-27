import React, { useState, useRef } from 'react';
import { ArrowUpDownIcon, AlertCircleIcon, ClockIcon, FileTextIcon, ExternalLinkIcon, FilterIcon } from 'lucide-react';
import { Button } from './Button';
import { ColumnFilterPopover } from './ColumnFilterPopover';
export interface NoticeRecord {
  id: string;
  caseNumber: string;
  agency: string;
  assetType: string;
  description: string;
  city: string;
  state: string;
  seizureDate: string;
  claimDeadline: string;
  status: 'active' | 'expired' | 'claimed';
  noticeType: 'Administrative' | 'Judicial';
  sourceUrl?: string; // URL to official government PDF
}
export interface FilterOption {
  label: string;
  value: string;
}
interface NoticesTableProps {
  data: NoticeRecord[];
  onSort: (column: keyof NoticeRecord) => void;
  sortColumn?: keyof NoticeRecord;
  sortDirection?: 'asc' | 'desc';
  onViewNotice: (id: string) => void;
  // Filter props
  filterOptions?: {
    agency: FilterOption[];
    assetType: FilterOption[];
    location: FilterOption[];
  };
  activeFilters?: Record<string, string[]>;
  onFilterChange?: (category: string, values: string[]) => void;
}
// Agency to PDF URL mapping
const AGENCY_PDF_URLS: Record<string, string> = {
  ATF: 'https://www.forfeiture.gov/pdf/ATF/OfficialNotification.pdf',
  DEA: 'https://www.forfeiture.gov/pdf/DEA/OfficialNotification.pdf',
  FBI: 'https://www.forfeiture.gov/pdf/FBI/OfficialNotification.pdf',
  IRS: 'https://www.forfeiture.gov/pdf/IRS/OfficialNotification.pdf',
  USAO: 'https://www.forfeiture.gov/pdf/USAO/OfficialNotification.pdf',
  CBP: 'https://www.forfeiture.gov/pdf/CBP/OfficialNotification.pdf',
  USPS: 'https://www.forfeiture.gov/pdf/USPS/OfficialNotification.pdf',
  USSS: 'https://www.forfeiture.gov/pdf/USSS/OfficialNotification.pdf'
};
export function NoticesTable({
  data,
  onSort,
  sortColumn,
  sortDirection,
  onViewNotice,
  filterOptions,
  activeFilters = {},
  onFilterChange
}: NoticesTableProps) {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const agencyRef = useRef<HTMLTableHeaderCellElement>(null);
  const assetTypeRef = useRef<HTMLTableHeaderCellElement>(null);
  const locationRef = useRef<HTMLTableHeaderCellElement>(null);
  const getDeadlineStatus = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return {
      label: 'Passed',
      color: 'text-gray-500 bg-gray-100',
      icon: <ClockIcon className="w-3 h-3" />
    };
    if (diffDays <= 7) return {
      label: `${diffDays}d Left`,
      color: 'text-red-700 bg-red-50 border border-red-100',
      icon: <AlertCircleIcon className="w-3 h-3" />
    };
    if (diffDays <= 30) return {
      label: `${diffDays}d Left`,
      color: 'text-yellow-800 bg-yellow-50 border border-yellow-100',
      icon: <ClockIcon className="w-3 h-3" />
    };
    return {
      label: new Date(deadline).toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: '2-digit'
      }),
      color: 'text-gray-700',
      icon: null
    };
  };
  const getAgencyPdfUrl = (agency: string): string | null => {
    return AGENCY_PDF_URLS[agency] || null;
  };
  const SortIcon = ({
    column
  }: {
    column: keyof NoticeRecord;
  }) => {
    if (sortColumn !== column) return <ArrowUpDownIcon className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-50 transition-opacity" />;
    return <ArrowUpDownIcon className={`w-3 h-3 text-[var(--color-navy)] ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} />;
  };
  const HeaderCell = ({
    column,
    label,
    className = '',
    filterable = false,
    filterKey = '',
    filterRef = null
  }: {
    column: keyof NoticeRecord;
    label: string;
    className?: string;
    filterable?: boolean;
    filterKey?: string;
    filterRef?: React.RefObject<HTMLTableHeaderCellElement> | null;
  }) => {
    const isFilterActive = filterable && activeFilters[filterKey]?.length > 0;
    const isFilterOpen = openFilter === filterKey;
    return <th ref={filterRef} className={`px-3 py-3 text-left text-xs font-bold text-[var(--color-navy)] uppercase tracking-wider select-none relative ${className}`}>
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900 transition-colors group" onClick={() => onSort(column)}>
            {label}
            <SortIcon column={column} />
          </div>

          {filterable && filterOptions && onFilterChange && <div className="relative">
              <button onClick={e => {
            e.stopPropagation();
            setOpenFilter(isFilterOpen ? null : filterKey);
          }} className={`p-1 rounded hover:bg-gray-100 transition-colors ${isFilterActive ? 'text-[var(--color-navy)] bg-blue-50' : 'text-gray-400 hover:text-gray-600'}`} aria-label={`Filter by ${label}`}>
                <FilterIcon className={`w-3.5 h-3.5 ${isFilterActive ? 'fill-current' : ''}`} />
              </button>

              {isFilterOpen && <ColumnFilterPopover title={label} options={filterOptions[filterKey as keyof typeof filterOptions] || []} selectedValues={activeFilters[filterKey] || []} onApply={values => onFilterChange(filterKey, values)} onClose={() => setOpenFilter(null)} isOpen={isFilterOpen} triggerRef={filterRef as React.RefObject<HTMLElement>} />}
            </div>}
        </div>
      </th>;
  };
  return <div className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      {/* Scrollable container with visible scrollbars */}
      <div className="w-full overflow-x-auto overflow-y-auto" style={{
      WebkitOverflowScrolling: 'touch',
      scrollbarWidth: 'thin',
      scrollbarColor: '#CBD5E0 #F7FAFC'
    }}>
        <style>{`
          .overflow-x-auto::-webkit-scrollbar {
            height: 12px;
            width: 12px;
          }
          .overflow-x-auto::-webkit-scrollbar-track {
            background: #F7FAFC;
            border-radius: 6px;
          }
          .overflow-x-auto::-webkit-scrollbar-thumb {
            background: #CBD5E0;
            border-radius: 6px;
            border: 2px solid #F7FAFC;
          }
          .overflow-x-auto::-webkit-scrollbar-thumb:hover {
            background: #A0AEC0;
          }
        `}</style>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <HeaderCell column="caseNumber" label="Case ID" className="w-32" />
              <HeaderCell column="agency" label="Agency" className="w-24" filterable filterKey="Agency" filterRef={agencyRef} />
              <HeaderCell column="assetType" label="Asset Type" className="w-32" filterable filterKey="Asset Type" filterRef={assetTypeRef} />
              <th className="px-3 py-3 text-left text-xs font-bold text-[var(--color-navy)] uppercase tracking-wider">
                <div className="whitespace-nowrap">Description</div>
              </th>
              <HeaderCell column="state" label="Location" className="w-28" filterable filterKey="Location" filterRef={locationRef} />
              <HeaderCell column="seizureDate" label="Seized" className="w-24" />
              <HeaderCell column="claimDeadline" label="Deadline" className="w-28" />
              <th className="px-3 py-3 text-right text-xs font-bold text-[var(--color-navy)] uppercase tracking-wider w-32">
                <div className="whitespace-nowrap">View Source Notice</div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map(row => {
            const deadlineInfo = getDeadlineStatus(row.claimDeadline);
            const pdfUrl = getAgencyPdfUrl(row.agency);
            const hasValidUrl = !!pdfUrl;
            return <tr key={row.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-3 py-3 text-xs font-mono text-gray-600 whitespace-nowrap">
                    {row.caseNumber}
                  </td>
                  <td className="px-3 py-3 text-xs font-medium text-gray-900 whitespace-nowrap">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                      {row.agency}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-xs text-gray-700 whitespace-nowrap">
                    {row.assetType}
                  </td>
                  <td className="px-3 py-3 text-xs text-gray-600" title={row.description}>
                    <div className="truncate max-w-xs">{row.description}</div>
                  </td>
                  <td className="px-3 py-3 text-xs text-gray-600 whitespace-nowrap">
                    {row.city}, {row.state}
                  </td>
                  <td className="px-3 py-3 text-xs text-gray-600 whitespace-nowrap">
                    {new Date(row.seizureDate).toLocaleDateString('en-US', {
                  month: 'numeric',
                  day: 'numeric',
                  year: '2-digit'
                })}
                  </td>
                  <td className="px-3 py-3 text-xs whitespace-nowrap">
                    <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${deadlineInfo.color}`}>
                      {deadlineInfo.icon}
                      {deadlineInfo.label}
                    </div>
                  </td>
                  <td className="px-3 py-3 text-right whitespace-nowrap">
                    {hasValidUrl ? <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-block" aria-label="View source notice, opens official agency document in a new tab" title="Opens the official forfeiture notice published by the agency">
                        <Button variant="outline" size="sm" className="!py-1 !px-2 !text-xs gap-1 h-7" as="span">
                          View Source Notice
                          <ExternalLinkIcon className="w-3 h-3" />
                        </Button>
                      </a> : <span className="inline-block px-2 py-1 text-xs text-gray-400 cursor-not-allowed" title="Source notice not available for this agency">
                        Source unavailable
                      </span>}
                  </td>
                </tr>;
          })}
          </tbody>
        </table>
      </div>

      {data.length === 0 && <div className="p-12 text-center text-gray-500">
          <FileTextIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="font-medium">
            No notices found matching your criteria.
          </p>
          <p className="text-sm mt-1">
            Try adjusting your filters or search terms.
          </p>
        </div>}

      {/* Clarification text */}
      {data.length > 0 && <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          <p className="text-xs text-gray-600 text-center">
            Source notices are published by government agencies and are provided
            here for reference.
          </p>
        </div>}
    </div>;
}