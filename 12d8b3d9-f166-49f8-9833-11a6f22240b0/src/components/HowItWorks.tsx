import React from 'react';
import { SearchIcon, FileTextIcon, ScaleIcon } from 'lucide-react';
const steps = [{
  icon: <SearchIcon className="w-8 h-8" />,
  title: 'Search Active Seizures',
  description: 'Browse our comprehensive database of civil asset forfeiture notices from federal and state agencies. Filter by location, asset type, agency, and claim deadline.'
}, {
  icon: <FileTextIcon className="w-8 h-8" />,
  title: 'Understand Your Case',
  description: 'Access detailed case information, legal deadlines, and educational resources to understand your rights and the forfeiture process.'
}, {
  icon: <ScaleIcon className="w-8 h-8" />,
  title: 'Connect with Attorneys',
  description: 'Find experienced civil forfeiture attorneys in your area who can evaluate your case and help you fight to recover your property.'
}];
export function HowItWorks() {
  return <section className="section bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Three simple steps to protect your property rights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => <div key={index} className="relative">
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-[var(--color-gold)] rounded-full flex items-center justify-center text-[var(--color-navy)] font-bold text-xl shadow-lg">
                {index + 1}
              </div>

              {/* Card */}
              <div className="bg-gray-50 rounded-lg p-8 pt-10 h-full border border-gray-200">
                <div className="w-16 h-16 bg-[var(--color-navy)] rounded-lg flex items-center justify-center text-[var(--color-gold)] mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-[var(--color-navy)] mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector Arrow (desktop only) */}
              {index < steps.length - 1 && <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 16H28M28 16L20 8M28 16L20 24" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>}
            </div>)}
        </div>
      </div>
    </section>;
}