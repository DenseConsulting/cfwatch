import React from 'react';
import { SearchIcon, ScaleIcon, ShieldCheckIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
interface HeroProps {
  onOpenSignUp: () => void;
}
export function Hero({
  onOpenSignUp
}: HeroProps) {
  return <section className="relative bg-gradient-to-br from-[var(--color-navy)] via-[#1a2847] to-[var(--color-navy)] text-white overflow-hidden min-h-[600px] flex items-center">
      {/* Background Pattern - Optimized with CSS */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      </div>

      <div className="container relative z-10">
        <div className="py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Trust Badge - Fixed height to prevent shift */}
            <div className="h-10 mb-8 flex items-center justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <ShieldCheckIcon className="w-4 h-4 text-[var(--color-gold)]" />
                <span className="text-sm font-medium">
                  Trusted by 10,000+ individuals nationwide
                </span>
              </div>
            </div>

            {/* Headline - Min height to prevent shift */}
            <h1 className="text-white mb-6 min-h-[3.5rem] md:min-h-[4.5rem]">
              Protect Your Property.
              <br />
              Know Your Rights.
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
              Search active civil asset forfeiture cases, understand your legal
              options, and connect with experienced attorneys who can help you
              fight back.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/notices">
                <Button variant="primary" size="lg" className="gap-2 w-full sm:w-auto">
                  <SearchIcon className="w-5 h-5" />
                  Search Active Seizures
                </Button>
              </Link>
              <Link to="/attorneys">
                <Button variant="outline" size="lg" className="gap-2 !text-white !border-white hover:!bg-white hover:!text-[var(--color-navy)] w-full sm:w-auto">
                  <ScaleIcon className="w-5 h-5" />
                  Find an Attorney
                </Button>
              </Link>
            </div>

            {/* Quick Stats - Grid layout stability */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 h-24 flex flex-col justify-center">
                <div className="text-3xl font-bold text-[var(--color-gold)] mb-1">
                  45 Days
                </div>
                <div className="text-sm text-gray-300">
                  Average claim deadline
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 h-24 flex flex-col justify-center">
                <div className="text-3xl font-bold text-[var(--color-gold)] mb-1">
                  $2.5B+
                </div>
                <div className="text-sm text-gray-300">Seized annually</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 h-24 flex flex-col justify-center">
                <div className="text-3xl font-bold text-[var(--color-gold)] mb-1">
                  500+
                </div>
                <div className="text-sm text-gray-300">
                  Attorneys in network
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave - Explicit dimensions */}
      <div className="absolute bottom-0 left-0 right-0 h-[120px] w-full overflow-hidden pointer-events-none">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
        </svg>
      </div>
    </section>;
}