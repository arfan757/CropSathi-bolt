import {
  LayoutDashboard,
  Map,
  Camera,
  Lightbulb,
  FileText,
  CloudSun,
  Settings,
  Sprout,
  HelpCircle,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { navItems } from '@/data/mockData';

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Map,
  Camera,
  Lightbulb,
  FileText,
  CloudSun,
  Settings,
};

type Props = {
  activeId: string;
  onSelect: (id: string) => void;
};

export default function Sidebar({ activeId, onSelect }: Props) {
  return (
    <aside className="hidden w-64 flex-shrink-0 border-r border-offwhite-300 bg-offwhite-50 lg:flex lg:flex-col">
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-500 text-offwhite-50">
          <Sprout size={22} />
        </div>
        <div>
          <h1 className="font-heading text-lg font-bold text-forest-700">CropSathi</h1>
          <p className="text-xs text-forest-400">Crop Health Monitor</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4">
        <p className="px-3 pb-2 font-heading text-xs font-semibold uppercase tracking-wider text-forest-300">
          Menu
        </p>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon];
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSelect(item.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-forest-500 text-offwhite-50 shadow-card'
                      : 'text-forest-500 hover:bg-offwhite-200'
                  }`}
                >
                  <Icon size={20} className={isActive ? '' : 'text-forest-400'} />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold ${
                        isActive ? 'bg-offwhite-50 text-forest-500' : 'bg-terracotta-400 text-offwhite-50'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-3 py-4">
        <div className="rounded-2xl border border-offwhite-300 bg-offwhite-200/50 p-4">
          <div className="flex items-center gap-2">
            <HelpCircle size={18} className="text-forest-400" />
            <span className="font-heading text-xs font-semibold text-forest-600">Need Help?</span>
          </div>
          <p className="mt-2 text-xs text-forest-400">
            Contact your Gram Sevak or call the Kisan helpline at 1800-XXX-XXXX.
          </p>
          <button className="mt-3 w-full rounded-lg bg-forest-500 py-2 font-heading text-xs font-semibold text-offwhite-50 transition-colors hover:bg-forest-600">
            Get Support
          </button>
        </div>
      </div>
    </aside>
  );
}
