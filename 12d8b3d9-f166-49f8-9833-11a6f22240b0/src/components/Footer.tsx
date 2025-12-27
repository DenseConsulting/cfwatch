import React, { useState } from 'react';
import { ScaleIcon, MailIcon } from 'lucide-react';
import { Button } from './Button';
export function Footer() {
  const [email, setEmail] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setEmail('');
  };
  return <footer className="bg-[var(--color-navy)] text-white">
      <div className="container">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[var(--color-gold)] rounded-md flex items-center justify-center">
                <ScaleIcon className="w-6 h-6 text-[var(--color-navy)]" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight">
                  Civil Forfeiture Watch
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              An informational platform providing access to publicly available
              civil asset forfeiture notices.
            </p>
          </div>

          {/* Resources Column */}
          <div>
            <h6 className="text-white font-bold mb-4">Resources</h6>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-[var(--color-gold)] text-sm transition-colors">
                  Active Seizures
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[var(--color-gold)] text-sm transition-colors">
                  Legal Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[var(--color-gold)] text-sm transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[var(--color-gold)] text-sm transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h6 className="text-white font-bold mb-4">Legal</h6>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-[var(--color-gold)] text-sm transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[var(--color-gold)] text-sm transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[var(--color-gold)] text-sm transition-colors">
                  Disclaimer
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[var(--color-gold)] text-sm transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h6 className="text-white font-bold mb-4">Stay Informed</h6>
            <p className="text-sm text-gray-300 mb-4">
              Get updates on new seizures and legal resources.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="flex">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email" required className="flex-1 px-4 py-2 rounded-l-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]" />
                <button type="submit" className="px-4 py-2 bg-[var(--color-gold)] text-[var(--color-navy)] rounded-r-md hover:bg-[#B39400] transition-colors" aria-label="Subscribe">
                  <MailIcon className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} Civil Forfeiture Watch. All rights
              reserved.
            </p>
            <p className="text-xs text-gray-500 text-center md:text-right max-w-2xl">
              <strong>Legal Disclaimer:</strong> Civil Forfeiture Watch is not a
              law firm and does not provide legal advice. Information is
              provided for informational purposes only.
            </p>
          </div>
        </div>
      </div>
    </footer>;
}