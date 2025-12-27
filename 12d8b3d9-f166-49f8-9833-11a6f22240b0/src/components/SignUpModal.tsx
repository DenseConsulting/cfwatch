import React, { useEffect, useState } from 'react';
import { XIcon, CheckCircleIcon, MailIcon, UserIcon, PhoneIcon } from 'lucide-react';
import { Button } from './Button';
interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignupSuccess?: (user: {
    firstName: string;
    email: string;
  }) => void;
}
export function SignUpModal({
  isOpen,
  onClose,
  onSignupSuccess
}: SignUpModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: ''
        });
        setErrors({});
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
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (formData.phone && !/^[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    // Call success callback with user data
    if (onSignupSuccess) {
      onSignupSuccess({
        firstName: formData.firstName,
        email: formData.email
      });
    }
    // Auto-close after success
    setTimeout(() => {
      onClose();
    }, 2000);
  };
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };
  if (!isOpen) return null;
  return <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md pointer-events-auto transform transition-all duration-300 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-navy)]">
                Create Your Account
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Free access to our complete database
              </p>
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
                  Account Created!
                </h3>
                <p className="text-gray-600">
                  Welcome to Civil Forfeiture Watch. Check your email to verify
                  your account.
                </p>
              </div> :
          // Form
          <form onSubmit={handleSubmit} className="space-y-5">
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-[var(--color-navy)] mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" id="firstName" value={formData.firstName} onChange={e => handleChange('firstName', e.target.value)} className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.firstName ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-[var(--color-gold)]'}`} placeholder="John" disabled={isSubmitting} />
                  </div>
                  {errors.firstName && <p className="text-red-600 text-sm mt-1">
                      {errors.firstName}
                    </p>}
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-[var(--color-navy)] mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" id="lastName" value={formData.lastName} onChange={e => handleChange('lastName', e.target.value)} className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.lastName ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-[var(--color-gold)]'}`} placeholder="Doe" disabled={isSubmitting} />
                  </div>
                  {errors.lastName && <p className="text-red-600 text-sm mt-1">
                      {errors.lastName}
                    </p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[var(--color-navy)] mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="email" id="email" value={formData.email} onChange={e => handleChange('email', e.target.value)} className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-[var(--color-gold)]'}`} placeholder="john.doe@example.com" disabled={isSubmitting} />
                  </div>
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Phone (Optional) */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-[var(--color-navy)] mb-2">
                    Phone Number{' '}
                    <span className="text-gray-500 font-normal">
                      (Optional)
                    </span>
                  </label>
                  <div className="relative">
                    <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="tel" id="phone" value={formData.phone} onChange={e => handleChange('phone', e.target.value)} className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.phone ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-[var(--color-gold)]'}`} placeholder="(555) 123-4567" disabled={isSubmitting} />
                  </div>
                  {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                </div>

                {/* Terms */}
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                  By creating an account, you agree to our{' '}
                  <a href="#" className="text-[var(--color-navy)] hover:text-[var(--color-gold)] font-medium">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-[var(--color-navy)] hover:text-[var(--color-gold)] font-medium">
                    Privacy Policy
                  </a>
                  .
                </div>

                {/* Submit Button */}
                <Button type="submit" variant="primary" size="lg" fullWidth disabled={isSubmitting}>
                  {isSubmitting ? 'Creating Account...' : 'Create Free Account'}
                </Button>

                {/* Sign In Link */}
                <p className="text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <button type="button" className="text-[var(--color-navy)] hover:text-[var(--color-gold)] font-semibold">
                    Sign In
                  </button>
                </p>
              </form>}
          </div>
        </div>
      </div>
    </>;
}