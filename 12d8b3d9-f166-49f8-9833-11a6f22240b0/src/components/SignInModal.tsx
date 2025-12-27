import React, { useEffect, useState } from 'react';
import { XIcon, CheckCircleIcon, MailIcon } from 'lucide-react';
import { Button } from './Button';
interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignInSuccess?: (user: {
    firstName: string;
    email: string;
  }) => void;
  onSwitchToSignUp?: () => void;
}
export function SignInModal({
  isOpen,
  onClose,
  onSignInSuccess,
  onSwitchToSignUp
}: SignInModalProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setEmail('');
        setError('');
        setIsSuccess(false);
      }, 300);
    }
  }, [isOpen]);
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  const validateForm = () => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    // Extract first name from email (mock behavior)
    const firstName = email.split('@')[0].split('.')[0];
    const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    // Call success callback with user data
    if (onSignInSuccess) {
      onSignInSuccess({
        firstName: capitalizedFirstName,
        email: email
      });
    }
    // Auto-close after success
    setTimeout(() => {
      onClose();
    }, 2000);
  };
  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (error) {
      setError('');
    }
  };
  if (!isOpen) return null;
  return <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md pointer-events-auto transform transition-all duration-300" onClick={e => e.stopPropagation()}>
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-navy)]">
                Sign In
              </h2>
              <p className="text-sm text-gray-600 mt-1">Access your account</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Close modal">
              <XIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {isSuccess ?
          // Success State
          <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircleIcon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-[var(--color-navy)] mb-2">
                  Welcome Back!
                </h3>
                <p className="text-gray-600">
                  You're now signed in to Civil Forfeiture Watch.
                </p>
              </div> :
          // Form
          <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label htmlFor="signin-email" className="block text-sm font-semibold text-[var(--color-navy)] mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="email" id="signin-email" value={email} onChange={e => handleEmailChange(e.target.value)} className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${error ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-[var(--color-gold)]'}`} placeholder="john.doe@example.com" disabled={isSubmitting} />
                  </div>
                  {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
                  <p className="font-medium mb-1">Magic Link Sign In</p>
                  <p className="text-blue-700">
                    We'll send you a secure sign-in link to your email address.
                    No password needed.
                  </p>
                </div>

                {/* Submit Button */}
                <Button type="submit" variant="primary" size="lg" fullWidth disabled={isSubmitting}>
                  {isSubmitting ? 'Sending Link...' : 'Send Sign In Link'}
                </Button>

                {/* Sign Up Link */}
                <p className="text-center text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button type="button" onClick={() => {
                onClose();
                onSwitchToSignUp?.();
              }} className="text-[var(--color-navy)] hover:text-[var(--color-gold)] font-semibold">
                    Create Account
                  </button>
                </p>
              </form>}
          </div>
        </div>
      </div>
    </>;
}