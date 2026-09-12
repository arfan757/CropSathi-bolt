export type RiskLevel = 'green' | 'yellow' | 'orange' | 'red';

export type NavItem = {
  id: string;
  label: string;
  icon: string;
  badge?: number;
};

export type Field = {
  id: string;
  name: string;
  cropType: string;
  cropEmoji: string;
  areaAcres: number;
  village: string;
  district: string;
  sownDate: string;
  healthScore: number;
  riskLevel: RiskLevel;
};

export type MetricData = {
  name: string;
  fullName: string;
  value: number;
  unit: string;
  trend: number[];
  trendDirection: 'up' | 'down';
  changePercent: number;
  description: string;
  optimalRange: string;
  riskLevel: RiskLevel;
};

export type Alert = {
  id: string;
  severity: RiskLevel;
  title: string;
  description: string;
  fieldName: string;
  timestamp: string;
  ctaLabel: string;
  ctaType: 'upload' | 'view' | 'resolve';
};

export type ActivityItem = {
  id: string;
  type: 'scan' | 'advisory' | 'task' | 'system';
  title: string;
  description: string;
  timestamp: string;
  fieldName: string;
};

export const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'fields', label: 'Fields', icon: 'Map' },
  { id: 'scan', label: 'Scan Crop', icon: 'Camera' },
  { id: 'advisory', label: 'Advisory', icon: 'Lightbulb', badge: 3 },
  { id: 'reports', label: 'Reports', icon: 'FileText' },
  { id: 'weather', label: 'Weather', icon: 'CloudSun' },
  { id: 'settings', label: 'Settings', icon: 'Settings' },
];

export const farmer = {
  name: 'Rajesh Patil',
  avatarInitials: 'RP',
  role: 'Farmer',
  phone: '+91 98XXX 45678',
  village: 'Shirur',
  district: 'Pune',
};

export const fields: Field[] = [
  {
    id: 'field-1',
    name: 'Plot A — North Field',
    cropType: 'Wheat',
    cropEmoji: '🌾',
    areaAcres: 4.2,
    village: 'Shirur',
    district: 'Pune',
    sownDate: '15 Nov 2025',
    healthScore: 72,
    riskLevel: 'yellow',
  },
  {
    id: 'field-2',
    name: 'Plot B — Riverside',
    cropType: 'Soybean',
    cropEmoji: '🫘',
    areaAcres: 3.0,
    village: 'Shirur',
    district: 'Pune',
    sownDate: '20 Jun 2025',
    healthScore: 48,
    riskLevel: 'orange',
  },
  {
    id: 'field-3',
    name: 'Plot C — East Field',
    cropType: 'Cotton',
    cropEmoji: '🌱',
    areaAcres: 5.5,
    village: 'Shirur',
    district: 'Pune',
    sownDate: '10 May 2025',
    healthScore: 86,
    riskLevel: 'green',
  },
  {
    id: 'field-4',
    name: 'Plot D — West Field',
    cropType: 'Sugarcane',
    cropEmoji: '🎋',
    areaAcres: 6.8,
    village: 'Shirur',
    district: 'Pune',
    sownDate: '05 Feb 2026',
    healthScore: 64,
    riskLevel: 'yellow',
  },
  {
    id: 'field-5',
    name: 'Plot E — South Field',
    cropType: 'Maize',
    cropEmoji: '🌽',
    areaAcres: 2.5,
    village: 'Shirur',
    district: 'Pune',
    sownDate: '10 Jul 2026',
    healthScore: 91,
    riskLevel: 'green',
  },
  {
    id: 'field-6',
    name: 'Plot F — Hillside',
    cropType: 'Groundnut',
    cropEmoji: '🥜',
    areaAcres: 1.8,
    village: 'Shirur',
    district: 'Pune',
    sownDate: '25 Jun 2026',
    healthScore: 34,
    riskLevel: 'red',
  },
];

export type WeatherData = {
  temp: number;
  condition: string;
  windSpeed: number;
  windUnit: string;
  windDirection: string;
  soilTemp: number;
  humidity: number;
  precipitation: number;
  precipUnit: string;
  updatedAt: string;
};

export const weatherData: WeatherData = {
  temp: 28,
  condition: 'Partly Cloudy',
  windSpeed: 12,
  windUnit: 'km/h',
  windDirection: 'WSW',
  soilTemp: 24,
  humidity: 42,
  precipitation: 0,
  precipUnit: 'mm',
  updatedAt: '10 min ago',
};

export const fieldPreviousScores: Record<string, number> = {
  'field-1': 68,
  'field-2': 55,
  'field-3': 82,
  'field-4': 67,
  'field-5': 88,
  'field-6': 40,
};

