import { ArrowRight, Layers, Compass } from 'lucide-react';

type Props = {
  fieldName: string;
  healthScore: number;
  riskLevel: string;
};

const riskColor: Record<string, string> = {
  green: '#3F8259',
  yellow: '#D4A93A',
  orange: '#C1502E',
  red: '#A82828',
};

// Simulated field boundary polygon + health zones
export default function MapPreview({ fieldName, healthScore, riskLevel }: Props) {
  const color = riskColor[riskLevel] || '#3F8259';

  return (
    <div className="rounded-2xl border border-offwhite-300 bg-offwhite-50 p-5 shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest-50 text-forest-500">
            <Layers size={18} />
          </div>
          <div>
            <h3 className="font-heading text-base font-semibold text-forest-700">Field Map</h3>
            <p className="text-xs text-forest-400">Health overlay · {fieldName}</p>
          </div>
        </div>
        <button className="flex items-center gap-1 font-heading text-xs font-semibold text-forest-500 hover:text-forest-600">
          View full map
          <ArrowRight size={12} />
        </button>
      </div>

      {/* Map visualization */}
      <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-xl border border-offwhite-300 bg-forest-800">
        {/* Grid background to simulate map tiles */}
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <defs>
            <pattern id="mapGrid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(250, 249, 246, 0.06)" strokeWidth="1" />
            </pattern>
            <pattern id="mapContour" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="30" fill="none" stroke="rgba(250, 249, 246, 0.04)" strokeWidth="1" />
              <circle cx="40" cy="40" r="15" fill="none" stroke="rgba(250, 249, 246, 0.03)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mapGrid)" />
          <rect width="100%" height="100%" fill="url(#mapContour)" />
        </svg>

        {/* Field boundary with health overlay */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3F8259" stopOpacity="0.7" />
              <stop offset="40%" stopColor="#3F8259" stopOpacity="0.5" />
              <stop offset="60%" stopColor={color} stopOpacity="0.6" />
              <stop offset="100%" stopColor={color} stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Field polygon */}
          <path
            d="M 60 60 L 280 50 L 340 120 L 320 230 L 180 250 L 70 200 Z"
            fill="url(#healthGradient)"
            stroke="#FAF9F6"
            strokeWidth="2"
            strokeDasharray="6 4"
          />

          {/* Health zones inside field */}
          <circle cx="120" cy="110" r="28" fill="#3F8259" fillOpacity="0.45" />
          <circle cx="220" cy="140" r="35" fill="#D4A93A" fillOpacity="0.35" />
          <circle cx="270" cy="190" r="30" fill={color} fillOpacity="0.5" />

          {/* Scan markers */}
          <g>
            <circle cx="120" cy="110" r="4" fill="#FAF9F6" />
            <circle cx="220" cy="140" r="4" fill="#FAF9F6" />
            <circle cx="270" cy="190" r="4" fill="#FAF9F6" />
          </g>
        </svg>

        {/* Map UI overlays */}
        <div className="absolute left-3 top-3 flex items-center gap-1 rounded-lg bg-forest-900/60 px-2 py-1 text-xs font-medium text-offwhite-100 backdrop-blur-sm">
          <Compass size={12} />
          N
        </div>

        <div className="absolute bottom-3 left-3 rounded-lg bg-forest-900/60 px-3 py-1.5 backdrop-blur-sm">
          <p className="font-heading text-xs font-semibold text-offwhite-100">Satellite · NDVI overlay</p>
        </div>

        {/* Score badge */}
        <div className="absolute right-3 top-3 rounded-lg bg-offwhite-50/90 px-3 py-1.5 backdrop-blur-sm">
          <p className="font-serif text-lg font-bold leading-none" style={{ color }}>{healthScore}</p>
          <p className="text-[10px] text-forest-400">Health</p>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center gap-4 text-xs">
        <span className="flex items-center gap-1.5 text-forest-400">
          <span className="h-2.5 w-2.5 rounded-full bg-risk-green" />
          Healthy
        </span>
        <span className="flex items-center gap-1.5 text-forest-400">
          <span className="h-2.5 w-2.5 rounded-full bg-risk-yellow" />
          Watch
        </span>
        <span className="flex items-center gap-1.5 text-forest-400">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
          Stressed
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-forest-400">
          <span className="h-0.5 w-4 rounded-full bg-offwhite-100" />
          Boundary
        </span>
      </div>
    </div>
  );
}
