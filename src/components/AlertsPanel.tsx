import { AlertTriangle, Bell } from 'lucide-react';
import type { Alert } from '@/data/mockData';
import AlertCard from './AlertCard';

type Props = {
  alerts: Alert[];
};

export default function AlertsPanel({ alerts }: Props) {
  const activeCount = alerts.filter((a) => a.severity !== 'green').length;

  return (
    <div className="rounded-2xl border border-offwhite-300 bg-offwhite-50 p-5 shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-terracotta-50 text-terracotta-400">
            <AlertTriangle size={18} />
          </div>
          <div>
            <h3 className="font-heading text-base font-semibold text-forest-700">Active Alerts & Advisory</h3>
            <p className="text-xs text-forest-400">{activeCount} active issues need attention</p>
          </div>
        </div>
        <button className="hidden font-heading text-xs font-semibold text-forest-500 hover:text-forest-600 sm:block">
          View all
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {alerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  );
}
