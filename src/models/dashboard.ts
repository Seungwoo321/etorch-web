
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

export interface WidgetGrid {
  x: number
  y: number
  w: number
  h: number
  static: boolean
  minW: number
  maxW: number
}

export interface WidgetData {
  origin: string
  code: string
  period: string
  yAxisId: number
}


export interface Line {
  type: string
  dataKey: string
  stroke: string
  yAxisId: string
}


export type YAxisLine = Line & {
  allowDataOverflow: boolean;
  orientation?: 'left' | 'right';
  domain?: [number, number];
}

export type XAxisLine = Pick<Line, "type" | "dataKey" | "stroke">;

export interface ChartSettings {
  xAxisLine: XAxisLine
  yAxisLine: YAxisLine[]
}

export interface BarChart extends ChartSettings {
  bar: {
    title: string
  }[]
}

export interface LineChart extends ChartSettings {
  line: Line[];
}

export type Chart<T extends ChartSettings> = T extends BarChart
  ? BarChart
  : T extends LineChart
    ? LineChart
    : never

export type ChartType = LineChart | BarChart;

export type DashboardItem<T extends ChartType> = {
  chart: T
}


const lineChart: DashboardItem<LineChart> = {
  chart: {
    line: [
      {
        type: '',
        dataKey: '',
        stroke: '',
        yAxisId: ''
      }
    ],
    xAxisLine: {
      type: '',
      dataKey: '',
      stroke: '',
    },
    yAxisLine: [
      {
        type: '',
        dataKey: '',
        stroke: '',
        yAxisId: '1',
        allowDataOverflow: true,
        orientation: 'left',
        domain: [0, 100]
      }
    ]
  }
}

const barChart: DashboardItem<BarChart> = {
  chart: {
    bar: [
      {
        title: ''
      }
    ],
    xAxisLine: {
      type: '',
      dataKey: '',
      stroke: '',
    },
    yAxisLine: [
      {
        type: '',
        dataKey: '',
        stroke: '',
        yAxisId: '1',
        allowDataOverflow: true,
        orientation: 'left',
        domain: [0, 100]
      }
    ]
  }
}


const dashboard: DashboardItem<ChartType>[] = [];

dashboard.push(lineChart)
dashboard.push(barChart)

if ('line' in dashboard[0].chart) {
  console.log(dashboard[0].chart.line);
}

if ('bar' in dashboard[1].chart) {
  console.log(dashboard[1].chart.bar);
}
