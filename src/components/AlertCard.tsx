import { Camera, Eye, CheckCircle2, MapPin, Clock } from 'lucide-react';
import type { Alert } from '@/data/mockData';

type Props = {
  alert: Alert;
};

const severityConfig: Record<string, { bar: string; badge: string; badgeBg: string; label: string }> = {
  green: { bar: 'bg-risk-green', badge: 'text-risk-green', badgeBg: 'bg-forest-50', label: 'Healthy' },
  yellow: { bar: 'bg-risk-yellow', badge: 'text-risk-yellow', badgeBg: 'bg-yellow-50', label: 'Watch' },
  orange: { bar: 'bg-risk-orange', badge: 'text-risk-orange', badgeBg: 'bg-terracotta-50', label: 'Elevated' },
  red: { bar: 'bg-risk-red', badge: 'text-risk-red', badgeBg: 'bg-red-50', label: 'High Risk' },
};

const ctaIcon: Record<string, typeof Camera> = {
  upload: Camera,
  view: Eye,
  resolve: CheckCircle2,
};

const ctaStyle: Record<string, string> = {
  upload: 'bg-terracotta-400 text-offwhite-50 hover:bg-terracotta-500',
  view: 'bg-forest-500 text-offwhite-50 hover:bg-forest-600',
  resolve: 'bg-offwhite-200 text-forest-600 hover:bg-offwhite-300 border border-offwhite-300',
};

export default function AlertCard({ alert }: Props) {
  const sev = severityConfig[alert.severity];
  const CtaIcon = ctaIcon[alert.ctaType];

  return (
    <div className="group flex gap-4 rounded-2xl border border-offwhite-300 bg-offwhite-50 p-4 shadow-card transition-all hover:shadow-card-hover hover:border-offwhite-400">
      <div className={`w-1 flex-shrink-0 rounded-full ${sev.bar}`} />
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-heading text-sm font-semibold text-forest-700">{alert.title}</h4>
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${sev.badge} ${sev.badgeBg}`}>
                {sev.label}
              </span>
            </div>
            <p className="mt-1 text-sm text-forest-400">{alert.description}</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-xs text-forest-400">
            <span className="flex items-center gap-1">
              <MapPin size={12} />
              {alert.fieldName}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {alert.timestamp}
            </span>
          </div>
          <button
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-heading text-xs font-semibold transition-colors ${ctaStyle[alert.ctaType]}`}
          >
            <CtaIcon size={14} />
            {alert.ctaLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
