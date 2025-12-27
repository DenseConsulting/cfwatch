import React from 'react';
import { MapPinIcon, GlobeIcon, MailIcon, PhoneIcon, ScaleIcon } from 'lucide-react';
import { Button } from './Button';
export interface Attorney {
  id: string;
  name: string;
  firmName?: string;
  city: string;
  state: string;
  licensedStates: string[];
  practiceFocus: string;
  website?: string;
  email?: string;
  phone?: string;
}
interface AttorneyCardProps {
  attorney: Attorney;
}
export function AttorneyCard({
  attorney
}: AttorneyCardProps) {
  return <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-gray-300 transition-colors h-full flex flex-col">
      <div className="flex-1">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <h3 className="text-lg font-bold text-[var(--color-navy)] leading-tight">
              {attorney.name}
            </h3>
            {attorney.firmName && <p className="text-sm font-medium text-gray-600 mt-1">
                {attorney.firmName}
              </p>}
          </div>
        </div>

        <div className="space-y-3 mt-4">
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <MapPinIcon className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
            <span>
              {attorney.city}, {attorney.state}
            </span>
          </div>

          <div className="flex items-start gap-2 text-sm text-gray-600">
            <ScaleIcon className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
            <div>
              <span className="font-medium text-gray-700">Licensed in:</span>{' '}
              {attorney.licensedStates.join(', ')}
            </div>
          </div>

          <div className="inline-block px-2 py-1 bg-gray-50 text-xs font-medium text-gray-600 rounded border border-gray-100">
            Focus: {attorney.practiceFocus}
          </div>
        </div>

        {(attorney.phone || attorney.email) && <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
            {attorney.phone && <div className="flex items-center gap-2 text-sm text-gray-600">
                <PhoneIcon className="w-3.5 h-3.5 text-gray-400" />
                <span>{attorney.phone}</span>
              </div>}
            {attorney.email && <div className="flex items-center gap-2 text-sm text-gray-600">
                <MailIcon className="w-3.5 h-3.5 text-gray-400" />
                <span className="truncate">{attorney.email}</span>
              </div>}
          </div>}
      </div>

      {attorney.website && <div className="mt-6 pt-4 border-t border-gray-100">
          <a href={attorney.website} target="_blank" rel="noopener noreferrer" className="block w-full">
            <Button variant="outline" size="sm" fullWidth className="gap-2 text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50">
              <GlobeIcon className="w-4 h-4" />
              {attorney.firmName ? 'View Firm Site' : 'Visit Website'}
            </Button>
          </a>
        </div>}
    </div>;
}