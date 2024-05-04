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

interface referenceLineMap {
  [code: string]: number
}

const addLineChartData = (
  lineChart: LineItem[],
  line: LineChartItem,
  data: ChartData
) => {
  if (!lineChart.length) {
    return data.map(item => {
      return {
        date: item.date,
        [line.code]: item.value
      }
    })
  }
  return lineChart.map((item, index) => {
    return {
      ...item,
      [line.code]: data[index].date === item.date ? data[index].value : null
    }
  })
}

const getLineAverage = (data: ChartData ) => {
  return data.reduce((acc, cur) => acc + cur.value, 0) / data.length
}

const calcReferenceValue = (lineChartItem: LineChartItem, chartData: ChartData) => {
  return lineChartItem.referenceLineType === 'avg' ? getLineAverage(chartData) : (lineChartItem.referenceLineValue || 0)
}

function LineChartCard({
  line
}: LineChartCardProps) {
  const [lineChart, setLineChart] = useState<LineItem[] | []>([])
  const [referenceLine, setReferenceLine] = useState<referenceLineMap>({})
  
  useEffect(() => {
    async function fetchIndicatorData (line: LineChartItem[]) {
        for (const item of line) {
            const { data } = await getIndicatorData(item);
            setLineChart(lineChart => addLineChartData(lineChart, item, data));
            setReferenceLine(referenceLine => ({ ...referenceLine, [item.code]: calcReferenceValue(item, data) }))
        }
    }
    fetchIndicatorData(line)
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

            {line.map(({code, stroke, yAxisId }) => (
              <Line
                key={`line-${code}${yAxisId}`}
                type="monotone"
                dataKey={code}
                stroke={stroke}
                yAxisId={yAxisId}
              />
            ))}
            {line.map(({code, yAxisId, label }) => (
              <YAxis
                key={`yAxis-${code}${yAxisId}`}
                label={label}
                stroke="#777474"
                yAxisId={yAxisId}
                orientation={yAxisId === '2' ? 'right' : 'left'}
                type="number"
                allowDataOverflow
              />
            ))}
    
            <CartesianGrid stroke="#ddd" strokeDasharray="0" />
            <XAxis dataKey="date" stroke='#777474'/>
            {line.map(({ code, referenceLineColor, referenceLineType, yAxisId }, index) => (
              referenceLineType !== 'N/A'
              ? <ReferenceLine
                  key={`ref-${referenceLineType}-${index}`}
                  y={referenceLine[code]}
                  yAxisId={yAxisId}
                  strokeDasharray="3 3"
                  stroke={referenceLineColor}
                  ifOverflow="extendDomain"
                />
              : null)
            )}
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default LineChartCard
