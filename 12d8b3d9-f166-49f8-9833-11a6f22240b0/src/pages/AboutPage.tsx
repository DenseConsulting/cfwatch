import React from 'react';
import { InfoIcon, FileTextIcon, ScaleIcon, AlertCircleIcon } from 'lucide-react';
export function AboutPage() {
  return <main className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section */}
      <section className="bg-[var(--color-navy)] text-white py-12">
        <div className="container">
          <h1 className="text-white mb-4">About Civil Forfeiture Watch</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Understanding the purpose, scope, and limitations of this platform
          </p>
        </div>
      </section>

      <div className="container py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Mission & Purpose Section */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <InfoIcon className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--color-navy)]">
                What Civil Forfeiture Watch Is
              </h2>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-gray-700 leading-relaxed">
                Civil Forfeiture Watch is an informational platform that
                provides access to publicly available civil asset forfeiture
                notices published by federal and state agencies.
              </p>
            </div>
          </section>

          {/* What the Platform Is Not Section */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircleIcon className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--color-navy)]">
                What Civil Forfeiture Watch Is Not
              </h2>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">
                    Civil Forfeiture Watch is <strong>not a law firm</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">
                    Civil Forfeiture Watch does{' '}
                    <strong>not provide legal advice</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">
                    Civil Forfeiture Watch does{' '}
                    <strong>not represent property owners</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">
                    Civil Forfeiture Watch does{' '}
                    <strong>
                      not determine outcomes of forfeiture proceedings
                    </strong>
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Data Sources & Accuracy Section */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <FileTextIcon className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--color-navy)]">
                Data Sources
              </h2>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Information displayed on Civil Forfeiture Watch is sourced from
                publicly available government records, including forfeiture
                notices published by federal and state agencies.
              </p>
              <p className="text-gray-700 leading-relaxed font-medium">
                Users should always rely on the original source notice for
                official instructions and deadlines.
              </p>
            </div>
          </section>

          {/* Use of the Platform Section */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <ScaleIcon className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--color-navy)]">
                Using This Platform
              </h2>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Civil Forfeiture Watch provides tools to search and filter
                forfeiture notices and links directly to official source
                documents.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Users are encouraged to consult qualified legal counsel
                regarding their specific circumstances.
              </p>
            </div>
          </section>

          {/* Footer Disclaimer */}
          <section className="pt-8 border-t border-gray-200">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
              <p className="text-sm text-blue-800 leading-relaxed">
                <strong>Disclaimer:</strong> Civil Forfeiture Watch is not a law
                firm and does not provide legal advice. Information is provided
                for informational purposes only and may not reflect the most
                recent case activity.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>;
}