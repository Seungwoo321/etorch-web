export type Origin = 'kosis' | 'ecos' | 'oecd';

export interface Indicator {
  origin: Origin;
  name: string;
  description: string;
  unit_ko: string;
  unit_en: string;
  code: string;
  has_month: boolean
  has_quarter: boolean
  has_year: boolean
  has_day: boolean
}