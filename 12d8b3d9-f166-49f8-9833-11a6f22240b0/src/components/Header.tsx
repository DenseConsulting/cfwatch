import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon, ScaleIcon, UserIcon, ChevronDownIcon, LogOutIcon } from 'lucide-react';
import { Button } from './Button';
interface HeaderProps {
  onOpenSignUp: () => void;
  onOpenSignIn: () => void;
  userInfo?: {
    firstName: string;
    email: string;
  } | null;
  onLogout?: () => void;
}
export function Header({
  onOpenSignUp,
  onOpenSignIn,
  userInfo,
  onLogout
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navLinks = [{
    label: 'Forfeiture Notices',
    href: '/notices'
  }, {
    label: 'Find Attorney',
    href: '/attorneys'
  }, {
    label: 'Resources',
    href: '/resources'
  }, {
    label: 'About',
    href: '/about'
  }];
  const isActive = (href: string) => location.pathname === href;
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    if (userDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userDropdownOpen]);
  return <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <nav className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[var(--color-navy)] rounded-md flex items-center justify-center group-hover:bg-[var(--color-gold)] transition-colors">
              <ScaleIcon className="w-6 h-6 text-white group-hover:text-[var(--color-navy)]" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-[var(--color-navy)] leading-tight">
                Civil Forfeiture Watch
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => <Link key={link.href} to={link.href} className={`font-medium transition-colors ${isActive(link.href) ? 'text-[var(--color-navy)] border-b-2 border-[var(--color-gold)] pb-1' : 'text-gray-700 hover:text-[var(--color-navy)]'}`}>
                {link.label}
              </Link>)}
          </div>

          {/* Desktop CTA / User Menu */}
          <div className="hidden md:block">
            {userInfo ? <div className="relative" ref={dropdownRef}>
                <button onClick={() => setUserDropdownOpen(!userDropdownOpen)} className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 bg-[var(--color-navy)] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {userInfo.firstName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-medium text-[var(--color-navy)]">
                    {userInfo.firstName}
                  </span>
                  <ChevronDownIcon className={`w-4 h-4 text-gray-600 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-[var(--color-navy)]">
                        {userInfo.firstName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {userInfo.email}
                      </p>
                    </div>
                    <button onClick={() => {
                setUserDropdownOpen(false);
                // Navigate to account page
                console.log('Navigate to account');
              }} className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors">
                      <UserIcon className="w-4 h-4" />
                      Account
                    </button>
                    <button onClick={() => {
                setUserDropdownOpen(false);
                onLogout?.();
              }} className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors">
                      <LogOutIcon className="w-4 h-4" />
                      Log Out
                    </button>
                  </div>}
              </div> : <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={onOpenSignIn}>
                  Sign In
                </Button>
                <Button variant="primary" size="sm" onClick={onOpenSignUp}>
                  Get Started
                </Button>
              </div>}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-gray-700 hover:text-[var(--color-navy)] transition-colors" aria-label="Toggle menu">
            {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              {navLinks.map(link => <Link key={link.href} to={link.href} className={`font-medium transition-colors py-2 ${isActive(link.href) ? 'text-[var(--color-navy)]' : 'text-gray-700 hover:text-[var(--color-navy)]'}`} onClick={() => setMobileMenuOpen(false)}>
                  {link.label}
                </Link>)}

              {userInfo ? <>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm font-semibold text-[var(--color-navy)] mb-1">
                      {userInfo.firstName}
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      {userInfo.email}
                    </p>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="md" fullWidth onClick={() => {
                  setMobileMenuOpen(false);
                  console.log('Navigate to account');
                }}>
                        Account
                      </Button>
                      <Button variant="outline" size="md" fullWidth onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout?.();
                }} className="!text-red-600 !border-red-600 hover:!bg-red-50">
                        Log Out
                      </Button>
                    </div>
                  </div>
                </> : <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
                  <Button variant="outline" size="md" fullWidth onClick={() => {
              setMobileMenuOpen(false);
              onOpenSignIn();
            }}>
                    Sign In
                  </Button>
                  <Button variant="primary" size="md" fullWidth onClick={() => {
              setMobileMenuOpen(false);
              onOpenSignUp();
            }}>
                    Get Started
                  </Button>
                </div>}
            </div>
          </div>}
      </nav>
    </header>;
}