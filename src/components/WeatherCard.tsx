import { CloudRain, CloudSun, Droplets, MapPin, Wind } from 'lucide-react';
import type { WeatherData } from '@/data/mockData';

type Props = {
  weather: WeatherData;
  location: string;
};

export default function WeatherCard({ weather, location }: Props) {
  return (
    <section className="relative isolate overflow-hidden rounded-[20px] border border-[#8bcfd0] bg-gradient-to-br from-[#e7f7f5] via-[#effaf4] to-[#dff1e5] shadow-[0_10px_30px_rgba(38,113,111,0.12)] sm:rounded-[25px]">
      <WeatherBgScene />

      <div className="relative flex items-center gap-3 px-4 py-3.5 sm:gap-0 sm:px-5 sm:py-4 lg:px-6">
        {/* Left: icon + temp + condition + location */}
        <div className="flex items-center gap-3 sm:w-[36%] sm:min-w-[330px] sm:gap-5 lg:w-[34%]">
          <div className="flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-[14px] bg-white/75 text-[#f7ad26] shadow-[0_5px_15px_rgba(67,128,119,0.08)] backdrop-blur-sm sm:h-[72px] sm:w-[72px] sm:rounded-[18px]">
            <CloudSun size={34} strokeWidth={1.7} className="sm:h-[46px] sm:w-[46px]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-baseline gap-0.5 sm:gap-1">
              <span className="font-heading text-3xl font-bold leading-none tracking-tight text-[#062f2d] sm:text-5xl sm:text-[50px]">
                {weather.temp}
              </span>
              <span className="font-heading text-lg font-semibold text-[#0d3e3b] sm:text-2xl">°C</span>
            </div>
            <p className="mt-0.5 truncate font-heading text-sm font-medium leading-tight text-[#073b38] sm:mt-1 sm:text-lg">{weather.condition}</p>
            <p className="mt-1 flex items-center gap-1 text-xs font-medium text-[#376b6d] sm:mt-2 sm:text-sm">
              <MapPin size={13} className="sm:h-[15px] sm:w-[15px]" />
              <span className="truncate">{location}</span>
            </p>
          </div>
        </div>

        {/* Right: metrics */}
        <div className="flex flex-1 items-stretch border-l border-[#a6c9c3] py-1.5 pl-3 sm:py-2 sm:pl-6 lg:pl-8">
          <WeatherMetric icon={Wind} label="Wind" value={`${weather.windSpeed} ${weather.windUnit}`} detail={weather.windDirection} />
          <WeatherMetric icon={Droplets} label="Humidity" value={`${weather.humidity}%`} />
          <WeatherMetric icon={CloudRain} label="Rain" value={`${weather.precipitation} ${weather.precipUnit}`} />
        </div>
      </div>
    </section>
  );
}

function WeatherBgScene() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 900 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="weather-hill-far" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#b4dfc2" />
          <stop offset="1" stopColor="#5db18a" />
        </linearGradient>
        <linearGradient id="weather-hill-near" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#75c69a" />
          <stop offset="1" stopColor="#08745f" />
        </linearGradient>
        <linearGradient id="weather-sky-glow" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#d8f3f2" stopOpacity=".42" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="900" height="160" fill="url(#weather-sky-glow)" />
      <circle cx="790" cy="34" r="22" fill="#fbcf67" opacity=".42" />
      <circle cx="790" cy="34" r="16" fill="#ffd978" opacity=".8" />

      <g fill="#fff" opacity=".72">
        <ellipse cx="700" cy="42" rx="25" ry="12" />
        <ellipse cx="720" cy="36" rx="20" ry="14" />
        <ellipse cx="745" cy="43" rx="26" ry="11" />
      </g>
      <g fill="#fff" opacity=".8">
        <ellipse cx="820" cy="20" rx="22" ry="10" />
        <ellipse cx="840" cy="15" rx="16" ry="12" />
        <ellipse cx="860" cy="21" rx="21" ry="9" />
      </g>

      <path d="M495 150 Q600 92 697 106 Q761 116 828 71 Q864 48 900 57 V160 H495Z" fill="url(#weather-hill-far)" opacity=".72" />
      <path d="M575 160 Q677 92 757 98 Q831 102 900 57 V160 H575Z" fill="url(#weather-hill-near)" opacity=".9" />
      <path d="M650 160 Q740 97 806 89 Q850 82 900 65" fill="none" stroke="#3c9d78" strokeWidth="11" opacity=".7" />
      <path d="M710 160 Q785 105 847 91 Q874 84 900 79" fill="none" stroke="#16856d" strokeWidth="13" opacity=".72" />
      <path d="M776 160 Q824 115 875 93 Q890 87 900 85" fill="none" stroke="#075c51" strokeWidth="12" opacity=".68" />
      <path d="M850 160 Q871 123 893 108 Q899 104 900 104 V160Z" fill="#084e46" opacity=".75" />
    </svg>
  );
}

function WeatherMetric({ icon: Icon, label, value, detail }: { icon: typeof Wind; label: string; value: string; detail?: string }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center justify-center border-r border-[#a6c9c3] px-1.5 text-center last:border-r-0 sm:px-5">
      <Icon size={18} className="text-[#0b4c47] sm:h-[25px] sm:w-[25px]" strokeWidth={1.8} />
      <span className="mt-1 text-[10px] font-medium text-[#39706b] sm:mt-2 sm:text-sm">{label}</span>
      <span className="mt-0.5 whitespace-nowrap font-heading text-xs font-bold text-[#082f2c] sm:mt-1 sm:text-base sm:text-lg">{value}</span>
      {detail && <span className="mt-0.5 text-[9px] font-medium text-[#39706b] sm:text-xs">{detail}</span>}
    </div>
  );
}
