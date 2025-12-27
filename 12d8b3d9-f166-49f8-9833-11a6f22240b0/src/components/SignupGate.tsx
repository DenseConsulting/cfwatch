import React from 'react';
import { LockIcon, CheckCircleIcon } from 'lucide-react';
import { Button } from './Button';
interface SignupGateProps {
  onSignup: (firstName: string, email: string) => void;
  onSignIn?: () => void;
}
export function SignupGate({
  onSignup,
  onSignIn
}: SignupGateProps) {
  return <div className="bg-gradient-to-br from-[var(--color-navy)] to-[#1a2847] rounded-xl p-8 md:p-12 text-white text-center shadow-xl border border-[var(--color-gold)]/20">
      {/* Lock Icon */}
      <div className="w-16 h-16 bg-[var(--color-gold)]/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <LockIcon className="w-8 h-8 text-[var(--color-gold)]" />
      </div>

      {/* Heading */}
      <h3 className="text-2xl md:text-3xl font-bold mb-4">
        Create a Free Account to Continue
      </h3>

      {/* Description */}
      <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
        Get instant access to the complete database of civil forfeiture notices
        with advanced search, filters, and detailed case information.
      </p>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
        <div className="flex items-start gap-3 text-left">
          <CheckCircleIcon className="w-5 h-5 text-[var(--color-gold)] flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold mb-1">Full Database Access</div>
            <div className="text-sm text-gray-300">
              Search all active forfeiture notices
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3 text-left">
          <CheckCircleIcon className="w-5 h-5 text-[var(--color-gold)] flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold mb-1">Advanced Filters</div>
            <div className="text-sm text-gray-300">
              Filter by agency, asset type, location
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3 text-left">
          <CheckCircleIcon className="w-5 h-5 text-[var(--color-gold)] flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold mb-1">Deadline Tracking</div>
            <div className="text-sm text-gray-300">
              Never miss a claim deadline
            </div>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <Button variant="primary" size="lg" onClick={() => {
        // Trigger the parent's signup flow
        // In a real app, this would open the signup modal
        console.log('Open signup modal');
      }} className="min-w-[200px]">
          Create Free Account
        </Button>
        {onSignIn && <Button variant="outline" size="lg" onClick={onSignIn} className="min-w-[200px] !text-white !border-white hover:!bg-white hover:!text-[var(--color-navy)]">
            Sign In
          </Button>}
      </div>

      {/* Fine Print */}
      <p className="text-xs text-gray-400 mt-6">
        No credit card required • Free forever • Cancel anytime
      </p>
    </div>;
}