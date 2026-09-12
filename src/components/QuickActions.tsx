import { Camera, Lightbulb, AlertCircle, Plus } from 'lucide-react';

type Props = {
  variant: 'desktop' | 'mobile';
};

const actions = [
  { label: 'Scan Crop', icon: Camera, style: 'bg-terracotta-400 text-offwhite-50 hover:bg-terracotta-500' },
  { label: 'View Advisory', icon: Lightbulb, style: 'bg-forest-500 text-offwhite-50 hover:bg-forest-600' },
  { label: 'Report Issue', icon: AlertCircle, style: 'bg-offwhite-50 text-forest-600 border border-offwhite-300 hover:border-forest-200' },
];

export default function QuickActions({ variant }: Props) {
  if (variant === 'mobile') {
    return (
      <button className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-terracotta-400 text-offwhite-50 shadow-elevated transition-transform hover:scale-105 active:scale-95 lg:hidden">
        <Plus size={24} />
      </button>
    );
  }

  return (
    <div className="hidden flex-wrap gap-3 lg:flex">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.label}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 font-heading text-sm font-semibold transition-colors ${action.style}`}
          >
            <Icon size={18} />
            {action.label}
          </button>
        );
      })}
    </div>
  );
}
