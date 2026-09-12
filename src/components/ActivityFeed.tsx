import { Camera, FileText, CheckCircle2, Settings, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ActivityItem } from '@/data/mockData';

const activityConfig: Record<string, { icon: LucideIcon; color: string; bg: string }> = {
  scan: { icon: Camera, color: 'text-forest-500', bg: 'bg-forest-50' },
  advisory: { icon: Zap, color: 'text-terracotta-400', bg: 'bg-terracotta-50' },
  task: { icon: CheckCircle2, color: 'text-risk-green', bg: 'bg-forest-50' },
  system: { icon: Settings, color: 'text-lavender-400', bg: 'bg-lavender-50' },
};

const fileTextFallback = FileText;

export default function ActivityFeed({ activities }: { activities: ActivityItem[] }) {
  return (
    <div className="rounded-2xl border border-offwhite-300 bg-offwhite-50 p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-base font-semibold text-forest-700">Recent Activity</h3>
        <button className="font-heading text-xs font-semibold text-forest-500 hover:text-forest-600">
          View all
        </button>
      </div>

      <div className="mt-4 space-y-0">
        {activities.map((item, index) => {
          const config = activityConfig[item.type] || { icon: fileTextFallback, color: 'text-forest-400', bg: 'bg-offwhite-200' };
          const Icon = config.icon;
          const isLast = index === activities.length - 1;

          return (
            <div key={item.id} className="relative flex gap-4 pb-5 last:pb-0">
              {/* Timeline line */}
              {!isLast && (
                <div className="absolute left-[15px] top-9 bottom-0 w-px bg-offwhite-300" />
              )}

              {/* Icon */}
              <div className={`relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${config.bg} ${config.color}`}>
                <Icon size={16} />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-heading text-sm font-semibold text-forest-700">{item.title}</p>
                  <span className="flex-shrink-0 text-xs text-forest-300">{item.timestamp}</span>
                </div>
                <p className="text-sm text-forest-400">{item.description}</p>
                <span className="mt-0.5 text-xs font-medium text-forest-300">{item.fieldName}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
