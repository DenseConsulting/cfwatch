import React, { useEffect, useState } from 'react';
import { MapPinIcon, LockIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { LoadingSpinner } from './LoadingSpinner';
interface StateData {
  name: string;
  cases: number;
  value: number;
}
const stateData: Record<string, StateData> = {
  CA: {
    name: 'California',
    cases: 1247,
    value: 342000000
  },
  TX: {
    name: 'Texas',
    cases: 1089,
    value: 298000000
  },
  FL: {
    name: 'Florida',
    cases: 892,
    value: 256000000
  },
  NY: {
    name: 'New York',
    cases: 743,
    value: 234000000
  },
  IL: {
    name: 'Illinois',
    cases: 567,
    value: 187000000
  },
  PA: {
    name: 'Pennsylvania',
    cases: 445,
    value: 156000000
  },
  OH: {
    name: 'Ohio',
    cases: 398,
    value: 134000000
  },
  GA: {
    name: 'Georgia',
    cases: 356,
    value: 123000000
  },
  NC: {
    name: 'North Carolina',
    cases: 312,
    value: 98000000
  },
  MI: {
    name: 'Michigan',
    cases: 289,
    value: 87000000
  }
};
interface MapPreviewProps {
  onOpenSignUp: () => void;
  userInfo?: {
    firstName: string;
    email: string;
  } | null;
}
export function MapPreview({
  onOpenSignUp,
  userInfo
}: MapPreviewProps) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = !!userInfo;
  // Simulate loading state for map data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);
  const getStateColor = (cases: number) => {
    if (cases > 1000) return '#C9A400';
    if (cases > 500) return '#D4B433';
    if (cases > 300) return '#DFC466';
    return '#EAD499';
  };
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(value);
  };
  return <section className="section">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="mb-4">Active Seizures by State</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore civil forfeiture activity across the United States. Click
            any state to view detailed case information.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 min-h-[800px] transition-all duration-300">
          {isLoading ? <div className="flex flex-col items-center justify-center h-[600px] w-full">
              <LoadingSpinner size="lg" />
              <p className="mt-4 text-gray-500">Loading map data...</p>
            </div> : <>
              {/* Map Placeholder - Conditional rendering based on auth state */}
              <div className="relative bg-gray-50 rounded-lg p-8 mb-6 transition-opacity duration-500 ease-in-out" style={{
            minHeight: '500px',
            opacity: isLoading ? 0 : 1
          }}>
                {!isAuthenticated ?
            // Logged-out state: Show placeholder with lock icon
            <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <LockIcon className="w-10 h-10 text-gray-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-[var(--color-navy)] mb-2">
                        Interactive US Map
                      </h3>
                      <p className="text-gray-600 mb-6 max-w-md">
                        Sign in to access the interactive map showing civil
                        forfeiture activity across all 50 states.
                      </p>
                      <div className="inline-flex items-center gap-2 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded" style={{
                      backgroundColor: '#EAD499'
                    }}></div>
                          <span>Low</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded" style={{
                      backgroundColor: '#DFC466'
                    }}></div>
                          <span>Medium</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded" style={{
                      backgroundColor: '#D4B433'
                    }}></div>
                          <span>High</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded" style={{
                      backgroundColor: '#C9A400'
                    }}></div>
                          <span>Very High</span>
                        </div>
                      </div>
                    </div>
                  </div> :
            // Logged-in state: Show map icon (placeholder for actual interactive map)
            <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPinIcon className="w-16 h-16 text-[var(--color-gold)] mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-[var(--color-navy)] mb-2">
                        Interactive US Map
                      </h3>
                      <p className="text-gray-600 mb-6 max-w-md">
                        Click any state below to view detailed forfeiture
                        statistics and case information.
                      </p>
                      <div className="inline-flex items-center gap-2 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded" style={{
                      backgroundColor: '#EAD499'
                    }}></div>
                          <span>Low</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded" style={{
                      backgroundColor: '#DFC466'
                    }}></div>
                          <span>Medium</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded" style={{
                      backgroundColor: '#D4B433'
                    }}></div>
                          <span>High</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded" style={{
                      backgroundColor: '#C9A400'
                    }}></div>
                          <span>Very High</span>
                        </div>
                      </div>
                    </div>
                  </div>}
              </div>

              {/* State Data Grid - Disabled when logged out */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                {Object.entries(stateData).map(([code, data]) => <button key={code} onClick={() => isAuthenticated && setSelectedState(code)} onMouseEnter={() => isAuthenticated && setHoveredState(code)} onMouseLeave={() => isAuthenticated && setHoveredState(null)} disabled={!isAuthenticated} className={`p-4 rounded-lg border-2 transition-all text-left ${!isAuthenticated ? 'opacity-50 cursor-not-allowed border-gray-200 bg-gray-50' : selectedState === code ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10' : hoveredState === code ? 'border-gray-300 bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <div className="text-2xl font-bold text-[var(--color-navy)] mb-1">
                      {code}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {data.name}
                    </div>
                    <div className="text-xs font-semibold" style={{
                color: getStateColor(data.cases)
              }}>
                      {data.cases.toLocaleString()} cases
                    </div>
                  </button>)}
              </div>

              {/* Selected State Details - Only show when authenticated */}
              {isAuthenticated && selectedState && stateData[selectedState] && <div className="bg-[var(--color-navy)] text-white rounded-lg p-6 animate-fadeIn">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h4 className="text-2xl font-bold mb-2">
                        {stateData[selectedState].name}
                      </h4>
                      <div className="flex flex-wrap gap-6 text-sm">
                        <div>
                          <span className="text-gray-300">Active Cases:</span>
                          <span className="ml-2 font-bold text-[var(--color-gold)]">
                            {stateData[selectedState].cases.toLocaleString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-300">Total Value:</span>
                          <span className="ml-2 font-bold text-[var(--color-gold)]">
                            {formatCurrency(stateData[selectedState].value)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Link to="/notices">
                      <Button variant="primary" size="sm">
                        View All Cases
                      </Button>
                    </Link>
                  </div>
                </div>}

              {/* CTA - Conditional based on auth state */}
              <div className="mt-6 text-center">
                {!isAuthenticated ? <>
                    <p className="text-sm text-gray-500 mb-4">
                      Register for free to access the full database with
                      advanced filters and case details
                    </p>
                    <Button variant="secondary" size="md" onClick={onOpenSignUp}>
                      Create Free Account
                    </Button>
                  </> : <>
                    <p className="text-sm text-gray-600 mb-4">
                      Explore the complete database of civil forfeiture notices
                    </p>
                    <Link to="/notices">
                      <Button variant="primary" size="md">
                        View Forfeiture Notices
                      </Button>
                    </Link>
                  </>}
              </div>
            </>}
        </div>
      </div>
    </section>;
}