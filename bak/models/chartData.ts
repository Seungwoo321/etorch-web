
export type Origin = 'kosis' | 'ecos' | 'oecd' | string;

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

export type DataKey = 'first' | 'second';

export interface dataValue {
  date: string,
  value: number
}

export type ChartData = dataValue[] | []

export type IGetIndicatorData = {
  origin: string,
  code: string,
  period: string,
  unit?: string
}