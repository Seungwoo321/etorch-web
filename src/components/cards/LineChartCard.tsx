import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer
} from 'recharts';
import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle
} from "../ui/card"
import { IChart, LineChartItem } from '@/models/dashboard';
import { getIndicatorData } from '@/lib/api';
import { useEffect, useState } from 'react';
import { ChartData } from '@/models/chartData';

type LineChartCardProps = IChart

interface LineItem {
  [key: string]: string | number | null;
}

interface LabelItem {
  value: string,
  angle: number,
  position: string
}

interface LabelData {
  [code: string]: LabelItem
}

interface ReferenceLineData {
  [code: string]: number | undefined
}

const addLineData = (
  chartData: ChartData,
  lineData: LineItem[],
  code: string
) => {
  if (!lineData.length) {
    return chartData.map(item => {
      return {
        date: item.date,
        [code]: item.value
      }
    })
  }
  return lineData.map((item, index) => {
    return {
      ...item,
      [code]: chartData[index].date === item.date ? chartData[index].value : null
    }
  })
}

const addLabelData = (
  labelData: LabelData,
  code: string,
  unit: string
) => {
  return {
    ...labelData,
    [code]: {
      value: unit,
      angle: 90,
      position: 'insideTopLeft'
    }
  }
}
const getLineAverage = (chartData: ChartData ) => {
  return chartData.reduce((acc, cur) => acc + cur.value, 0) / chartData.length
}


const addReferenceLineData = (
  chartData: ChartData,
  referenceLineData: ReferenceLineData,
  code: string,
  referenceLineType: string,
  referenceLineValue?: number
) => {
  return {
    ...referenceLineData,
    [code]: referenceLineType === 'avg' ? getLineAverage(chartData) : referenceLineValue
  }
}


function LineChartCard({ 
  line
}: LineChartCardProps) {
  const [lineChart, setLineChart] = useState<LineItem[] | []>([])
  const [labelData, setLabelData] = useState<LabelData>({})
  const [referenceLineData, setReferenceLineData] = useState<ReferenceLineData>({})
  
  async function fetchIndicatorData ({ origin, code, period, unit, referenceLineType, referenceLineValue }: LineChartItem) {
    const { data } = await getIndicatorData({ origin, code, period })
    setLineChart(lineChart => addLineData(data, lineChart, code))
    setLabelData(labelData => addLabelData(labelData, code, unit))
    setReferenceLineData(referenceLineData => addReferenceLineData(data, referenceLineData, code, referenceLineType, referenceLineValue))
  }

  useEffect(() => {
    line?.forEach(item => {
      fetchIndicatorData(item)
    })
  }, [])
  if (!line) {
    console.log('No data')
    return null
  }
  return (
    <Card className="h-full col-span-1 grid">
      <CardHeader>
        <CardTitle>
          {line[0].code}
          {line[1]?.code ? " vs " + line[1].code : ''}
        </CardTitle>
        {/* <CardDescription>
          description
        </CardDescription> */}
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={600} height={300} data={lineChart} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
            {line[0]?.code ? <Line type="monotone" dataKey={line[0].code} stroke={line[0].stroke} yAxisId={line[0].yAxisId} /> : null}
            {line[1]?.code ? <Line type="monotone" dataKey={line[1].code} stroke={line[1].stroke} yAxisId={line[1].yAxisId} /> : null}
            
            {line[0]?.code && labelData[line[0]?.code] ? <YAxis label={labelData[line[0]?.code]} stroke='#777474' yAxisId={line[0].yAxisId} type="number"/> :null}
            {line[1]?.code && labelData[line[1]?.code] ? <YAxis label={labelData[line[1]?.code]} stroke="#777474" orientation="right" allowDataOverflow type="number" yAxisId={line[1].yAxisId}/> : null}

            <CartesianGrid stroke="#ddd" strokeDasharray="0" />
            <XAxis dataKey="date" stroke='#777474'/>
            {
              line[0]?.code && line[0].referenceLineType !== 'N/A'
                ? <ReferenceLine
                    y={referenceLineData[line[0].code]}
                    stroke={line[0]?.referenceLineColor}
                    strokeDasharray="3 3"
                    yAxisId="1"
                    ifOverflow="extendDomain"
                  />
                : null
            }
            {
              line[1]?.code && line[1].referenceLineType !== 'N/A'
                ? <ReferenceLine
                    y={referenceLineData[line[1].code]}
                    stroke={line[1]?.referenceLineColor}
                    strokeDasharray="3 3"
                    yAxisId="1"
                    ifOverflow="extendDomain"
                  />
                : null
            }
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default LineChartCard
