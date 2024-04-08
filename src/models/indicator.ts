export type Origin = 'kosis' | 'ecos' | 'oecd';

export interface Indicator {
  origin: Origin | '';
  name: string;
  description: string;
  unit_ko: string;
  unit_en: string;
  code: string;
  hasMonth: boolean
  hasQuarter: boolean
  hasYear: boolean
  hasDay: boolean
}