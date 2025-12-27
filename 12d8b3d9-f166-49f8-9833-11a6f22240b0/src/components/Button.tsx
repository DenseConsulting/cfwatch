import React from 'react';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  fullWidth?: boolean;
}
export function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-[var(--color-gold)] text-[var(--color-navy)] hover:bg-[#B39400] focus:ring-[var(--color-gold)] shadow-sm',
    secondary: 'bg-[var(--color-navy)] text-white hover:bg-[#1a2847] focus:ring-[var(--color-navy)] shadow-sm',
    outline: 'border-2 border-[var(--color-navy)] text-[var(--color-navy)] hover:bg-[var(--color-navy)] hover:text-white focus:ring-[var(--color-navy)]'
  };
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  const widthClass = fullWidth ? 'w-full' : '';
  return <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`} {...props}>
      {children}
    </button>;
}