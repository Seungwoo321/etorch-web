
export interface Indicator {
  origin: string;
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

export interface DataValue {
  [x: string]: string | number;
}

export type IndicatorValues = DataValue[] | []

export type IndicatorValuesParamss = {
  origin: string,
  code: string,
  frequency: string
}

export type DataPanelItem = {
  id: number;
  isOpen: boolean;
  dataSource: string;
  indicatorCode: string;
  frequency: string;
  unit?: string;
  data: DataValue[]
}