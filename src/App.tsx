import { useState } from 'react';
import { BarChart3, ArrowRight } from 'lucide-react';
import { fields, currentMetrics, activeAlerts, recentActivity, weatherData, fieldPreviousScores } from '@/data/mockData';
import type { Field } from '@/data/mockData';
import Sidebar from '@/components/Sidebar';
import BottomTabBar from '@/components/BottomTabBar';
import TopBar from '@/components/TopBar';
import WeatherCard from '@/components/WeatherCard';
import HealthScoreCard from '@/components/HealthScoreCard';
import MetricCard from '@/components/MetricCard';
import AlertsPanel from '@/components/AlertsPanel';
import MapPreview from '@/components/MapPreview';
import ActivityFeed from '@/components/ActivityFeed';
import QuickActions from '@/components/QuickActions';

export default function App() {
  const [selectedField, setSelectedField] = useState<Field>(fields[0]);
  const [activeNav, setActiveNav] = useState('dashboard');

  return (
    <div className="flex min-h-screen bg-offwhite-100">
      {/* Desktop sidebar */}
      <Sidebar activeId={activeNav} onSelect={setActiveNav} />

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar fields={fields} selectedField={selectedField} onSelectField={setSelectedField} />

        <main className="flex-1 px-4 pb-24 pt-6 lg:px-8 lg:pb-10">
          {/* Page heading + quick actions */}
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-heading text-xl font-bold text-forest-700 lg:text-2xl">
                Dashboard
              </h1>
              <p className="mt-0.5 text-sm text-forest-400">
                Crop health overview for {selectedField.cropType} · Updated 1 hour ago
              </p>
            </div>
            <QuickActions variant="desktop" />
          </div>

          {/* Weather card first */}
          <div className="animate-slide-up">
            <WeatherCard weather={weatherData} location={`${selectedField.village}, ${selectedField.district}`} />
          </div>

          {/* Swipeable Field Health Score card */}
          <div className="mt-4 animate-slide-up">
            <HealthScoreCard
              fields={fields}
              selectedField={selectedField}
              previousScores={fieldPreviousScores}
              onSelectField={setSelectedField}
            />
          </div>

          {/* Metric cards row */}
          <div className="mt-6 grid grid-cols-1 gap-4 animate-slide-up sm:grid-cols-2 lg:grid-cols-3">
            <MetricCard metric={currentMetrics.ndvi} />
            <MetricCard metric={currentMetrics.ndre} />
            <MetricCard metric={currentMetrics.cwsi} />
          </div>

          {/* Main content grid: alerts + map (2/3) and activity feed (1/3) */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left column: alerts + map */}
            <div className="space-y-6 lg:col-span-2">
              <AlertsPanel alerts={activeAlerts} />
              <MapPreview
                fieldName={selectedField.name}
                healthScore={selectedField.healthScore}
                riskLevel={selectedField.riskLevel}
              />
            </div>

            {/* Right column: activity feed */}
            <div className="lg:col-span-1">
              <ActivityFeed activities={recentActivity} />

              {/* Summary card */}
              <div className="mt-6 rounded-2xl border border-offwhite-300 bg-gradient-to-br from-lavender-50 to-offwhite-50 p-5 shadow-card">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lavender-100 text-lavender-500">
                    <BarChart3 size={18} />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-forest-700">Weekly Summary</h3>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-offwhite-50 p-3">
                    <p className="font-serif text-2xl font-bold text-forest-700">5</p>
                    <p className="text-xs text-forest-400">Scans this week</p>
                  </div>
                  <div className="rounded-xl bg-offwhite-50 p-3">
                    <p className="font-serif text-2xl font-bold text-forest-700">3</p>
                    <p className="text-xs text-forest-400">Advisories issued</p>
                  </div>
                  <div className="rounded-xl bg-offwhite-50 p-3">
                    <p className="font-serif text-2xl font-bold text-terracotta-400">2</p>
                    <p className="text-xs text-forest-400">Alerts active</p>
                  </div>
                  <div className="rounded-xl bg-offwhite-50 p-3">
                    <p className="font-serif text-2xl font-bold text-forest-500">1</p>
                    <p className="text-xs text-forest-400">Tasks completed</p>
                  </div>
                </div>
                <button className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl bg-forest-500 py-2.5 font-heading text-sm font-semibold text-offwhite-50 transition-colors hover:bg-forest-600">
                  View Detailed Report
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile bottom tab bar */}
      <BottomTabBar activeId={activeNav} onSelect={setActiveNav} />

      {/* Mobile FAB */}
      <QuickActions variant="mobile" />
    </div>
  );
}
