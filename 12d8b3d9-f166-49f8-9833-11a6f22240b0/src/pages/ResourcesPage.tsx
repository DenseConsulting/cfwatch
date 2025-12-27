import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLinkIcon, BookOpenIcon, BuildingIcon, ScaleIcon, GraduationCapIcon } from 'lucide-react';
interface ExternalResource {
  title: string;
  description: string;
  url: string;
}
const GOVERNMENT_RESOURCES: ExternalResource[] = [{
  title: 'U.S. Department of Justice — Asset Forfeiture Program',
  description: 'Official information about the federal asset forfeiture program, including policies and procedures.',
  url: 'https://www.justice.gov/afp'
}, {
  title: 'Drug Enforcement Administration — Forfeiture Notices',
  description: 'DEA-published forfeiture notices and information about the DEA forfeiture process.',
  url: 'https://www.dea.gov/operations/asset-forfeiture'
}, {
  title: 'U.S. Customs and Border Protection — Seized Property',
  description: 'Information about CBP seizures, forfeiture procedures, and petitions for remission.',
  url: 'https://www.cbp.gov/trade/basic-import-export/seizures'
}, {
  title: 'IRS Criminal Investigation — Asset Forfeiture',
  description: 'IRS Criminal Investigation asset forfeiture program information and procedures.',
  url: 'https://www.irs.gov/compliance/criminal-investigation/asset-forfeiture'
}, {
  title: 'State Forfeiture Programs',
  description: "Many states maintain their own civil asset forfeiture programs. Contact your state attorney general's office for state-specific information.",
  url: '#'
}];
const EDUCATIONAL_RESOURCES: ExternalResource[] = [{
  title: 'Legal Information Institute — Civil Forfeiture',
  description: "Cornell Law School's overview of civil forfeiture law and procedures.",
  url: 'https://www.law.cornell.edu/wex/forfeiture'
}, {
  title: 'Federal Rules of Civil Procedure — Supplemental Rules',
  description: 'Official rules governing civil forfeiture proceedings in federal court.',
  url: 'https://www.uscourts.gov/rules-policies/current-rules-practice-procedure'
}, {
  title: 'U.S. Code — Title 18, Section 983',
  description: 'Federal statute governing general rules for civil forfeiture proceedings.',
  url: 'https://www.law.cornell.edu/uscode/text/18/983'
}];
export function ResourcesPage() {
  return <main className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section */}
      <section className="bg-[var(--color-navy)] text-white py-12">
        <div className="container">
          <h1 className="text-white mb-4">Civil Asset Forfeiture Resources</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Reference links to authoritative, publicly available information
            related to civil asset forfeiture
          </p>
        </div>
      </section>

      <div className="container py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Government Resources Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BuildingIcon className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--color-navy)]">
                Government Sources
              </h2>
            </div>
            <div className="space-y-4">
              {GOVERNMENT_RESOURCES.map((resource, index) => <div key={index} className="bg-white rounded-lg border border-gray-200 p-5 hover:border-gray-300 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-[var(--color-navy)] mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {resource.description}
                      </p>
                    </div>
                    {resource.url !== '#' && <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 p-2 text-gray-400 hover:text-[var(--color-navy)] transition-colors" aria-label={`Visit ${resource.title}`}>
                        <ExternalLinkIcon className="w-5 h-5" />
                      </a>}
                  </div>
                </div>)}
            </div>
          </section>

          {/* Educational Resources Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <GraduationCapIcon className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--color-navy)]">
                Educational Information
              </h2>
            </div>
            <div className="space-y-4">
              {EDUCATIONAL_RESOURCES.map((resource, index) => <div key={index} className="bg-white rounded-lg border border-gray-200 p-5 hover:border-gray-300 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-[var(--color-navy)] mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {resource.description}
                      </p>
                    </div>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 p-2 text-gray-400 hover:text-[var(--color-navy)] transition-colors" aria-label={`Visit ${resource.title}`}>
                      <ExternalLinkIcon className="w-5 h-5" />
                    </a>
                  </div>
                </div>)}
            </div>
          </section>

          {/* Attorney Resources Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <ScaleIcon className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--color-navy)]">
                Legal Assistance
              </h2>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Some individuals choose to consult an attorney experienced in
                civil asset forfeiture matters. Civil Forfeiture Watch maintains
                an informational attorney directory by state.
              </p>
              <Link to="/attorneys" className="inline-flex items-center gap-2 text-[var(--color-navy)] hover:text-[var(--color-gold)] font-medium transition-colors">
                <BookOpenIcon className="w-4 h-4" />
                View Attorney Directory
              </Link>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="pt-8 border-t border-gray-200">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
              <p className="text-sm text-blue-800 leading-relaxed">
                <strong>Disclaimer:</strong> Civil Forfeiture Watch does not
                provide legal advice. External links are provided for reference
                only and do not constitute endorsements.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>;
}