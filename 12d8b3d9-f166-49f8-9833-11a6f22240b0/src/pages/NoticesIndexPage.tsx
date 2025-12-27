import React, { useEffect, useMemo, useState } from 'react';
import { Pagination } from '../components/Pagination';
import { NoticesTable, NoticeRecord, FilterOption } from '../components/NoticesTable';
import { SignupGate } from '../components/SignupGate';
import { ActiveFiltersBar } from '../components/ActiveFiltersBar';
import { SearchIcon } from 'lucide-react';
// Mock Data Generator
const generateMockData = (): NoticeRecord[] => {
  const agencies = ['DEA', 'FBI', 'CBP', 'IRS', 'USSS', 'USAO'];
  const assetTypes = ['Cash / Currency', 'Vehicle', 'Cryptocurrency', 'Real Property', 'Electronics', 'Jewelry'];
  const cities = ['Miami', 'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Detroit', 'Atlanta'];
  const states = ['FL', 'NY', 'CA', 'IL', 'TX', 'AZ', 'MI', 'GA'];
  return Array.from({
    length: 150
  }).map((_, i) => {
    const agency = agencies[Math.floor(Math.random() * agencies.length)];
    const assetType = assetTypes[Math.floor(Math.random() * assetTypes.length)];
    const locationIdx = Math.floor(Math.random() * cities.length);
    const today = new Date();
    const seizureDate = new Date(today);
    seizureDate.setDate(today.getDate() - Math.floor(Math.random() * 60));
    const deadlineDate = new Date(today);
    const daysOffset = Math.floor(Math.random() * 60) - 10;
    deadlineDate.setDate(today.getDate() + daysOffset);
    return {
      id: `notice-${i}`,
      caseNumber: `${agency}-${today.getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(5, '0')}`,
      agency,
      assetType,
      description: `${assetType === 'Vehicle' ? '2022 Ford F-150' : assetType === 'Cash / Currency' ? `$${(Math.random() * 50000 + 1000).toFixed(2)} USD` : 'Miscellaneous Assets'} seized during investigation`,
      city: cities[locationIdx],
      state: states[locationIdx],
      seizureDate: seizureDate.toISOString(),
      claimDeadline: deadlineDate.toISOString(),
      status: daysOffset < 0 ? 'expired' : 'active',
      noticeType: Math.random() > 0.7 ? 'Judicial' : 'Administrative'
    };
  });
};
const MOCK_DATA = generateMockData();
// Filter Options
const AGENCY_OPTIONS: FilterOption[] = [{
  label: 'DEA',
  value: 'DEA'
}, {
  label: 'CBP',
  value: 'CBP'
}, {
  label: 'FBI',
  value: 'FBI'
}, {
  label: 'IRS',
  value: 'IRS'
}, {
  label: 'USSS',
  value: 'USSS'
}, {
  label: 'USAO',
  value: 'USAO'
}];
const ASSET_TYPE_OPTIONS: FilterOption[] = [{
  label: 'Cash / Currency',
  value: 'Cash / Currency'
}, {
  label: 'Cryptocurrency',
  value: 'Cryptocurrency'
}, {
  label: 'Vehicle',
  value: 'Vehicle'
}, {
  label: 'Real Property',
  value: 'Real Property'
}, {
  label: 'Electronics',
  value: 'Electronics'
}, {
  label: 'Jewelry',
  value: 'Jewelry'
}, {
  label: 'Other Assets',
  value: 'Other Assets'
}];
// Generate location options from data
const LOCATION_OPTIONS: FilterOption[] = Array.from(new Set(MOCK_DATA.map(item => `${item.city}, ${item.state}`))).sort().map(loc => ({
  label: loc,
  value: loc
}));
const PREVIEW_LIMIT = 15;
interface NoticesIndexPageProps {
  userInfo?: {
    firstName: string;
    email: string;
  } | null;
  onLogout?: () => void;
  onOpenSignUp?: () => void;
  onOpenSignIn?: () => void;
}
export function NoticesIndexPage({
  userInfo,
  onLogout,
  onOpenSignUp,
  onOpenSignIn
}: NoticesIndexPageProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(!!userInfo);
  const [userName, setUserName] = useState(userInfo?.firstName || '');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<keyof NoticeRecord>('claimDeadline');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const resultsPerPage = 25;
  // Update authentication state when userInfo changes
  useEffect(() => {
    setIsAuthenticated(!!userInfo);
    setUserName(userInfo?.firstName || '');
  }, [userInfo]);
  const handleSignup = (firstName: string, email: string) => {
    console.log('Signup:', {
      firstName,
      email
    });
    setUserName(firstName);
    setIsAuthenticated(true);
  };
  const filteredData = useMemo(() => {
    return MOCK_DATA.filter(item => {
      // Global Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matches = item.caseNumber.toLowerCase().includes(query) || item.description.toLowerCase().includes(query) || item.city.toLowerCase().includes(query) || item.state.toLowerCase().includes(query) || item.assetType.toLowerCase().includes(query);
        if (!matches) return false;
      }
      // Column Filters
      if (selectedFilters['Agency']?.length && !selectedFilters['Agency'].includes(item.agency)) {
        return false;
      }
      if (selectedFilters['Asset Type']?.length && !selectedFilters['Asset Type'].includes(item.assetType)) {
        return false;
      }
      if (selectedFilters['Location']?.length) {
        const location = `${item.city}, ${item.state}`;
        if (!selectedFilters['Location'].includes(location)) {
          return false;
        }
      }
      // Default: hide expired unless specifically filtered (though we don't have deadline filter anymore in UI as per requirements, keeping logic safe)
      const today = new Date();
      const deadline = new Date(item.claimDeadline);
      if (deadline < today) return false;
      return true;
    });
  }, [selectedFilters, searchQuery]);
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortColumn, sortDirection]);
  // Show preview (first 15) if not authenticated, otherwise show paginated data
  const displayData = useMemo(() => {
    if (!isAuthenticated) {
      return sortedData.slice(0, PREVIEW_LIMIT);
    }
    const start = (currentPage - 1) * resultsPerPage;
    return sortedData.slice(start, start + resultsPerPage);
  }, [sortedData, currentPage, isAuthenticated]);
  const handleSort = (column: keyof NoticeRecord) => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };
  const handleFilterChange = (category: string, values: string[]) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: values
    }));
    setCurrentPage(1);
  };
  const handleRemoveFilter = (category: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].filter(v => v !== value)
    }));
    setCurrentPage(1);
  };
  const handleClearAllFilters = () => {
    setSelectedFilters({});
    setSearchQuery('');
    setCurrentPage(1);
  };
  return <main className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section with Navy Background */}
      <section className="bg-[var(--color-navy)] text-white py-12">
        <div className="container">
          <h1 className="text-white mb-4">Civil Asset Forfeiture Notices</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Browse publicly available civil forfeiture notices published by
            federal and state agencies. Filing deadlines may apply.
          </p>
        </div>
      </section>

      <div className="container py-8">
        <div className="flex flex-col gap-6">
          {/* Search and Filters Area */}
          <div className="space-y-4">
            {/* Full-width Search Bar */}
            <div className="relative w-full">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search by case number, location, or asset type..." className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:border-[var(--color-navy)] focus:ring-1 focus:ring-[var(--color-navy)] focus:outline-none text-gray-900 placeholder-gray-500 bg-white" />
            </div>

            {/* Active Filters Bar */}
            <ActiveFiltersBar activeFilters={selectedFilters} onRemoveFilter={handleRemoveFilter} onClearAll={handleClearAllFilters} />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Results Count & Legend */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 text-sm">
              <div className="text-gray-600 font-medium">
                {!isAuthenticated ? <>
                    Showing preview: {displayData.length} of{' '}
                    {sortedData.length.toLocaleString()} notices
                  </> : <>
                    Showing{' '}
                    {Math.min((currentPage - 1) * resultsPerPage + 1, sortedData.length)}
                    –{Math.min(currentPage * resultsPerPage, sortedData.length)}{' '}
                    of {sortedData.length.toLocaleString()} notices
                  </>}
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  <span className="text-gray-600">≤ 7 Days Left</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                  <span className="text-gray-600">≤ 30 Days Left</span>
                </div>
              </div>
            </div>

            {/* Data Table */}
            <NoticesTable data={displayData} onSort={handleSort} sortColumn={sortColumn} sortDirection={sortDirection} onViewNotice={id => console.log('View notice', id)} filterOptions={{
            Agency: AGENCY_OPTIONS,
            'Asset Type': ASSET_TYPE_OPTIONS,
            Location: LOCATION_OPTIONS
          }} activeFilters={selectedFilters} onFilterChange={handleFilterChange} />

            {/* Signup Gate (ALWAYS shown if not authenticated) */}
            {!isAuthenticated && <div className="mt-8">
                <SignupGate onSignup={handleSignup} onSignIn={onOpenSignIn} />
              </div>}

            {/* Pagination (only shown when authenticated) */}
            {isAuthenticated && <div className="mt-6">
                <Pagination currentPage={currentPage} totalPages={Math.ceil(sortedData.length / resultsPerPage)} onPageChange={setCurrentPage} />
              </div>}

            {/* Page Specific Disclaimer */}
            <div className="mt-12 pt-8 border-t border-gray-200 text-center">
              <p className="text-xs text-gray-500 max-w-3xl mx-auto leading-relaxed">
                Civil Forfeiture Watch is not a law firm and does not provide
                legal advice. Information is derived from publicly available
                records and may not reflect the most recent case activity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>;
}