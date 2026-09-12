import { useEffect, useRef, useState } from 'react';
import type { RiskLevel } from '@/data/mockData';

type Props = {
  score: number;
  riskLevel: RiskLevel;
  size?: number;
  strokeWidth?: number;
  compact?: boolean;
};

const colorMap: Record<RiskLevel, { stroke: string; track: string; label: string }> = {
  green: { stroke: '#4CAF6E', track: 'rgba(255,255,255,0.12)', label: 'Healthy' },
  yellow: { stroke: '#E8B84A', track: 'rgba(255,255,255,0.12)', label: 'Watch' },
  orange: { stroke: '#D96A3E', track: 'rgba(255,255,255,0.12)', label: 'Elevated' },
  red: { stroke: '#D14545', track: 'rgba(255,255,255,0.12)', label: 'High Risk' },
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function lerpColor(a: string, b: string, t: number) {
  const pa = [parseInt(a.slice(1, 3), 16), parseInt(a.slice(3, 5), 16), parseInt(a.slice(5, 7), 16)];
  const pb = [parseInt(b.slice(1, 3), 16), parseInt(b.slice(3, 5), 16), parseInt(b.slice(5, 7), 16)];
  const r = Math.round(pa[0] + (pb[0] - pa[0]) * t);
  const g = Math.round(pa[1] + (pb[1] - pa[1]) * t);
  const bl = Math.round(pa[2] + (pb[2] - pa[2]) * t);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${bl.toString(16).padStart(2, '0')}`;
}

export default function CircularGauge({ score, riskLevel, size = 200, strokeWidth = 14, compact = false }: Props) {
  const colors = colorMap[riskLevel];
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const [displayScore, setDisplayScore] = useState(score);
  const [displayColor, setDisplayColor] = useState(colors.stroke);
  const [displayOffset, setDisplayOffset] = useState(() => circumference - (score / 100) * circumference);
  const prevScore = useRef(score);
  const prevColor = useRef(colors.stroke);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const fromScore = prevScore.current;
    const toScore = score;
    const fromColor = prevColor.current;
    const toColor = colors.stroke;

    if (fromScore === toScore && fromColor === toColor) return;

    const duration = 900;
    const startTime = performance.now();
    cancelAnimationFrame(frameRef.current);

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(t);

      const currentScore = Math.round(fromScore + (toScore - fromScore) * eased);
      setDisplayScore(currentScore);
      setDisplayColor(lerpColor(fromColor, toColor, eased));
      setDisplayOffset(circumference - (currentScore / 100) * circumference);

      if (t < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        prevScore.current = toScore;
        prevColor.current = toColor;
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [score, colors.stroke, circumference]);

  const fontSize = compact ? 'text-4xl' : 'text-5xl';

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colors.track}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={displayColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={displayOffset}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span
          className={`font-serif ${fontSize} font-bold leading-none`}
          style={{
            color: '#ffffff',
            textShadow: '0 2px 8px rgba(0,0,0,0.35)',
          }}
        >
          {displayScore}
        </span>
        {!compact && (
          <>
            <span className="mt-1 font-body text-xs font-medium uppercase tracking-wider text-forest-400">
              Health Score
            </span>
            <span
              className="mt-2 rounded-full px-3 py-0.5 font-heading text-xs font-semibold transition-colors duration-300"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: colors.stroke }}
            >
              {colors.label}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
