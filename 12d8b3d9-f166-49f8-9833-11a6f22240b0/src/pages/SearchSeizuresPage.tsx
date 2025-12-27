import React, { useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { FilterSidebar } from '../components/FilterSidebar';
import { NoticeCard, Notice } from '../components/NoticeCard';
import { Pagination } from '../components/Pagination';
import { EmptyState } from '../components/EmptyState';
import { DownloadIcon, LockIcon } from 'lucide-react';
import { Button } from '../components/Button';
// Mock data
const mockNotices: Notice[] = [{
  id: '1',
  caseNumber: 'DEA-2024-001234',
  agency: 'DEA',
  city: 'Miami',
  state: 'FL',
  assetType: 'Currency - $45,000 USD',
  assetValue: 45000,
  claimDeadline: '2024-02-15',
  seizureDate: '2024-01-05',
  status: 'active'
}, {
  id: '2',
  caseNumber: 'FBI-2024-005678',
  agency: 'FBI',
  city: 'Los Angeles',
  state: 'CA',
  assetType: '2021 Mercedes-Benz S-Class',
  assetValue: 125000,
  claimDeadline: '2024-02-20',
  seizureDate: '2024-01-10',
  status: 'active'
}, {
  id: '3',
  caseNumber: 'CBP-2024-002345',
  agency: 'CBP',
  city: 'New York',
  state: 'NY',
  assetType: 'Currency - $23,500 USD',
  assetValue: 23500,
  claimDeadline: '2024-02-08',
  seizureDate: '2023-12-28',
  status: 'active'
}, {
  id: '4',
  caseNumber: 'IRS-2024-003456',
  agency: 'IRS',
  city: 'Chicago',
  state: 'IL',
  assetType: 'Real Estate - Commercial Property',
  assetValue: 850000,
  claimDeadline: '2024-02-25',
  seizureDate: '2024-01-15',
  status: 'active'
}, {
  id: '5',
  caseNumber: 'DEA-2024-004567',
  agency: 'DEA',
  city: 'Houston',
  state: 'TX',
  assetType: 'Currency - $67,800 USD',
  assetValue: 67800,
  claimDeadline: '2024-02-12',
  seizureDate: '2024-01-02',
  status: 'active'
}, {
  id: '6',
  caseNumber: 'FBI-2024-005789',
  agency: 'FBI',
  city: 'Phoenix',
  state: 'AZ',
  assetType: '2022 Tesla Model X',
  assetValue: 95000,
  claimDeadline: '2024-02-18',
  seizureDate: '2024-01-08',
  status: 'active'
}];
const filterGroups = [{
  title: 'Agency',
  options: [{
    label: 'DEA',
    value: 'DEA',
    count: 2
  }, {
    label: 'FBI',
    value: 'FBI',
    count: 2
  }, {
    label: 'CBP',
    value: 'CBP',
    count: 1
  }, {
    label: 'IRS',
    value: 'IRS',
    count: 1
  }]
}, {
  title: 'State',
  options: [{
    label: 'California',
    value: 'CA',
    count: 1
  }, {
    label: 'Florida',
    value: 'FL',
    count: 1
  }, {
    label: 'Texas',
    value: 'TX',
    count: 1
  }, {
    label: 'New York',
    value: 'NY',
    count: 1
  }, {
    label: 'Illinois',
    value: 'IL',
    count: 1
  }, {
    label: 'Arizona',
    value: 'AZ',
    count: 1
  }]
}, {
  title: 'Asset Type',
  options: [{
    label: 'Currency',
    value: 'currency',
    count: 3
  }, {
    label: 'Vehicles',
    value: 'vehicles',
    count: 2
  }, {
    label: 'Real Estate',
    value: 'real-estate',
    count: 1
  }]
}, {
  title: 'Value Range',
  options: [{
    label: 'Under $25,000',
    value: '0-25000',
    count: 1
  }, {
    label: '$25,000 - $50,000',
    value: '25000-50000',
    count: 1
  }, {
    label: '$50,000 - $100,000',
    value: '50000-100000',
    count: 2
  }, {
    label: 'Over $100,000',
    value: '100000+',
    count: 2
  }]
}];
interface SearchSeizuresPageProps {
  onOpenSignUp: () => void;
}
export function SearchSeizuresPage({
  onOpenSignUp
}: SearchSeizuresPageProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 6;
  const handleFilterChange = (groupTitle: string, value: string) => {
    setSelectedFilters(prev => {
      const current = prev[groupTitle] || [];
      const updated = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
      return {
        ...prev,
        [groupTitle]: updated
      };
    });
  };
  const handleClearAll = () => {
    setSelectedFilters({});
  };
  const totalPages = Math.ceil(mockNotices.length / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const displayedNotices = mockNotices.slice(startIndex, startIndex + resultsPerPage);
  return <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[var(--color-navy)] text-white py-12">
        <div className="container">
          <h1 className="text-white mb-4">Search Active Seizures</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl">
            Browse our comprehensive database of civil asset forfeiture notices.
            Filter by agency, location, asset type, and deadline.
          </p>
          <SearchBar placeholder="Search by case number, location, or asset type..." onToggleFilters={() => setFiltersOpen(!filtersOpen)} />
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container">
          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <FilterSidebar isOpen={filtersOpen} onClose={() => setFiltersOpen(false)} filterGroups={filterGroups} selectedFilters={selectedFilters} onFilterChange={handleFilterChange} onClearAll={handleClearAll} />

            {/* Results */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-[var(--color-navy)] mb-1">
                    {mockNotices.length.toLocaleString()} Active Cases
                  </h2>
                  <p className="text-gray-600">
                    Updated daily from federal and state agencies
                  </p>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <DownloadIcon className="w-4 h-4" />
                  Export Results
                </Button>
              </div>

              {/* Guest Access Notice */}
              <div className="bg-[var(--color-gold)]/10 border-2 border-[var(--color-gold)] rounded-lg p-4 mb-6 flex items-start gap-3">
                <LockIcon className="w-5 h-5 text-[var(--color-gold)] flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-[var(--color-navy)] mb-1">
                    Limited Preview Mode
                  </h3>
                  <p className="text-sm text-gray-700 mb-3">
                    You're viewing basic case information. Register for free to
                    access full details, PDF documents, and advanced search
                    filters.
                  </p>
                  <Button variant="primary" size="sm" onClick={onOpenSignUp}>
                    Create Free Account
                  </Button>
                </div>
              </div>

              {/* Notice Cards Grid */}
              {displayedNotices.length > 0 ? <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {displayedNotices.map(notice => <NoticeCard key={notice.id} notice={notice} onViewDetails={id => console.log('View details:', id)} />)}
                  </div>

                  {/* Pagination */}
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} totalResults={mockNotices.length} resultsPerPage={resultsPerPage} />
                </> : <EmptyState title="No results found" description="Try adjusting your filters or search terms to find what you're looking for." action={{
              label: 'Clear Filters',
              onClick: handleClearAll
            }} />}
            </div>
          </div>
        </div>
      </section>
    </main>;
}