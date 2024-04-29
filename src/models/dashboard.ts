import { Origin } from "./chartData"

// export interface WidgetGrid {
//   x: number
//   y: number
//   w: number
//   h: number
//   static: boolean
//   minW: number
//   maxW: number
// }


// export interface WidgetData {
//   origin: string
//   code: string
//   period: string
//   yAxisId: number
// }


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

export interface BarChart {
  title: string
}

export interface LineChart {
  origin: Origin
  code: string
  period: string
  stroke: string
  yAxisId: string
  referenceLineColor: string
  referenceLineType: string
}

export interface IChart {
  xAxisLine?: XAxisLine
  yAxisLine?: YAxisLine[],
  line?: LineChart[],
  bar?: BarChart[]
}


export type INewDashboard = IChart[]

export type IUpdateDashboard<T extends IChart> = T & {
  id: string;
}
