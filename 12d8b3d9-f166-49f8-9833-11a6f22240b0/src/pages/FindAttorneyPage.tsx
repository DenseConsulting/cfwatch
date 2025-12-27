import React, { useMemo, useState } from 'react';
import { AttorneyCard, Attorney } from '../components/AttorneyCard';
import { EmptyState } from '../components/EmptyState';
import { SearchIcon, ChevronDownIcon } from 'lucide-react';
// Mock Data
const MOCK_ATTORNEYS: Attorney[] = [{
  id: '1',
  name: 'Edward D. Johnson III',
  firmName: 'Edward Johnson & Associates P.C.',
  city: 'Chicago',
  state: 'IL',
  licensedStates: ['IL', 'WI', 'IA', 'CO'],
  practiceFocus: 'Cash/Money/Cryptocurrency Asset Forfeiture',
  website: 'https://www.edwardjohnsonlaw.com',
  phone: '708-606-4386',
  email: 'info@edwardjohnsonlaw.com'
}, {
  id: '2',
  name: 'James Rodriguez',
  firmName: 'Rodriguez Legal Group',
  city: 'Los Angeles',
  state: 'CA',
  licensedStates: ['CA', 'AZ', 'NV'],
  practiceFocus: 'Civil Asset Forfeiture',
  website: 'https://example.com',
  phone: '(310) 555-0456',
  email: 'info@rodriguezlegal.com'
}, {
  id: '3',
  name: 'Emily Chen',
  firmName: 'Chen Defense Partners',
  city: 'New York',
  state: 'NY',
  licensedStates: ['NY', 'NJ', 'CT'],
  practiceFocus: 'Civil Asset Forfeiture',
  website: 'https://example.com',
  phone: '(212) 555-0789'
}, {
  id: '4',
  name: 'Michael Thompson',
  firmName: 'Thompson Law Firm',
  city: 'Chicago',
  state: 'IL',
  licensedStates: ['IL', 'WI', 'IN'],
  practiceFocus: 'Civil Asset Forfeiture',
  website: 'https://example.com',
  email: 'mthompson@example.com'
}, {
  id: '5',
  name: 'Lisa Anderson',
  firmName: 'Anderson & Partners',
  city: 'Houston',
  state: 'TX',
  licensedStates: ['TX', 'LA'],
  practiceFocus: 'Civil Asset Forfeiture',
  website: 'https://example.com',
  phone: '(713) 555-0567'
}, {
  id: '6',
  name: 'David Kim',
  firmName: 'Kim Legal Services',
  city: 'Phoenix',
  state: 'AZ',
  licensedStates: ['AZ', 'NM'],
  practiceFocus: 'Civil Asset Forfeiture',
  website: 'https://example.com',
  phone: '(602) 555-0890'
}, {
  id: '7',
  name: 'Robert Wilson',
  firmName: 'Wilson Asset Defense',
  city: 'Atlanta',
  state: 'GA',
  licensedStates: ['GA', 'FL', 'AL'],
  practiceFocus: 'Civil Asset Forfeiture',
  website: 'https://example.com',
  email: 'rwilson@example.com'
}, {
  id: '8',
  name: 'Jennifer Martinez',
  firmName: 'Martinez Law',
  city: 'San Diego',
  state: 'CA',
  licensedStates: ['CA'],
  practiceFocus: 'Civil Asset Forfeiture',
  website: 'https://example.com',
  phone: '(619) 555-0345'
}, {
  id: '9',
  name: 'Thomas Wright',
  firmName: 'Wright & Associates',
  city: 'Philadelphia',
  state: 'PA',
  licensedStates: ['PA', 'NJ', 'DE'],
  practiceFocus: 'Civil Asset Forfeiture',
  website: 'https://example.com',
  email: 'twright@example.com'
}, {
  id: '10',
  name: 'Patricia Lewis',
  firmName: 'Lewis Legal Group',
  city: 'Detroit',
  state: 'MI',
  licensedStates: ['MI', 'OH'],
  practiceFocus: 'Civil Asset Forfeiture',
  website: 'https://example.com',
  phone: '(313) 555-0678'
}, {
  id: '11',
  name: 'Kevin Brown',
  firmName: 'Brown Defense',
  city: 'Cleveland',
  state: 'OH',
  licensedStates: ['OH', 'PA'],
  practiceFocus: 'Civil Asset Forfeiture',
  website: 'https://example.com',
  email: 'kbrown@example.com'
}, {
  id: '12',
  name: 'Amanda White',
  firmName: 'White & Partners',
  city: 'Dallas',
  state: 'TX',
  licensedStates: ['TX', 'OK'],
  practiceFocus: 'Civil Asset Forfeiture',
  website: 'https://example.com',
  phone: '(214) 555-0912'
}];
// US States List
const US_STATES = [{
  name: 'Alabama',
  code: 'AL'
}, {
  name: 'Alaska',
  code: 'AK'
}, {
  name: 'Arizona',
  code: 'AZ'
}, {
  name: 'Arkansas',
  code: 'AR'
}, {
  name: 'California',
  code: 'CA'
}, {
  name: 'Colorado',
  code: 'CO'
}, {
  name: 'Connecticut',
  code: 'CT'
}, {
  name: 'Delaware',
  code: 'DE'
}, {
  name: 'Florida',
  code: 'FL'
}, {
  name: 'Georgia',
  code: 'GA'
}, {
  name: 'Hawaii',
  code: 'HI'
}, {
  name: 'Idaho',
  code: 'ID'
}, {
  name: 'Illinois',
  code: 'IL'
}, {
  name: 'Indiana',
  code: 'IN'
}, {
  name: 'Iowa',
  code: 'IA'
}, {
  name: 'Kansas',
  code: 'KS'
}, {
  name: 'Kentucky',
  code: 'KY'
}, {
  name: 'Louisiana',
  code: 'LA'
}, {
  name: 'Maine',
  code: 'ME'
}, {
  name: 'Maryland',
  code: 'MD'
}, {
  name: 'Massachusetts',
  code: 'MA'
}, {
  name: 'Michigan',
  code: 'MI'
}, {
  name: 'Minnesota',
  code: 'MN'
}, {
  name: 'Mississippi',
  code: 'MS'
}, {
  name: 'Missouri',
  code: 'MO'
}, {
  name: 'Montana',
  code: 'MT'
}, {
  name: 'Nebraska',
  code: 'NE'
}, {
  name: 'Nevada',
  code: 'NV'
}, {
  name: 'New Hampshire',
  code: 'NH'
}, {
  name: 'New Jersey',
  code: 'NJ'
}, {
  name: 'New Mexico',
  code: 'NM'
}, {
  name: 'New York',
  code: 'NY'
}, {
  name: 'North Carolina',
  code: 'NC'
}, {
  name: 'North Dakota',
  code: 'ND'
}, {
  name: 'Ohio',
  code: 'OH'
}, {
  name: 'Oklahoma',
  code: 'OK'
}, {
  name: 'Oregon',
  code: 'OR'
}, {
  name: 'Pennsylvania',
  code: 'PA'
}, {
  name: 'Rhode Island',
  code: 'RI'
}, {
  name: 'South Carolina',
  code: 'SC'
}, {
  name: 'South Dakota',
  code: 'SD'
}, {
  name: 'Tennessee',
  code: 'TN'
}, {
  name: 'Texas',
  code: 'TX'
}, {
  name: 'Utah',
  code: 'UT'
}, {
  name: 'Vermont',
  code: 'VT'
}, {
  name: 'Virginia',
  code: 'VA'
}, {
  name: 'Washington',
  code: 'WA'
}, {
  name: 'West Virginia',
  code: 'WV'
}, {
  name: 'Wisconsin',
  code: 'WI'
}, {
  name: 'Wyoming',
  code: 'WY'
}, {
  name: 'Washington DC',
  code: 'DC'
}];
export function FindAttorneyPage() {
  const [selectedState, setSelectedState] = useState<string>('');
  const filteredAttorneys = useMemo(() => {
    if (!selectedState) return MOCK_ATTORNEYS;
    return MOCK_ATTORNEYS.filter(attorney => attorney.state === selectedState || attorney.licensedStates.includes(selectedState));
  }, [selectedState]);
  return <main className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section */}
      <section className="bg-[var(--color-navy)] text-white py-12">
        <div className="container">
          <h1 className="text-white mb-4">
            Civil Asset Forfeiture Attorneys (By State)
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
            Some property owners choose to consult an attorney experienced in
            civil asset forfeiture matters. This directory provides
            informational listings of attorneys and law firms by jurisdiction.
          </p>
          <p className="mt-4 text-sm text-gray-400 max-w-3xl">
            Civil Forfeiture Watch does not provide legal advice or recommend
            specific attorneys.
          </p>
          <p className="mt-2 text-sm text-gray-400 max-w-3xl italic">
            Attorney listings are provided for informational purposes only and
            are not exhaustive.
          </p>
        </div>
      </section>

      <div className="container py-8">
        {/* State Selector */}
        <div className="max-w-md mb-8">
          <label htmlFor="state-select" className="block text-sm font-medium text-gray-700 mb-2">
            Select a State
          </label>
          <div className="relative">
            <select id="state-select" value={selectedState} onChange={e => setSelectedState(e.target.value)} className="w-full appearance-none bg-white border border-gray-300 rounded-lg py-3 px-4 pr-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-navy)] focus:border-transparent cursor-pointer">
              <option value="">All States</option>
              {US_STATES.map(state => <option key={state.code} value={state.code}>
                  {state.name}
                </option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <ChevronDownIcon className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8">
          <p className="text-sm text-blue-800">
            <strong>Disclaimer:</strong> Civil Forfeiture Watch is not a law
            firm and does not provide legal advice. Attorney listings are
            provided for informational purposes only and do not constitute
            endorsements or referrals. Attorneys listed are independent and not
            affiliated with Civil Forfeiture Watch.
          </p>
        </div>

        {/* Results */}
        {filteredAttorneys.length > 0 ? <div>
            <div className="mb-4 text-sm text-gray-600 font-medium">
              Showing {filteredAttorneys.length} attorney listing
              {filteredAttorneys.length !== 1 ? 's' : ''}
              {selectedState && ` for ${US_STATES.find(s => s.code === selectedState)?.name}`}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAttorneys.map(attorney => <AttorneyCard key={attorney.id} attorney={attorney} />)}
            </div>
          </div> : <EmptyState title="No attorneys found" description={`No attorney listings are currently available for ${US_STATES.find(s => s.code === selectedState)?.name || 'this selection'}.`} action={selectedState ? {
        label: 'View All Attorneys',
        onClick: () => setSelectedState('')
      } : undefined} />}
      </div>
    </main>;
}