export const currentMetrics: Record<string, MetricData> = {
  ndvi: {
    name: 'NDVI',
    fullName: 'Normalized Difference Vegetation Index',
    value: 0.65,
    unit: '',
    trend: [0.52, 0.55, 0.58, 0.61, 0.6, 0.63, 0.65],
    trendDirection: 'up',
    changePercent: 12.5,
    description: 'Vegetation density and plant health',
    optimalRange: '0.6 – 0.8',
    riskLevel: 'yellow',
  },
  ndre: {
    name: 'NDRE',
    fullName: 'Normalized Difference Red Edge',
    value: 0.38,
    unit: '',
    trend: [0.42, 0.41, 0.4, 0.39, 0.4, 0.38, 0.38],
    trendDirection: 'down',
    changePercent: -9.5,
    description: 'Chlorophyll content and nitrogen stress',
    optimalRange: '0.3 – 0.5',
    riskLevel: 'green',
  },
  cwsi: {
    name: 'CWSI',
    fullName: 'Crop Water Stress Index',
    value: 0.42,
    unit: '',
    trend: [0.25, 0.28, 0.32, 0.35, 0.38, 0.4, 0.42],
    trendDirection: 'up',
    changePercent: 68.0,
    description: 'Water stress from thermal imagery',
    optimalRange: '0.0 – 0.3',
    riskLevel: 'orange',
  },
};

export const activeAlerts: Alert[] = [
  {
    id: 'alert-1',
    severity: 'orange',
    title: 'Elevated water stress detected',
    description: 'Thermal CWSI has risen above the optimal threshold in the northern quadrant. Upload a photo to confirm irrigation need.',
    fieldName: 'Plot A — North Field',
    timestamp: '2 hours ago',
    ctaLabel: 'Upload Photo',
    ctaType: 'upload',
  },
  {
    id: 'alert-2',
    severity: 'yellow',
    title: 'NDVI declining in riverside plot',
    description: 'Vegetation index dropped 9.5% over the last 7 days. Possible nutrient deficiency or early pest activity.',
    fieldName: 'Plot B — Riverside',
    timestamp: '5 hours ago',
    ctaLabel: 'View Advisory',
    ctaType: 'view',
  },
  {
    id: 'alert-3',
    severity: 'red',
    title: 'High risk — suspected pest infestation',
    description: 'Drone scan detected irregular patterns consistent with fall armyworm. Immediate field inspection recommended.',
    fieldName: 'Plot B — Riverside',
    timestamp: '1 day ago',
    ctaLabel: 'View Advisory',
    ctaType: 'view',
  },
  {
    id: 'alert-4',
    severity: 'green',
    title: 'Cotton field healthy — routine scan due',
    description: 'East field is performing well. Schedule a regular verification scan for the upcoming week.',
    fieldName: 'Plot C — East Field',
    timestamp: '2 days ago',
    ctaLabel: 'Schedule Scan',
    ctaType: 'resolve',
  },
];

export const recentActivity: ActivityItem[] = [
  {
    id: 'act-1',
    type: 'scan',
    title: 'Drone scan completed',
    description: 'Multispectral imagery captured for 4.2 acres of wheat field',
    timestamp: '1 hour ago',
    fieldName: 'Plot A — North Field',
  },
  {
    id: 'act-2',
    type: 'advisory',
    title: 'Advisory issued — Irrigation recommended',
    description: 'Apply 15mm irrigation within 48 hours based on CWSI elevation',
    timestamp: '3 hours ago',
    fieldName: 'Plot A — North Field',
  },
  {
    id: 'act-3',
    type: 'scan',
    title: 'Photo scan uploaded',
    description: 'Leaf-level scan processed — no pathogen detected',
    timestamp: 'Yesterday',
    fieldName: 'Plot C — East Field',
  },
  {
    id: 'act-4',
    type: 'task',
    title: 'Task completed — Fertilizer applied',
    description: 'NPK 15-15-15 applied to soybean field, 25kg/acre',
    timestamp: '2 days ago',
    fieldName: 'Plot B — Riverside',
  },
  {
    id: 'act-5',
    type: 'system',
    title: 'Weekly report generated',
    description: 'Weekly crop health summary sent to Gram Sevak office',
    timestamp: '3 days ago',
    fieldName: 'All fields',
  },
];

export const notifications = [
  {
    id: 'n-1',
    title: 'Water stress alert',
    message: 'Plot A — CWSI crossed threshold',
    timestamp: '2h ago',
    unread: true,
    severity: 'orange' as RiskLevel,
  },
  {
    id: 'n-2',
    title: 'Advisory updated',
    message: 'Irrigation recommendation for wheat field',
    timestamp: '3h ago',
    unread: true,
    severity: 'yellow' as RiskLevel,
  },
  {
    id: 'n-3',
    title: 'Scan completed',
    message: 'Plot C East Field — results available',
    timestamp: '1d ago',
    unread: false,
    severity: 'green' as RiskLevel,
  },
];
