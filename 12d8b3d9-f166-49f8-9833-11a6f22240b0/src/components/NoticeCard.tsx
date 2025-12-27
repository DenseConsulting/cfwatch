import React from 'react';
import { CalendarIcon, MapPinIcon, DollarSignIcon, BuildingIcon, AlertCircleIcon } from 'lucide-react';
import { Button } from './Button';
export interface Notice {
  id: string;
  caseNumber: string;
  agency: string;
  city: string;
  state: string;
  assetType: string;
  assetValue: number;
  claimDeadline: string;
  seizureDate: string;
  status: 'active' | 'expired' | 'claimed';
}
interface NoticeCardProps {
  notice: Notice;
  onViewDetails?: (id: string) => void;
}
export function NoticeCard({
  notice,
  onViewDetails
}: NoticeCardProps) {
  const daysUntilDeadline = Math.ceil((new Date(notice.claimDeadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const isUrgent = daysUntilDeadline <= 10 && daysUntilDeadline > 0;
  const isExpired = daysUntilDeadline < 0;
  return <div className="bg-white rounded-lg border-2 border-gray-200 hover:border-[var(--color-gold)] transition-all p-6 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-sm font-semibold text-[var(--color-gold)] mb-1">
            {notice.caseNumber}
          </div>
          <h3 className="text-lg font-bold text-[var(--color-navy)]">
            {notice.assetType}
          </h3>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${isExpired ? 'bg-gray-100 text-gray-600' : isUrgent ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {isExpired ? 'Expired' : isUrgent ? 'Urgent' : 'Active'}
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-start gap-2">
          <BuildingIcon className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-xs text-gray-500">Agency</div>
            <div className="text-sm font-medium text-gray-900">
              {notice.agency}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <MapPinIcon className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-xs text-gray-500">Location</div>
            <div className="text-sm font-medium text-gray-900">
              {notice.city}, {notice.state}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <DollarSignIcon className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-xs text-gray-500">Estimated Value</div>
            <div className="text-sm font-medium text-gray-900">
              ${notice.assetValue.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <CalendarIcon className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-xs text-gray-500">Claim Deadline</div>
            <div className="text-sm font-medium text-gray-900">
              {new Date(notice.claimDeadline).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* Urgency Warning */}
      {isUrgent && !isExpired && <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
          <AlertCircleIcon className="w-4 h-4 text-red-600 flex-shrink-0" />
          <p className="text-xs text-red-700 font-medium">
            Only {daysUntilDeadline} days left to file a claim
          </p>
        </div>}

      {/* Action Button */}
      <Button variant="outline" size="sm" fullWidth onClick={() => onViewDetails?.(notice.id)} disabled={isExpired}>
        {isExpired ? 'Deadline Passed' : 'View Full Details'}
      </Button>
    </div>;
}