import {
  LayoutDashboard,
  Map,
  Camera,
  Lightbulb,
  Settings,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { navItems } from '@/data/mockData';

const mobileIconMap: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  fields: Map,
  scan: Camera,
  advisory: Lightbulb,
  settings: Settings,
};

type Props = {
  activeId: string;
  onSelect: (id: string) => void;
};

export default function BottomTabBar({ activeId, onSelect }: Props) {
  const mobileItems = navItems.filter((item) =>
    ['dashboard', 'fields', 'scan', 'advisory', 'settings'].includes(item.id)
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-offwhite-300 bg-offwhite-50/95 backdrop-blur-md lg:hidden">
      <div className="flex items-center justify-around px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {mobileItems.map((item) => {
          const Icon = mobileIconMap[item.id] ?? LayoutDashboard;
          const isActive = activeId === item.id;
          const isScan = item.id === 'scan';
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className="relative flex flex-col items-center gap-1 px-2 py-1.5"
            >
              {isScan ? (
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-terracotta-400 text-offwhite-50 shadow-elevated">
                  <Icon size={22} />
                </div>
              ) : (
                <div className={`p-1 ${isActive ? 'text-forest-500' : 'text-forest-300'}`}>
                  <Icon size={22} />
                </div>
              )}
              <span
                className={`text-[10px] font-medium ${
                  isScan ? 'text-terracotta-500 font-semibold' : isActive ? 'text-forest-500 font-semibold' : 'text-forest-300'
                }`}
              >
                {item.label}
              </span>
              {item.badge && (
                <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-terracotta-400 px-1 text-[9px] font-bold text-offwhite-50">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
