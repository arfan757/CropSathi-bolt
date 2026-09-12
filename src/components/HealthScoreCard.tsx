import { useEffect, useRef, useState, useCallback } from 'react';
import { Calendar, MapPin, Sprout, TrendingDown, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Field } from '@/data/mockData';
import CircularGauge from './CircularGauge';

type Props = {
  fields: Field[];
  selectedField: Field;
  previousScores: Record<string, number>;
  onSelectField: (field: Field) => void;
};

export default function HealthScoreCard({ fields, selectedField, previousScores, onSelectField }: Props) {
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(0, fields.findIndex((f) => f.id === selectedField.id))
  );
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const hasMoved = useRef(false);

  useEffect(() => {
    const idx = fields.findIndex((f) => f.id === selectedField.id);
    if (idx >= 0) setActiveIndex(idx);
  }, [fields, selectedField.id]);

  const selectIndex = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(fields.length - 1, index));
      setActiveIndex(clamped);
      onSelectField(fields[clamped]);
    },
    [fields, onSelectField]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    startX.current = e.clientX;
    startY.current = e.clientY;
    hasMoved.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    const dy = e.clientY - (startY.current ?? 0);
    if (!hasMoved.current) {
      if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy)) {
        hasMoved.current = true;
      } else if (Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx)) {
        startX.current = null;
        startY.current = null;
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (startX.current !== null && hasMoved.current) {
      const dist = e.clientX - startX.current;
      if (Math.abs(dist) > 30) selectIndex(activeIndex + (dist < 0 ? 1 : -1));
    }
    startX.current = null;
    startY.current = null;
    hasMoved.current = false;
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaX) < 6 && Math.abs(e.deltaY) < 6) return;
    e.preventDefault();
    selectIndex(activeIndex + ((e.deltaX + e.deltaY) > 0 ? 1 : -1));
  };

  const field = fields[activeIndex] ?? selectedField;
  const prevScore = previousScores[field.id] ?? 68;
  const scoreDiff = field.healthScore - prevScore;
  const isUp = scoreDiff >= 0;

  return (
    <section className="relative overflow-hidden rounded-[24px] border border-forest-600 bg-gradient-to-br from-[#07523f] via-forest-600 to-[#06382d] shadow-card sm:rounded-[28px]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-25">
        <LeafShape className="-left-10 -top-8 -rotate-[28deg]" />
        <LeafShape className="-bottom-12 -right-10 rotate-[32deg]" />
      </div>

      {/* Swipeable area — gauge stays fixed, only internal values animate */}
      <div
        className="relative select-none"
        style={{ touchAction: 'pan-y' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
      >
        <div className="relative flex flex-col items-center gap-4 px-4 py-5 sm:flex-row sm:items-center sm:gap-6 sm:px-8 sm:py-7 lg:gap-10 lg:px-10 lg:py-8">
          {/* Fixed gauge — count-up + radial progress + color morph all in place */}
          <div className="flex flex-shrink-0 items-center justify-center rounded-full bg-white/[0.08] p-2.5 sm:p-3">
            <CircularGauge
              score={field.healthScore}
              riskLevel={field.riskLevel}
              size={140}
              strokeWidth={12}
              compact
            />
          </div>

          {/* Cross-fading field info — text morphs in place */}
          <div className="flex min-w-0 flex-1 flex-col items-center text-center sm:items-start sm:text-left">
            <div
              key={`name-${field.id}`}
              className="flex items-center gap-2 animate-morph-in"
            >
              <span className="text-xl leading-none sm:text-2xl">{field.cropEmoji}</span>
              <h2 className="truncate font-heading text-lg font-bold text-offwhite-50 sm:text-xl lg:text-2xl">
                {field.name}
              </h2>
            </div>

            <div
              key={`meta-${field.id}`}
              className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-offwhite-100 sm:mt-3 sm:justify-start sm:text-sm sm:gap-x-5 animate-morph-in"
            >
              <span className="flex items-center gap-1.5">
                <Sprout size={14} className="sm:hidden" />
                <Sprout size={16} className="hidden sm:block" />
                {field.cropType}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="sm:hidden" />
                <MapPin size={16} className="hidden sm:block" />
                {field.village}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="sm:hidden" />
                <Calendar size={16} className="hidden sm:block" />
                {field.areaAcres} acres
              </span>
            </div>

            <div
              key={`trend-${field.id}`}
              className="mt-3 flex items-center gap-2.5 sm:mt-4 animate-morph-in"
            >
              <div
                className={`flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 backdrop-blur-sm ${
                  isUp ? 'text-[#b8ebc6]' : 'text-[#ff9e9e]'
                }`}
              >
                {isUp ? <TrendingUp size={15} /> : <TrendingDown size={15} />}
                <span className="font-heading text-xs font-semibold sm:text-sm">
                  {isUp ? '+' : ''}
                  {scoreDiff} pts
                </span>
              </div>
              <span className="text-xs text-offwhite-200 sm:text-sm">vs last scan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer: swipe hint + nav controls + dots */}
      <div className="relative flex items-center justify-between border-t border-white/10 px-4 py-2.5 sm:px-8 sm:py-3">
        <span className="hidden text-xs font-medium text-offwhite-200 sm:block">
          Swipe left or right to change field
        </span>
        <span className="text-[10px] font-medium text-offwhite-200 sm:hidden">
          Swipe to browse
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => selectIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-offwhite-50 transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Previous field"
          >
            <ChevronLeft size={15} />
          </button>
          <div className="flex items-center gap-1.5 px-1">
            {fields.map((f, i) => (
              <button
                key={f.id}
                onClick={() => selectIndex(i)}
                aria-label={`Show ${f.name}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? 'w-5 bg-offwhite-50' : 'w-1.5 bg-offwhite-50/40'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => selectIndex(activeIndex + 1)}
            disabled={activeIndex === fields.length - 1}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-offwhite-50 transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Next field"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}

function LeafShape({ className }: { className: string }) {
  return (
    <svg
      className={`absolute h-48 w-48 fill-[#6caa78] ${className}`}
      viewBox="0 0 200 200"
      aria-hidden="true"
    >
      <path d="M24 170C42 91 91 35 174 21c-4 79-50 131-150 149Z" />
      <path
        d="M34 166C82 111 115 68 166 26"
        fill="none"
        stroke="#d1f0d1"
        strokeOpacity=".35"
        strokeWidth="2"
      />
    </svg>
  );
}
