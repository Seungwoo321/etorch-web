import { Origin } from "./chartData"
import { YAxisProps, XAxisProps } from "recharts"
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

// export type YAxisLine = Line & {
//   allowDataOverflow: boolean;
//   orientation?: 'left' | 'right';
//   domain?: [number, number];
// }

// export type XAxisLine = Pick<Line, "type" | "dataKey" | "stroke">;

export interface BarChart {
  title: string
}

export interface LineChartItem {
  origin: Origin
  code: string
  period: string
  stroke: string
  yAxisId: string
  referenceLineValue?: number
  referenceLineColor: string
  referenceLineType: string
  label: {
    value: string,
    position: string,
    angle: number
  },
  reload?: boolean
}

export interface IChart {
  xAxisLine?: XAxisProps
  yAxisLine?: YAxisProps,
  line: LineChartItem[] | [],
  bar: BarChart[] | []
}

export type Dashboard = {
  id: string
  name: string
  data?: IChart[]
}

export type INewDashboard = IChart[]

export type IUpdateDashboard<T extends IChart> = T & {
  id: string;
}
