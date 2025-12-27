import React, { useEffect, useState, useRef } from 'react';
import { TrendingUpIcon, DollarSignIcon, AlertCircleIcon } from 'lucide-react';
interface StatProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}
function AnimatedStat({
  icon,
  value,
  label,
  prefix = '',
  suffix = '',
  decimals = 0
}: StatProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.3
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isVisible, value]);
  const formatNumber = (num: number) => {
    if (decimals > 0) {
      return num.toFixed(decimals);
    }
    return Math.floor(num).toLocaleString();
  };
  return <div ref={ref} className="bg-white rounded-lg p-8 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-center w-14 h-14 bg-[var(--color-navy)] rounded-lg mb-4 mx-auto">
        {icon}
      </div>
      <div className="text-4xl font-bold text-[var(--color-navy)] mb-2 text-center">
        {prefix}
        {formatNumber(count)}
        {suffix}
      </div>
      <div className="text-gray-600 text-center font-medium">{label}</div>
    </div>;
}
export function StatsCounter() {
  return <section className="section bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="mb-4">Civil Forfeiture by the Numbers</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Understanding the scope of civil asset forfeiture in the United
            States
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <AnimatedStat icon={<TrendingUpIcon className="w-7 h-7 text-[var(--color-gold)]" />} value={127845} label="Total Seizures (2023)" suffix="+" />
          <AnimatedStat icon={<DollarSignIcon className="w-7 h-7 text-[var(--color-gold)]" />} value={2.5} label="Billion Seized Annually" prefix="$" suffix="B" decimals={1} />
          <AnimatedStat icon={<AlertCircleIcon className="w-7 h-7 text-[var(--color-gold)]" />} value={3421} label="Active Cases (45-Day Window)" />
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 max-w-3xl mx-auto">
            Data compiled from federal and state forfeiture notices. Updated
            daily from official government sources including DEA, FBI, CBP, IRS,
            and state law enforcement agencies.
          </p>
        </div>
      </div>
    </section>;
}