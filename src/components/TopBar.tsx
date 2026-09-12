import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Bell, Sprout, Check } from 'lucide-react';
import type { Field, } from '@/data/mockData';
import { farmer, notifications } from '@/data/mockData';

type Props = {
  fields: Field[];
  selectedField: Field;
  onSelectField: (field: Field) => void;
};

export default function TopBar({ fields, selectedField, onSelectField }: Props) {
  const [fieldOpen, setFieldOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const fieldRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (fieldRef.current && !fieldRef.current.contains(e.target as Node)) setFieldOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const sevDot: Record<string, string> = {
    green: 'bg-risk-green',
    yellow: 'bg-risk-yellow',
    orange: 'bg-risk-orange',
    red: 'bg-risk-red',
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-offwhite-300 bg-offwhite-100/90 px-4 py-3 backdrop-blur-md lg:px-8">
      {/* Mobile logo */}
      <div className="flex items-center gap-2 lg:hidden">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-forest-500 text-offwhite-50">
          <Sprout size={20} />
        </div>
      </div>

      {/* Field selector */}
      <div ref={fieldRef} className="relative">
        <button
          onClick={() => setFieldOpen(!fieldOpen)}
          className="flex items-center gap-3 rounded-xl border border-offwhite-300 bg-offwhite-50 px-3 py-2 transition-colors hover:border-forest-200 lg:px-4"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest-50 text-lg">
            {selectedField.cropEmoji}
          </div>
          <div className="hidden text-left sm:block">
            <p className="font-heading text-sm font-semibold text-forest-700">{selectedField.name}</p>
            <p className="text-xs text-forest-400">{selectedField.cropType} · {selectedField.areaAcres} acres</p>
          </div>
          <div className="block text-left sm:hidden">
            <p className="font-heading text-sm font-semibold text-forest-700">{selectedField.cropType}</p>
          </div>
          <ChevronDown size={16} className={`text-forest-400 transition-transform ${fieldOpen ? 'rotate-180' : ''}`} />
        </button>

        {fieldOpen && (
          <div className="absolute left-0 top-full mt-2 w-72 rounded-2xl border border-offwhite-300 bg-offwhite-50 p-2 shadow-elevated animate-fade-in">
            <p className="px-3 py-2 font-heading text-xs font-semibold uppercase tracking-wider text-forest-300">
              Select Field
            </p>
            {fields.map((field) => (
              <button
                key={field.id}
                onClick={() => {
                  onSelectField(field);
                  setFieldOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-offwhite-200"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-offwhite-200 text-lg">
                  {field.cropEmoji}
                </div>
                <div className="flex-1">
                  <p className="font-heading text-sm font-semibold text-forest-700">{field.name}</p>
                  <p className="text-xs text-forest-400">{field.cropType} · {field.areaAcres} acres · {field.village}</p>
                </div>
                {field.id === selectedField.id && (
                  <Check size={16} className="text-forest-500" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 lg:gap-3">
        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-offwhite-300 bg-offwhite-50 text-forest-500 transition-colors hover:border-forest-200"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta-400 px-1 text-xs font-bold text-offwhite-50">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-offwhite-300 bg-offwhite-50 p-2 shadow-elevated animate-fade-in">
              <div className="flex items-center justify-between px-3 py-2">
                <p className="font-heading text-sm font-semibold text-forest-700">Notifications</p>
                <span className="text-xs text-forest-400">{unreadCount} unread</span>
              </div>
              <div className="space-y-1">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`flex gap-3 rounded-xl px-3 py-2.5 ${n.unread ? 'bg-offwhite-200' : ''}`}
                  >
                    <div className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${sevDot[n.severity]}`} />
                    <div className="flex-1">
                      <p className="font-heading text-sm font-semibold text-forest-700">{n.title}</p>
                      <p className="text-xs text-forest-400">{n.message}</p>
                      <p className="mt-0.5 text-xs text-forest-300">{n.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-1 w-full rounded-xl px-3 py-2 text-center font-heading text-xs font-semibold text-forest-500 hover:bg-offwhite-200">
                View all notifications
              </button>
            </div>
          )}
        </div>

        {/* Profile */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 rounded-xl border border-offwhite-300 bg-offwhite-50 p-1.5 pr-2 transition-colors hover:border-forest-200 lg:pr-3"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest-500 font-heading text-sm font-bold text-offwhite-50">
              {farmer.avatarInitials}
            </div>
            <div className="hidden text-left lg:block">
              <p className="font-heading text-sm font-semibold text-forest-700">{farmer.name}</p>
              <p className="text-xs text-forest-400">{farmer.role} · {farmer.village}</p>
            </div>
            <ChevronDown size={16} className="hidden text-forest-400 lg:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-offwhite-300 bg-offwhite-50 p-2 shadow-elevated animate-fade-in">
              <div className="flex items-center gap-3 rounded-xl bg-offwhite-200 px-3 py-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-500 font-heading text-sm font-bold text-offwhite-50">
                  {farmer.avatarInitials}
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold text-forest-700">{farmer.name}</p>
                  <p className="text-xs text-forest-400">{farmer.phone}</p>
                </div>
              </div>
              <div className="mt-2 space-y-1">
                <button className="w-full rounded-lg px-3 py-2 text-left font-heading text-sm font-medium text-forest-500 hover:bg-offwhite-200">
                  My Profile
                </button>
                <button className="w-full rounded-lg px-3 py-2 text-left font-heading text-sm font-medium text-forest-500 hover:bg-offwhite-200">
                  Field Settings
                </button>
                <button className="w-full rounded-lg px-3 py-2 text-left font-heading text-sm font-medium text-forest-500 hover:bg-offwhite-200">
                  Help & Support
                </button>
                <div className="my-1 border-t border-offwhite-200" />
                <button className="w-full rounded-lg px-3 py-2 text-left font-heading text-sm font-semibold text-terracotta-500 hover:bg-terracotta-50">
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
