import React from 'react';
import { QuoteIcon, StarIcon } from 'lucide-react';
const testimonials = [{
  quote: 'This database helped me find my case within minutes. The attorney I connected with recovered my $45,000 in seized funds.',
  author: 'Michael R.',
  location: 'Texas',
  rating: 5
}, {
  quote: 'I had no idea my property was seized until I searched here. The resources helped me understand my rights and take action before the deadline.',
  author: 'Sarah L.',
  location: 'California',
  rating: 5
}, {
  quote: 'As an attorney, this platform connects me with clients who need help. The case information is accurate and up-to-date.',
  author: 'James K., Esq.',
  location: 'Florida',
  rating: 5
}];
const agencies = [{
  name: 'DEA',
  label: 'Drug Enforcement Administration'
}, {
  name: 'FBI',
  label: 'Federal Bureau of Investigation'
}, {
  name: 'CBP',
  label: 'Customs & Border Protection'
}, {
  name: 'IRS',
  label: 'Internal Revenue Service'
}, {
  name: 'USMS',
  label: 'U.S. Marshals Service'
}, {
  name: 'ATF',
  label: 'Bureau of Alcohol, Tobacco, Firearms'
}];
export function TrustIndicators() {
  return <section className="section bg-gray-50">
      <div className="container">
        {/* Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="mb-4">Trusted by Thousands</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real stories from people who protected their property rights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => <div key={index} className="bg-white rounded-lg p-8 shadow-md border border-gray-200">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => <StarIcon key={i} className="w-5 h-5 fill-[var(--color-gold)] text-[var(--color-gold)]" />)}
                </div>
                <QuoteIcon className="w-8 h-8 text-[var(--color-gold)] mb-4" />
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <div className="font-semibold text-[var(--color-navy)]">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.location}
                  </div>
                </div>
              </div>)}
          </div>
        </div>

        {/* Agency Badges */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-[var(--color-navy)] mb-2">
              Data Sources
            </h3>
            <p className="text-gray-600">
              We compile notices from official federal and state law enforcement
              agencies
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 max-w-5xl mx-auto">
            {agencies.map((agency, index) => <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                <div className="text-2xl font-bold text-[var(--color-navy)] mb-2">
                  {agency.name}
                </div>
                <div className="text-xs text-gray-500 leading-tight">
                  {agency.label}
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
}