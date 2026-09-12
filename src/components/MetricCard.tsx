import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { MetricData } from '@/data/mockData';
import Sparkline from './Sparkline';

type Props = {
  metric: MetricData;
};

const riskColor: Record<string, { stroke: string; fill: string; tag: string; tagBg: string }> = {
  green: { stroke: '#3F8259', fill: 'rgba(63, 130, 89, 0.08)', tag: 'text-risk-green', tagBg: 'bg-forest-50' },
  yellow: { stroke: '#D4A93A', fill: 'rgba(212, 169, 58, 0.08)', tag: 'text-risk-yellow', tagBg: 'bg-yellow-50' },
  orange: { stroke: '#C1502E', fill: 'rgba(193, 80, 46, 0.08)', tag: 'text-risk-orange', tagBg: 'bg-terracotta-50' },
  red: { stroke: '#A82828', fill: 'rgba(168, 40, 40, 0.08)', tag: 'text-risk-red', tagBg: 'bg-red-50' },
};

export default function MetricCard({ metric }: Props) {
  const isUp = metric.trendDirection === 'up';
  const isPositive = metric.changePercent > 0;
  const colors = riskColor[metric.riskLevel];

  return (
    <div className="group rounded-2xl border border-offwhite-300 bg-offwhite-50 p-5 shadow-card transition-all hover:shadow-card-hover hover:border-forest-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-heading text-sm font-semibold text-forest-500">{metric.name}</p>
          <p className="mt-0.5 text-xs text-forest-400">{metric.description}</p>
        </div>
        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${colors.tag} ${colors.tagBg}`}>
          {metric.optimalRange}
        </span>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div className="flex items-baseline gap-2">
          <span className="font-serif text-4xl font-semibold text-forest-700">{metric.value}</span>
          <span className="text-sm text-forest-400">{metric.unit || 'index'}</span>
        </div>
        <Sparkline data={metric.trend} stroke={colors.stroke} fill={colors.fill} width={110} height={36} />
      </div>

      <div className="mt-3 flex items-center gap-2 border-t border-offwhite-200 pt-3">
        <div
          className={`flex items-center gap-0.5 text-xs font-semibold ${
            isPositive ? 'text-risk-orange' : 'text-risk-green'
          }`}
        >
          {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          <span>{Math.abs(metric.changePercent)}%</span>
        </div>
        <span className="text-xs text-forest-400">vs last 7 days</span>
      </div>
    </div>
  );
}
